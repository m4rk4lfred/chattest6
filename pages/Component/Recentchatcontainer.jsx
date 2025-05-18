import '../../src/Css/Mainpage/Chatsection/Chatlist.css'

function Recentcontainer(){
  return(
      <>
        <div className="recentchat-container">
           <div className="recentchat-image">
             <img src="https://c4.wallpaperflare.com/wallpaper/399/722/332/one-punch-man-saitama-hd-wallpaper-preview.jpg" alt="" />
           </div>
           <div className="recentchat-content">
               <p><b>Name</b></p>
               <p>Recent messages</p>
           </div>
        </div>
      </>
  );
}
export default Recentcontainer;