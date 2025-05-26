import '../../src/Css/Landingpagecss/About.css';

function AboutSectionCard({header , content}){
   {/*card component for the about section*/}
   return(
    <>
       <div className="about-card-container">
           <h4>{header}</h4>
           <p>{content}</p>
       </div>
    </>
   );
}
export default AboutSectionCard;