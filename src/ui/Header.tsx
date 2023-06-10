import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {Link} from "react-router-dom";
import {generic, resume, schedule, vacancy} from "../api/api";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {dateReturn, timeReturn} from "./common/lib";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
export const Header = (props: any) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    let menu: Array<{ label: string, link: string, request?: any }> = [{
        label: 'Соискателям',
        link: '/vacancies'
    }, {label: 'Работодателям', link: '/info'}]
    let user_menu: Array<{ label: string, link: string, func?: any }> = [{label: 'Вход | Регистрация', link: '/login'}]
    let logo = 'Найм'

    if (props.state.generic.auth_state === 'unlogged') {
        menu = [{
            label: 'Вакансии', link: '/vacancies', request: () => {
                vacancy.get_vacancy(100)
            }
        },
            {
                label: 'Кандидаты', link: '/candidates', request: () => {
                    resume.get_resume(100)
                }
            },
        ];
        user_menu = [{label: 'Вход | Регистрация', link: '/login'}];
    } else if (props.state.generic.auth_state === 'hr') {
        menu = [{
            label: 'Вакансии', link: '/vacancies', request: () => {
                vacancy.get_vacancy(100)
            }
        },
            {
                label: 'Кандидаты', link: '/candidates', request: () => {
                    resume.get_resume(100)
                }
            },
            {label: 'Видеочат', link: '/videochat'}];
        user_menu = [{label: 'Личный кабинет', link: '/personal_area'},
            {label: 'Выход', link: '/logout', func: logout}];
    } else if (props.state.generic.auth_state === 'candidate') {
        menu = [{
            label: 'Вакансии', link: '/vacancies', request: () => {
                vacancy.get_vacancy(100)
            }
        },
            {label: 'Избранное', link: '/favorites'},
            {label: 'Видеочат', link: '/videochat'}];
        user_menu = [{label: 'Личный кабинет', link: '/personal_area'},
            {label: 'Выход', link: '/logout', func: logout}];
    } else if (props.state.generic.auth_state === 'test') {
        menu = [{label: 'Главная', link: '/'},
            {
                label: 'Вакансии', link: '/vacancies', request: () => {
                    vacancy.get_vacancy(100)
                }
            },
            {
                label: 'Кандидаты', link: '/candidates', request: () => {
                    resume.get_resume(100)
                }
            },
            {label: 'Видеочат', link: '/videochat'}];
        user_menu = [{label: 'Вход | Регистрация', link: '/login'}];
    }

    function logout() {
        generic.logout(props.state.user.user_data.user_id)
    }
    function confirmSchedule(shedule_confirmation_id:number) {
        schedule.confirm_schedule(shedule_confirmation_id)
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <AppBar position="static"
                sx={{boxShadow: '0px 2px 20px 12px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <QueryStatsIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {logo}
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {menu.map((page, i) => (
                                <MenuItem key={i} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" onClick={() => {
                                        if ('request' in page) {
                                            page.request()
                                        }
                                    }}>
                                        <Link to={page.link}>{page.label}</Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {menu.map((page, i) => (
                            <Button
                                key={i}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                <Link to={page.link} onClick={() => {
                                    if ('request' in page) {
                                        page.request()
                                    }
                                }}>{page.label}</Link>
                            </Button>
                        ))}
                    </Box>


                    <Box sx={{flexGrow: 1}}/>
                    {props.state.generic.auth_state !== 'unlogged'
                        && <>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit" sx={{top: '2px'}}>
                                <Badge badgeContent={0} color="error">
                                    <Link to={'/chat'}><MailIcon/></Link>
                                </Badge>
                            </IconButton>

                            <PopupState variant="popover" popupId="demo-popup-popover">
                                {(popupState:any) => (
                                    <div>
                                        <IconButton
                                            size="large"
                                            aria-label="show 17 new notifications"
                                            color="inherit"
                                            {...bindTrigger(popupState)}
                                        >
                                            <Badge badgeContent={props.state.notification.count} color="error">
                                                <NotificationsIcon/>
                                            </Badge>

                                        </IconButton>
                                        <Popover
                                            {...bindPopover(popupState)}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <List sx={{ pt: 0 }}>
                                                {props.state.notification.arr.map((el:any, index:number) => (
                                                    <>
                                                        <ListItem disableGutters>
                                                        <div style={{padding:'8px 16px', display:'flex', flexWrap:'nowrap'}}  key={index}>
                                                            <ListItemAvatar sx={{cursor:'pointer'}} onClick={()=>confirmSchedule(el.shedule_confirmation_id)}>
                                                                <Avatar  sx={{ bgcolor: '#07bc0c'}}>
                                                                    <CheckIcon/>
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText  primary={'Подтвердить собеседование на '+dateReturn(el.date) + ' в ' + timeReturn(el.date)} />
                                                            <ListItemAvatar  sx={{display:'flex', justifyContent:'flex-end',cursor:'pointer'}}>
                                                                <Avatar  sx={{ bgcolor: '#e74c3c'}}>
                                                                    <CloseIcon/>
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                        </div>

                                                    </ListItem>
                                                        {index !== (props.state.notification.count-1) && <Divider />}
                                                    </>
                                                ))}
                                            </List>
                                        </Popover>
                                    </div>
                                )}
                            </PopupState>
                        </>}
                    <Box sx={{flexGrow: 0, display: 'flex'}}>
                        {user_menu.map((page, i) => (
                            <Button
                                key={i}
                                onClick={() => {

                                    page.func && page.func()
                                    handleCloseNavMenu()
                                }}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                <Link to={page.link}>{page.label}</Link>
                            </Button>
                        ))}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
