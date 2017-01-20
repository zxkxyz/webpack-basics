import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const myName = "Zak";

function Main() {
  return (
    <App myName={myName} />
  )
}

ReactDOM.render(<Main />, document.getElementById('entry'));
