import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {MultipleSelectChip} from "./SelectMult";
import {vacancy} from "../../api/api";
import DialogContentText from "@mui/material/DialogContentText";
import {
    enum_education_data_type,
    enum_employment_type,
    enum_languages_data_level,
    enum_vacancy_experience
} from "./enum";
import {SelectOne} from "./SelectOne";
import {skills_select} from "./select_data";

export const Vacancy_form = (props: any) => {
console.log(props.form_data)
    return (
        <Box component="form" noValidate onSubmit={props.handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2} sx={{justifyContent:'flex-end'}}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        fullWidth
                        id="label"
                        label="Название вакансии"
                        name="label"
                        defaultValue={'form_data'in props
                            ?props.form_data.label
                            :''}
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
                        defaultValue={'form_data'in props
                            ?props.form_data.job_title
                            :''}
                        autoFocus
                        inputProps={{ maxLength: 50 }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <SelectOne values={enum_vacancy_experience}
                               value={props.vacancyExperience}
                               required
                               id={"experience"}
                               name={"experience"}
                               label={'Опыт'}
                               labelEn={'Опыт'}
                               setValue={props.setVacancyExperience}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        fullWidth
                        id="city"
                        label="Город проживания"
                        name="city"
                        defaultValue={'form_data'in props
                            ?props.form_data.city
                            :''}
                        autoComplete="city"
                        inputProps={{ maxLength: 50 }}
                    />
                </Grid>


                <Grid item xs={12} sm={4}>
                    <MultipleSelectChip values={enum_employment_type}
                                        value={props.employmentType}
                                        label={'Тип занятости'}
                                        labelEn={'employment_type'}
                                        setValue={props.setEmploymentType}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        fullWidth
                        id="salary"
                        label="Доход (BYN)"
                        name="salary"
                        autoComplete="salary"
                        defaultValue={'form_data'in props
                            ?props.form_data.salary
                            :''}
                        type={"number"}
                        inputProps={{ maxLength: 6 }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <MultipleSelectChip values={enum_education_data_type}
                                        value={props.educationLevel}
                                        label={'Уровень образования'}
                                        labelEn={'education_level'}
                                        setValue={props.setEducationLevel}/>
                </Grid>





                <Grid item xs={12} sm={12}>
                    <DialogContentText>
                        Владение языками:
                    </DialogContentText>
                </Grid>
                {props.countLanguage.map((x:any) => {
                    return (
                        <Language index={x} form_data={props.form_data}/>
                    )
                })}
                <Button

                    variant="contained"
                    sx={{mt: 3, mb: 2, ml:'15px'}}
                    onClick={() => props.setCountLanguage(props.countLanguage.concat([props.countLanguage.length + 1]))}
                >
                    +
                </Button>

                <Grid item xs={12} sm={12}>
                    <MultipleSelectChip values={skills_select}
                                        value={props.skills}
                                        label={'Навыки'}
                                        labelEn={'skills'}
                                        setValue={props.setSkills}/>
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
                        defaultValue={'form_data'in props
                            ?props.form_data.note
                            :''}
                        inputProps={{ maxLength: 255 }}
                    />
                </Grid>


            </Grid>



            <Button onClick={props.handleClose} sx={{mt: 3, mb: 2}}>Отмена</Button>
            <Button
                type="submit"
                variant="contained"
                sx={{mt: 3, mb: 2, float:'right'}}
            >
                Сохранить
            </Button>
        </Box>
    );
}

const Language = (props: any) => {
    const [level, setLevel] = React.useState(props.form_data !==undefined
        ?props.form_data.language[0].level
        :'');
    return (<>
        <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                defaultValue={ props.form_data !==undefined
                    ?props.form_data.language[0].language
                    :''}
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