import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function StudentTable() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.getStudents().then((data) => {
      setStudents(data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      api.deleteStudent(id).then(() => {
        alert("Student removed successfully.");
        setStudents(students.filter((student) => student.id !== id));
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[#e1d5e4] p-6 sm:p-8">
      {/* Header section with Add Button and Title */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 relative">
        <Link
          to="/student/create"
          className="bg-[#4d324f] hover:bg-[#3b243d] text-white font-medium px-4 py-2 rounded-md text-sm transition shadow-sm self-start sm:self-auto"
        >
          Add new Student
        </Link>
        <div className="text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2 mt-4 sm:mt-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#563b59]">
            Student Records
          </h2>
          <p className="text-sm font-semibold text-[#a892b1] mt-0.5">
           
          </p>
        </div>
      </div>

      {/* Table section */}
      <div className="overflow-x-auto rounded-lg border border-[#d9cadb]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#6f4f79] text-white">
            <tr>
              <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-center w-20">
                SL NO
              </th>
              <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider">
                NAME
              </th>
              <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider">
                PLACE
              </th>
              <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider">
                PHONE
              </th>
              <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-center w-52">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-gray-700 divide-y divide-gray-100">
            {students && students.length > 0 ? (
              students.map((student, index) => {
                const isEven = index % 2 === 0;
                return (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      isEven ? "bg-white" : "bg-[#ebd1df]"
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center font-normal text-gray-600">
                      {index + 1}
                    </td>
                    <td className="py-3.5 px-4 font-normal text-gray-800">
                      {student.name}
                    </td>
                    <td className="py-3.5 px-4 font-normal text-gray-800">
                      {student.place}
                    </td>
                    <td className="py-3.5 px-4 font-normal text-gray-800">
                      {student.phone}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/student/view/${student.id}`}
                          className="bg-[#3bb81f] hover:bg-[#199bbd] text-white text-xs font-semibold px-3 py-1 rounded transition shadow-xs"
                        >
                          View
                        </Link>
                        <Link
                          to={`/student/edit/${student.id}`}
                          className="bg-[#c6199d] hover:bg-[#5b3e63] text-white text-xs font-semibold px-3 py-1 rounded transition shadow-xs"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(student.id)}
                          className="bg-[#e75353] hover:bg-[#cf4343] text-white text-xs font-semibold px-3 py-1 rounded transition shadow-xs cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="bg-white">
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No student records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
