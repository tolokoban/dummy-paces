import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './protein-atlas/app';
import * as serviceWorker from './serviceWorker';

import Theme from "./tfw/theme"
import "./tfw/font/josefin.css"

Theme.register("default", {
    white: "#fda", black: "#420",
    bg0: "#ffcb97", bg1: "#ffdab3", bg2: "#ffe6cc", bg3: "#fff3e6",
    bgP: "#742", bgPL: "#953", bgPD: "#531",
    bgS: "#ff9f30", bgSD: "#ff7f00", bgSL: "#ffbf60"
});
Theme.apply("default");


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
