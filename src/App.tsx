import React from 'react';
import logo from './icons/day-and-night.png';
import {SearchBar} from './features/search-bar/search-bar';
import './App.css';
import {ComponentSwitch} from './features/component-switch/component-switch';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <SearchBar/>
                <ComponentSwitch/>
            </header>
        </div>
    );
}

export default App;
