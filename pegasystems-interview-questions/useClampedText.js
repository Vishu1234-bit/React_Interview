import {useState,useEffect} from "react";
export default function useClampedText(text,font,padding){
    const [clampText,setClampText] = useState(text);
    useEffect(()=>{
        const screenWidth = window.innerWidth - padding;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.font=font;
        const textWidth = context.measureText(text).width;
        const lineCount = Math.ceil(textWidth/screenWidth);
        if(lineCount<2){
            setClampText(text);
        }
        else{
            let truncated = clampText;
            while(context.measureText(truncated+"...").width>screenWidth*2 && truncated.length>0){
                truncated = truncated.slice(0,-1);
            }
            setClampText(truncated+"...");
        }
    },[text,font,padding]);
    return clampText;
}
