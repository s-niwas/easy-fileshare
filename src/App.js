import React, { useContext } from "react";
import Header from "./components/Header";
import DarkMode from "./components/DarkMode";
import BoxComponent from "./components/BoxComponent";

function App() {
  const {darkMode} =useContext(DarkMode);
  return (
    <div className={ ` w-screen h-screen  ${
      darkMode ? "bg-black text-white" : "bg-white text-black"
    }`}>
      <Header />
      <BoxComponent/>
      
      </div>
    
  );
}

export default App;
