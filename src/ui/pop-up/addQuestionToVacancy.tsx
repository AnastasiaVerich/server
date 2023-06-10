import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {vacancy} from "../../api/api";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export const AddQuestionToVacancy = (props: any) => {

    const [interviewQuestionsId, setInterviewQuestionsId] = React.useState({
        value:props.interview_questions_id,
        label:props.interview_questions_label,
    });

    const handleClose = () => {
        props.setOpen(false);
    };
    const send = () => {
        vacancy.update_vacancy_interview_questions(interviewQuestionsId.value, props.vacancy_id,)
        handleClose()
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Интервью-вопросы</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{mb:'15px'}}>
                        Выберите интервью-вопросы для использования их во время собеседования и отбора кандидатов
                    </DialogContentText>
                    <SelectOne values={props.values}
                               value={interviewQuestionsId}
                               required
                               id={"experience"}
                               name={"experience"}
                               label={'Опыт'}
                               labelEn={'Опыт'}
                               setValue={setInterviewQuestionsId}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={send}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

 const  SelectOne=(props:any)=> {
    const handleChange = (event: SelectChangeEvent) => {
        props.setValue(event.target.value as string);
    };
    return (
        <Box >
            <FormControl fullWidth>
                <InputLabel id={props.id+'-label'}>{props.label}</InputLabel>
                <Select
                    labelId={props.id+'-label'}
                    value={props.value.value}
                    label={props.label}
                    onChange={handleChange}
                >
                    {props.values.map((el:any) => (
                        <MenuItem
                            key={el.value}
                            value={el.value}>
                            {el.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <input  hidden value={props.value.value} id={props.id} name={props.id}/>
        </Box>
    );
}