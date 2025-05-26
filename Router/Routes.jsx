import { Routes , Route } from "react-router-dom";
import Chatsection from '../pages/Mainpage/Chatsection'
import Landingpage from "../pages/Landingpage/Landingpage";
import Uploadsection from "../pages/Mainpage/Uploadsection"


function Router(){
return(

    <Routes>
        <Route path="/" element={<Landingpage />}></Route>
        <Route path="/Mainpage" element={<Chatsection />}></Route>
        <Route path="/Upload" element={<Uploadsection />}></Route>
    </Routes>

)
}

export default Router;