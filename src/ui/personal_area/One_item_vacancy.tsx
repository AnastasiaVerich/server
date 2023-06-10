import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState} from "react";
import {AddQuestionToVacancy} from "../pop-up/addQuestionToVacancy";
import {VacancyMenuPopup} from "../pop-up/VcancyMenuPopup";

const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

export const OneItemVacancy = (props: any) => {

    const [openAddQuestion, setOpenAddQuestion] = useState(false)
    const [openVacancyMenu, setVacancyMenu] = React.useState(false);

    const enum_help_data_type = [
        {value:1, label:'С ответами да / нет'},
        {value:2, label:'Без ответов'},
        {value:3, label:'С вариантами ответов'}]
    return (
        <Card sx={{minWidth: 275, display:'flex', justifyContent:'space-between', flexDirection:'column'}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Активная
                </Typography>
                <Typography variant="h5" component="div">
                    {bull}{props.data.label}{bull}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {props.data.job_title}
                </Typography>
                <div className='text_ellipsis_box'>
                    <Typography variant="body2" sx={{margin: 0}}>
                        {props.data.note}
                    </Typography>
                </div>
            </CardContent>
            <VacancyMenuPopup open={openVacancyMenu}
                              data={props.data}
                              state={props.state}
                              setOpen={setVacancyMenu}/>
            <AddQuestionToVacancy state={props.state}
                                  interview_questions_id={props.data.interview_questions_id}
                                  vacancy_id={props.data.vacancy_id}
                                  interview_questions_label={props.state.interview_questions.find((x: any) => x.interview_questions_id === props.data.interview_questions_id)
                                      ? props.state.interview_questions.find((x: any) => x.interview_questions_id === props.data.interview_questions_id).label
                                      : ''}
                                  values={props.state.interview_questions.filter((x: any)=>x.owner_id === props.state.user.user_data.user_id).map((x: any)=>{

                                      return{value:x.interview_questions_id, label:x.label}
                                  })}
                                  open={openAddQuestion}
                                  enum_help_data_type={enum_help_data_type}
                                  setOpen={setOpenAddQuestion}/>
            <CardActions sx={{justifyContent: 'space-between'}}>
                <Button size="small"  onClick={() => {
                    setVacancyMenu(true)
                }}>Подробнее</Button>
                <Button size="small" onClick={() => {
                    setOpenAddQuestion(true)
                }}>{props.data.interview_questions_id === null ? 'Добавить вопросы':'Изменить вопросы'}</Button>
            </CardActions>

        </Card>
    );
}