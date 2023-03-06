import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Container from "@mui/material/Container";


export default function PinnedSubheaderList() {
    return (
        <Container maxWidth={false}
                   sx={{
                       height: '100%',
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
                        <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                        {[0, 1, 2].map((item) => (
                            <ListItem key={`item-${sectionId}-${item}`}>
                                <ListItemText sx={{    border: '1px solid',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    margin: '5px'}} primary={`Item ${item}`} />
                            </ListItem>
                        ))}
                    </ul>
                </li>
            ))}
        </List></Container>
    );
}