import React from 'react';
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AlignItemsList from "./users";


export const Chat = () => {
    return (
        <Container maxWidth={false}
                   sx={{
                       height: 'calc(100vh - 68.5px)',
                       width: '100vw',
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center'
                   }}>
            <Paper sx={{width: '100%', height: '90%', mb: 2}}>
                <Grid container spacing={2} sx={{width: '100%', height: '90%', mb: 2}}>
                    <Grid item xs={12} sm={3}>
                        <Container maxWidth={false}
                                   sx={{
                                       height: '100%',
                                       width: '100%',
                                       display: 'flex',
                                       justifyContent: 'center',
                                       alignItems: 'flex-start',
                                       background: 'hsl(0deg 0% 98%)',
                                   }}>
                            <AlignItemsList/>
                        </Container>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Container maxWidth={false}
                                   sx={{
                                       height: '100%',
                                       width: '100%',
                                       display: 'flex',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       background: 'white',
                                   }}>

                        </Container>
                    </Grid>
                    <Grid item xs={12} sm={3}>
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
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

