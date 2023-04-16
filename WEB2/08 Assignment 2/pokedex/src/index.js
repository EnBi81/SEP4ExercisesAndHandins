import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './view/App';
import './index.css'
import Color from "color";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

console.log(new Color('#212336').lightness())
/*
<React.StrictMode>
    <App />
</React.StrictMode>*/
