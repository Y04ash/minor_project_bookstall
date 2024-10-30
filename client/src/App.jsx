import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Campaign from "./Pages/Campaign";
import Report from "./Pages/Report";
import {Route, Routes} from "react-router-dom"
import Footer from "./Components/Footer";
import Form from './Pages/Form'
import IndividualCamp from "./Pages/IndividualCamp";

function App() {

  return (
  <>
  <Navbar />
  <div className="container">
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = "/Campaign" element = {<Campaign />} />
      <Route path = "/Report" element = {<Report />} />   
      <Route path="/Add-campaign" element={<Form/>}/>
      {/* <Route path="/individual-camp" element={<IndividualCamp/>}/> */}
      <Route path="/campaign/:campaignId" element={<IndividualCamp/>} />
    </Routes>
  </div>
  <Footer/>
  </>
  )
}
export default App