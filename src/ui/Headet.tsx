import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MoreIcon from "@mui/icons-material/MoreVert";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {Link} from "react-router-dom";
import {generic} from "../api/api";




export const Header = (props:any) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);



    let menu: Array<{label:string,link:string}> =[{label:'Соискателям',link:'/vacancies'},{label:'Работодателям',link:'/info'}]
    let user_menu: Array<{label:string,link:string,func?:any}>= [{label:'Вход | Регистрация',link:'/login'}]
    let logo = 'EasyWork'

    if (props.auth_state === 'unlogged') {
        menu = [{label:'Соискателям',link:'/vacancies'},{label:'Работодателям',link:'/info'}];
        user_menu = [{label:'Вход | Регистрация',link:'/login'}];
    } else if (props.auth_state === 'hr') {
        menu = [{label:'Вакансии',link:'/vacancies'}, {label:'Кандидаты',link:'/candidates'}, {label:'Видеочат',link:'/videochat'}];
        user_menu = [{label:'Личный кабинет',link:'/personal_area'}, {label:'Выход',link:'/logout', func:logout}];
    } else if (props.auth_state === 'candidate') {
        menu = [{label:'Вакансии',link:'/vacancies'}, {label:'Избранное',link:'/favorites'}, {label:'Видеочат',link:'/videochat'}];
        user_menu = [{label:'Личный кабинет',link:'/personal_area'}, {label:'Выход',link:'/logout', func:logout}];
    } else if (props.auth_state === 'test') {
        menu = [{label:'Главная',link:'/'},{label:'Вакансии',link:'/vacancies'},{label:'Кандидаты',link:'/candidates'},{label:'Видеочат',link:'/videochat'}];
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
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
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
                                <MenuItem key={i} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center"><Link to={page.link}>{page.label}</Link></Typography>
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
                                <Link to={page.link}>{page.label}</Link>
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
                    {props.auth_state === 'unlogged'
                        ? <Box sx={{flexGrow: 0}}>
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
                                    <Link to={page.link}>{page.label}</Link>
                                </Button>
                            ))}
                        </Box>
                        : <>
                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                    </IconButton>
                                </Tooltip>

                            </Box>
                            <Box sx={{display: {xs: 'flex', md: 'none'}}}>

                                <Tooltip title="Открыть меню">
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        <MoreIcon/>
                                    </IconButton>
                                </Tooltip>

                            </Box>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >


                                {user_menu.map((el,i) => (
                                    <MenuItem key={i} onClick={()=>{
                                        console.log(el)
                                        console.log(i)
                                        el.func && el.func()
                                        handleCloseNavMenu()
                                    }}>
                                        <Typography textAlign="center" ><Link to={el.link}>{el.label}</Link></Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}