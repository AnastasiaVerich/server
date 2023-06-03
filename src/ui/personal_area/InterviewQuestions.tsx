import React from "react";
import Button from "@mui/material/Button";
import {CreateVacancy} from "../pop-up/create_vacancy";
import Box from "@mui/material/Box";
import {CreateInterviewQuestions} from "../pop-up/create_interview_questions";

export const InterviewQuestions = (props:any)=>{
    const [openCreateInterviewQuestions, setOpenCreateInterviewQuestions] = React.useState(false);    const handleClickOpenCreateInterviewQuestions = () => {
        setOpenCreateInterviewQuestions(true);
    }
    return(
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                onClick={handleClickOpenCreateInterviewQuestions}
            >
                Создать интервью-вопросы
            </Button>
            <CreateInterviewQuestions open={openCreateInterviewQuestions}
                                      user_id={props.user_id}
                                      user_data={props.user_data}
                                      setOpen={setOpenCreateInterviewQuestions}/>

        </Box>
    )
}