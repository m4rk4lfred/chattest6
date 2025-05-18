import '../../src/Css/Landingpagecss/Features.css';
import CardBox from './cardBox';  {/*importing the cardBox component*/}
import brandingIcon from '../../src/assets/ccislogo.svg'
import backgroundTriangle from '../../src/assets/triangleBackground.svg'

function Features(){
     {/*this will return the feature component*/}
   return(
    <>
       <div className="featuresSection" id='FeaturesSection'>
            <div className="featuresHeader">
                <h2><span className='design-1'>E</span>xplore the Features of CCIS Connect</h2>
            </div>
            
            <div className="feature-summary-card">
                 <CardBox imageSrc={brandingIcon}/>
                 <CardBox imageSrc={brandingIcon}/>
                 <CardBox imageSrc={brandingIcon}/>
                 <CardBox imageSrc={brandingIcon}/>
                 <CardBox imageSrc={brandingIcon}/>
                 <CardBox imageSrc={brandingIcon}/>
            </div>

            <div className="floating-ccis">
                <h2><span className='design-1'>C</span></h2>
                <h2>C</h2>
                <h2>I</h2>
                <h2>S</h2>
            </div>

            <img src={backgroundTriangle} alt="none" className='triangle-background-1'/>
   

       </div>

     
       
    </>
   );
}
export default Features;