import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import App from '../App';

function Header() {
  return (
    <div>
        <Router>
            <Link className="text-center text-6xl text-whitish block pt-10 font-semibold" to="/">MDP Solver</Link>
            <Routes>
                <Route path="/" exact component = {App}/>
            </Routes>
        </Router>
    </div>
  )
}

export default Header