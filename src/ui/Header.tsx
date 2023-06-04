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
import AdbIcon from '@mui/icons-material/Adb';
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {Link} from "react-router-dom";
import {generic, resume, vacancy} from "../api/api";
import QueryStatsIcon from '@mui/icons-material/QueryStats';

export const Header = (props:any) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);



    let menu: Array<{label:string,link:string, request?:any}> =[{label:'Соискателям',link:'/vacancies'},{label:'Работодателям',link:'/info'}]
    let user_menu: Array<{label:string,link:string,func?:any}>= [{label:'Вход | Регистрация',link:'/login'}]
    let logo = 'Найм'

    if (props.auth_state === 'unlogged') {
        menu = [{label:'Вакансии',link:'/vacancies', request:()=>{vacancy.get_vacancy(100)}},
            {label:'Кандидаты',link:'/candidates', request:()=>{resume.get_resume(100)}},
        ];
        user_menu = [{label:'Вход | Регистрация',link:'/login'}];
    } else if (props.auth_state === 'hr') {
        menu = [{label:'Вакансии',link:'/vacancies', request:()=>{vacancy.get_vacancy(100)}},
            {label:'Кандидаты',link:'/candidates', request:()=>{resume.get_resume(100)}},
            {label:'Видеочат',link:'/videochat'}];
        user_menu = [{label:'Личный кабинет',link:'/personal_area'},
            {label:'Выход',link:'/logout', func:logout}];
    } else if (props.auth_state === 'candidate') {
        menu = [{label:'Вакансии',link:'/vacancies', request:()=>{vacancy.get_vacancy(100)}},
            {label:'Избранное',link:'/favorites'},
            {label:'Видеочат',link:'/videochat'}];
        user_menu = [{label:'Личный кабинет',link:'/personal_area'},
            {label:'Выход',link:'/logout', func:logout}];
    } else if (props.auth_state === 'test') {
        menu = [{label:'Главная',link:'/'},
            {label:'Вакансии',link:'/vacancies', request:()=>{vacancy.get_vacancy(100)}},
            {label:'Кандидаты',link:'/candidates', request:()=>{resume.get_resume(100)}},
            {label:'Видеочат',link:'/videochat'}];
        user_menu = [{label:'Вход | Регистрация',link:'/login'}];
    }

    function logout(){
        generic.logout(props.user_id)
    }
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    /*<nav>
        <Link to="/">Home</Link>
        <Link to="/foo">Foo</Link>
        <Link to="/bar">Bar</Link>
    </nav>*/
    return (
        <AppBar position="static" sx={{boxShadow:'0px 2px 20px 12px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'}}>
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
                            {menu.map((page,i) => (
                                <MenuItem key={i} onClick={handleCloseNavMenu} >
                                    <Typography textAlign="center"  onClick={()=>{
                                        if('request' in page){
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
                        {menu.map((page,i) => (
                            <Button
                                key={i}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                <Link to={page.link} onClick={()=>{
                                    if('request' in page){
                                        page.request()
                                    }
                                }}>{page.label}</Link>
                            </Button>
                        ))}
                    </Box>


                    <Box sx={{flexGrow: 1}}/>
                    {props.auth_state !== 'unlogged'
                        && <>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <Link to={'/chat'}><MailIcon/></Link>
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                        </>}
                     <Box sx={{flexGrow: 0, display:'flex'}}>
                            {user_menu.map((page,i) => (
                                <Button
                                    key={i}
                                    onClick={()=>{
                                        console.log(1)
                                        page.func && page.func()
                                        handleCloseNavMenu()
                                    }}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    <Link to={page.link} >{page.label}</Link>
                                </Button>
                            ))}
                        </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}