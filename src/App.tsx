import React from 'react';
import './App.css';
import {Header} from "./ui/Headet";
import Container from '@mui/material/Container';
import {SignIn} from "./ui/SignIn";

function App() {
    return (
        <div className="App">
            <Header/>
            <SignIn/>
           {/* <Container maxWidth={false}  sx={{ minHeight:'calc(100vh - 68.5px)', width: '100vw'}} >

            </Container>*/}
        </div>
    );
}

export default App;
