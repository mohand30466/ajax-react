import React from "react";

const Form = props => {
  return (
    <div className="list">
      <div className="form">
        <form onSubmit={props.onSubmit}>
          <input
            type="text"
            value={props.value}
            onChange={props.onChange}
          />
          <button type="submit">add</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
