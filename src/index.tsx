import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
import Context from './Context';
import {App} from './App'
import "./styles.css"


ReactDOM.render(
    <React.StrictMode>
		<Context>
			<Router>
				<CookiesProvider>
					<App />
				</CookiesProvider>
			</Router>
		</Context>
    </React.StrictMode>,
document.getElementById('root'))