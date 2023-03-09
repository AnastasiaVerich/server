import React from 'react';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import AlignItemsList, {AlignItemsList2, AlignItemsList3} from "./users";
import SearchIcon from '@mui/icons-material/Search';
import {styled, alpha} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import PinnedSubheaderList from "./listsms";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import blue from "@mui/material/colors/blue";

type chatType = {
    user_id_1: string
    user_id_2: string
    chat: {
        user_id: string,
        date: Date
        text: string
        read: 1 | 0
    }[]
}
type usersChatsType = {
    user_id: string
    chats: {
        user_id: string,
        last_user_id: string,
        date: Date
        last_text: string
        read: 1 | 0
    }[]
}[]

let chatData: chatType = {
    user_id_1: 'MAIN',
    user_id_2: '1',
    chat: [{
        user_id: 'MAIN',
        date: new Date('2023-02-07'),
        text: 'Hello',
        read: 1
    }, {
        user_id: '1',
        date: new Date('2023-02-07'),
        text: 'ksdcs dcdskc cdskc sdcsdjck dskc sdc jskd j jc dsjkc sdkc sdjkc sdc sdjc ksdc',
        read: 1
    }
        , {
            user_id: 'MAIN',
            date: new Date('2023-02-08'),
            text: 'Ok',
            read: 0
        }]
}
let usersChats: usersChatsType = [{
    user_id: 'MAIN',
    chats: [{
        user_id: '1',
        last_user_id: 'MAIN',
        date: new Date('2023-02-08'),
        last_text: 'Ok',
        read: 0
    }, {
        user_id: '2',
        last_user_id: '2',
        date: new Date('2023-03-06'),
        last_text: 'Ok',
        read: 1
    },]
}]

export const Chat = () => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: string, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({...state, [anchor]: open});
            };

    return (
        <Container maxWidth={false}
                   sx={{
                       height: 'calc(100vh - 68.5px)',
                       width: '100vw',
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       border: '2px solid',
                   }}>

            <Grid container spacing={2} sx={{width: '100%', height: '90%', mb: 2}}>
                <Grid item sx={{display: {xs: 'none', md: 'flex'}}} xs={0} md={3}>
                    <Container maxWidth={false}
                               sx={{
                                   height: '100%',
                                   width: '100%',
                                   display: 'flex',
                                   justifyContent: 'center',
                                   alignItems: 'flex-start',
                                   flexDirection: 'column',
                                   background: 'hsl(0deg 0% 98%)',
                               }}>
                        <AlignItemsList2/>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{'aria-label': 'search'}}
                            />
                        </Search>
                        <AlignItemsList/>
                    </Container>
                </Grid>
                <Container sx={{display: {xs: 'flex', md: 'none'}, position: 'absolute'}}>
                    <Button onClick={toggleDrawer('left', true)}>{'left'}</Button>
                    <Drawer
                        anchor={'left'}
                        open={state['left']}
                        onClose={toggleDrawer('left', false)}
                    >
                        <Container maxWidth={false}
                                   sx={{
                                       height: '100%',
                                       width: '100%',
                                       display: 'flex',
                                       justifyContent: 'center',
                                       alignItems: 'flex-start',
                                       flexDirection: 'column',
                                       background: 'hsl(0deg 0% 98%)',
                                   }}>
                            <AlignItemsList2/>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{'aria-label': 'search'}}
                                />
                            </Search>
                            <AlignItemsList/>
                        </Container>
                    </Drawer>

                </Container>
                <Grid item xs={12} md={9}>
                    <Container maxWidth={false}
                               sx={{
                                   height: '100%',
                                   width: '100%',
                                   display: 'flex',
                                   flexDirection: 'column',
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   background: 'white',
                               }}>
                        <AlignItemsList3/>
                        <PinnedSubheaderList/>
                        <Box sx={{display: 'flex', width: '100%', alignItems: 'flex-end', padding: '0 20px'}}>
                            <TextField
                                fullWidth
                                id="outlined-multiline-flexible"
                                label="Введите сообщение"
                                multiline
                                maxRows={4}
                            />
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '56px',
                                height: '56px',
                                borderRadius: '50%',
                                paddingLeft: '5px',
                                color: 'white',
                                background: blue[700],
                                marginLeft: '5px'
                            }}>
                                <SendIcon/>
                            </div>
                        </Box>
                    </Container>
                </Grid>
                {/*<Grid item xs={12} sm={0}>
                        <Container maxWidth={false}
                                   sx={{
                                       height: '100%',
                                       width: '100%',
                                       display: 'flex',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       background: 'hsl(0deg 0% 98%)',
                                   }}>

                        </Container>
                    </Grid>*/}
            </Grid>

        </Container>
    )
}

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));