"use client";
import {
  faArrowRight,
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/admin/schedule");
    }
  }, [currentUser, router]);

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { email, password } = formValues;
    try {
      await login(email, password);
      router.push("/admin/schedule");
    } catch (error) {
      console.log(error);
      setError("Incorrect login, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col w-screen md:w-[550px] items-center rounded-3xl mt-16 md:mt-40 p-4 md:bg-royalblue "
      onSubmit={handleSubmit}
    >
      <h2 className="mb-2">Admin Login</h2>
      {error && (
        <div className="flex items-center md:w-[500px] justify-between bg-red-200 text-red-500 border border-red-500 w-full rounded-md p-4 h-16 mb-2">
          <div className="flex items-center">
            <FontAwesomeIcon className="mr-4" icon={faCircleExclamation} />
            <p>{error}</p>
          </div>
          <FontAwesomeIcon
            className="ml-4"
            onClick={() => setError("")}
            icon={faXmark}
          />
        </div>
      )}
      <div className=" md:bg-darkblue md:p-4 rounded-3xl md:w-[500px] flex flex-col items-center w-full">
        <div className="flex items-start flex-col gap-x-2 w-full">
          <label htmlFor="email" className="text-sm m-3">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            name="email"
            value={formValues.email}
            className="bg-royalblue/50 rounded-3xl pl-6 w-full  h-10 text-xl"
            required
          />
        </div>
        <div className="flex items-start flex-col w-full gap-x-2">
          <label htmlFor="finishedSqft" className="text-sm m-3 ">
            Password
          </label>
          <input
            type="password"
            id="finishedSqft"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            className="bg-royalblue/50 rounded-3xl pl-6 w-full h-10 text-xl "
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full h-14 bg-teal group md:hover:bg-darkblue hover:bg-royalblue rounded-[100px] justify-center items-center p-1 transition-colors flex mt-6 relative ${loading ? "opacity-60" : ""}`}
          disabled={loading}
        >
          <p className={` font-extrabold text-2xl`}>
            {loading ? "Logging In..." : "Login"}
          </p>
          <div className="bg-royalblue group-hover:bg-teal rounded-[100px] h-12 w-12 flex items-center justify-center transition-colors absolute right-1">
            {loading ? (
              <div className="loader border-5 border-t-5 h-8 w-8  " />
            ) : (
              <FontAwesomeIcon className="h-8 w-8" icon={faArrowRight} />
            )}
          </div>
        </button>
      </div>
    </form>
  );
}
