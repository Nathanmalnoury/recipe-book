import React from 'react'
import ReactDOM from 'react-dom'
import './CSS/index.css'
import Main from './Main';

const mountNode = document.querySelector("#root")

ReactDOM.render(<Main />, mountNode)