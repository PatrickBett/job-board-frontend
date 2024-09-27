import React from "react";

function Form() {
  return (
    <form className="d-flex mx-2 my-2 ">
      <input className="form-control me-2" type="text" placeholder="Search" />
      <button className="btn btn-primary me-1" type="button">
        Search
      </button>
    </form>
  );
}

export default Form;
