const STUDENTS = [
  { id: "6701", name: "som", major: "Computer Science", score: 78 },
  { id: "6702", name: "aom", major: "Business", score: 99 },
  { id: "6703", name: "arm", major: "Science", score: 52 },
  { id: "6704", name: "boom", major: "Engineering", score: 40 },
];

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


async function reportSequential(ids) {
  console.log("=== Sequential ===");
  const start = Date.now();
  for (const id of ids) {
    const student = await fetchStudentByIdAsync(id);
    console.log("พบ:", student.name, "คะแนน:", student.score);
  }
  const end = Date.now();
  console.log("ใช้เวลา:", end - start, "ms");
}

async function reportParallel(ids) {
  console.log("=== Parallel ===");
  const start = Date.now();
  const results = await Promise.all(ids.map((id) => fetchStudentByIdAsync(id)));
  results.forEach((student) =>
    console.log("พบ:", student.name, "คะแนน:", student.score)
  );
  const end = Date.now();
  console.log("ใช้เวลา:", end - start, "ms");
}

async function safeReport(id) {
  console.log("=== SafeReport ===");
  try {
    const student = await fetchStudentByIdAsync(id);
    console.log(`พบข้อมูล: ${student.name} (เกรด ${student.score})`);
  } catch (error) {
    console.log(`ตรวจไม่พบ: ${error.message}`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`);
  }
}

async function main() {
  const ids = ["6701", "6702", "6703"];

  await reportSequential(ids);   
  await reportParallel(ids);     

  await safeReport("6701");     
  await safeReport("9999");     
  await safeReport(42);         
}

main();

// : ① ทำไม try-catch ครอบ await จับ reject ได้ แต่ครอบการเรียก callback ธรรมดาไม่ได้
// เพราะ await ทำให้ error เดินตามทางปกติของ try-catch, แต่ callback แยกโลกของมันเอง

//  ② ทดลอง "ลืม await" หน้า Promise.all แล้วเอาผลไปใช้ต่อ — เกิดอะไรขึ้น เขียนคำอธิบายประกอบ
//  ลืม await = ได้ Promise เปล่า ๆ ไม่ใช่ค่าที่ต้องการ