import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./ui/Header";
import 'react-toastify/dist/ReactToastify.css'
import {SignIn} from "./ui/SignIn";
import SignUpCandidate from "./ui/SignUpCandidate";
import SignUpHr from "./ui/SignUpHr";
import {Resume} from "./ui/Resume";
import {Chat} from "./ui/Messanger";

import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {Main} from "./ui/Main";
import {ToastContainer} from "react-toastify";
import {PersonalArea} from "./ui/PersonalArea";
import {Vacancy} from "./ui/Vacancy";
import {socketEvents} from "./socket/socket_event";
import Room from "./ui/videchat/Videochat_room";
import {Videochat_} from "./ui/videchat/Videochat_dont_exist";

export const  App=(props:any) =>{
    useEffect(()=>{

        socketEvents(props)
    },[])
    return (
        <>
        <Router>
            <div className="App">
                <Header state={props.state}/>

                <Switch>
                    <Route exact path="/" component={Main} />{/*нез  HR*/}

                    <Route exact path="/registration" component={SignUpCandidate} />{/*нез  */}
                    <Route exact path="/registration/hr" component={SignUpHr} />{/*нез  */}
                    <Route exact path="/login"  render={(e)=>{
                        return <SignIn state={props.state}/>
                    }}/>{/*нез  */}


                    <Route exact path="/vacancies" render={(e)=>{
                        return <Vacancy state={props.state}/>
                    }}/>
                    <Route exact path="/candidates" render={(e)=>{
                        return <Resume changeSelectedId={props.changeSelectedId} state={props.state}/>
                    }}/>

                    <Route exact path="/personal_area" render={(e)=>{
                        return <PersonalArea state={props.state}/>
                    }}/>{/*канд hr*/}
                    <Route exact path="/personal_area/:part"  render={(e)=>{
                        return <PersonalArea part={e.match.params.part}
                                             state={props.state}/>
                    }}/>{/*канд hr*/}
                    <Route exact path="/chat" component={Chat}/>{/*канд hr*/}

                    <Route exact path='/videochat/room/:id' render={(e)=>{
                        return <Room state={props.state}/>
                    }} />
                    <Route exact path='/videochat'
                           render={(e)=>{
                               return <Videochat_ state={props.state}/>
                           }}/>

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
    );
}

