import React from 'react';
import ReactDOM from 'react-dom';
import { Router,Route,IndexRoute,browserHistory } from "react-router"
import './pc_public_reset.css';
import './index.css';
import './css/normalize.css'
import App from './App';
import Home from "./components/Home";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Service from "./components/Service";
import Contact from "./components/Contact";
import registerServiceWorker from './registerServiceWorker';
import "./donghua";
ReactDOM.render(<Router history = { browserHistory }>
	<Route path="/" component= { App }>
		<IndexRoute component={ Home }></IndexRoute>
		<Route path="/home" component={ Home }></Route>
		<Route path="/about" component={ About }></Route>
		<Route path="/gallery" component={ Gallery }></Route>
		<Route path="/service" component={ Service }></Route>
		<Route path="/contact" component={ Contact }></Route>
	</Route>
</Router>, document.getElementById('root'));
registerServiceWorker();
