import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogContentText from "@mui/material/DialogContentText";
import {enum_help_data_type} from "../common/enum";
import {SelectOne} from "../common/SelectOne";
import {yes_no_select} from "../common/select_data";
import {InteractiveList} from "../common/ListAddItem";
import LabelIcon from '@mui/icons-material/Label';
import {vacancy} from "../../api/api";

export const CreateInterviewQuestions = (props: any) => {

    const [countQuestions, setCountQuestions] = useState([1])
    const handleClose = () => {
        props.setOpen(false);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log(10)
        event.preventDefault();
        const form_data = new FormData(event.currentTarget);
        const data: any = {
            label: form_data.get('label'),
            dataQuestions: [],

        }
        for (let i = 1; i <= countQuestions.length; i++) {
            let allItemsUI = document.querySelectorAll(`#items_quest${i} li`)
            let dataItemsQuest = []
            for(let i=0; i<allItemsUI.length-1;i++){
                dataItemsQuest.push(allItemsUI[i].textContent)
            }
            data.dataQuestions.push({
                type: form_data.get('type_quest' + i),
                label: form_data.get('label_quest' + i),
                prefer_answer: form_data.get('prefer_answer_quest' + i),
                items: dataItemsQuest,
            })
        }
        console.log(data)
        vacancy.create_interview_questions(data,props.user_id)

    };


    return (
        <div>
            <Dialog open={props.open} maxWidth={'md'} onClose={handleClose}>


                <DialogTitle sx={{textAlign: 'center'}}>Создание интервью-вопросов</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}  sx={{justifyContent:'flex-end'}}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="label"
                                    label="Название"
                                    name="label"
                                    autoFocus
                                    inputProps={{maxLength: 50}}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <DialogContentText>
                                    Вопросы:
                                </DialogContentText>
                            </Grid>
                            {countQuestions.map(x => {
                                return (
                                    <Question index={x}/>
                                )
                            })}

                                <Button

                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    onClick={() => setCountQuestions(countQuestions.concat([countQuestions.length + 1]))}
                                >
                                    +
                                </Button>




                        </Grid>
                        <Button onClick={handleClose} sx={{mt: 3, mb: 2}}>Отмена</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{mt: 3, mb: 2, float:'right'}}
                        >
                            Сохранить
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}

const Question = (props: any) => {
    const [type, setType] = React.useState({value: '', label: ''});
    const [preferAnswer, setPreferAnswer] = React.useState('');
    const [selectValues, setSelectValues] = React.useState<{ value: string, label: string }[]>([{
        value: 'first',
        label: 'first'
    }]);
    console.log(type)
    return (<>

        {type.value === ''
            && <>
                <Grid item xs={0.5} sm={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <LabelIcon/>
                </Grid>
                <Grid item xs={11.5} sm={5.5}>
                    <SelectOne values={enum_help_data_type}
                               value={type}
                               required
                               id={"type_quest" + props.index}
                               name={"type_quest" + props.index}
                               label={'Тип'}
                               labelEn={'type_quest'}
                               setValue={setType}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid></>}

        <input hidden={true} value={type.value} required id={"type_quest" + props.index} name={"type_quest" + props.index}/>
        {type.value === 'check'
            && <>
                <Grid item xs={0.5} sm={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <LabelIcon/>
                </Grid>
                <Grid item xs={11.5} sm={5.5}>
                    <TextField
                        required
                        fullWidth
                        multiline
                        id={"label_quest" + props.index}
                        label="Вопрос"
                        name={"label_quest" + props.index}
                        autoComplete={"label_quest" + props.index}
                        inputProps={{maxLength: 255}}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectOne values={yes_no_select}
                               value={preferAnswer}
                               required
                               id={"prefer_answer_quest" + props.index}
                               name={"prefer_answer_quest" + props.index}
                               label={'Правильный ответ'}
                               labelEn={'prefer_answer_quest' + props.index}
                               setValue={setPreferAnswer}/>
                </Grid>
            </>}
        {type.value === 'select'
            && <>
                <Grid item xs={0} sm={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <LabelIcon/>
                </Grid>
                <Grid item xs={11.5} sm={11.5}>
                    <TextField
                        required
                        fullWidth
                        multiline
                        id={"label_quest" + props.index}
                        label="Вопрос"
                        name={"label_quest" + props.index}
                        autoComplete={"label_quest" + props.index}
                        inputProps={{maxLength: 255}}/>
                </Grid>
                <Grid item xs={0} sm={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                </Grid>
                <Grid item xs={12} sm={5.5}>
                    <InteractiveList label={'Введите вариант ответа'}
                                     id={"items_quest" + props.index}
                                     selectValues={selectValues}
                                     setSelectValues={setSelectValues}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectOne values={selectValues}
                               value={preferAnswer}
                               required
                               id={"prefer_answer_quest" + props.index}
                               name={"prefer_answer_quest" + props.index}
                               label={'Правильный ответ'}
                               labelEn={'prefer_answer_quest' + props.index}
                               setValue={setPreferAnswer}/>
                </Grid>
            </>}
        {type.value === 'question'
            && <>
                <Grid item xs={0} sm={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <LabelIcon/>
                </Grid>
                <Grid item xs={11.5} sm={11.5}>
                    <TextField
                        required
                        fullWidth
                        multiline
                        id={"label_quest" + props.index}
                        label="Вопрос"
                        name={"label_quest" + props.index}
                        autoComplete={"label_quest" + props.index}
                        inputProps={{maxLength: 255}}/>
                </Grid>

            </>}


    </>)
}