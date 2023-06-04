import {useEffect, useRef, useCallback} from 'react';
import useStateWithCallback from './useStateWithCallback';
import {socket} from '../../../socket';

export const LOCAL_VIDEO = 'LOCAL_VIDEO';


export default function useWebRTC(roomID: any) {
    const [clients, updateClients] = useStateWithCallback([]);

    const addNewClient = useCallback((newClient: any, cb: any) => {
        updateClients((list: any) => {
            if (!list.includes(newClient)) {
                return [...list, newClient]
            }

            return list;
        }, cb);
    }, [clients, updateClients]);

    const peerConnections = useRef({});
    const localMediaStream = useRef(null);
    const peerMediaElements = useRef({
        [LOCAL_VIDEO]: null,
    });

    useEffect(() => {
        async function handleNewPeer({peerID, createOffer}: any) {
            if (peerID in peerConnections.current) {
                return console.warn(`Already connected to peer ${peerID}`);
            }

            // @ts-ignore
            peerConnections.current[peerID] = new RTCPeerConnection({
                iceServers: [
                    {  // @ts-ignore
                        "url": "stun:stun4.l.google.com:19302",
                        "urls": [
                            "stun:stun4.l.google.com:19302"
                        ]
                    },
                    {  // @ts-ignore
                        "url": "stun:stun.voxgratia.org",
                        "urls": [
                            "stun:stun.voxgratia.org"
                        ]
                    }
                ],
            });

            // @ts-ignore
            peerConnections.current[peerID].onicecandidate = event => {
                if (event.candidate) {
                    socket.emit('relay-ice', {
                        peerID,
                        iceCandidate: event.candidate,
                    });
                }
            }

            let tracksNumber = 0;
            // @ts-ignore
            peerConnections.current[peerID].ontrack = ({streams: [remoteStream]}) => {
                tracksNumber++

                if (tracksNumber === 2) { // video & audio tracks received
                    tracksNumber = 0;
                    addNewClient(peerID, () => {
                        // @ts-ignore
                        if (peerMediaElements.current[peerID]) {
                            // @ts-ignore
                            peerMediaElements.current[peerID].srcObject = remoteStream;
                        } else {
                            // FIX LONG RENDER IN CASE OF MANY CLIENTS
                            let settled = false;
                            const interval = setInterval(() => {
                                // @ts-ignore
                                if (peerMediaElements.current[peerID]) {
                                    // @ts-ignore
                                    peerMediaElements.current[peerID].srcObject = remoteStream;
                                    settled = true;
                                }

                                if (settled) {
                                    clearInterval(interval);
                                }
                            }, 1000);
                        }
                    });
                }
            }

            // @ts-ignore
            localMediaStream.current.getTracks().forEach(track => {
                // @ts-ignore
                peerConnections.current[peerID].addTrack(track, localMediaStream.current);
            });

            if (createOffer) {
                // @ts-ignore
                const offer = await peerConnections.current[peerID].createOffer();

                // @ts-ignore
                await peerConnections.current[peerID].setLocalDescription(offer);

                socket.emit('relay-sdp', {
                    peerID,
                    sessionDescription: offer,
                });
            }
        }

        socket.on('UserAddedInChat', handleNewPeer);

        return () => {
            socket.off('UserAddedInChat');
        }
    }, []);

    useEffect(() => {
        async function setRemoteMedia({peerID, sessionDescription: remoteDescription}: any) {
            // @ts-ignore
            await peerConnections.current[peerID]?.setRemoteDescription(
                new RTCSessionDescription(remoteDescription)
            );

            if (remoteDescription.type === 'offer') {
                // @ts-ignore
                const answer = await peerConnections.current[peerID].createAnswer();

                // @ts-ignore
                await peerConnections.current[peerID].setLocalDescription(answer);

                socket.emit('relay-sdp', {
                    peerID,
                    sessionDescription: answer,
                });
            }
        }

        socket.on('session-description', setRemoteMedia)

        return () => {
            socket.off('session-description');
        }
    }, []);

    useEffect(() => {
        socket.on('ice-candidate', ({peerID, iceCandidate}) => {
            // @ts-ignore
            peerConnections.current[peerID]?.addIceCandidate(
                new RTCIceCandidate(iceCandidate)
            );
        });

        return () => {
            socket.off('ice-candidate');
        }
    }, []);

    useEffect(() => {
        const handleRemovePeer = ({peerID}: any) => {
            // @ts-ignore
            if (peerConnections.current[peerID]) {
                // @ts-ignore
                peerConnections.current[peerID].close();
            }
// @ts-ignore
            delete peerConnections.current[peerID];// @ts-ignore
            delete peerMediaElements.current[peerID];
// @ts-ignore
            updateClients(list => list.filter(c => c !== peerID));
        };

        socket.on('UserLeaveChat', handleRemovePeer);

        return () => {
            socket.off('UserLeaveChat');
        }
    }, []);

    useEffect(() => {
        async function startCapture() {// @ts-ignore
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: 1280,
                    height: 720,
                }
            });

            addNewClient(LOCAL_VIDEO, () => {
                const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

                if (localVideoElement) {// @ts-ignore
                    localVideoElement.volume = 0;// @ts-ignore
                    localVideoElement.srcObject = localMediaStream.current;
                }
            });
        }

        startCapture()
            .then(() => socket.emit('JoinVideochat', {room: roomID}))
            .catch(e => console.error('Error getting userMedia:', e));

        return () => {
            if (localMediaStream.current) {
                // @ts-ignore
                localMediaStream.current.getTracks().forEach(track => track.stop());
            }

            socket.emit('LeaveVideochat');
        };
    }, [roomID]);
// @ts-ignore
    const provideMediaRef = useCallback((id, node) => {// @ts-ignore
        peerMediaElements.current[id] = node;
    }, []);

    return {
        clients,
        provideMediaRef
    };
}