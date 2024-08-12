import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppointmentContextType {
  appointmentTime: string;
  setAppointmentTime: React.Dispatch<React.SetStateAction<string>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined,
);

export function AppointmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [appointmentTime, setAppointmentTime] = useState("");
  const [contactDetailsForm, setContactDetailsFrom] = useState({
    person: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    finishedSqft: null,
    yearBuilt: null,
    foundationType: "",
    notes: "",
  });
  const [serviceDetails, setServiceDetails] = useState({
    inspectionType: "",
    quote: "",
  });
  return (
    <AppointmentContext.Provider
      value={{
        appointmentTime,
        setAppointmentTime,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
