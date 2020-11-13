import React from "react";
import WellnessWheel from "./WellnessWheel";
import Feedback from "./Feedback";
import "../stylesheets/GetData.scss";
import scrollToTop from "./scrollToTop";
import { renderDescription, renderInputs } from "./renderFormCards";

const initialState = {
  results: {
    financial: 0,
    emotional: 0,
    occupational: 0,
    physical: 0,
    intellectual: 0,
    social: 0,
    spiritual: 0,
    environmental: 0,
  },
  wheelIsVisible: false,
};

class GetData extends React.Component {
  state = initialState;

  onInputChange = (event) => {
    this.setState({
      results: {
        ...this.state.results,
        [event.target.name]: Number(event.target.value),
      },
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.setState({ wheelIsVisible: true });
  };

  resetData = () => {
    this.setState(initialState);
    scrollToTop();
  };

  renderOptions() {
    const options = Object.keys(this.state.results);
    return options.map((option) => {
      return (
        <div className={["option", `${option}`].join(" ")} key={option}>
          <p className="option-name">{option.toUpperCase()} WELLNESS</p>
          {renderDescription(option)}
          <div className="options-buttons">
            {renderInputs(option, this.onInputChange)}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <>
        {!this.state.wheelIsVisible && (
          <div className="container">
            <p id="instruction">
              Pick one option for each field, with{" "}
              <span>
                <label className="label-in-text">1</label>
              </span>{" "}
              being the worst, and{" "}
              <span>
                <label className="label-in-text">5</label>
              </span>{" "}
              being the best possible state:
            </p>
            <form onSubmit={this.onFormSubmit}>
              <div className="wrap-container">{this.renderOptions()}</div>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}

        {this.state.wheelIsVisible && (
          <div className="wheel">
            <h1 style={{ width: window.screen.width > 450 ? 450 : `90%` }}>
              Your results:
            </h1>
            <div className="results-container">
              <WellnessWheel results={this.state.results} />
              <Feedback results={this.state.results} />
            </div>
            <button onClick={this.resetData}>Try again</button>
          </div>
        )}
      </>
    );
  }
}

export default GetData;
