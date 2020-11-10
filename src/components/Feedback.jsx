import React from "react";
import CheckResults from "./CheckResults";
import RenderTips from "./RenderTips.jsx";

class Feedback extends React.Component {
  render() {
    return (
      <div className="feedback">
        <CheckResults results={Object.values(this.props.results)} />
        <RenderTips results={Object.entries(this.props.results)} />
      </div>
    );
  }
}

export default Feedback;
