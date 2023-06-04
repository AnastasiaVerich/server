import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {socket} from '../../socket';
import {useHistory} from 'react-router';
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import {Link as RouterLink} from "react-router-dom";
import {SendCodeInMail} from "../pop-up/send_code_in_mail";

const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);
const theme = createTheme();
export default function Main() {
    const history = useHistory();
    const [rooms, updateRooms] = useState([]);
    const rootNode = useRef();
    const cancel_event = () => {

    };
    useEffect(() => {
        socket.on('ShareExistingVideochat', ({rooms = []} = {}) => {
            if (rootNode.current) {
                updateRooms(rooms);
            }
        });
    }, []);

    /*   <ul>
            {rooms.map(roomID => (
              <li key={roomID}>
                {roomID}
                <button onClick={() => {
                  history.push(`/room/${roomID}`);
                }}>Присоеденится к собеседованию</button>
              </li>
            ))}
          </ul>

          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              onClick={() => {
                history.push(`/room/videochat_id__2023-06-04_15-30_20_id-5`);
              }}
          >
            Начать собеседование
          </Button>*/
    return (  // @ts-ignore
        <ThemeProvider theme={theme} ref={rootNode}>
            <Container maxWidth={false}
                       sx={{
                           minHeight: 'calc(100vh - 68.5px)',
                           width: '100vw',
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center'
                       }}>
                <Container maxWidth={false}
                           sx={{
                               width: '100vw',
                               display: 'flex',
                               justifyContent: 'center',
                               alignItems: 'center'
                           }}>
                    <Container component="main"
                               maxWidth='xs'
                               sx={{boxShadow: '0px 2px 20px 3px rgba(0,0,0,0.2)', margin: '0 0 0 0', padding:'10px !important'}}>
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                <CameraAltIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Собеседование
                            </Typography>
                            <Box sx={{mt: '24px', width: '80%'}}>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    <b>Дата:</b> 04.06.2023 14:00
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    <b>Вакансия:</b> Поиск рекрутера на замен
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    <b>Кандидат:</b> Волков Денис
                                </Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    onClick={() => {
                                        history.push(`/room/videochat_id__2023-06-04_15-30_20_id-5`);
                                    }}
                                >
                                    Начать собеседование
                                </Button>
                                <Grid container>
                                    <Grid item xs onClick={cancel_event} sx={{textAlign:'end'}}>
                                        Отменить собеседование
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>

                    </Container>
                </Container>
            </Container>
        </ThemeProvider>
    );
}