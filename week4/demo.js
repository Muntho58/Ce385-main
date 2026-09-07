// const STUDENTS = [
//   { id: "6501", name: "สมชาย", score: 78 },
//   { id: "6502", name: "สมหญิง", score: 92 },
// ];

// function fetchStudentById(id, callback) {
//   setTimeout(() => {
//     const student = STUDENTS.find((s) => s.id === id);
//     callback(student);            
//   }, 400);
// }

// fetchStudentById("6501", (student) => {
//     console.log("ได้ข้อมูล:", student.name);
// });
// console.log("บรรทัดนี้พิมพ์ด่อนได้ข้อมูล!");

// function fetchStudentSafe(id, callback) {
//   setTimeout(() => {
//     if (typeof id !== "string" || id.trim() === "") {
//       return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));  // พารามิเตอร์ 1 = error
//     }
//     const student = STUDENTS.find((s) => s.id === id);
//     if (!student) {
//       return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
//     }
//     callback(null, student);       // สำเร็จ: error = null, ข้อมูลอยู่พารามิเตอร์ 2
//   }, 400);
// }

// fetchStudentSafe("9999", (error, student) => {
//   if (error) return console.log("ล้มเหลว:", error.message); // ตรวจ error ก่อนเสมอ!
//   console.log("สำเร็จ  :", student.name);
// });

const STUDENTS = [{id: "6501", name: "สมชาย", score: 78}]

function fetchStudentById(id) {
    return new Promise((resolve) =>  {
    setTimeout(() => resolve(STUDENTS.find((s) => s.id === id)), 400);
    });
}

fetchStudentById("6501")
    .then((student) => {
        console.log("ขั้นที่ 1: ได้นักศึกษา =", student.name);
        return student.score;
    })
    .then((score) => {
        console.log("ขั้นที่ 2: ได้คะแนน =", score);
        return score >= 60 ? "B" : "F";
    })
    .then((grade) => {
        console.log("ขั้นที่ 3: ได้เกรด =", grade);
    });