const API_URL = "http://localhost:8000/students";

export const INITIAL_STUDENTS = [
  { id: "1", name: "kiran", place: "kadiri", phone: "9876534540" },
  { id: "2", name: "santosh", place: "Anantapur", phone: "9876543231" },
  { id: "3", name: "ravi", place: "Bengaluru", phone: "9878767521" },
  { id: "4", name: "Anil", place: "Mysore", phone: "9786767641" },
];

function getLocalStudents() {
  const data = localStorage.getItem("students");
  if (!data) {
    localStorage.setItem("students", JSON.stringify(INITIAL_STUDENTS));
    return INITIAL_STUDENTS;
  }
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : INITIAL_STUDENTS;
  } catch {
    return INITIAL_STUDENTS;
  }
}

function saveLocalStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

export const api = {
  async getStudents() {
    try {
      const res = await fetch(API_URL, { signal: AbortSignal.timeout(1000) });
      if (res.ok) {
        const data = await res.json();
        saveLocalStudents(data);
        return data;
      }
    } catch {
      // json-server not active, gracefully use localStorage
    }
    return getLocalStudents();
  },

  async getStudentById(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { signal: AbortSignal.timeout(1000) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback to localStorage
    }
    const students = getLocalStudents();
    return students.find((s) => String(s.id) === String(id)) || null;
  },

  async createStudent(studentData) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
        signal: AbortSignal.timeout(1000),
      });
      if (res.ok) {
        const created = await res.json();
        const local = getLocalStudents();
        saveLocalStudents([...local, created]);
        return created;
      }
    } catch {
      // fallback to localStorage
    }
    const local = getLocalStudents();
    const nextId =
      local.length > 0
        ? String(Math.max(...local.map((s) => Number(s.id) || 0)) + 1)
        : "1";
    const newStudent = { id: nextId, ...studentData };
    saveLocalStudents([...local, newStudent]);
    return newStudent;
  },

  async updateStudent(id, studentData) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
        signal: AbortSignal.timeout(1000),
      });
      if (res.ok) {
        const updated = await res.json();
        const local = getLocalStudents().map((s) =>
          String(s.id) === String(id) ? updated : s
        );
        saveLocalStudents(local);
        return updated;
      }
    } catch {
      // fallback to localStorage
    }
    const local = getLocalStudents();
    const updated = { id: String(id), ...studentData };
    saveLocalStudents(
      local.map((s) => (String(s.id) === String(id) ? updated : s))
    );
    return updated;
  },

  async deleteStudent(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        signal: AbortSignal.timeout(1000),
      });
    } catch {
      // fallback to localStorage
    }
    const local = getLocalStudents().filter((s) => String(s.id) !== String(id));
    saveLocalStudents(local);
    return true;
  },
};
