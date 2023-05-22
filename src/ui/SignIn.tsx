import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link as RouterLink} from "react-router-dom";
import {generic} from "../api/api";

const logo:string = 'EasyWork'
function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                {logo}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export const SignIn = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form_data = new FormData(event.currentTarget);
        const data ={
            login: form_data.get('login'),
            password: form_data.get('password'),
        }
        const remember = form_data.get('remember')
        console.log('z [pppp')
        generic.login(data,remember)
    };

    return (
        <ThemeProvider theme={theme}>
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
                               sx={{border: '1px solid rgba(0, 0, 0, 0.12)', margin:'0 0 0 auto'}}>
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
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Вход
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="login"
                                    label="Логин (Email или номер телефона)"
                                    name="login"
                                    autoComplete="login"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Пароль"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox value="remember"
                                              name="remember"
                                              id="remember"
                                              color="primary"/>}
                                    label="Запомнить меня"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Вход
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Забыли пароль
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Нет аккаунта? Зарегестрируйся."}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>

                    </Container>
                    <Container component="main"
                               maxWidth='xs'
                               sx={{border: '1px solid rgba(0, 0, 0, 0.12)',  margin:'0 auto 0 0 '}}>
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Регистрация
                            </Typography>
                            <Box component="form" noValidate sx={{mt: 1}}>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    <RouterLink to={'/registration'}>Соискатель</RouterLink>
                                </Button>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >

                                    <RouterLink to={'/registration/hr'}>Работодатель</RouterLink>
                                </Button>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"/>}
                                    label="Даю согласие на обработку персональных данных в соотвествии с политикой конфедициальности"
                                />
                            </Box>
                        </Box>

                    </Container>

            </Container>
            </Container>
        </ThemeProvider>
    );
}