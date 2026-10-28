import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateStudent from "./components/CreateStudent";
import EditStudent from "./components/EditStudent";
import StudentDetails from "./components/StudentDetails";
import StudentTable from "./components/StudentTable";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f1f3f6] py-10 px-4 sm:px-6">
        <Routes>
          <Route path="/" element={<StudentTable />} />
          <Route path="/student/create" element={<CreateStudent />} />
          <Route path="/student/edit/:id" element={<EditStudent />} />
          <Route path="/student/view/:id" element={<StudentDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
