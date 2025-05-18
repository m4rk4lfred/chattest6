import '../../src/Css/Landingpagecss/Contact.css';
import EmailLogo from '../../src/assets/emailLogo.svg'

function ContactSection(){
    {/*this will return the contact component*/}
     return(
        <>

        <div className="contact-content" id='ContactSection'> 
       
           <div className="contact-header">
               <h1><span className='design-1'>C</span>ontact</h1>
            </div>

            <div className="contact-body">
                <div className="contact-card">
                        
                        <img src={EmailLogo} alt="Email.png" />
                        <p>Start connecting today. Explore study groups, organize projects, and stay updated with the CCIS community—all in one place.</p>
                        <button>CONTACT NOW</button>
                    

                </div>
            </div>

        </div>

        </>
     )
}
export default ContactSection;
