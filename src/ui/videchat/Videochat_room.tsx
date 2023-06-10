import React, {useState} from 'react';
import './videochat.scss'

import {useParams} from 'react-router';
import useWebRTC, {LOCAL_VIDEO} from './hooks/useWebRTC';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import store from '../../store/state'
import TextField from "@mui/material/TextField";
import {SelectOne} from "../common/SelectOne";
import {yes_no_select} from "../common/select_data";
import {generic, vacancy} from "../../api/api";

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



export default function Room(props:any) {// @ts-ignore
    const {id: roomID} = useParams();
    const {clients, provideMediaRef} = useWebRTC(roomID);
    const videoLayout = layout(clients.length);

    const connection_vacancy_with_cv_id = Number(window.location.href.slice(108))
    const resume_data = props.state.resume.find((x:any)=>{
        return x.resume_id === props.state.vacancy_with_cv_connection.find((y:any)=>y.vacancy_with_resume_connection_id === connection_vacancy_with_cv_id).resume_id
    })
    const vacancy_data = props.state.vacancy.find((x:any)=>{
        return x.vacancy_id === props.state.vacancy_with_cv_connection.find((y:any)=>y.vacancy_with_resume_connection_id ===connection_vacancy_with_cv_id).vacancy_id
    })



    const question: any = store._state.interview_questions.find((x:any)=>x.interview_questions_id === vacancy_data.interview_questions_id)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form_data = new FormData(event.currentTarget);
        const data =question.quest.map((x:any, i:number)=>{

            return {[x.interview_questions_one_data_id]:form_data.get(x.interview_questions_one_data_id)}
        })
        vacancy.save_interview_answer(data, connection_vacancy_with_cv_id)
    };
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
                component="form"
                onSubmit={handleSubmit}
            >
                <Box sx={{my: 3, mx: 2,overflow: 'auto' }}>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom variant="h4" component="div">
                                {question.label}
                            </Typography>
                        </Grid>
                    </Grid>

                        {question.quest.map((x: any, i:number) => {
                            if(x.type === "question"){
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
                                            name={x.interview_questions_one_data_id}
                                            label="Ответ"
                                            id={x.interview_questions_one_data_id}
                                        />
                                    </Grid>
                                </>)
                            }
                            if(x.type === "check"){
                                return (<>
                                    <Grid item>
                                        <Typography gutterBottom variant="h6" component="div" sx={{lineHeight: 'normal', mb:0, mt:1}}>
                                            {x.label}
                                        </Typography>
                                        <div style={{marginTop:'8px', marginBottom:'16px'}}>
                                            <SelectContainer i={i} values={yes_no_select} x={x}/>
                                        </div>
                                    </Grid>
                                </>)
                            }
                            if(x.type === "select"){
                                return (<>
                                    <Grid item>
                                        <Typography gutterBottom variant="h6" component="div" sx={{lineHeight: 'normal', mb:0, mt:1}}>
                                            {x.label}
                                        </Typography>
                                        <div style={{marginTop:'8px', marginBottom:'16px'}}>
                                            <SelectContainer i={i} values={x.items.map((y:any)=>{ return{label:y, value:y}})} x={x}/>
                                        </div>
                                    </Grid>
                                </>)
                            }

                        })}
                </Box>
                <Divider variant="middle"/>
                <Box sx={{ml: 1, mb: 1, textAlign: 'center'}}>
                    <Button  type="submit">Сохранить</Button>
                </Box>
            </Box>

        </div>
    );
}

const SelectContainer=(props:any)=>{
    const [answer, setAnswer] = useState('')
    return(
        <div style={{marginTop:'8px', marginBottom:'16px'}}>
            <SelectOne values={props.values}
                       value={answer}
                       required
                       id={props.x.interview_questions_one_data_id}
                       name={props.x.interview_questions_one_data_id}
                       label={'Ответ'}
                       labelEn={'Ответ'}
                       setValue={setAnswer}/>
        </div>
    )
}