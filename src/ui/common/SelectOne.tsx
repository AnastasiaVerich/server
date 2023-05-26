import  React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const  SelectOne=(props:any)=> {
    const handleChange = (event: SelectChangeEvent) => {
        props.setValue(event.target.value as string);
    };

    return (
        <Box >
            <FormControl fullWidth>
                <InputLabel id={props.id+'-label'}>{props.label}</InputLabel>
                <Select
                    labelId={props.id+'-label'}
                    value={props.value}
                    label={props.label}
                    onChange={handleChange}
                >
                    {props.values.map((el:any) => (
                        <MenuItem
                            key={el.value}
                            value={el}>
                            {el.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <input  hidden value={props.value.value} id={props.id} name={props.id}/>
        </Box>
    );
}