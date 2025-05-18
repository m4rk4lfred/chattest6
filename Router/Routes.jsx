import { Routes , Route } from "react-router-dom";
import Mainpage from '../pages/Mainpage/Mainpage'
import Landingpage from "../pages/Landingpage/Landingpage";


function Router(){
return(

    <Routes>
        <Route path="/" element={<Landingpage />}></Route>
        <Route path="/Mainpage" element={<Mainpage />}></Route>

    </Routes>

)
}

export default Router;