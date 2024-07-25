import React from "react";
import HomepageDivider from "./HomepageDivider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const Faqs = () => {
  const faqs = [
    {
      opened: false,
      question: "What does a home inspection cover?",
      answer:
        "A home inspection typically covers structural components, exterior features, roofing, plumbing systems, electrical systems, heating and cooling systems, interior components, insulation and ventilation, fireplaces and chimneys, and built-in appliances.",
    },
    {
      opened: false,
      question: "How long does a home inspection take?",
      answer:
        "A home inspection usually takes between 2 to 4 hours, depending on the size and condition of the property being inspected.",
    },
    {
      opened: false,
      question: "Do I need to be present during the inspection?",
      answer:
        "While not required, it's highly recommended to attend the inspection. Being present allows you to ask questions and understand the property's condition better.",
    },
    {
      opened: false,
      question: "What happens if the inspection reveals problems?",
      answer:
        "If the inspection reveals problems, you can request repairs, negotiate a price reduction, ask for a credit, or walk away from the deal if the issues are significant.",
    },
    {
      opened: false,
      question: "How should I prepare for a home inspection?",
      answer:
        "Ensure all utilities are on, provide access to areas that need inspection, gather necessary documents, secure pets, and clean the home to facilitate the inspector's work.",
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <HomepageDivider>
        <h1>FAQs</h1>
        <p>Need some answers?</p>
      </HomepageDivider>
      <div className="mt-4 mb-5 lg:w-1/2 max-w-[800px]">
        {faqs.map((faq) => (
          <div className="flex items-center justify-between m-6 bg-royalblue rounded-xl h-24 p-6 text-left">
            <h3 className="w-5/6">{faq.question}</h3>
            <FontAwesomeIcon icon={faPlus} className="text-teal h-10" />
          </div>
        ))}
      </div>
    </div>
  );
};
