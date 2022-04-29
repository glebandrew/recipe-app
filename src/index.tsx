import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
import {App} from './App'
import "./styles.css"

ReactDOM.render(
    <React.StrictMode>
		<Router>
			<CookiesProvider>
				<App />
			</CookiesProvider>
		</Router>
    </React.StrictMode>,
document.getElementById('root'))