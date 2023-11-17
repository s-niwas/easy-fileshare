import React,{useContext,useState} from "react";
import { useTranslation } from "react-i18next";
import DarkMode from "./DarkMode";

export default function DragandDropSide({ displayUrl }){
    const { t } = useTranslation();
    const {darkMode}=useContext(DarkMode);
    const [copySuccess, setCopySuccess] = useState(false);
  const [showShareMessage, setShowShareMessage] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 300);
  };

  const handleShareClick = () => {
    setShowShareMessage(true);
    setTimeout(() => setShowShareMessage(false), 500);
  };
  const getFileNameFromUrl = () => {
    const urlParts = displayUrl.split("/");
    return urlParts[urlParts.length - 1];
  };

    return(
        <div className={`hidden rounded-xl lg:flex flex-col items-center justify-center p-2 ${
          darkMode ? " bg-gray-300 text-black" : "bg-white text-black"
        }`}>
        <div className="flex flex-col items-center pb-8">
          <h1 className="text-4xl font-bold">{t("header.title")}</h1>
          <p className="text-lg">{t("boxcomponent.descriptiontext")}</p>
          { displayUrl?(
            
            <div className="flex flex-col px-28 justify-between items-center mt-4">
          <div className="flex flex-row items-center w-80 h-10">
          <div
            className="p-1 border border-gray-300 rounded-md h-8 overflow-hidden "
            
          >
          <a
            href={displayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-blue-800 rounded-md "
            download={getFileNameFromUrl()}
          >
            {displayUrl}
            </a>
          </div>
          
          <div className="flex items-center">
            <div className="p-2 cursor-pointer" onClick={copyToClipboard}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><rect width="336" height="336" x="128" y="128" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" rx="57" ry="57"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"/></svg>
            </div>
            <div className="p-2 cursor-pointer" onClick={handleShareClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M336 192h40a40 40 0 0 1 40 40v192a40 40 0 0 1-40 40H136a40 40 0 0 1-40-40V232a40 40 0 0 1 40-40h40m160-64l-80-80l-80 80m80 193V48"/></svg>
            </div>
          </div>
          </div>
       <div className="flex flex-col">
        {copySuccess && (
          <div className="mt-2 text-green-500">URL copied to clipboard!</div>
        )}
        {showShareMessage && (
          <div className="mt-2 text-blue-500">
            Feature coming soon! Stay tuned.
          </div>
        )}
        </div>
        </div>
            ):(<></>)}
        </div>
      </div>  
    )
}