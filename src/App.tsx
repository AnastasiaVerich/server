import React from 'react';
import './App.css';
import {Header} from "./ui/Headet";
import Container from '@mui/material/Container';
import {SignIn} from "./ui/SignIn";
import SignUp from "./ui/SignUp";
import SignUpMain from "./ui/SignUpMain";

function App() {
    return (
        <div className="App">
            <Header/>
            <SignUpMain/>
           {/* <Container maxWidth={false}  sx={{ minHeight:'calc(100vh - 68.5px)', width: '100vw'}} >

            </Container>*/}
        </div>
    );
}

export default App;
