import React, {useState} from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {TextField} from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";


export const InteractiveList = (props: any) => {
    const [newValue, setNewValue] = useState('')
    return (
        <>
            <List sx={{padding:0}} id={props.id}>
                {props.selectValues.map((x: { value: string, label: string }, i: number) => {
                    return (
                        <ListItem
                            sx={{background:'#ebebeb',
                                padding:'5px 48px 5px 16px !important',
                                marginBottom:'8px',
                                borderRadius: '5px' }}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon onClick={() => {
                                        props.setSelectValues(props.selectValues.filter((e: any, ind: number) => ind !== i))
                                    }}/>
                                </IconButton>
                            }
                        >
                            <ListItemText primary={x.label}
                                          primaryTypographyProps={{
                                              style: {
                                                  whiteSpace: "normal",
                                                  wordWrap: 'break-word',

                                              }
                                          }}/>
                        </ListItem>
                    );
                })}
                <ListItem
                    sx={{padding:0}}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <AddIcon onClick={() => {
                                if (newValue.length > 0) {
                                    props.setSelectValues(props.selectValues.concat([{
                                        value: newValue,
                                        label: newValue
                                    }]))
                                    setNewValue('')
                                }
                            }}/>
                        </IconButton>
                    }
                >
                    <TextField fullWidth
                               inputProps={{style:{paddingRight:'48px'}}}
                               sx={{}}
                               value={newValue}
                               multiline
                               placeholder={props.label}
                               onChange={(e) => setNewValue(e.currentTarget.value)}/>
                </ListItem>
            </List>
        </>

    );
}