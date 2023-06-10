import React, {useEffect, useRef, useState} from 'react';
import {socket} from '../../socket';
import {useHistory} from 'react-router';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import {dateReturn, timeReturn} from "../common/lib";

export const Videochat_=(props:any) =>{

    const [rooms, updateRooms] = useState([]);
    const rootNode = useRef();

    useEffect(() => {
        socket.on('ShareExistingVideochat', ({rooms = []} = {}) => {
            if (rootNode.current) {
                updateRooms(rooms);
            }
        });
    }, []);

    return (
        <Container maxWidth={false}
                   sx={{
                       height: 'calc(100vh - 68.5px)',
                       width: '100vw',
                       padding: '50px',
                       display: 'flex'
                   }}>
            <div style={{
                boxShadow: '0px 2px 20px 3px rgba(0,0,0,0.2)',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}>
        <Box component="main" sx={{flexGrow: 1, p: 3, overflow:'auto'}}>

            <Box >
                <div style={{display:"grid", gridTemplateColumns:'repeat(auto-fill, minmax(350px, 1fr))', gridGap:'2vw'}}>

                    {props.state.schedule_events_data
                        .filter((x:any)=>x.schedule_id === props.state.user.user_data.schedule_id).map((x:any, index:number)=>{
                            if(new Date() < new Date(x.date)){
                                return <>
                                    <OneItemVideochat data={x} state={props.state}/>
                                </>
                            } else {
                                return
                            }


                    })}
                </div>
            </Box>


        </Box>
            </div>
        </Container>
    );
}

const OneItemVideochat=(props:any)=>{
    const history = useHistory();
    const cancel_event = () => {

    };

    const resume = props.state.resume.find((x:any)=>{
        return x.resume_id === props.state.vacancy_with_cv_connection.find((y:any)=>y.vacancy_with_resume_connection_id ===props.data.connection_vacancy_with_cv_id).resume_id
    })
    const vacancy = props.state.vacancy.find((x:any)=>{
        return x.vacancy_id === props.state.vacancy_with_cv_connection.find((y:any)=>y.vacancy_with_resume_connection_id ===props.data.connection_vacancy_with_cv_id).vacancy_id
    })
    return(
        <Card sx={{minWidth: 350}}>
            <CardContent>
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <CameraAltIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Собеседование
                    </Typography>
                    <Box sx={{mt: '24px', width: '80%'}}>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            <b>Дата:</b> {dateReturn(props.data.date)} {timeReturn(props.data.date)}
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            <b>Вакансия:</b> {vacancy.label}
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            <b>Кандидат:</b> {resume.surname} {resume.name}
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={new Date(props.data.date) > new Date(new Date().setMinutes(new Date().getMinutes() + 5))}
                            sx={{mt: 3, mb: 2}}
                            onClick={() => {
                                history.push(`/videochat/room/videochat_id__`+props.data.date+'-connection_vacancy_with_cv_id:'+props.data.connection_vacancy_with_cv_id);
                            }}
                        >
                            Присоедениться
                        </Button>
                        <Grid container>
                            <Grid item xs onClick={cancel_event} sx={{textAlign:'end'}}>
                                Отменить собеседование
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </CardContent>
        </Card>
    )

}