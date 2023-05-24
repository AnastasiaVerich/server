import React from 'react';
import './App.css';
import {Header} from "./ui/Headet";
import 'react-toastify/dist/ReactToastify.css'
import {SignIn} from "./ui/SignIn";
import SignUpCandidate from "./ui/SignUpCandidate";
import SignUpHr from "./ui/SignUpHr";
import {TableMain} from "./ui/Table_main";
import {Table_second2} from "./ui/Table_second2";
import {Shedule} from "./ui/Shedule";

import AlertDialog from "./popap/popap_1";
import FormDialog from "./popap/popap_2";
import {Chat} from "./ui/Messanger";
import {TestServerConnect} from "./ui/test_server_coonect";
import {Videochat} from "./ui/videchat/App";

import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import {Main} from "./ui/Main";
import {ToastContainer} from "react-toastify";
export const  App=(props:any) =>{
    return (
        <>
        <Router>
            <div className="App">
                <Header auth_state={props.state.generic.auth_state}/>

                <Switch>
                    <Route exact path="/" component={Main} />{/*нез  HR*/}

                    <Route exact path="/registration" component={SignUpCandidate} />{/*нез  */}
                    <Route exact path="/registration/hr" component={SignUpHr} />{/*нез  */}
                    <Route exact path="/login" component={SignIn} />{/*нез  */}

                    <Route exact path="/vacancies" component={TableMain} />{/*нез канд HR*/}
                    <Route exact path="/candidates" component={TableMain} />

                    <Route exact path="/videochat" component={Videochat}/>{/*канд */}

                </Switch>
            </div>
        </Router>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            </>
        /*<div className="App">


           {/!* <Videochat/>*!/}
            <TestServerConnect/>
           {/!* <SignUpHr/>*!/}
           {/!* <Container maxWidth={false}  sx={{ minHeight:'calc(100vh - 68.5px)', width: '100vw'}} >

            </Container>*!/}
        </div>*/
    );
}

