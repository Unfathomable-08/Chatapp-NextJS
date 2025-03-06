"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUserContext } from "@/Context";

const Login = () => {
  const [, setUserData] = useUserContext();

  const router = useRouter();
  const [formData, setFormData] = useState("");
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

  const submitFn = async (data) => {
    try {
      const res = await axios.post("/api/login", data);
      if (res.status === 200) {
        setUserData({
          name: res.data.data.first_name + res.data.data.last_name,
          email: res.data.data.email,
          username: res.data.data.username
        });
        localStorage.setItem("token", res.data.token);
        router.push("/");
      }
    } catch (error) {
      console.log(error)
      setError("email", { type: "manual", message: "Invalid email or password" });
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-600 to-blue-900">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <form onSubmit={handleSubmit(submitFn)}>
          <h2 className="text-center text-2xl font-semibold pb-6">Login Form</h2>

          {/* Toggler */}
          <div className="mb-5 flex border border-gray-400 rounded-lg">
            <div className="w-1/2 text-center py-2 bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-xl">
              <Link href="/login">Login</Link>
            </div>
            <div className="w-1/2 text-center py-2">
              <Link href="/signup" className="text-black">Signup</Link>
            </div>
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email Or Username"
            {...register("email", {
              required: "Email is required"
            })}
            className="w-full border border-gray-400 p-2 rounded-xl mt-4"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

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

          {/* Forgot Password */}
          <div className="text-right mt-2">
            <Link href="/forgot-password" className="text-blue-600 text-sm">Forgot Password?</Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white py-2 rounded-xl text-lg font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
