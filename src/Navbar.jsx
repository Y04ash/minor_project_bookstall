export default function Navbar(){
    const path = window.location.pathname
    return <nav className="nav">
        <a href="/" className="site-title">Book Stock Pro</a>
       <ul>
        <li> 
            <a href="/Home">Home</a>
            </li>
            <li> 
            <a href="/Campaign">Campaign</a>
            </li>
            <li> 
            <a href="/Report">Report</a>
        </li>

       </ul>

    </nav>

}