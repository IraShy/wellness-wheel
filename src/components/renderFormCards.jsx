import React from "react";
import { descript } from "./Texts.js";

export function renderDescription(option) {
  const description = descript[0];
  return (
    <div className="description">
      <p>{description[option]}</p>
    </div>
  );
}

export function renderInputs(option, onInputChange) {
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
          onChange={onInputChange}
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
