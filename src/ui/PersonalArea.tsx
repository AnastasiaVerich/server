import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {generic, vacancy} from "../api/api";
import TextField from "@mui/material/TextField";
import {toast} from "react-toastify";
import {Schedule} from "./personal_area/Schedule";
import {Vacancy} from "./personal_area/Vacancy";
import {Resume} from "./personal_area/Resume";
import {InterviewQuestions} from "./personal_area/InterviewQuestions";
import Container from "@mui/material/Container";

const drawerWidth = 240;

export const PersonalArea = (props: any) => {
    let menu: { label: string, link: string, request?: any }[] = [{label: '', link: ''}]
    let under_menu: { label: string, link: string, request?: any }[] = [{label: '', link: ''}]
    if (props.state.user.user_data.type === 'candidate') {
        menu = [{label: 'Резюме', link: '/personal_area/resume'}
            , {label: 'Календарь', link: '/personal_area/calendar'}]
        under_menu = [{label: 'Настройки', link: '/personal_area/setting'}]
    } else if (props.state.user.user_data.type === 'hr') {
        menu = [{label: 'Вакансии', link: '/personal_area/vacancy'}
            , {label: 'Интервью-вопросы', link: '/personal_area/interview-questions'}
            , {label: 'Календарь', link: '/personal_area/calendar'}]
        under_menu = [{label: 'Настройки', link: '/personal_area/setting'}]
    }
    const changePassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form_data = new FormData(event.currentTarget);
        const data = {
            old_password: form_data.get('old_password'),
            new_password: form_data.get('new_password'),
            repeat_new_password: form_data.get('repeat_new_password'),
        }
        if (data.new_password === data.repeat_new_password) {
            generic.update_password(props.state.user.user_data.user_id, data.old_password, data.new_password, '')
        } else {
            toast.info('Неверный повтор пароля');
        }
    };
    return (
        <Container maxWidth={false}
                   sx={{
                       height: 'calc(100vh - 68.5px)',
                       width: '100vw',
                       padding: '50px',
                       display: 'flex'
                   }}>
            <div style={{
                boxShadow: '0px 2px 20px 3px rgba(0,0,0,0.2)',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        height: '100%',
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            position: 'relative',
                            height: '100%'
                        },
                    }}
                >

                    <Box sx={{overflow: 'auto'}}>
                        <List>
                            {menu.map((element, index) => (
                                <Link to={element.link}>
                                    <ListItem key={element.label} disablePadding onClick={() => {
                                        if ('request' in element) {
                                            element.request()
                                        }
                                    }}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                            </ListItemIcon>
                                            <ListItemText primary={element.label} sx={{color: '#121212'}}/>
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                        <Divider/>
                        <List>
                            {under_menu.map((element, index) => (
                                <Link to={element.link}>
                                    <ListItem key={element.label} disablePadding onClick={() => {
                                        if ('request' in element) {
                                            element.request()
                                        }
                                    }}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                            </ListItemIcon>
                                            <ListItemText primary={element.label} sx={{color: '#121212'}}/>
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Box>
                </Drawer>
                {props.part === undefined
                    && <Box component="main"
                            sx={{flexGrow: 1, p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography paragraph sx={{textAlign: 'center'}}>
                            Выберите пункт личного кабинета.
                        </Typography>
                    </Box>}
                {props.part === 'setting' && <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Button
                        type="submit"

                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={() => {
                            generic.delete_user(props.state.user.user_data.user_id)
                        }}
                    >
                        Удалить аккаунт
                    </Button>

                    <Box component="form" onSubmit={changePassword} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="old_password"
                            label="Старый пароль"
                            name="old_password"
                            autoComplete="old_password"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="new_password"
                            label="Новый пароль"
                            type="password"
                            id="new_password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="repeat_new_password"
                            label="Повтор нового пароля"
                            type="password"
                            id="repeat_new_password"
                        />
                        <Button
                            type="submit"

                            variant="contained"
                            sx={{mt: 3, mb: 2}}

                        >
                            Сменить пароль
                        </Button>
                    </Box>


                </Box>}
                {props.part === 'resume'
                    && <Resume state={props.state}/>}
                {props.part === 'vacancy'
                    && <Vacancy state={props.state}/>}
                {props.part === 'interview-questions'
                    && <InterviewQuestions state={props.state} />}
                {props.part === 'calendar' && <Box component="main" sx={{flexGrow: 1, p: 3, height: '100%'}}>
                    <Schedule state={props.state}/>
                </Box>}
            </div>
        </Container>
    );
}