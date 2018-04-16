import React, { Component } from "react";
import { Button } from 'reactstrap';
import Activities from "./components/Activities";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Activities />
      </div>
    );
  }
}

export default App;
