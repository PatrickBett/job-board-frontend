import React from 'react'
import "./footer.css";


function Footer() {
  return (
    <div className="row" id='footer'>
        <div className="col-md-4">
            <h5>Terms And Conditions</h5>
            <h7>termsand conditions</h7>
        </div>

        <div className="col-md-4">
            <h5>Privacy Policy</h5>
            <h7>All Rights Reserved</h7>
        </div>

        <div className="col-md-4">
            <h5>Contact Us</h5>
            <h7>Customer service - 0791474737</h7>
        </div>
    </div>
  )
}

export default Footer