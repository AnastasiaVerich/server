import React from 'react';
import './App.css';
import {Header} from "./ui/Headet";

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
export const  App=(props:any) =>{
    return (
        <Router>
            <div className="App">
                <Header isAuth={props.state.generic.isAuth}/>

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
        /*<div className="App">


           {/!* <Videochat/>*!/}
            <TestServerConnect/>
           {/!* <SignUpHr/>*!/}
           {/!* <Container maxWidth={false}  sx={{ minHeight:'calc(100vh - 68.5px)', width: '100vw'}} >

            </Container>*!/}
        </div>*/
    );
}

