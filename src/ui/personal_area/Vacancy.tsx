import React from "react";
import {CreateVacancy} from "../pop-up/create_vacancy";
import Box from "@mui/material/Box";
import {OneItemVacancy} from "./One_item_vacancy";
import Card from "@mui/material/Card";
import AddIcon from '@mui/icons-material/Add';

export const Vacancy = (props:any)=>{
    const [openCreateVacancy, setOpenCreateVacancy] = React.useState(false);
    const handleClickOpenCreateVacancy = () => {
        setOpenCreateVacancy(true);
    };

    return(
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
            <CreateVacancy open={openCreateVacancy}
                           state={props.state}
                           setOpen={setOpenCreateVacancy}/>

            <Box >
                <div style={{display:"grid", gridTemplateColumns:'repeat(auto-fill, minmax(275px, 1fr))', gridGap:'2vw'}}>
                    <Card sx={{minWidth: 275, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}} onClick={handleClickOpenCreateVacancy}>
                        <AddIcon sx={{width:'200px', height:'60px'}}/>
                    </Card>
                    {props.state.vacancy.filter((x:any)=>x.owner_id === props.state.user.user_data.user_id).map((x:any, index:number)=>{
                            return <>
                                <OneItemVacancy data={x} state={props.state}/>
                                </>

                    })}
                </div>
            </Box>


        </Box>
    )
}