function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== "string" || id === "") {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }

    setTimeout(() => {
      const student = STUDENTS.find((s) => s.id === id);
      if (student) resolve({ ...student });
      else reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }, 300);
  });
}
