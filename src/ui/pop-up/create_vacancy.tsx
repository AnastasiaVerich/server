import * as React from 'react';
import {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {vacancy} from "../../api/api";
import {Vacancy_form} from "../common/vacancy_form";

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

        vacancy.create_vacancy(data,props.state.user.user_data.user_id)

    };


    return (
        <div>
            <Dialog open={props.open}  maxWidth={'md'}  onClose={handleClose}>
                <DialogTitle sx={{textAlign:'center'}}>Создание вакансии</DialogTitle>
                <DialogContent>
                    <Vacancy_form vacancyExperience={vacancyExperience}
                                  setVacancyExperience={setVacancyExperience}
                                  countLanguage={countLanguage}
                                  setCountLanguage={setCountLanguage}
                                  skills={skills}
                                  setSkills={setSkills}
                                  employmentType={employmentType}
                                  setEmploymentType={setEmploymentType}
                                  educationLevel={educationLevel}
                                  setEducationLevel={setEducationLevel}
                                  handleClose={handleClose}
                                  handleSubmit={handleSubmit}
                    />
                </DialogContent>

            </Dialog>
        </div>
    );
}

