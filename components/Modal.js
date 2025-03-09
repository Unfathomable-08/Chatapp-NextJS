"use client";

import { useUserContext } from "@/Context";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Modal = ({ onClose }) => {
  const [userData] = useUserContext();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const submitFn = async (data) => {
    try {
      const res = await axios.post("/api/rooms", data);

      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      onClose();

    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000022] z-20 mx-8">
      <div className="bg-[#fefefe] p-8 rounded-2xl shadow-[0_0_20px_black] w-[500px]">
        <h1 className="text-2xl font-semibold mb-6 text-center">Create Room</h1>
        <form onSubmit={handleSubmit(submitFn)}>

          {/* Hidden Input */}
            <input
              type="text"
              hidden
              value={userData.username}
              {...register("owner", { required: "Owner is required!" })}
            />
            <input
              type="text"
              hidden
              value={[userData.username]}
              {...register("members", { required: "Room name is required!" })}
            />

          {/* Part Of Form */}

          <div className={errors.name ? "mb-0" : "mb-6"}>
            <label className="block text-md font-medium mb-1">Unique Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-800 rounded-lg focus:outline-none"
              {...register("name", { 
                required: "Room name is required!",
                pattern: {
                  value: /^[a-zA-Z0-9_-]+$/,
                  message: "Only letters, numbers, underscores, and hyphens are allowed!",
                }
              })}
            />
            { errors.name && <p className="text-red-600">{ errors.name.message }</p> }
          </div>
          <div className={errors.description ? "mb-0" : "mb-6"}>
            <label className="block text-md font-medium mb-1">Description</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-800 rounded-lg focus:outline-none"
              {...register("description", { required: "Room description is required!" })}
              />
            { errors.description && <p className="text-red-600">{ errors.description.message }</p> }
          </div>
          <div className={errors.password ? "mb-6" : "mb-12"}>
            <label className="block text-md font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-800 rounded-lg focus:outline-none"
              {...register("password", { required: "Password is required!" })}
              />
            { errors.password && <p className="text-red-600">{ errors.password.message }</p> }
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-6 py-2 font-medium border-[#112d4e] border-1 rounded-lg hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#112d4e] text-white rounded-lg hover:bg-[#1d2631]"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;