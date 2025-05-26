import '../../src/Css/Landingpagecss/About.css';
import AboutCard from './AboutSectionCard'

function AboutSection(){
  return(    
  <>
  {/*About section component fragment*/}
  <div className="about-container" id='AboutSection'>
    
     <div className="about-header">
          <h3>About CCIS Connect</h3>
          <p>CCIS Connect is a centralized collaboration platform developed exclusively for students of the College of Computer and Information Sciences (CCIS). The platform is designed to support academic productivity, group coordination, and access to essential resources within the department.</p>
     </div>
    
     <div className="about-body">
         <div className="about-layout-card-right">
           <AboutCard header={"Purpose"} content={"Created to address common challenges in academic life—such as finding groupmates, sharing study materials, and managing deadlines—CCIS Connect serves as a digital hub that simplifies collaboration and enhances student communication."}/>
         </div>
         
         <div className="about-layout-card-left">
           <AboutCard header={"Mission"} content={"To provide a unified space where CCIS students can connect, collaborate, and grow through streamlined academic tools and peer-driven support."} />
         </div>

         <div className="about-layout-card-right">
           <AboutCard header={"Vision"} content={"To become the leading internal platform that fosters a culture of shared learning, academic excellence, and digital unity within CCIS."}/>
         </div>
         
     </div>

     <div className="about-footer">
         <p>Start connecting today. Explore study groups, organize projects, and stay updated with the CCIS community—all in one place.</p>
     </div>
    
  </div>
    

 </>
 );
}
export default AboutSection;