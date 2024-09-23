
import { createRoot } from 'react-dom/client'
import React from "react"
import ReactDom from "react-dom/client"
import {BrowserRouter} from "react-router-dom" 
import App from './App.jsx'
import './index.css'
import "./styles.css"

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </React.StrictMode>
)
