import React from "react";

function Commentinput({ posts }) {
  return (
    <>
      <form>
        <label htmlFor="comment">Comment</label>
        <textarea rows="4" className="form-control"></textarea>
        <button className="btn btn-secondary me-2 my-2">Cancel</button>
        <button className="btn btn-primary my-2" type="submit">
          Comment
        </button>
      </form>

      <div className="row border">
        <p>
          Hello All, I am a Business Analyst with 14 yrs of experience and it’s
          been 3 months now and I have looking for job as a BA, PO or PM .I am
          not sure what timeline should I be hoping for job now.
        </p>
        <p>
          Hello All, I am a Business Analyst with 14 yrs of experience and it’s
          been 3 months now and I have looking for job as a BA, PO or PM .I am
          not sure what timeline should I be hoping for job now.
        </p>
      </div>
    </>
  );
}

export default Commentinput;
