import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function CreateStudent() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || name.trim() === "") {
      setValidation(true);
      return;
    }

    const studentData = { name, place, phone };

    api.createStudent(studentData).then(() => {
      alert("Student created successfully!");
      navigate("/");
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-[#e1d5e4] p-6 sm:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#563b59]">Add New Student</h2>
        <p className="text-sm font-semibold text-[#a892b1] mt-0.5">
          Khaiser Khanam
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ID Field (Auto-generated/Disabled) */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            ID
          </label>
          <input
            type="text"
            disabled
            value="Auto Generated"
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 text-sm cursor-not-allowed"
          />
        </div>

        {/* Name Field */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (validation) setValidation(false);
            }}
            placeholder="Enter student name"
            className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 ${
              validation && !name
                ? "border-blue-500 focus:ring-red-200"
                : "border-green-300 focus:border-[#794f66] focus:ring-[#e1d5e4]"
            }`}
          />
          {validation && !name && (
            <span className="text-red-500 text-xs mt-1 block">Enter name</span>
          )}
        </div>

        {/* Place Field */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Place
          </label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Enter city / place"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#6f4f79] focus:ring-2 focus:ring-[#e1d5e4]"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#6f4f79] focus:ring-2 focus:ring-[#e1d5e4]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-3">
          <button
            type="submit"
            className="bg-[#6f4f79] hover:bg-[#5b3e63] text-white font-medium px-5 py-2 rounded-lg text-sm transition shadow-xs cursor-pointer"
          >
            Save
          </button>
          <Link
            to="/"
            className="bg-[#58e753] hover:bg-[#cf4343] text-white font-medium px-5 py-2 rounded-lg text-sm transition shadow-xs"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
