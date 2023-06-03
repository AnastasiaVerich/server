import React from "react";
import Button from "@mui/material/Button";
import {CreateVacancy} from "../pop-up/create_vacancy";
import Box from "@mui/material/Box";
import {CreateResume} from "../pop-up/create_resume";

export const Resume = (props:any)=>{
    const [openCreateResume, setOpenCreateResume] = React.useState(false);
    const handleClickOpenCreateResume = () => {
        setOpenCreateResume(true);
    };
    return(
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                onClick={handleClickOpenCreateResume}
            >
                Создать резюме
            </Button>
            <CreateResume open={openCreateResume}
                          user_id={props.user_id}
                          user_data={props.user_data}
                          setOpen={setOpenCreateResume}/>

        </Box>
    )
}