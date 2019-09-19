import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    showCounter: false,
    title: "Cool!",
    currentCount: 3
  };

  counterOneRef = React.createRef();
  counterTwoRef = React.createRef();

  componentDidMount() {
    window.ReactCounter.mount(
      { title: "counter two" },
      this.counterTwoRef.current
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { showCounter, title, currentCount } = this.state;
    const shouldUpdateCounter =
      prevState.showCounter !== showCounter || prevState.title !== title;
    if (shouldUpdateCounter) {
      if (showCounter) {
        const counterProps = {
          title,
          initialCount: currentCount,
          onCountUpdate: this.onCountUpdate
        };
        window.ReactCounter.mount(counterProps, this.counterOneRef.current);
      } else {
        window.ReactCounter.unmount(this.counterOneRef.current);
      }
    }
  }

  toggleCounter = () => {
    const { showCounter } = this.state;
    this.setState({ showCounter: !showCounter });
  };

  onTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  onCountUpdate = currentCount => {
    this.setState({ currentCount });
  };

  render() {
    const { title, currentCount } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div ref={this.counterTwoRef}></div>
          <img
            onClick={this.toggleCounter}
            src={logo}
            className="App-logo"
            alt="logo"
          />
          <div ref={this.counterOneRef}></div>
          <p>This is the main App.</p>
          <div>{`The count is ${currentCount}`}</div>
          <input value={title} onChange={this.onTitleChange} />
        </header>
      </div>
    );
  }
}

export default App;
