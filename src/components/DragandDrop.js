import React, { useContext, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import DarkMode from "./DarkMode";

export default function FileUploader({ setDisplayUrl }) {
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkMode);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [haveItems, setHaveItems] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const filesWithProgress = acceptedFiles.map((file) => ({
        file,
        progress: 0,
      }));
      setUploadedFiles((prevFiles) => [...prevFiles, ...filesWithProgress]);

      const downloadURLs = [];
      let uploadedFileCount = 0;

      for (const file of acceptedFiles) {
        const iname = `${uuidv4()}__${file.name}`;
        const imageRef = ref(storage, `file/${iname}`);

        try {
          await uploadBytes(imageRef, file);

          const downloadURL = await getDownloadURL(imageRef);
          downloadURLs.push(downloadURL);

          uploadedFileCount++;
          if (uploadedFileCount === acceptedFiles.length) {
            const combinedUrl = downloadURLs.join("\n");
            setDisplayUrl(combinedUrl);
            console.log(combinedUrl);
          }
        } catch (error) {
          console.error("Error getting download URL:", error);
        }
      }
      setHaveItems(true);
    },
    [setDisplayUrl]
  );

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const getTotalFileSize = () => {
    return uploadedFiles.reduce((total, file) => total + file.file.size, 0);
  };

  return (
    <form
      className={`rounded-xl ${
        darkMode ? "bg-gray-300 text-white" : "bg-white text-black"
      }`}
    >
      {haveItems ? (
        <div
          {...getRootProps()}
          className={`border-2  border-dashed border-blue-800 rounded-xl px-1 py-2 max-h-[640px] flex flex-col justify-between h-full ${
            isDragActive ? "border-blue-500 bg-blue-100" : ""
          }`}
        >
          {uploadedFiles.map((fileData) => (
            <div
              className={`px-4 ${darkMode ? " text-gray-700 " : "text-black"}`}
              key={fileData.file.name}
            >
              <div className="p-4 rounded-xl flex flex-row justify-between items-center mb-2 bg-blue-100">
                <div className="flex flex-row">
                  <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center text-white font-bold">
                    {fileData.progress === 100
                      ? "100%"
                      : `${fileData.progress}%`}
                  </div>
                  <div className="ml-2">
                    <p className="font-bold">{fileData.file.name}</p>
                    <p>{`${(fileData.file.size / 1024).toFixed(2)} KB`}</p>
                  </div>
                </div>
                <div className="opacity-0 hover:opacity-100">
                  <div id="close">
                    <svg
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      height="16"
                      width="16"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={32}
                        d="M368 368L144 144M368 144L144 368"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex mt-auto justify-between items-center px-4 flex-row">
            <p>
              {`${uploadedFiles.length} file${
                uploadedFiles.length === 1 ? "" : "s"
              }, ${(getTotalFileSize() / 1024).toFixed(2)} KB in total`}
            </p>
            <div className="p-2 flex items-center rounded-xl bg-white hover:bg-blue-200">
              <div className="text-blue-700 focus-within:-translate-y-[2px] focus-within:bg-blue-900 focus-within:shadow-xl mr-2">
                Select more
              </div>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="36px"
                height="36px"
                className="text-blue-800 font-bold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2  border-dashed border-blue-800 rounded-xl px-1 py-2 max-h-[640px] flex flex-col justify-between h-full ${
            isDragActive ? "border-blue-500 bg-blue-100" : ""
          }`}
        >
          <input name="files" id="files" multiple className="hidden" />
          <div className="flex flex-col items-center m-auto ">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="36px"
              height="36px"
              className="text-blue-800 font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p
              className={`mt-2 font-bold text-sm sm:text-base ${
                darkMode ? "text-black" : "text-gray-700"
              } `}
            >
              {t("boxcomponent.dragtext")}
            </p>
            <p className="text-gray-700 font-bold text-sm sm:text-base">
              - {t("boxcomponent.or")} -
            </p>
            <button
              type="button"
              className="p-0 mt-2 rounded-xl bg-blue-800 hover:bg-blue-900 hover:shadow-xl text-white hover:-translate-y-[2px] focus-within:-translate-y-[2px] focus-within:bg-blue-900 focus-within:shadow-xl"
            >
              <label
                htmlFor="files"
                className="block px-5 py-3 cursor-pointer text-sm sm:text-base"
              >
                {t("boxcomponent.uploadtext")}
              </label>
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
