import React from "react";
import Button from "@mui/material/Button";
import {CreateVacancy} from "../pop-up/create_vacancy";
import Box from "@mui/material/Box";
import {OneItemVacancy} from "./One_item_vacancy";
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import AddIcon from '@mui/icons-material/Add';
export const Vacancy = (props:any)=>{
    const [openCreateVacancy, setOpenCreateVacancy] = React.useState(false);
    const handleClickOpenCreateVacancy = () => {
        setOpenCreateVacancy(true);
    };
    console.log(props.user_vacancy)
    return(
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
            <CreateVacancy open={openCreateVacancy}
                           user_id={props.user_id}
                           user_data={props.user_data}
                           setOpen={setOpenCreateVacancy}/>
            <Box >
                <div style={{display:"grid", gridTemplateColumns:'repeat(auto-fill, minmax(275px, 1fr))', gridGap:'2vw'}}>
                    <Card sx={{minWidth: 275, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}} onClick={handleClickOpenCreateVacancy}>
                        <AddIcon sx={{width:'200px', height:'60px'}}/>
                    </Card>
                    {props.user_vacancy.map((x:any, index:number)=>{
                            return <>
                                <OneItemVacancy data={x}/>
                                </>

                    })}
                </div>
            </Box>


        </Box>
    )
}