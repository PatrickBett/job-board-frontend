import React from 'react'
import './landingpage.css'
import { Link } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function Landingpage() {
  return (
    <>
    <div className="container-fluid" id='landingpage'>  
            <h1 className='p-3 fw-bolder'>Bring top talent to your business, <strong>your way</strong></h1>
            <h5 className='p-3'>Build your dream team, fill skill gaps, and scale with our </h5>
            <h5 className='p-3'>full-service, customizable Enterprise platform. </h5>    
    </div>

    <div>
    <div class="text-center mt-5">
  <h1 class="display-4">The #1 Job Site to Find Remote Jobs-No Ads, Scams, or Junk</h1>
</div>

        <div className="container mt-5 border p-5">
        <h3 className='mb-2'> <CheckCircleIcon />Unlimited Job Search Resources</h3>
            <p className='mb-5'>Full access to all features including unlimited jobs, articles, and webinars to help you with your remote job search.</p>
        
            <h3 className='mb-2'><CheckCircleIcon />Higher Quality Listings
            </h3>
            <p className='mb-5'>Only legit jobs. No ads, scams, or junk to sift through. Our team spends 200+ hours/day verifying every job.

</p>
        
            <h3 className='mb-2'><CheckCircleIcon />Save Time</h3>
            <p className='mb-5'>Go straight from job listings to applications. No more hopping from one job board to the next.</p>
        
            <button type='button' id='get-started'>
            <Link to="/register" className='get-started'>
                      Get Started
                    </Link>
            </button>
        </div>

        
 
        
    </div>
    
    </>
  )
}

export default Landingpage