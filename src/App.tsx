import React from 'react';
import './App.css';
import {Header} from "./ui/Headet";

import {SignIn} from "./ui/SignIn";
import SignUp from "./ui/SignUp";
import SignUpMain from "./ui/SignUpMain";
import {TableMain} from "./ui/Table_main";
import {Table_second2} from "./ui/Table_second2";
import {Shedule} from "./ui/Shedule";

import AlertDialog from "./popap/popap_1";
import FormDialog from "./popap/popap_2";
import {Chat} from "./ui/Messanger";

function App() {
    return (
        <div className="App">
            <Header/>
            <Chat/>
           {/* <SignUpMain/>*/}
           {/* <Container maxWidth={false}  sx={{ minHeight:'calc(100vh - 68.5px)', width: '100vw'}} >

            </Container>*/}
        </div>
    );
}

export default App;
