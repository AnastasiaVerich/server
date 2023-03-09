import React from 'react';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import AlignItemsList, { AlignItemsList3} from "./users";
import {styled, alpha} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import PinnedSubheaderList from "./listsms";
import Drawer from '@mui/material/Drawer';
import Box from "@mui/material/Box";
import blue from "@mui/material/colors/blue";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

import MenuIcon from "@mui/icons-material/Menu";

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
                       padding:'0!important',
                       margin:'0!important'
                   }}>

            <Grid container sx={{width: '100%', height: '100%', mb: 2}}>
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
                                   paddingRight:'0!important',
                                   paddingLeft:'0!important',
                                   paddingTop:3,
                                   paddingBottom: 2
                               }}>
                        <TextField
                            sx={{margin: '0 16px 16px 16px', width: 'calc(100% - 32px)'}}
                            label="Поиск…"/>
                        <AlignItemsList/>
                    </Container>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Container maxWidth={false}
                               sx={{
                                   height: '100%',
                                   width: '100%',
                                   display: 'flex',
                                   background: 'white',
                                   flexDirection: 'column',
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                  // padding:'0!important',
                                   margin:'0!important',
                                   paddingRight:'0!important',
                                   paddingLeft:'0!important',
                                   paddingTop:3,
                                   paddingBottom: 2
                               }}>
                        <List sx={{width: '100%', bgcolor: 'background.paper', display: {xs: 'none', md: 'flex'}, padding: 0}}>
                            <AlignItemsList3/>
                        </List>

                        <List sx={{width: '100%', bgcolor: 'background.paper', display: {xs: 'flex', md: 'none', alignItems: 'center'}}}>
                            <Container sx={{display: {xs: 'flex', md: 'none'}, width: 'auto'}}>
                                <Avatar sx={{ bgcolor: blue[700] }}>
                                    <MenuIcon onClick={toggleDrawer('left', true)}/>
                                </Avatar>
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

                                        <TextField
                                            sx={{margin: '16px', width: 'calc(100% - 32px)'}}
                                            label="Поиск…"/>
                                        <AlignItemsList/>
                                    </Container>
                                </Drawer>

                            </Container>
                            <AlignItemsList3/>
                        </List>
                        <Divider  variant="middle" sx={{width:'calc(100% - 40px)', margin: '0 0 24px 0'}}/>
                        <PinnedSubheaderList/>
                        <Divider  variant="middle" sx={{width:'calc(100% - 40px)', margin: '24px 0'}}/>
                        <Box sx={{display: 'flex', width: '100%', alignItems: 'flex-end', padding: '0 20px'}}>

                            <TextField
                                fullWidth
                                id="outlined-multiline-flexible"
                                label="Введите сообщение"
                                multiline
                                maxRows={4}
                            />
                            <Avatar sx={{ bgcolor: blue[700], paddingLeft: '3px', marginLeft: '20px' }}>
                                <SendIcon/>
                            </Avatar>

                        </Box>
                    </Container>
                </Grid>

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