import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Container from "@mui/material/Container";
import blue from "@mui/material/colors/blue";


export default function PinnedSubheaderList() {
    return (
        <Container maxWidth={false}
                   sx={{
                       paddingLeft: '0!important',
                       height: '100%',
                       marginBottom:'20px',
                       position: 'relative',
                   }}>
            <List
            sx={{
                position: 'absolute',
                maxHeight: '100%',
                width: '100%',
                bgcolor: 'background.paper',
                overflow: 'auto',
                '& ul': { padding: 0 },
            }}
            subheader={<li />}
        >
            {[0, 1, 2, 3, 4].map((sectionId) => (
                <li key={`section-${sectionId}`}>
                    <ul>
                        <ListSubheader>{`ДАТА ПЕРЕПИСКИ ${sectionId}`}</ListSubheader>

                        {[0, 1, 2].map((item) => (
                            <div style={{display:'flex', justifyContent: item === 0?'flex-start':'flex-end'}}>
                                <ListItem key={`item-${sectionId}-${item}`} sx={{ paddingRight:'7px', width:'fit-content', maxWidth:'80%', minWidth:'20%'}}>
                                <ListItemText
                                    sx={{
                                        border: '1px solid',
                                        padding: '10px',
                                        background: item === 0? '' : blue[700],
                                        overflowWrap: 'break-word',
                                        borderRadius: '5px',
                                        margin: '5px'
                                }} primary={`ItemItemItemItemItemItemItemItemItemItemItemItem ItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItem ${item}`} />
                            </ListItem>
                            </div>
                        ))}
                    </ul>
                </li>
            ))}
        </List></Container>
    );
}