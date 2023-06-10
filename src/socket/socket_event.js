import {socket} from './index'
import store from '../store/state'

export const socketEvents=(props)=>{
    socket.on('schedule_confirmed', (e)=>{
        props.state.notification.count = e.count
        props.state.notification.arr = e.confirmed
        props.render()
    });
}


