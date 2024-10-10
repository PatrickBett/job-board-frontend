import React from 'react'
import "./footer.css";


function Footer() {
  return (
    <div className="row text-white pt-5 pb-5 mt-5" id='footer'>
        <div className="col-md-4">
            <h5>Terms And Conditions</h5>
            <p>termsand conditions</p>
        </div>

        <div className="col-md-4">
            <h5>Privacy Policy</h5>
            <p>All Rights Reserved</p>
        </div>

        <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Customer service - 0791474737</p>
        </div>
    </div>
  )
}

export default Footer