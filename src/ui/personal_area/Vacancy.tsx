import React from "react";
import Button from "@mui/material/Button";
import {CreateVacancy} from "../pop-up/create_vacancy";
import Box from "@mui/material/Box";
import {OneItemVacancy} from "./One_item_vacancy";
import Grid from '@mui/material/Grid';
export const Vacancy = (props:any)=>{
    const [openCreateVacancy, setOpenCreateVacancy] = React.useState(false);
    const handleClickOpenCreateVacancy = () => {
        setOpenCreateVacancy(true);
    };
    console.log(props.vacancy)
    return(
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                onClick={handleClickOpenCreateVacancy}
            >
                Создать Вакансию
            </Button>
            <CreateVacancy open={openCreateVacancy}
                           user_id={props.user_id}
                           user_data={props.user_data}
                           setOpen={setOpenCreateVacancy}/>
            <Box >
                <div style={{display:"grid", gridTemplateColumns:'repeat(auto-fill, minmax(275px, 1fr))', gridGap:'2vw'}}>
                    {props.vacancy.map((x:any, index:number)=>{
                            return <>
                                <OneItemVacancy data={x}/>
                                </>

                    })}
                </div>
            </Box>


        </Box>
    )
}