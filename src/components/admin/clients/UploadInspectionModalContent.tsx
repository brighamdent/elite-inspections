import { useAuth } from "@/context/AuthContext";
import { faArrowUp, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import { useAdminData } from "@/context/AdminDataContext";

export default function UploadInspectionModalContent({
  appointment,
  handleModalToggle,
}: {
  appointment: AppointmentType;
  handleModalToggle: any;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { updatePastAppointments, setUpdatePastAppointments } = useAdminData();

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
    setLoading(true);

    if (!file) {
      alert("Please select a file first.");
      setLoading(false);
      return;
    }

    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error("No user is currently signed in.");
        alert("User is not signed in.");
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();

      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!uploadResponse.ok) {
        const result = await uploadResponse.json();
        alert("Error uploading file: " + result.error);
        setLoading(false);
        return;
      }

      const uploadResult = await uploadResponse.json();
      const fileId = uploadResult.fileId;

      const setFileIdResponse = await fetch("/api/setFileId", {
        method: "POST",
        body: JSON.stringify({
          appointmentId: appointment.appointment_id,
          fileId,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!setFileIdResponse.ok) {
        const result = await setFileIdResponse.json();
        alert("Error setting file ID: " + result.error);
      } else {
        alert("File uploaded successfully!");
      }

      const inspectionReadyResponse = await fetch("/api/inspectionReady", {
        method: "POST",
        body: JSON.stringify({
          appointmentId: appointment.appointment_id,
          firstName: appointment.contact.first_name,
          lastName: appointment.contact.last_name,
          emailAddress: appointment.contact.email,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(inspectionReadyResponse);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    } finally {
      setUpdatePastAppointments(updatePastAppointments + 1);
      setLoading(false);
      handleModalToggle();
    }
  };

  return (
    <div className="md:w-[750px] md:bg-royalblue rounded-3xl md:mt-20 p-6 flex flex-col items-center">
      <h2 className="w-full md:text-left pb-2">Upload Inspection</h2>
      <div className="w-full">
        <div className="flex w-full items-center md:justify-start justify-center">
          <p className="text-center md:text-left mb-1">Personal Details:</p>
        </div>
        <div className="bg-royalblue/50 md:bg-darkblue rounded-3xl w-80 md:w-full p-5 text-left mb-4 ">
          <div className="flex flex-col items-start md:items-center md:flex-row">
            <p className="mr-1 text-xs md:text-base">Name:</p>
            <p className="text-xl md:text-[16px]">
              {appointment.contact.first_name} {appointment.contact.last_name}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-center md:flex-row">
            <p className="mr-1 text-xs md:text-base">Phone Number:</p>
            <p className="text-xl md:text-[16px]">
              {appointment.contact.phone_number}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-center md:flex-row">
            <p className="mr-1 text-xs md:text-base">Email:</p>
            <p className="text-xl md:text-[16px]">
              {appointment.contact.email}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex w-full items-center justify-center md:justify-start">
          <p className=" text-left mb-1">Property Details:</p>
        </div>
        <div className="bg-royalblue/50 md:bg-darkblue rounded-3xl w-80 md:w-auto p-5 text-left mb-4 space-y-2 md:space-y-0 ">
          <div className="flex flex-col items-start md:items-center md:flex-row">
            <p className="mr-1 text-xs md:text-base">Address:</p>
            <p className="text-xl md:text-[16px]">
              {appointment.property.address}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-center md:flex-row">
            <p className="mr-1 text-xs md:text-base">
              Total Finished Square Footage:
            </p>
            <p className="text-xl md:text-[16px]">
              {appointment.property.total_finished_square_feet}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-center md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <div className="flex flex-col items-start md:items-center md:flex-row">
              <p className="mr-1 text-xs md:text-base">Year Built:</p>
              <p className="text-xl md:text-[16px]">
                {appointment.property.year_built}
              </p>
            </div>
            <p className="text-teal font-extrabold hidden md:flex"> | </p>
            <div className="flex flex-col items-start md:items-center md:flex-row">
              <p className="mr-1 text-xs md:text-base">Foundation Type:</p>
              <p className="text-xl md:text-[16px]">
                {appointment.property.foundation_type}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-center md:flex-row md:space-x-2">
            <div className="flex flex-col items-start md:items-center md:flex-row space-y-2 md:space-y-0">
              <p className="mr-1 text-xs md:text-base">Beds:</p>
              <p className="text-xl md:text-[16px]">
                {appointment.property.beds}
              </p>
            </div>
            <p className="text-teal font-extrabold hidden md:flex"> | </p>
            <div className="flex flex-col items-start md:items-center md:flex-row">
              <p className="mr-1 text-xs md:text-base">Bath:</p>
              <p className="text-xl md:text-[16px]">
                {appointment.property.baths}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-center md:flex-row">
            <p className="mr-1 text-xs md:text-base">Notes:</p>
            <p className="text-xl md:text-[16px]">
              {appointment.property.notes}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <div className="flex flex-col md:flex-row items-center justify-around w-full">
          <div className="w-80 h-14 bg-darkblue p-1 rounded-[100px] flex items-center justify-between">
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
              className="rounded-[100px] bg-teal h-12 w-12 flex justify-center items-center"
            >
              <FontAwesomeIcon icon={faUpload} className="h-8 w-8" />
            </button>
          </div>
          <button
            type="button"
            className={`  mt-5 md:mt-0 w-80 h-14 bg-teal group md:hover:bg-darkblue hover:bg-royalblue rounded-[100px] items-center justify-between p-1 transition-colors flex ${loading ? "opacity-60" : ""}`}
            onClick={handleUpload}
            disabled={loading}
          >
            <p
              className={` font-extrabold  mr-2 text-2xl ${loading ? "ml-20" : "ml-24"} `}
            >
              {loading ? "Confirming..." : "Submit"}
            </p>
            <div
              className={` bg-royalblue group-hover:bg-teal rounded-[100px] h-12 w-12 flex items-center justify-center transition-colors`}
            >
              {loading ? (
                <div className="loader border-5 border-t-5 h-8 w-8  " />
              ) : (
                <FontAwesomeIcon className="h-8 w-8" icon={faArrowUp} />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
