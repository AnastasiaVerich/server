import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './store/state'
import {App} from "./App";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

let rerenderentare_tree = (state:any) => {
    root.render(
        <React.StrictMode>
            <App state={state}
                 render={store.render.bind(store)}
                 change_auth_state={store.change_auth_state.bind(store)}
                 changeSelectedId={store.changeSelectedId.bind(store)}
            />
        </React.StrictMode>
    )

}
rerenderentare_tree(store.getState());

store.subscribe(rerenderentare_tree);

