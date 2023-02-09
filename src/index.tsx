import React from 'react';
import ReactDOM from 'react-dom';


import Routes from 'core/Router';
import ErrorBoundary from 'core/Components/ErrorBoundary';

import './index.css';
import Toast from 'core/Components/Toast/Toast';



const App = () => (
    <ErrorBoundary>
        <Toast>
            <Routes />
        </Toast>
    </ErrorBoundary>
);

ReactDOM.render(<App />, document.getElementById('root'));