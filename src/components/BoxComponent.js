import React,{useContext,useState} from "react";
import DarkMode from "./DarkMode";
import DragandDrop from "./DragandDrop";
import DragandDropSide from "./DragandDropSide"

export default function BoxComponent(){
    const [displayUrl,setDisplayUrl]=useState("");
    
    const {darkMode}=useContext(DarkMode);
    return(
        <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
    <div className="w-full max-w-lg lg:max-w-screen-lg mx-auto min-h-[560px] sm:min-h-[640px] my-8 p-4 rounded-xl grid grid-cols-1 lg:grid-cols-2 bg-white shadow-xl">
        <DragandDropSide displayUrl={displayUrl}/>
        <DragandDrop setDisplayUrl={setDisplayUrl} />
      </div>
      </div>
    );
}