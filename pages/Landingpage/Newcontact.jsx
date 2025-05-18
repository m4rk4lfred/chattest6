import "../../src/Css/Landingpagecss/Newcontact.css"
import contactLogo from "../../src/assets/contact.svg"
import facebookLogo from "../../src/assets/facebook 1.svg"
import emailLogo from "../../src/assets/email.svg"
function Newcontact(){
  return(
  <>
    <div className="Newcontact-content">

        <div className="contact-left">
           
             
              <h1>
                 <span className="design-1">L</span>et's Talk
              </h1>
              <div className="contact-paragraph-container">
              <p>If you have any questions, concerns, or suggestions regarding our programs, services, or activities, please don’t hesitate to reach out. The College of Computer and Information Sciences is committed to providing support and fostering connections within and beyond the university. You can contact us through the details below or visit our office during working hours.</p>
              </div>
             
              
              <div className="contact-link">
              <img src={contactLogo} alt="" />
              <a href="mailto:ccis@mmsu.edu.ph">ccis@mmsu.edu.ph  </a>
              </div>
              
              <br />
               
              <div className="contact-link">
              <img src={emailLogo} alt="" />
              <a href="tel:077-600-0460">077-600-0460</a>
              </div>
              <hr />

              <p>Follow us:</p>
             <a href="https://www.facebook.com/mmsuccis" target="black"><img src={facebookLogo} alt="facebook.svg" /></a> 

        </div>

        <div className="contact-right">
           <div className="contact-right-formbox">
              <form action="">
                 <label htmlFor="contact-name">Name</label>
                 <br />
                 <input type="text" name="contact-name" />
                 <br />
                 <label htmlFor="contact-email">Email</label>
                 <br />
                 <input type="text" name="contact-email" />
                 <br />
                 <label htmlFor="contact-message">message:</label>
                 <br />
                 <textarea name="contact-message" id="contact-message"></textarea>
                  <br />
                  <div className="contact-submit-button">
                    <button>Submit</button>
                  </div>
                
              </form>
           </div>
        </div>
    </div>
  </>
  )
}
export default Newcontact;
