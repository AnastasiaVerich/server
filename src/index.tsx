import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './store/state'
import {App} from "./App";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

let rerenderentarettreee = (state:any) => {
    root.render(
        <React.StrictMode>
            <App state={state}
                 render={store.render.bind(store)}
                 change_auth_state={store.change_auth_state.bind(store)}
            />
        </React.StrictMode>
    )

}
rerenderentarettreee(store.getState());

store.subscribe(rerenderentarettreee);

