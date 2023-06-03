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

const drawerWidth = 240;

export const PersonalArea = (props: any) => {
    let menu: { label: string, link: string,request?:any }[] = [{label: '', link: ''}]
    let under_menu: { label: string, link: string,request?:any }[] = [{label: '', link: ''}]
    if (props.type === 'candidate') {
        menu = [{label: 'Резюме', link: '/personal_area/resume'}
            , {label: 'Календарь', link: '/personal_area/calendar'}]
        under_menu = [{label: 'Настройки', link: '/personal_area/setting'}]
    } else if (props.type === 'hr') {
        menu = [{label: 'Вакансии', link: '/personal_area/vacancy', request:()=>{vacancy.get_user_vacancy()}}
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
            generic.update_password(props.user_id, data.old_password, data.new_password, '')
        } else {
            toast.info('Неверный повтор пароля');
        }
    };
    return (
        <Box sx={{display: 'flex'}}>


            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        position: 'relative',
                        height: 'calc(100vh - 68.5px)'
                    },
                }}
            >

                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {menu.map((element, index) => (
                            <Link to={element.link}>
                                <ListItem key={element.label} disablePadding   onClick={()=>{
                                    if('request' in element){
                                        element.request()
                                    }
                                }}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                        </ListItemIcon>
                                        <ListItemText primary={element.label}/>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    <Divider/>
                    <List>
                        {under_menu.map((element, index) => (
                            <Link to={element.link}>
                                <ListItem key={element.label} disablePadding   onClick={()=>{
                                    if('request' in element){
                                        element.request()
                                    }
                                }}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                        </ListItemIcon>
                                        <ListItemText primary={element.label}/>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Box>
            </Drawer>
            {props.part === undefined && <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </Box>}
            {props.part === 'setting' && <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    onClick={() => {
                        generic.delete_user(props.user_id)
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
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}

                    >
                        Сменить пароль
                    </Button>
                </Box>


            </Box>}
            {props.part === 'resume'
                && <Resume user_id={props.user_id}
                           user_data={props.user_data}/>}
            {props.part === 'vacancy'
                && <Vacancy user_id={props.user_id}
                            vacancy={props.vacancy}
                            user_data={props.user_data}/>}
            {props.part === 'interview-questions'
                && <InterviewQuestions user_id={props.user_id}
                                       user_data={props.user_data}/>}
            {props.part === 'calendar' && <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Schedule/>
            </Box>}
        </Box>
    );
}