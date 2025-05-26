import Sidebar from "./Sidebar";
import UploadArea from "./Uploadsection/UploadArea";
import '../../src/Css/Mainpage/Uploadsection/Uploadsection.css'
function Uploadsection(){
    return(
        <>
         <div className="Main-content">
           <Sidebar />
           <div className="Uploadsection-maincontent">
             <UploadArea />
           </div>
           </div>
        </>
    );
}
export default Uploadsection;