import React from "react";

class Feedback extends React.Component {
  checkResults() {
    const results = Object.values(this.props.results);
    if (results.every((num) => num < 4)) {
      return <p>You're struggling</p>;
    } else if (results.every((num) => num > 3)) {
      return <p>You're thriving</p>;
    } else {
      return <p>You're doing well in some fields</p>;
    }
  }

  render() {
    return <>{this.checkResults()}</>;
  }
}

export default Feedback;
