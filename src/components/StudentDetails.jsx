import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";

export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getStudentById(id).then((data) => {
      setStudent(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-[#e1d5e4] p-8 text-center text-gray-500">
        Loading student details...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-[#e1d5e4] p-8 text-center">
        <p className="text-gray-600 mb-4">Student record not found.</p>
        <Link
          to="/"
          className="bg-[#6f4f79] hover:bg-[#5b3e63] text-white font-medium px-5 py-2 rounded-lg text-sm transition"
        >
          Back to Listing
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-[#e1d5e4] p-6 sm:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#563b59]">Student Details</h2>
        <p className="text-sm font-semibold text-[#a892b1] mt-0.5">
          Khaiser Khanam
        </p>
      </div>

      {/* Details Box */}
      <div className="bg-[#fbf8fa] border border-[#ecdfe7] rounded-xl p-6 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
            Student Information
          </span>
          <h3 className="text-xl font-bold text-[#563b59]">
            {student.name}{" "}
            <span className="text-sm font-normal text-gray-500">
              (ID: {student.id})
            </span>
          </h3>
        </div>

        <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-gray-800">Place: </span>
            {student.place || "N/A"}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-gray-800">Phone: </span>
            {student.phone || "N/A"}
          </p>
        </div>
      </div>

      {/* Back button */}
      <div className="mt-6">
        <Link
          to="/"
          className="bg-[#e75353] hover:bg-[#cf4343] text-white font-medium px-5 py-2 rounded-lg text-sm transition shadow-xs inline-block"
        >
          Back to Listing
        </Link>
      </div>
    </div>
  );
}
