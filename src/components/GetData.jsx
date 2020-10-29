import React from "react";
import WellnessWheel from "./WellnessWheel";

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
    const { results } = this.state;
    console.log(results);
    // this.props.history.push("/wheel");
    const data = Object.values(results);
    console.log(data);
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

  render() {
    // console.log(this.getResults()); -> [undefined, undefined,...]
    return (
      <>
        {!this.state.wheelIsVisible && (
          <form onSubmit={this.onFormSubmit}>
            <p>Financial</p>
            <input
              type="radio"
              name="financial"
              value="1"
              id="fin1"
              onChange={this.onInputChange}
            />
            <label htmlFor="fin1">1</label>
            <input
              type="radio"
              name="financial"
              value="2"
              id="fin2"
              onChange={this.onInputChange}
            />
            <label htmlFor="fin2">2</label>
            <input
              type="radio"
              name="financial"
              value="3"
              id="fin3"
              onChange={this.onInputChange}
            />
            <label htmlFor="fin3">3</label>
            <input
              type="radio"
              name="financial"
              value="4"
              id="fin4"
              onChange={this.onInputChange}
            />
            <label htmlFor="fin4">4</label>

            <p>Emotional</p>
            <input
              type="radio"
              name="emotional"
              value="1"
              id="emot1"
              onChange={this.onInputChange}
            />
            <label htmlFor="emot1">1</label>
            <input
              type="radio"
              name="emotional"
              value="2"
              id="emot2"
              onChange={this.onInputChange}
            />
            <label htmlFor="emot2">2</label>
            <input
              type="radio"
              name="emotional"
              value="3"
              id="emot3"
              onChange={this.onInputChange}
            />
            <label htmlFor="emot3">3</label>
            <input
              type="radio"
              name="emotional"
              value="4"
              id="emot4"
              onChange={this.onInputChange}
            />
            <label htmlFor="emot4">4</label>

            <p>Occupational</p>
            <input
              type="radio"
              name="occupational"
              value="1"
              id="occup1"
              onChange={this.onInputChange}
            />
            <label htmlFor="occup1">1</label>
            <input
              type="radio"
              name="occupational"
              value="2"
              id="occup2"
              onChange={this.onInputChange}
            />
            <label htmlFor="occup2">2</label>
            <input
              type="radio"
              name="occupational"
              value="3"
              id="occup3"
              onChange={this.onInputChange}
            />
            <label htmlFor="occup3">3</label>
            <input
              type="radio"
              name="occupational"
              value="4"
              id="occup4"
              onChange={this.onInputChange}
            />
            <label htmlFor="occup4">4</label>

            <p>Physical</p>
            <input
              type="radio"
              name="physical"
              value="1"
              id="phys1"
              onChange={this.onInputChange}
            />
            <label htmlFor="phys1">1</label>
            <input
              type="radio"
              name="physical"
              value="2"
              id="phys2"
              onChange={this.onInputChange}
            />
            <label htmlFor="phys2">2</label>
            <input
              type="radio"
              name="physical"
              value="3"
              id="phys3"
              onChange={this.onInputChange}
            />
            <label htmlFor="phys3">3</label>
            <input
              type="radio"
              name="physical"
              value="4"
              id="phys4"
              onChange={this.onInputChange}
            />
            <label htmlFor="phys4">4</label>

            <p>Intellectual</p>
            <input
              type="radio"
              name="intellectual"
              value="1"
              id="intel1"
              onChange={this.onInputChange}
            />
            <label htmlFor="intel1">1</label>
            <input
              type="radio"
              name="intellectual"
              value="2"
              id="intel2"
              onChange={this.onInputChange}
            />
            <label htmlFor="intel2">2</label>
            <input
              type="radio"
              name="intellectual"
              value="3"
              id="intel3"
              onChange={this.onInputChange}
            />
            <label htmlFor="intel3">3</label>
            <input
              type="radio"
              name="intellectual"
              value="4"
              id="intel4"
              onChange={this.onInputChange}
            />
            <label htmlFor="intel4">4</label>

            <p>Social</p>
            <input
              type="radio"
              name="social"
              value="1"
              id="soc1"
              onChange={this.onInputChange}
            />
            <label htmlFor="soc1">1</label>
            <input
              type="radio"
              name="social"
              value="2"
              id="soc2"
              onChange={this.onInputChange}
            />
            <label htmlFor="soc2">2</label>
            <input
              type="radio"
              name="social"
              value="3"
              id="soc3"
              onChange={this.onInputChange}
            />
            <label htmlFor="soc3">3</label>
            <input
              type="radio"
              name="social"
              value="4"
              id="soc4"
              onChange={this.onInputChange}
            />
            <label htmlFor="soc4">4</label>

            <p>Spiritual</p>
            <input
              type="radio"
              name="spiritual"
              value="1"
              id="spir1"
              onChange={this.onInputChange}
            />
            <label htmlFor="spir1">1</label>
            <input
              type="radio"
              name="spiritual"
              value="2"
              id="spir2"
              onChange={this.onInputChange}
            />
            <label htmlFor="spir2">2</label>
            <input
              type="radio"
              name="spiritual"
              value="3"
              id="spir3"
              onChange={this.onInputChange}
            />
            <label htmlFor="spir3">3</label>
            <input
              type="radio"
              name="spiritual"
              value="4"
              id="spir4"
              onChange={this.onInputChange}
            />
            <label htmlFor="spir4">4</label>

            <p>Environmental</p>
            <input
              type="radio"
              name="environmental"
              value="1"
              id="env1"
              onChange={this.onInputChange}
            />
            <label htmlFor="env1">1</label>
            <input
              type="radio"
              name="environmental"
              value="2"
              id="env2"
              onChange={this.onInputChange}
            />
            <label htmlFor="env2">2</label>
            <input
              type="radio"
              name="environmental"
              value="3"
              id="env3"
              onChange={this.onInputChange}
            />
            <label htmlFor="env3">3</label>
            <input
              type="radio"
              name="environmental"
              value="4"
              id="env4"
              onChange={this.onInputChange}
            />
            <label htmlFor="env4">4</label>

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
