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
        sx={{display: 'inline-block', mx: '2px', mr:'5px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

export const OneItemInterviewQuestion = (props: any) => {


    return (
        <Card sx={{minWidth: 200}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Тест-вопросы № {props.index + 1}
                </Typography>
                <Typography variant="h5" component="div" sx={{display:'flex'}}>
                    {bull} {props.data.label}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">

                </Typography>
                <div className='text_ellipsis_box'>
                    <Typography variant="body2" sx={{ margin: 0}}>
                        {props.data.note}
                    </Typography>
                </div>
                <div className='text_ellipsis_box'>
                    <Typography variant="body2" sx={{ margin: 0}}>
                        Количество вопросов: {props.data.quest.length}
                    </Typography>
                </div>
            </CardContent>
            <CardActions sx={{justifyContent:'space-between'}}>
                <Button size="small">Подробнее</Button>
            </CardActions>
        </Card>
    );
}