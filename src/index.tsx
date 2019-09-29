import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './dummy-paces/app';
import * as serviceWorker from './serviceWorker';

import Theme from "./tfw/theme"
import "./tfw/font/josefin.css"

Theme.register("default", {
    white: "#adf", black: "#024",
    bg0: "#97cbff", bg1: "#b3daff", bg2: "#cce6ff", bg3: "#e6f3ff",
    bgP: "#247", bgPL: "#359", bgPD: "#135",
    bgS: "#309fff", bgSD: "#007fff", bgSL: "#60bfff"
});
Theme.apply("default");


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
