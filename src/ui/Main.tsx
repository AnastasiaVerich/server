import * as React from 'react';
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from '@mui/material/Grid';
import {CustomizedSteppers} from "./steps";


const tarif = [
    {
        label: "Тариф 'Белый'",
        price: 50,
        items: ['В этом тарифе доступно много чего, например вот это и это', 'В этом тарифе доступно много чего, например вот это и это', 'В этом тарифе доступно много чего, например вот это и это']
    },
    {
        label: "Тариф 'Железный'",
        price: 50,
        items: ['В этом тарифе доступно много чего, например вот это и это', 'В этом тарифе доступно много чего, например вот это и это', 'В этом тарифе доступно много чего, например вот это и это']
    },
    {
        label: "Тариф 'Серебрянный'",
        price: 50,
        items: ['В этом тарифе доступно много чего, например вот это и это', 'В этом тарифе доступно много чего, например вот это и это', 'В этом тарифе доступно много чего, например вот это и это']
    },
    {
        label: "Тариф 'Золотой'",
        price: 50,
        items: ['В этом тарифе доступно много чего, например вот это и это', 'В этом тарифе доступно много чего, например вот это и это', 'В этом тарифе доступно много чего, например вот это и это']
    },
    {
        label: "Тариф 'Премиум'",
        price: 50,
        items: ['В этом тарифе доступно много чего, например вот это и это', 'В этом тарифе доступно много чего, например вот это и это', 'В этом тарифе доступно много чего, например вот это и это']
    },
    {
        label: "Тариф 'Алмазный'",
        price: 50,
        items: ['В этом тарифе доступно много чего, например вот это и это', 'В этом тарифе доступно много чего, например вот это и это', 'В этом тарифе доступно много чего, например вот это и это']
    },
]

export const Main = (props: any) => {

    return (
        <Container maxWidth={false}
                   sx={{
                       height: 'calc(100vh - 68.5px)',
                       width: '100vw',
                       padding: '50px',

                   }}>
            <div style={{
                boxShadow: '0px 2px 20px 3px rgba(0,0,0,0.2)',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{width: '75%', height: '100%'}}>
                    <Grid container sx={{width: '100%', height: '55%', borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}>
                        <Grid item xs sx={{display:'flex', alignItems:'center', padding:'20px'}}>

                                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
                                Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                                 Sed malesuada lobortis pretium.`}

                        </Grid>
                        <Divider orientation="vertical" flexItem>
                            Преимущества
                        </Divider>
                        <Grid item xs sx={{display:'flex', alignItems:'center', padding:'20px'}}>

                                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
                                 Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                                 Sed malesuada lobortis pretium.`}

                        </Grid>
                        </Grid>

                    <div style={{width: '100%', height: '45%', display:'flex', alignItems:'center'}}>
                        <CustomizedSteppers/>
                    </div>
                </div>
                <div style={{
                    width: '25%',
                    height: '100%',
                    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                    overflow: "auto"
                }}>
                    <List sx={{width: "100%", bgcolor: "background.paper"}}>
                        {tarif.map((x: any, i:number) => {

                            return (
                                <>
                                    <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={`${x.label}  —  ${x.price} бел.р.`}
                                        secondary={
                                            x.items.map((y: any) => {
                                                return (
                                                    <React.Fragment>
                                                        {` — ${y}`}<br/>
                                                    </React.Fragment>
                                                )
                                            })

                                        }
                                    />
                                </ListItem>
                                    {i!==tarif.length-1 && <Divider />}
                                </>
                            )
                        })}
                    </List>
                </div>
            </div>
        </Container>
    );
}