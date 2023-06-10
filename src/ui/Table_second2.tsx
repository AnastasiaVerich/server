import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {useState} from "react";
import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {Confirmed_candidate} from "./popup/popap_1";


function Row(props: { row: any, state: any, question: any,handleClose:any }) {
    const [open, setOpen] = React.useState(false);
    const {row} = props;

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.surname}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.city}</TableCell>
                <TableCell align="right">{row.salary} бел. руб.</TableCell>
                <TableCell
                    align="right">{props.state.interview_questions_answer.filter((x: any) => x.connection_vacancy_with_cv_id === row.vacancy_with_resume_connection_id).length > 0 ? 'Было' : 'Не было'}</TableCell>
                <TableCell align="right" sx={{display:'flex', justifyContent:'center', flexDirection:'row'}}>
                    <Avatar  sx={{ bgcolor: '#07bc0c',mr:1, cursor:'pointer'}} onClick={()=>props.handleClose()}>
                        <CheckIcon/>
                    </Avatar>
                    <Avatar  sx={{ bgcolor: '#e74c3c', cursor:'pointer'}}>
                        <CloseIcon/>
                    </Avatar>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Ответы кандидата
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Вопрос</TableCell>
                                        <TableCell>Ответ</TableCell>
                                        <TableCell>Правильный ответ</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.state.interview_questions_answer.filter((x: any) => x.connection_vacancy_with_cv_id === row.vacancy_with_resume_connection_id).map((el: any) => (
                                        <TableRow>
                                            <TableCell component="th"
                                                       scope="row">{
                                                 props.question !== undefined
                                                    ? props.question.quest.find((x: any) => x.interview_questions_one_data_id === el.interview_questions_one_data_id).label
                                                    : ''}</TableCell>
                                            <TableCell>{
                                                el.answer === 'yes'
                                                    ? 'Да'
                                                    : el.answer === 'no'
                                                        ? 'Нет'
                                                        : el.answer
                                            }</TableCell>
                                            <TableCell>{ props.question !== undefined
                                                ?props.question.quest.find((x: any) => x.interview_questions_one_data_id === el.interview_questions_one_data_id).prefer_answer === 'yes'
                                                ? 'Да'
                                                : props.question.quest.find((x: any) => x.interview_questions_one_data_id === el.interview_questions_one_data_id).prefer_answer === 'no'
                                                    ? 'Нет'
                                                    : props.question.quest.find((x: any) => x.interview_questions_one_data_id === el.interview_questions_one_data_id).prefer_answer
                                                :''
                                            }</TableCell>

                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell/>
                                        <TableCell/>
                                        <TableCell align="right"><b>Правильных ответов:</b> {row.count}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

        </React.Fragment>
    );
}

export const CollapsibleTable = (props: any) => {
    const [check, setCheck] = useState(false)
    return (
        <TableContainer component={Paper}>
            <FormControlLabel
                sx={{m: 1}}
                control={
                    <Switch
                        checked={check}
                        onChange={(event) => setCheck(event.target.checked)}
                    />
                }
                label="Отсортировать по результатм прохождения собеседования"
            />
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Фамилия</TableCell>
                        <TableCell align="right">Имя</TableCell>
                        <TableCell align="right">Город</TableCell>
                        <TableCell align="right">Зарплата</TableCell>
                        <TableCell align="right">Собеседование</TableCell>
                        <TableCell align="center">Сделать выбор</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!check && props.state.vacancy_with_cv_connection.filter((x: any) => x.vacancy_id === props.vacancy_data.vacancy_id).map((x: any) => {
                        return {
                            ...props.state.resume.find((y: any) => y.resume_id === x.resume_id),
                            'vacancy_with_resume_connection_id': x.vacancy_with_resume_connection_id
                        }
                    }).map((row: any, index: number) => {

                        return <Row key={index} row={row} state={props.state} question={props.question} handleClose={props.handleClose}/>


                    })}
                    {check && props.question !==undefined && props.state.vacancy_with_cv_connection.filter((x: any) => x.vacancy_id === props.vacancy_data.vacancy_id).map((x: any) => {

                        return {
                            ...props.state.resume.find((y: any) => y.resume_id === x.resume_id),
                            'vacancy_with_resume_connection_id': x.vacancy_with_resume_connection_id
                        }
                    }).filter((row: any, index: number) => {

                            if (props.state.interview_questions_answer.filter((x: any) => x.connection_vacancy_with_cv_id === row.vacancy_with_resume_connection_id).length > 0) {
                                return true
                            }
                        }
                    ).map((row: any, index: number) => {
                        let count = 0
                        props.state.interview_questions_answer.filter((x: any) => x.connection_vacancy_with_cv_id === row.vacancy_with_resume_connection_id)
                            .forEach((x: any) => {
                                if (x.answer === props.question.quest.find((y: any) => y.interview_questions_one_data_id === x.interview_questions_one_data_id).prefer_answer) {
                                    count++
                                }
                            })

                        return {...row, 'count': count}
                    }).sort((b: any, a: any) => a.count - b.count).map((row: any, index: number) => {

                        return <Row key={index} row={row} state={props.state} question={props.question} handleClose={props.handleClose}/>
                    })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}