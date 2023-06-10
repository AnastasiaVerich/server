import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

export const OneItemResume = (props: any) => {


    return (
        <Card sx={{minWidth: 275, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Активное
                </Typography>
                <Typography variant="h5" component="div">
                    {bull} {props.data.job_title} {bull}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {props.data.salary} бел. руб.
                </Typography>
                <div className='text_ellipsis_box'>
                    <Typography variant="body2" sx={{ margin: 0}}>
                        {props.data.note}
                    </Typography>
                </div>
            </CardContent>
            <CardActions sx={{justifyContent:'space-between'}}>
                <Button size="small">Подробнее</Button>
                <Button size="small">Добавить вопросы</Button>
            </CardActions>
        </Card>
    );
}