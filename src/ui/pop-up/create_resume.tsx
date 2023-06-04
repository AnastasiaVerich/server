import * as React from 'react';
import {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {MultipleSelectChip} from "../common/SelectMult";
import {resume} from "../../api/api";
import DialogContentText from "@mui/material/DialogContentText";
import {DateMaskCustom} from "../common/date_mask";
import {enum_education_data_type, enum_employment_type, enum_languages_data_level} from "../common/enum";
import {SelectOne} from "../common/SelectOne";
import {skills_select} from "../common/select_data";

export const CreateResume = (props: any) => {

    const [countExperience, setCountExperiencen] = useState([1])
    const [countEducation, setCountEducation] = useState([1])
    const [countLanguage, setCountLanguage] = useState([1])
    const [skills, setSkills] = React.useState<{value:string, label:string}[]>([]);
    const [employmentType, setEmploymentType] = React.useState<{value:string, label:string}[]>([]);
    const handleClose = () => {
        props.setOpen(false);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form_data = new FormData(event.currentTarget);
        const data: any = {
            surname: form_data.get('surname'),
            name: form_data.get('name'),
            patronymic: form_data.get('patronymic'),
            city: form_data.get('city'),
            job_title: form_data.get('job_title'),
            salary: Number(form_data.get('salary')),
            note: form_data.get('note'),
            dataExperience: [],
            dataEducation: [],
            employment_type: employmentType.map(x=>x.value),
            dataLanguage: [],
            skills: skills.map(x=>x.value),
        }
        for (let i = 1; i <= countExperience.length; i++) {
            data.dataExperience.push({
                date_from: form_data.get('date_from_exp' + i),
                date_to: form_data.get('date_to_exp' + i),
                job_title: form_data.get('job_title_exp' + i),
                organization: form_data.get('organization_exp' + i),
            })
        }
        for (let i = 1; i <= countEducation.length; i++) {
            // @ts-ignore
            console.log(form_data.get('type_educ' + i))
            data.dataEducation.push({
                type: form_data.get('type_educ' + i),
                year_ending: Number(form_data.get('year_ending_educ' + i)),
                organization: form_data.get('organization_educ' + i),
                speciality: form_data.get('speciality_educ' + i),
            })
        }
        for (let i = 1; i <= countLanguage.length; i++) {
            data.dataLanguage.push({
                language: form_data.get('language' + i),
                level: form_data.get('level_lang' + i),
            })
        }

        resume.create_resume(data,props.user_id)

    };


    return (
        <div>
            <Dialog open={props.open}  maxWidth={'md'}  onClose={handleClose}>
                <DialogTitle sx={{textAlign:'center'}}>Создание резюме</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2} sx={{justifyContent:'flex-end'}}>
                            <Grid item xs={12} sm={4} >
                                <TextField
                                    required
                                    fullWidth
                                    id="surname"
                                    label="Фамилия"
                                    name="surname"
                                    autoFocus
                                    inputProps={{ maxLength: 50 }}
                                    value={props.user_data.surname}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Имя"
                                    inputProps={{ maxLength: 50 }}
                                    value={props.user_data.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="patronymic"
                                    label="Отчество"
                                    name="patronymic"
                                    inputProps={{ maxLength: 50 }}
                                    value={props.user_data.patronymic}
                                />
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
                                <TextField
                                    required
                                    fullWidth
                                    id="job_title"
                                    label="Желаемая должность"
                                    name="job_title"
                                    autoComplete="job_title"
                                    inputProps={{ maxLength: 50 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="salary"
                                    label="Желаемый доход (BYN)"
                                    name="salary"
                                    autoComplete="salary"
                                    type={"number"}
                                    inputProps={{ maxLength: 6 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <DialogContentText>
                                    Опыт работы:
                                </DialogContentText>
                            </Grid>


                            {countExperience.map(x => {
                                return (
                                    <Experience index={x}/>
                                )
                            })}
                            <Button

                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick={() => setCountExperiencen(countExperience.concat([countExperience.length + 1]))}
                            >
                                +
                            </Button>

                            <Grid item xs={12} sm={12}>
                                <DialogContentText>
                                    Образование:
                                </DialogContentText>
                            </Grid>
                            {countEducation.map(x => {
                                return (
                                    <Education index={x}/>
                                )
                            })}
                            <Button

                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick={() => setCountEducation(countEducation.concat([countEducation.length + 1]))}
                            >
                                +
                            </Button>


                            <Grid item xs={12} sm={12}>
                                <MultipleSelectChip values={enum_employment_type}
                                                    value={employmentType}
                                                    label={'Желаемый тип занятости'}
                                                    labelEn={'employment_type'}
                                                    setValue={setEmploymentType}/>
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
                                sx={{mt: 3, mb: 2}}
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
                                    label="О себе"
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


const Experience = (props: any) => {
    const [dateFrom, setDateFrom] = React.useState("");
    const [dateTo, setDateTo] = React.useState("");

    return (<>
        <Grid item xs={12} sm={2}>
            <TextField
                required
                value={dateFrom}
                onChange={(event)=>{setDateFrom(event.target.value)}}
                fullWidth
                InputProps={{
                    inputComponent: DateMaskCustom as any
                }}
                id={"date_from_exp" + props.index}
                label="С"
                name={"date_from_exp" + props.index}
                autoComplete={"date_from_exp" + props.index}
                variant={'outlined'}
            />

        </Grid>
        <Grid item xs={12} sm={2}>
            <TextField
                required
                value={dateTo}
                onChange={(event)=>{setDateTo(event.target.value)}}
                fullWidth
                InputProps={{
                    inputComponent: DateMaskCustom as any
                }}
                id={"date_to_exp" + props.index}
                label="По"
                name={"date_to_exp" + props.index}
                autoComplete={"date_to_exp" + props.index}
            />
        </Grid>
        <Grid item xs={12} sm={4}>
            <TextField
                required
                fullWidth
                id={"job_title_exp" + props.index}
                label="Должность"
                name={"job_title_exp" + props.index}
                autoComplete={"job_title_exp" + props.index}
                inputProps={{ maxLength: 50 }}
            />
        </Grid>
        <Grid item xs={12} sm={4}>
            <TextField
                required
                fullWidth
                id={"organization_exp" + props.index}
                label="Организация"
                name={"organization_exp" + props.index}
                autoComplete={"organization_exp" + props.index}
                inputProps={{ maxLength: 50 }}
            />
        </Grid>
    </>)
}
const Education = (props: any) => {
    const [type, setType] = React.useState('');
    return (<>
        <Grid item xs={12} sm={2}>
            <SelectOne values={enum_education_data_type}
                       value={type}
                       required
                       id={"type_educ" + props.index}
                       name={"type_educ" + props.index}
                       label={'Тип'}
                       labelEn={'type'}
                       setValue={setType}/>
        </Grid>
        <Grid item xs={12} sm={2}>
            <TextField
                required
                fullWidth
                id={"year_ending_educ" + props.index}
                label="Год окончания"
                name={"year_ending_educ" + props.index}
                autoComplete={"year_ending_educ" + props.index}
                inputProps={{ maxLength: 4 }}
            />
        </Grid>
        <Grid item xs={12} sm={4}>
            <TextField
                required
                fullWidth
                id={"organization_educ" + props.index}
                label="Учреждение"
                name={"organization_educ" + props.index}
                autoComplete={"organization_educ" + props.index}
                inputProps={{ maxLength: 50 }}
            />
        </Grid>
        <Grid item xs={12} sm={4}>
            <TextField
                required
                fullWidth
                id={"speciality_educ" + props.index}
                label="Специальность"
                name={"speciality_educ" + props.index}
                autoComplete={"speciality_educ" + props.index}
                inputProps={{ maxLength: 50 }}
            />
        </Grid>
    </>)
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