"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContactDetailsData {
  person: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  finishedSqft: number;
  yearBuilt: number | string;
  foundationType: string;
  bedCount: number | string;
  bathCount: number | string;
  notes: string;
}

interface ServiceDetailsData {
  inspectionType: string;
  quoteAmount: number | string;
  extraSqft: number;
  poolInspection: false;
  windMitigation: false;
}

interface AppointmentContextType {
  date: DateData;
  setDate: React.Dispatch<React.SetStateAction<DateData>>;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  currentStage: number;
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
  contactDetails: ContactDetailsData;
  setContactDetails: React.Dispatch<React.SetStateAction<ContactDetailsData>>;
  serviceDetails: ServiceDetailsData;
  setServiceDetails: React.Dispatch<React.SetStateAction<ServiceDetailsData>>;
  makeAppointment: () => Promise<void>;
  sendAppointmentConfirmation: () => Promise<void>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined,
);

export function useAppointment(): AppointmentContextType {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error(
      "useAppointment must be used within an AppointmentProvider",
    );
  }
  return context;
}

export function AppointmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStage, setCurrentStage] = useState(1);
  const [date, setDate] = useState<DateData>({
    month: null,
    day: null,
    year: null,
    dayOfWeek: null,
    monthName: null,
  });
  const [selectedTime, setSelectedTime] = useState("");
  const [contactDetails, setContactDetails] = useState<ContactDetailsData>({
    person: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    address: "",
    finishedSqft: 0,
    yearBuilt: "",
    foundationType: "",
    bedCount: "",
    bathCount: "",
    notes: "",
  });
  const [serviceDetails, setServiceDetails] = useState<ServiceDetailsData>({
    inspectionType: "",
    quoteAmount: 0,
    extraSqft: 0,
    poolInspection: false,
    windMitigation: false,
  });
  const makeAppointment = async () => {
    const {
      person,
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      address,
      finishedSqft,
      yearBuilt,
      foundationType,
      bedCount,
      bathCount,
      notes,
    } = contactDetails;
    const {
      inspectionType,
      quoteAmount,
      extraSqft,
      poolInspection,
      windMitigation,
    } = serviceDetails;
    console.log(windMitigation);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          selectedTime,
          person,
          firstName,
          lastName,
          phoneNumber,
          emailAddress,
          address,
          finishedSqft,
          yearBuilt,
          foundationType,
          bedCount,
          bathCount,
          notes,
          inspectionType,
          quoteAmount,
          extraSqft,
          poolInspection,
          windMitigation,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        // setMessage(result.message);
      } else {
        throw Error("Something went wrong while connecting to our database.");
      }
    } catch (error) {
      throw Error("Something went wrong while connecting to our database.");
      // setMessage("Error scheduling appointment");
      console.log(error);
    }
  };
  const sendAppointmentConfirmation = async () => {
    const {
      person,
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      address,
      finishedSqft,
      yearBuilt,
      foundationType,
      bedCount,
      bathCount,
      notes,
    } = contactDetails;

    try {
      const response = await fetch("/api/appointmentConfirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          selectedTime,
          firstName,
          lastName,
          phoneNumber,
          emailAddress,
          address,
          finishedSqft,
          yearBuilt,
          foundationType,
          bedCount,
          bathCount,
          notes,
        }),
      });
      if (response.ok) {
        console.log("Email Sent");
      } else {
        throw Error(
          "Something went wrong while sending the confirmation email.",
        );
      }
    } catch (error) {
      console.log(error);
      throw Error("Something went wrong while sending the confirmation email.");
    }
  };
  return (
    <AppointmentContext.Provider
      value={{
        date,
        setDate,
        selectedTime,
        setSelectedTime,
        currentStage,
        setCurrentStage,
        contactDetails,
        setContactDetails,
        serviceDetails,
        setServiceDetails,
        makeAppointment,
        sendAppointmentConfirmation,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
