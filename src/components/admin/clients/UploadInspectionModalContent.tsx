import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";

export default function UploadInspectionModalContent({
  appointment,
}: {
  appointment: AppointmentType;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);

      const fileUrl = URL.createObjectURL(selectedFile);
      setFilePreviewUrl(fileUrl);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("Error uploading file: " + result.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div className="md:w-[750px] md:bg-royalblue rounded-3xl md:mt-20 pt-6 pb-6 flex flex-col items-center">
      <div>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <div className="w-80 bg-darkblue p-2 rounded-[100px] flex items-center justify-between">
          <p className="font-bold w-64 overflow-hidden text-ellipsis whitespace-nowrap">
            {file ? (
              <a
                href={filePreviewUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline hover:text-teal"
              >
                {file.name}
              </a>
            ) : (
              "No File Chosen"
            )}
          </p>
          <button
            type="button"
            onClick={handleButtonClick}
            className="rounded-[100px] bg-teal h-14 w-14 flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faUpload} className="h-8 w-8" />
          </button>
        </div>
      </div>
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}
