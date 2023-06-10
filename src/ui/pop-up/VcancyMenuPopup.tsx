import * as React from 'react';
import {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import {vacancy} from "../../api/api";
import {Vacancy_form} from "../common/vacancy_form";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {CollapsibleTable} from "../Table_second2";
import store from "../../store/state";
import {enum_education_data_type, enum_employment_type} from "../common/enum";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    sx?:any
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index,sx,  ...other } = props;

    return (
        <div
            style={sx}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export const VacancyMenuPopup = (props: any) => {


    const [vacancyExperience, setVacancyExperience] = useState(props.data.experience)
    const [countLanguage, setCountLanguage] = useState([1])
    const [skills, setSkills] = React.useState<{value:string, label:string}[]>(props.data.skills.map((x:any)=>{return{value:x, label:x}}));
    const [employmentType, setEmploymentType] = React.useState<{value:string, label:string}[]>(props.data.employment_type.map((x:any)=>{return{value:x, label:enum_employment_type.find((y:any)=>y.value===x)?.label}}));
    const [educationLevel, setEducationLevel] = React.useState<{value:string, label:string}[]>(props.data.education_level.map((x:any)=>{return{value:x, label:enum_education_data_type.find((y:any)=>y.value===x)?.label}}));
    const [value, setValue] = React.useState(0);

    const question: any = props.state.interview_questions.find((x:any)=>x.interview_questions_id === props.data.interview_questions_id)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
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
            <Dialog open={props.open}  maxWidth={'md'}  onClose={handleClose} sx={{justifyContent:'flex-end', alignItems:'flex-end', paddingRight:'24px', paddingBottom:'50px'}}>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Информация" {...a11yProps(0)} />
                            <Tab label="Кандидаты" {...a11yProps(1)} />
                        </Tabs>
                        <div onClick={handleClose} style={{position:'absolute', top:'14px', right:'14px', cursor:"pointer"}}><CloseIcon/></div>
                    </Box>
                    <TabPanel value={value} index={0}>
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
                                      form_data={props.data}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}  sx={{height:'calc(100% - 50px)'}}>
                        <CollapsibleTable state={props.state} question={question} vacancy_data={props.data} handleClose={handleClose}/>
                    </TabPanel>

            </Dialog>
        </div>
    );
}

