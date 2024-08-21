import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const { currentUser, login } = useAuth();

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const { email, password } = formValues;
    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex flex-col items-center rounded-3xl mt-40 p-4 md:bg-royalblue "
      onSubmit={handleSubmit}
    >
      <h2 className="mb-2">Admin Login</h2>
      <div className="m-4 md:bg-darkblue p-4 rounded-3xl md:w-[500px] flex flex-col items-center">
        <div className="flex items-start flex-col gap-x-2">
          <label htmlFor="finishedSqft" className="text-sm m-3">
            Email
          </label>
          <input
            type="email"
            id="finishedSqft"
            onChange={handleChange}
            name="email"
            value={formValues.email}
            className="bg-royalblue/50 rounded-3xl pl-6 w-80 h-10 text-xl"
            required
          />
        </div>
        <div className="flex items-start flex-col gap-x-2">
          <label htmlFor="finishedSqft" className="text-sm m-3 ">
            Password
          </label>
          <input
            type="password"
            id="finishedSqft"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            className="bg-royalblue/50 rounded-3xl pl-6 w-80 h-10 text-xl "
            required
          />
        </div>
        <button
          type="submit"
          className=" mt-6 w-80 h-14 bg-teal group hover:bg-royalblue rounded-[100px] items-center justify-between p-1 transition-colors flex"
        >
          <p className="font-extrabold ml-32 mr-2 text-2xl">Login</p>
          <div className="bg-royalblue group-hover:bg-teal rounded-[100px] h-12 w-12 flex items-center justify-center transition-colors">
            <FontAwesomeIcon className="h-8 w-8" icon={faArrowRight} />
          </div>
        </button>
      </div>
    </form>
  );
}
