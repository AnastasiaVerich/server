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
import {MultipleSelectChip} from "../common/SelectMult";
import {vacancy} from "../../api/api";
import DialogContentText from "@mui/material/DialogContentText";
import {
    enum_education_data_type,
    enum_employment_type,
    enum_languages_data_level,
    enum_vacancy_experience
} from "../common/enum";
import {SelectOne} from "../common/SelectOne";
import {skills_select} from "../common/select_data";

export const CreateVacancy = (props: any) => {

    const [vacancyExperience, setVacancyExperience] = useState('')
    const [countLanguage, setCountLanguage] = useState([1])
    const [skills, setSkills] = React.useState<{value:string, label:string}[]>([]);
    const [employmentType, setEmploymentType] = React.useState<{value:string, label:string}[]>([]);
    const [educationLevel, setEducationLevel] = React.useState<{value:string, label:string}[]>([]);
    const handleClose = () => {
        props.setOpen(false);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form_data = new FormData(event.currentTarget);
        const data: any = {
            label: form_data.get('label'),
            job_title: form_data.get('job_title'),
            experience: form_data.get('experience'),
            city: form_data.get('city'),
            salary: Number(form_data.get('salary')),
            skills: skills.map(x=>x.value),
            note: form_data.get('note'),
            employment_type: employmentType.map(x=>x.value),
            education_level: educationLevel.map(x=>x.value),
            dataLanguage: [],

        }
        for (let i = 1; i <= countLanguage.length; i++) {
            data.dataLanguage.push({
                language: form_data.get('language' + i),
                level: form_data.get('level_lang' + i),
            })
        }
        console.log(data)
        vacancy.create_vacancy(data,props.user_id)

    };


    return (
        <div>
            <Dialog open={props.open}  maxWidth={'md'}  onClose={handleClose}>
                <DialogTitle sx={{textAlign:'center'}}>Создание вакансии</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2} sx={{justifyContent:'flex-end'}}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="label"
                                    label="Название вакансии"
                                    name="label"
                                    autoFocus
                                    inputProps={{ maxLength: 50 }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="job_title"
                                    label="Должность"
                                    name="job_title"
                                    autoFocus
                                    inputProps={{ maxLength: 50 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <SelectOne values={enum_vacancy_experience}
                                           value={vacancyExperience}
                                           required
                                           id={"experience"}
                                           name={"experience"}
                                           label={'Опыт'}
                                           labelEn={'Опыт'}
                                           setValue={setVacancyExperience}/>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="city"
                                    label="Город проживания"
                                    name="city"
                                    autoComplete="city"
                                    inputProps={{ maxLength: 50 }}
                                />
                            </Grid>


                            <Grid item xs={12} sm={4}>
                                <MultipleSelectChip values={enum_employment_type}
                                                    value={employmentType}
                                                    label={'Тип занятости'}
                                                    labelEn={'employment_type'}
                                                    setValue={setEmploymentType}/>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="salary"
                                    label="Доход (BYN)"
                                    name="salary"
                                    autoComplete="salary"
                                    type={"number"}
                                    inputProps={{ maxLength: 6 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <MultipleSelectChip values={enum_education_data_type}
                                                    value={educationLevel}
                                                    label={'Уровень образования'}
                                                    labelEn={'education_level'}
                                                    setValue={setEducationLevel}/>
                            </Grid>





                            <Grid item xs={12} sm={12}>
                                <DialogContentText>
                                    Владение языками:
                                </DialogContentText>
                            </Grid>
                            {countLanguage.map(x => {
                                return (
                                    <Language index={x}/>
                                )
                            })}
                            <Button

                                variant="contained"
                                sx={{mt: 3, mb: 2, ml:'15px'}}
                                onClick={() => setCountLanguage(countLanguage.concat([countLanguage.length + 1]))}
                            >
                                +
                            </Button>

                            <Grid item xs={12} sm={12}>
                                <MultipleSelectChip values={skills_select}
                                                    value={skills}
                                                    label={'Навыки'}
                                                    labelEn={'skills'}
                                                    setValue={setSkills}/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="note"
                                    label="О вакансии"
                                    name="note"
                                    autoComplete="note"
                                    multiline
                                    inputProps={{ maxLength: 255 }}
                                />
                            </Grid>


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

const Language = (props: any) => {
    const [level, setLevel] = React.useState('');
    return (<>
        <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                id={"language" + props.index}
                label="Язык"
                name={"language" + props.index}
                autoComplete={"language" + props.index}
                inputProps={{ maxLength: 50 }}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <SelectOne values={enum_languages_data_level}
                       value={level}
                       required
                       id={"level_lang" + props.index}
                       name={"level_lang" + props.index}
                       label={'Уровень'}
                       labelEn={'level_lang'}
                       setValue={setLevel}/>
        </Grid>
    </>)
}