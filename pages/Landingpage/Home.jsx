import { useState, useRef } from 'react'
import blurryLogo from '../../src/assets/ccislogo.svg'
import brandingLogo from '../../src/assets/ccis logo 1.svg'
import blurryTriangleYellow from '../../src/assets/blurryTriangle.svg'
import blurryTriangleBlue from '../../src/assets/blurryBlueTriangle.svg'
import Signup from '../Landingpage/Signup'
import Login from '../Landingpage/Login'
import Menu from '../../src/assets/menu.svg'
import Exit from '../../src/assets/exit.svg'
import HomeIcon from '../../src/assets/home_icon.svg'
import '../../src/Css/Landingpagecss/Home.css';
import { useNavigate } from 'react-router-dom'



function Home() {
  {/* This state variable manages the value of the input box. */}
  {/* 'text' holds the current state (i.e., the current value of the input). */}
  {/* 'setText' is the function used to update the state with a new value. */}
  {/* When the user types in the input, 'setText' updates 'text', causing the component to re-render. */}
  {/* The first value is the current state, and the second is the updater function—not the new state itself. */}
  {/* The initial state is an empty string, so the input box starts off blank. */}
  const [email , setEmail] = useState("");
  
  {/* this two variable will control the visibility of the login and signup modal */}
  const [signupModal , signupState] = useState(false);
  const [loginModal , loginState] = useState(false);

  
  {/* Fragment that will return the home page*/}
  return (
    <>
    <header>  
      
        <div className="header-branding-div" id='HomeSection'> 

            <input type="checkbox" id='sidebar-active'/>
            <label htmlFor="sidebar-active" className='open-sidebar-button'>
              <img src={Menu} alt="" />
            </label>
            
            <div className="links-container">
                 <label htmlFor="sidebar-active" className='close-sidebar-button'>
                     <img src={Exit} alt="" />
                 </label>

                <a href="#HomeSection"><img src={HomeIcon} alt="" />Home</a>
                <a href="#FeaturesSection">Features</a>
                <a href="#AboutSection">About</a>
                <a href="#ContactSection">Contact</a>
                <a onClick={()=>signupState(true)}>Sign up</a>
                <a onClick={()=>loginState(true)}>Login</a>

            </div>
            
            
            <img src={brandingLogo} alt="ccis.logo" className="header-logo"/>
            <h1><span className="design-1">C</span>CIS <span className="design-1">C</span>ONNECT</h1>
        </div>

  
        <nav>       
             <ul>
                <li><a href="#HomeSection">Home</a></li>
                <li><a href="#FeaturesSection">Features</a></li>
                <li><a href="#AboutSection">About</a></li>
                <li><a href="#ContactSection">Contact</a></li>
                <li><a onClick={()=>signupState(true)}>Sign up</a></li>
                <li><a onClick={()=>loginState(true)}>Login</a></li>
             </ul>
        </nav>
    </header>
    

    <div className="content">
       
       {/* Left section of the homepage — separated for easier styling and positioning of floating elements */}
       <div className="homeSection">
        <div className="homesection-upper">
            <div className="home-left">
               <h2><span className="design-1">C</span>onnecting CCIS Minds, One Click at a Time</h2>
            </div>
            <div className="home-right">
              <img src={brandingLogo} alt="ccislogo" className="ccis-logo"/>
            </div>
           
        </div>
       
        {/* Email input section on the homepage */}
        <div className="homesection-lower">
            <div className="homesection-email-div">
                <input type="email" placeholder="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <button className='submitButton' onClick={()=>signupState(true)}>Submit</button>
            </div>
            
        </div>


       {/* floating svg like the ccis logo and so on*/}
       
        <img src={blurryTriangleYellow} alt="ccislogo" className="bt-1"/>
        <img src={blurryTriangleBlue} alt="ccislogo" className="bt-2"/>
        <img src={blurryTriangleBlue} alt="ccislogo" className="bt-3"/>
       </div>
    </div>
        
        {/*if signupModal is true the signup UI will appear */}
    {signupModal && <Signup email={email} closeSignup={signupState} signupShow={signupState} loginShow={loginState}/>}
    {loginModal && <Login closeLogin={loginState} showlogin={loginState} showsignup={signupState}/>}  {/*Then gumamit nalang ako ng props or properties para magpass ng data sa another component, parang pagpass lang ng data sa function pero sa component naten pinapasa*/}

    </>
  );
}

export default Home;
