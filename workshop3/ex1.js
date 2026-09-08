const STUDENTS =[
    { id: "6701", name: "som", major: "Computer Science", score: 78 },
    { id: "6702", name: "aom", major: "Business", score: 99 },
    { id: "6703", name: "arm", major: "Science", score: 52 },
    { id: "6704", name: "boom", major: "Engineering", score: 40 },
];

function fetchStudentById(id, callback) {
    setTimeout(() => {
        if (typeof id !== "string" || id === "") {
          return  callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));  
  }
  const student = STUDENTS.find((s) => s.id === id);
  if (!student) {
     return   callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`)); 
  }
    callback(null, { ...student });
  }, 300);
}

// ก) id ที่มีจริง 
fetchStudentById("6701", (error, student) => {
  if (error) {
    console.log("[มีจริง] error:", error.message);
    return;
  }
  console.log("[มีจริง] student:", student);
});

// ข) id ที่ไม่มีในฐานข้อมูล
fetchStudentById("9999", (error, student) => {
  if (error) {
    console.log("[ไม่มี] error:", error.message);
    return;
  }
  console.log("[ไม่มี] student:", student);
});

// ค) id ผิดรูปแบบ (ส่งเป็น number แทน string)
fetchStudentById(42, (error, student) => {
  if (error) {
    console.log("[ผิดรูปแบบ] error:", error.message);
    return;
  }
  console.log("[ผิดรูปแบบ] student:", student);
});

// ① ถ้าลืมตรวจ error แล้วอ่าน .name ทันที จะเกิดอะไร ใครเห็น error นั้น
// สั้น ๆ: ไม่เช็ก error เสี่ยงเจอ TypeError และโปรแกรม crash

// ② ทำไมต้อง return หลังเรียก callback(error)
// return หลัง callback(error) ป้องกันการเรียก callback ซ้ำ