import React from 'react'
import "./footer.css";


function Footer() {
  return (
    <div className="row" id='footer'>
        <div className="col-md-4">
            <h3>Terms And Conditions</h3>
            <h5>termsand conditions</h5>
        </div>

        <div className="col-md-4">
            <h3>Privacy Policy</h3>
            <h5>All Rights Reserved</h5>
        </div>

        <div className="col-md-4">
            <h3>Contact Us</h3>
            <h5>Customer service - 0791474737</h5>
        </div>
    </div>
  )
}

export default Footer