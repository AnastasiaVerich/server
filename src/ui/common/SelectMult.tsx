import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name: string, value: readonly string[], theme: Theme) {
    return {
        fontWeight:
            value.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export const  MultipleSelectChip=(props:any)=> {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof props.value>) => {
        const {
            target: { value },
        } = event;
        props.setValue(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ height: '100%', width: '100%' }}>
                <InputLabel id={props.label+"-label"}>{props.label}</InputLabel>
                <Select
                    labelId={props.label+"-label"}
                    id={"demo-"+props.label}
                    multiple
                    value={props.value}
                    onChange={handleChange}
                    input={<OutlinedInput id={"select-"+props.label} label={props.label} />}
                    renderValue={(selected:any) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value:any) => (
                                <Chip key={value} label={value.label} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {props.values.map((el:any) => (
                        <MenuItem
                            key={el.value}
                            value={el}
                            style={getStyles(el.value, props.value, theme)}
                        >
                            {el.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}