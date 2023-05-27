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

import AlertDialog from "./ui/popup/popap_1";
import FormDialog from "./ui/popup/popap_2";
import {Chat} from "./ui/Messanger";
import {TestServerConnect} from "./ui/test_server_coonect";
import {Videochat} from "./ui/videchat/App";

import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import {Main} from "./ui/Main";
import {ToastContainer} from "react-toastify";
import {PersonalArea} from "./ui/PersonalArea";
export const  App=(props:any) =>{
    return (
        <>
        <Router>
            <div className="App">
                <Header auth_state={props.state.generic.auth_state}
                        user_id={props.state.user.user_data.user_id}/>

                <Switch>
                    <Route exact path="/" component={Main} />{/*нез  HR*/}

                    <Route exact path="/registration" component={SignUpCandidate} />{/*нез  */}
                    <Route exact path="/registration/hr" component={SignUpHr} />{/*нез  */}
                    <Route exact path="/login"  render={(e)=>{
                        return <SignIn user_id={props.state.user.user_data.user_id}/>
                    }}/>{/*нез  */}

                    <Route exact path="/vacancies" component={TableMain} />{/*нез канд HR*/}
                    <Route exact path="/candidates" component={TableMain} />

                    <Route exact path="/videochat" component={Videochat}/>{/*канд */}
                    <Route exact path="/personal_area" render={(e)=>{
                        return <PersonalArea type={props.state.user.user_data.type}
                                             user_id={props.state.user.user_data.user_id}/>
                    }}/>{/*канд hr*/}
                    <Route exact path="/personal_area/:part"  render={(e)=>{
                        return <PersonalArea part={e.match.params.part}
                                             user_data={props.state.user.user_data}
                                             type={props.state.user.user_data.type}
                                             user_id={props.state.user.user_data.user_id}/>
                    }}/>{/*канд hr*/}
                    <Route exact path="/chat" component={Chat}/>{/*канд hr*/}

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

