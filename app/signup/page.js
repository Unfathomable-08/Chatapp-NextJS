"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState("");
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

  const submitFn = (data) => {
    setFormData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (formData !== "") {
        if (formData.password === formData.rePassword) {
          try {
            const res = await axios.post("/api/signup", formData);
            if (res.status === 201) {
              localStorage.setItem("token", res.data.token);
              router.push("/");
            }
          } catch (error) {
            alert("An error occurred while sending data!");
            console.log(error);
          }
        } else {
          setError("rePassword", {
            type: "manual",
            message: "Confirm password does not match the entered password",
          });
        }
      }
    };
    fetchData();
  }, [formData]);

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-600 to-blue-900">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <form onSubmit={handleSubmit(submitFn)}>
          <h2 className="text-center text-2xl font-semibold pb-6">Signup Form</h2>

          {/* Toggler */}
          <div className="mb-5 flex border border-gray-400 rounded-xl">
            <div className="w-1/2 text-center py-2">
              <Link href="/login" className="text-black">Login</Link>
            </div>
            <div className="w-1/2 text-center py-2 bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-lg">
              <Link href="/signup">Signup</Link>
            </div>
          </div>

          {/* Name Inputs */}
          <div className="grid grid-cols-2 gap-x-4">
            <input
              type="text"
              placeholder="First Name"
              {...register("first_name", { required: "First name is required" })}
              className="w-full border border-gray-400 p-2 rounded-xl"
            />
            <input
              type="text"
              placeholder="Last Name"
              {...register("last_name", { required: "Last name is required" })}
              className="w-full border border-gray-400 p-2 rounded-xl"
            />
          {errors.first_name && <p className="text-red-600 text-sm">{errors.first_name.message}</p>}
          {errors.last_name && <p className="text-red-600 text-sm">{errors.last_name.message}</p>}
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full border border-gray-400 p-2 rounded-xl mt-4"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

            {/* Username */}
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username name is required" })}
              className="w-full border border-gray-400 p-2 rounded-xl mt-4"
            />
            {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 4, message: "Must be at least 4 characters" },
              maxLength: { value: 30, message: "Must be less than 30 characters" },
            })}
            className="w-full border border-gray-400 p-2 rounded-xl mt-4"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("rePassword", {
              required: "Confirm password is required",
              minLength: { value: 4, message: "Must be at least 4 characters" },
              maxLength: { value: 30, message: "Must be less than 30 characters" },
            })}
            className="w-full border border-gray-400 p-2 rounded-xl mt-4"
          />
          {errors.rePassword && <p className="text-red-600 text-sm">{errors.rePassword.message}</p>}


          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white py-2 rounded-xl text-lg font-semibold"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;