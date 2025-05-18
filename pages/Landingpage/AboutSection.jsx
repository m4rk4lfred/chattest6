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
           <AboutCard />
         </div>
         
         <div className="about-layout-card-left">
           <AboutCard />
         </div>

         <div className="about-layout-card-right">
           <AboutCard />
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