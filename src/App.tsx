import React from 'react';
import './App.css';
import {Header} from "./ui/Header";
import 'react-toastify/dist/ReactToastify.css'
import {SignIn} from "./ui/SignIn";
import SignUpCandidate from "./ui/SignUpCandidate";
import SignUpHr from "./ui/SignUpHr";
import {Resume} from "./ui/Resume";
import {Chat} from "./ui/Messanger";
import {Videochat} from "./ui/videchat/App";

import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {Main} from "./ui/Main";
import {ToastContainer} from "react-toastify";
import {PersonalArea} from "./ui/PersonalArea";
import {Vacancy} from "./ui/Vacancy";

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


                    <Route exact path="/vacancies" render={(e)=>{
                        return <Vacancy headers={props.state.main_table.headers}
                                        vacancy={props.state.vacancy}/>
                    }}/>
                    <Route exact path="/candidates" render={(e)=>{
                        return <Resume headers={props.state.main_table.headers}
                                       changeSelectedId={props.changeSelectedId}
                                       resume={props.state.resume}
                                       user_id={props.state.user.user_data.user_id}
                                       selected_id={props.state.main_table.selected_id}
                                       user_vacancy={props.state.vacancy}/>
                    }}/>

                    <Route exact path="/videochat" component={Videochat}/>{/*канд */}
                    <Route exact path="/personal_area" render={(e)=>{
                        return <PersonalArea type={props.state.user.user_data.type}
                                             user_id={props.state.user.user_data.user_id}/>
                    }}/>{/*канд hr*/}
                    <Route exact path="/personal_area/:part"  render={(e)=>{
                        return <PersonalArea part={e.match.params.part}
                                             user_data={props.state.user.user_data}
                                             type={props.state.user.user_data.type}
                                             user_vacancy={props.state.vacancy}
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

