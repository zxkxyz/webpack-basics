import React from 'react';
import CoolPage from './CoolPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        This is an awesome App!
        <CoolPage />
      </div>
    );
  }
}

export default App;
