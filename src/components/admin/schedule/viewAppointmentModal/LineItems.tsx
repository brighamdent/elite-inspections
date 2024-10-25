import { faCheck, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function LineItems() {
  const [lineItems, setLineItems] = useState<LineItems[]>([]);
  const [input, setInput] = useState({
    description: "",
    amount: "",
  });
  let service_details_id = 4;
  const [isAdding, setIsAdding] = useState(false);

  const addLineItem = () => {
    const { description, amount } = input;
    setLineItems([
      ...lineItems,
      {
        line_items_id: uuidv4(),
        description,
        amount: Number(amount),
        service_details_id,
      },
    ]);
    setIsAdding(false);
    setInput({
      description: "",
      amount: "",
    });
  };

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

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
          <div className="w-full">
            <p className="w-full text-left opacity-50">
              There are no line items to display.
            </p>
          </div>
        ) : (
          lineItems.map((lineItem) => (
            <div
              className="w-full flex justify-between items-center mb-2"
              key={lineItem.line_items_id}
            >
              <p className="ml-2">{lineItem.description}</p>
              <div className="flex items-center">
                <p className="mr-14">${lineItem.amount}</p>
                <button
                  type="button"
                  className="bg-royalblue/50 rounded-3xl w-6 h-6 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faX} className="h-3 w-3 " />
                </button>
              </div>
            </div>
          ))
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
