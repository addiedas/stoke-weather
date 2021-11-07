import React from 'react';
import {SearchBar} from './features/search-bar/search-bar';
import './App.css';
import {ComponentSwitch} from './features/component-switch/component-switch';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <SearchBar/>
                <ComponentSwitch/>
            </header>
        </div>
    );
}

export default App;
