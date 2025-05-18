import '../../src/Css/Landingpagecss/Features.css'


function CardBox(props){
  {/*card component for the features */}
    return(
        <>
           <div className="card-container">
              <div className="image-container">
                <img src= {props.imageSrc} alt="image.png" />
              </div>
              <p>HELLO CCIS</p>
           </div>
        </>
    );
} 
export default CardBox;