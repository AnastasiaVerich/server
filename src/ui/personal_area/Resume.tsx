import React from "react";
import Button from "@mui/material/Button";
import {CreateVacancy} from "../pop-up/create_vacancy";
import Box from "@mui/material/Box";
import {CreateResume} from "../pop-up/create_resume";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import {OneItemVacancy} from "./One_item_vacancy";
import {OneItemResume} from "./One_item_resume";

export const Resume = (props:any)=>{
    const [openCreateResume, setOpenCreateResume] = React.useState(false);
    const handleClickOpenCreateResume = () => {
        setOpenCreateResume(true);
    };
    return(
        <Box component="main" sx={{flexGrow: 1, p: 3}}>

            <CreateResume open={openCreateResume}
                          state={props.state}
                          setOpen={setOpenCreateResume}/>
            <div style={{display:"grid", gridTemplateColumns:'repeat(auto-fill, minmax(275px, 1fr))', gridGap:'2vw'}}>
                <Card sx={{minWidth: 275, minHeight:275, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}} onClick={handleClickOpenCreateResume}>
                    <AddIcon sx={{width:'200px', height:'60px'}}/>
                </Card>
                {props.state.resume.filter((x:any)=>x.user_id === props.state.user.user_data.user_id).map((x:any, index:number)=>{
                    return <>
                        <OneItemResume data={x}/>
                    </>

                })}
            </div>

        </Box>
    )
}