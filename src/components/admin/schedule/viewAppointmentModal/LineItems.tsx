import { faCheck, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/compat/app";
import useScrollToBottom from "@/hooks/useScrollToBottom";
import { useAdminData } from "@/context/AdminDataContext";

export default function LineItems({
  serviceDetailsId,
  initialLineItems,
  quoteAmount,
}: {
  serviceDetailsId: number;
  initialLineItems: SingleLineItem[];
  quoteAmount: number;
}) {
  const [input, setInput] = useState({
    description: "",
    amount: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [lineItems, setLineItems] =
    useState<SingleLineItem[]>(initialLineItems);
  const { setCurrentMonthAppointments } = useAdminData();

  const addLineItem = async () => {
    const { description, amount } = input;
    const lineItemId = uuidv4();
    const amountFormatted = Number(amount);
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error("No user is currently signed in.");
        alert("User is not signed in.");
        // setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      const res = await fetch("/api/lineItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lineItemId,
          description,
          amount: amountFormatted,
          serviceDetailsId,
        }),
      });
      if (res.ok) {
        const newQuote = amountFormatted + quoteAmount;
        const quoteRes = await fetch("/api/updateQuote", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            serviceDetailsId,
            quoteAmount: newQuote,
          }),
        });
        if (quoteRes.ok) {
          console.log("worked");
        }
        const newLineItem = {
          line_item_id: lineItemId,
          description,
          amount: amountFormatted,
          service_details_id: Number(serviceDetailsId),
        };
        setCurrentMonthAppointments((prevAppointments) =>
          prevAppointments.map((appointment) => {
            if (
              appointment.service_details.service_details_id ===
              serviceDetailsId
            ) {
              return {
                ...appointment,
                line_items: [...appointment.line_items, newLineItem],
              };
            } else return appointment;
          }),
        );
        setLineItems([...lineItems, newLineItem]);
        setIsAdding(false);
        setInput({
          description: "",
          amount: "",
        });
      }
    } catch (error) {}
  };

  const deleteLineItem = async (id: string) => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error("No user is currently signed in.");
        alert("User is not signed in.");
        // setLoading(false);
        return;
      }
      console.log(lineItems);
      const token = await user.getIdToken();
      const res = await fetch("/api/lineItems", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
        }),
      });
      if (res.ok) {
        setCurrentMonthAppointments((previousAppointments) =>
          previousAppointments.map((appointment) => {
            if (appointment.service_details_id === serviceDetailsId) {
              return {
                ...appointment,
                line_items: appointment.line_items.filter(
                  (lineItem) => lineItem.line_item_id !== id,
                ),
              };
            }
            return appointment;
          }),
        );
        const newLineItems = lineItems.filter(
          (lineItem) => lineItem.line_item_id !== id,
        );
        setLineItems(newLineItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setInput({ ...input, [name]: value });
  };

  useScrollToBottom("item", lineItems);

  return (
    <div className="w-full bg-darkblue rounded-3xl p-4 mb-4">
      <div className="flex items-center mb-2">
        <h3 className="mr-4 ">Line Items</h3>
        <button
          type="button"
          className="rounded-3xl w-8 h-8 bg-teal"
          onClick={() => setIsAdding(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div>
        {lineItems.length === 0 && !isAdding ? (
          <div className="w-full ">
            <p className="w-full text-left opacity-50">
              There are no line items to display.
            </p>
          </div>
        ) : (
          <div className="max-h-40 overflow-scroll" id="item">
            {lineItems?.map((lineItem) => (
              <div
                className="w-full flex justify-between items-center mb-2"
                key={lineItem.line_item_id}
              >
                <p className="ml-2">{lineItem.description}</p>
                <div className="flex items-center">
                  <p className="mr-14">${lineItem.amount}</p>
                  <button
                    type="button"
                    className="bg-royalblue/50 rounded-3xl w-6 h-6 flex items-center justify-center"
                    onClick={() => deleteLineItem(lineItem.line_item_id)}
                  >
                    <FontAwesomeIcon icon={faX} className="h-3 w-3 " />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {isAdding && (
          <div className="w-full flex justify-between items-center">
            <input
              placeholder="Description"
              name="description"
              onChange={handleChange}
              className="bg-royalblue/50 rounded-3xl p-2 w-full mr-4"
            />
            <div className="flex items-center">
              <input
                className="mr-4 rounded-3xl bg-royalblue/50 p-2 w-28"
                name="amount"
                onChange={handleChange}
                placeholder="Amount"
              />
              <button
                type="button"
                className="bg-teal rounded-3xl w-6 h-6 mb-2 flex items-center justify-center"
                onClick={addLineItem}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
