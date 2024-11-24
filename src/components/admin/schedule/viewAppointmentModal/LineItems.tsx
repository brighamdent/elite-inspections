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
  updateQuoteState,
}: {
  serviceDetailsId: number;
  initialLineItems: SingleLineItem[];
  quoteAmount: number;
  updateQuoteState: () => void;
}) {
  const [input, setInput] = useState({
    description: "",
    amount: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [lineItems, setLineItems] =
    useState<SingleLineItem[]>(initialLineItems);
  const { setCurrentMonthAppointments } = useAdminData();

  const addLineItem = async (e: FormEvent) => {
    e.preventDefault();

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
        updateQuote(newQuote);
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
                service_details: {
                  ...appointment.service_details,
                  quote_amount: newQuote,
                },
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
    const amountToDelete =
      lineItems.find((lineItem) => lineItem.line_item_id === id)?.amount ?? 0;
    const newQuote = quoteAmount - amountToDelete;
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error("No user is currently signed in.");
        alert("User is not signed in.");
        return;
      }
      const token = await user.getIdToken();
      const res = await fetch("/api/lineItems", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          newQuote,
        }),
      });
      if (res.ok) {
        updateQuote(newQuote);
        setCurrentMonthAppointments((previousAppointments) =>
          previousAppointments.map((appointment) => {
            if (appointment.service_details_id === serviceDetailsId) {
              return {
                ...appointment,
                service_details: {
                  ...appointment.service_details,
                  quote_amount: newQuote,
                },
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

  const updateQuote = async (quote: number) => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error("No user is currently signed in.");
        alert("User is not signed in.");
        return;
      }
      const token = await user.getIdToken();
      const quoteRes = await fetch("/api/updateQuote", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceDetailsId,
          quoteAmount: quote,
        }),
      });
    } catch (error) {
      console.log("Error updating quote", error);
    }
  };

  const handleChange = (event: ChangeEvent, number?: boolean) => {
    const { name, value } = event.target as HTMLInputElement;
    let newValue = value;
    if (number) {
      newValue = value.replace(/\D/g, "");
    }

    setInput({ ...input, [name]: newValue });
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
                  <p className="mr-14">${Number(lineItem.amount).toFixed(2)}</p>
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
          <form
            onSubmit={addLineItem}
            className="w-full flex justify-between items-center"
          >
            <input
              placeholder="Description"
              name="description"
              value={input.description}
              onChange={(e) => handleChange(e, false)}
              className="bg-royalblue/50 rounded-3xl p-2 w-full mr-4"
              required
            />
            <div className="flex items-center">
              <span className="mr-1">$</span>
              <input
                className="mr-4 rounded-3xl bg-royalblue/50 p-2 w-28"
                name="amount"
                value={input.amount}
                onChange={(e) => handleChange(e, true)}
                placeholder="Amount"
                required
              />
              <button
                type="submit"
                className="bg-teal rounded-3xl w-6 h-6 mb-2 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
