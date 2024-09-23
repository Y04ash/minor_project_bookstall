
import React from 'react'
import '../css/styles.css'
const Navbar = () => {
  return (
    <nav className='nav'>
    <a href="/" className="site-title">Book Stock Pro</a>
    <ul>
     <li> 
         <a href="/">Home</a>
         </li>
         <li> 
         <a href="/Campaign">Campaign</a>
         </li>
         <li> 
         <a href="/Report">Report</a>
        </li>
         

    </ul>

 </nav>
  )
}

export default Navbar

