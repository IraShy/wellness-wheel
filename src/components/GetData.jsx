import React from "react";
import WellnessWheel from "./WellnessWheel";
import Feedback from "./Feedback";
import { descript } from "./Texts.js";
import "../stylesheets/GetData.scss";

class GetData extends React.Component {
  state = {
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
    errMessage: "",
  };

  scrollToTop() {window.scrollTo(0, 0);}

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
    this.setState({
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
    });
    {this.scrollToTop()}
  };

  renderDescription(option) {
    const description = descript[0];
    return (
      <div className="description">
        <p>{description[option]}</p>
      </div>
    );
  }

  renderInputs(option) {
    let inputs = [];
    for (let i = 1; i <= 5; i++) {
      let id = option.slice(0, 3) + i;
      inputs.push(id);
    }
    return inputs.map((input, index) => {
      return (
        <span key={input}>
          <input
            type="radio"
            name={option}
            value={index + 1}
            id={input}
            onChange={this.onInputChange}
          />
          <label
            htmlFor={input}
            className={["background", `${option}`].join(" ")}
          >
            {index + 1}
          </label>
        </span>
      );
    });
  }

  renderOptions() {
    const options = Object.keys(this.state.results);
    return options.map((option) => {
      return (
        <div className={["option", `${option}`].join(" ")} key={option}>
          <p className="option-name">{option.toUpperCase()} WELLNESS</p>
          {this.renderDescription(option)}
          <div className="options-buttons">{this.renderInputs(option)}</div>
        </div>
      );
    });
  }

  render() {
    // window.scrollTo(0, 0);
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
            <h1 style={{width:window.screen.width > 450 ? 450 : `90%`}}>Your results:</h1> 
            <div className="results-container">
              <WellnessWheel radiiArr={Object.values(this.state.results)} />
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
