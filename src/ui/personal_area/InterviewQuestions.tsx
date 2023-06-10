import React from "react";
import Button from "@mui/material/Button";
import {CreateVacancy} from "../pop-up/create_vacancy";
import Box from "@mui/material/Box";
import {CreateInterviewQuestions} from "../pop-up/create_interview_questions";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import {OneItemVacancy} from "./One_item_vacancy";
import {OneItemInterviewQuestion} from "./One_item_interview_question";

export const InterviewQuestions = (props:any)=>{
    const [openCreateInterviewQuestions, setOpenCreateInterviewQuestions] = React.useState(false);    const handleClickOpenCreateInterviewQuestions = () => {
        setOpenCreateInterviewQuestions(true);
    }
    return(
        <Box component="main" sx={{flexGrow: 1, p: 3}}>

            <CreateInterviewQuestions open={openCreateInterviewQuestions}
                                      state={props.state}
                                      setOpen={setOpenCreateInterviewQuestions}/>
            <div style={{display:"grid", gridTemplateColumns:'repeat(auto-fill, minmax(275px, 1fr))', gridGap:'2vw'}}>
                <Card sx={{minWidth: 200, minHeight:200, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}} onClick={handleClickOpenCreateInterviewQuestions}>
                    <AddIcon sx={{width:'200px', height:'60px'}}/>
                </Card>
                {props.state.interview_questions.filter((x:any)=>x.owner_id === props.state.user.user_data.user_id).map((x:any, index:number)=>{
                    return <>
                        <OneItemInterviewQuestion data={x} index={index}/>
                    </>

                })}
            </div>

        </Box>
    )
}