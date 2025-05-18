import Ccislogo from '../../../src/assets/ccislogo.svg'
import '../../../src/Css/Mainpage/Chatsection/Sidebar.css'
import { FaMessage, FaUpload} from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";


function Sidebar(){
    return(
    <>

     {/*Aside start*/ }
      <aside>
        <div className="nav-header-logo">
          <img src={Ccislogo} alt="ccislogo" />
        </div>
       
         <div className="list-container">

    
         <ul className="nav-list">
             <li className="nav-item">
               <a href="#" className="nav-link">
                  <FaMessage className='nav-icon'/> 
               </a>

               <div className='tooltip'><p>Message</p></div>
             </li>


             <li className="nav-item">
               <a href="#" className="nav-link">
                  <FaUpload className='nav-icon'/>
               </a>
               <div className='tooltip'><p>Upload</p></div>
             </li>


             <li className="nav-item">
               <a href="#" className="nav-link">
                   <IoMdSettings className='nav-icon'/>     
               </a>
               <div className='tooltip'><p>Settings</p></div>
             </li>


             <li className="nav-item">
               <a href="#" className="nav-link">
                  <MdAccountCircle className='nav-icon'/>         
               </a>
               <div className='tooltip'><p>Account</p></div>
             </li>


             <li className="nav-item">
               <a href="#" className="nav-link">
                  <CiLogout className='nav-icon'/>
               </a>
               <div className='tooltip'><p>Logout</p></div>
             </li>

         </ul>

         </div>
      </aside> 
        {/*Aside end*/ }
    </>
    );
}

export default Sidebar