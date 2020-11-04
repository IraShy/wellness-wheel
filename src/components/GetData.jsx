import React from "react";
import WellnessWheel from "./WellnessWheel";
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
  };

  renderOptions() {
    const options = Object.keys(this.state.results);
    // const colors = [
    //   "#f46464",
    //   "#eea755",
    //   "#53b89a",
    //   "#008080",
    //   "#38a9c7",
    //   "#445588",
    //   "#d43e8c",
    //   "#bd121b",
    // ];
    return options.map((option, ind) => {
      const renderInputs = () => {
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
              {/* <label htmlFor={input} style={{ backgroundColor: colors[ind] }}> */}
              <label htmlFor={input} className={option}>
                {index + 1}
              </label>
            </span>
          );
        });
      };
      return (
        <div className="options" key={option}>
          <p>{option.toUpperCase()}</p>
          {renderInputs()}
        </div>
      );
    });
  }

  render() {
    // console.log(this.getResults()); -> [undefined, undefined,...]
    return (
      <>
        {!this.state.wheelIsVisible && (
          <form onSubmit={this.onFormSubmit}>
            {this.renderOptions()}
            <button type="submit">Submit</button>
          </form>
        )}

        {this.state.wheelIsVisible && (
          <div className="wheel">
            <WellnessWheel radiiArr={Object.values(this.state.results)} />
            {/* <WellnessWheel radiiArr={this.getResults()} /> */}
            <button onClick={this.resetData}>Try again</button>
          </div>
        )}
      </>
    );
  }
}

export default GetData;
