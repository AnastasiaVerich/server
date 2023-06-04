import React from 'react';
import './videochat.scss'

import {useParams} from 'react-router';
import useWebRTC, {LOCAL_VIDEO} from './hooks/useWebRTC';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import store from '../../store/state'
import TextField from "@mui/material/TextField";

function layout(clientsNumber = 1) {
    const pairs = Array.from({length: clientsNumber})
        .reduce((acc, next, index, arr) => {
            if (index % 2 === 0) {
                // @ts-ignore
                acc.push(arr.slice(index, index + 2));
            }

            return acc;
        }, []);
// @ts-ignore
    const rowsNumber = pairs.length;
    const height = `${100 / rowsNumber}%`;
// @ts-ignore
    return pairs.map((row, index, arr) => {

        if (index === arr.length - 1 && row.length === 1) {
            return [{
                width: '100%',
                height,
            }];
        }

        return row.map(() => ({
            width: '50%',
            height,
        }));
    }).flat();
}

const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

export default function Room() {// @ts-ignore
    const {id: roomID} = useParams();
    const {clients, provideMediaRef} = useWebRTC(roomID);
    const videoLayout = layout(clients.length);
    const question: any = store._state.interview_questions[0]

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            height: 'calc(100vh - 68.5px)',
            position: 'relative',
            padding: '50px'
        }}>
            <div className={'video_box'} style={{
                backgroundImage: 'url(http://localhost:3000/bac.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                boxShadow: '0px 2px 20px 3px rgba(0,0,0,0.2)'
            }}>
                {clients.map((clientID: any, index: any) => {
                    return (
                        <div key={clientID} id={clientID}
                             className={`video_container ${(clientID === LOCAL_VIDEO && clients.length > 1) ? 'my_video' : 'other_video'}`}>
                            <video
                                width='100%'
                                height='auto'
                                ref={instance => {
                                    provideMediaRef(clientID, instance);
                                }}
                                autoPlay
                                playsInline
                                muted={clientID === LOCAL_VIDEO}
                            />

                        </div>
                    );
                })}
            </div>

            <Box
                sx={{
                    width: '30%',
                    height: '100%',
                    boxShadow: '0px 2px 20px 3px rgba(0,0,0,0.2)',

                }}
            >
                <Box sx={{my: 3, mx: 2,overflow: 'auto' }}>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom variant="h4" component="div">
                                {question.label}
                            </Typography>
                        </Grid>
                    </Grid>

                        {question.quest.map((x: any) => {
                            return (<>
                                <Grid item>
                                    <Typography gutterBottom variant="h6" component="div" sx={{lineHeight: 'normal', mb:0, mt:1}}>
                                        {x.label}
                                    </Typography>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        sx={{mt:1, mb:2}}
                                        name={'answer' + x.interview_questions_one_data_id}
                                        label="Ответ"
                                        id={'answer' + x.interview_questions_one_data_id}
                                    />
                                </Grid>
                            </>)
                        })}
                </Box>
                <Divider variant="middle"/>
                <Box sx={{ml: 1, mb: 1, textAlign: 'center'}}>
                    <Button onClick={() => {
                    }}>Сохранить</Button>
                </Box>
            </Box>

        </div>
    );
}