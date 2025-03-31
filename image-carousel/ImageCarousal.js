import {useState} from "react";
export default function ImageCarousel({ images }) {
  const [currImageSrcIndex,setcurrImageSrcIndex] = useState(0);
  function changeNextImage(currImageSrcIndex){
    setcurrImageSrcIndex((prevIndex)=>(prevIndex+1)%images.length);
  }
  function changePrevImage(currImageSrcIndex){
    setcurrImageSrcIndex((prevIndex)=>(prevIndex-1+images.length)%images.length);
  }
  function changeToImgAtIndex(index){
    setcurrImageSrcIndex(index);
  }
  return (
    <div>
      <img key={images[currImageSrcIndex].src} 
      alt={images[currImageSrcIndex].alt} 
      src={images[currImageSrcIndex].src} 
      width="100%"
      className="image" />
      <button
      className="nav-button left" 
      onClick={()=>changePrevImage(currImageSrcIndex)}>⬅</button>
      <button 
      className="nav-button right" 
      onClick={()=>changeNextImage(currImageSrcIndex)}>➡</button>
      <div
      className="indicator-container">
      {images?.map((_,index)=>{
        return(
        <button 
        key={index} 
        className = {`indicator-wrapper ${currImageSrcIndex==index?'active':''}`}
        onClick={()=>changeToImgAtIndex(index)}>
        </button>
        )
      })}
      </div>
    </div>
  );
}
