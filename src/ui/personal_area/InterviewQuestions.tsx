import React from "react";
import Button from "@mui/material/Button";
import {CreateVacancy} from "../pop-up/create_vacancy";
import Box from "@mui/material/Box";
import {CreateInterviewQuestions} from "../pop-up/create_interview_questions";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";

export const InterviewQuestions = (props:any)=>{
    const [openCreateInterviewQuestions, setOpenCreateInterviewQuestions] = React.useState(false);    const handleClickOpenCreateInterviewQuestions = () => {
        setOpenCreateInterviewQuestions(true);
    }
    return(
        <Box component="main" sx={{flexGrow: 1, p: 3}}>

            <CreateInterviewQuestions open={openCreateInterviewQuestions}
                                      user_id={props.user_id}
                                      user_data={props.user_data}
                                      setOpen={setOpenCreateInterviewQuestions}/>
            <div style={{display:"grid", gridTemplateColumns:'repeat(auto-fill, minmax(275px, 1fr))', gridGap:'2vw'}}>
                <Card sx={{minWidth: 275, minHeight:275, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}} onClick={handleClickOpenCreateInterviewQuestions}>
                    <AddIcon sx={{width:'200px', height:'60px'}}/>
                </Card>
                {[].map((x:any, index:number)=>{
                    return <>
                        <></>
                    </>

                })}
            </div>

        </Box>
    )
}