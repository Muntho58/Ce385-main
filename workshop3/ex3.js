const STUDENTS = [
  { id: "6701", name: "som", major: "Computer Science", score: 78 },
  { id: "6702", name: "aom", major: "Business", score: 99 },
  { id: "6703", name: "arm", major: "Science", score: 52 },
  { id: "6704", name: "boom", major: "Engineering", score: 40 },
];


function fetchStudentById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const student = STUDENTS.find(s => s.id === id);
      if (student) {
        resolve(student);
      } else {
        reject(new Error("ไม่พบข้อมูลนักศึกษา"));
      }
    }, 300); 
  });
}


async function reportSequential(ids) {
  const start = Date.now(); 

  for (const id of ids) {
    const student = await fetchStudentById(id); 
    console.log(`พบข้อมูล: ${student.name} (เกรด ${student.score})`);
  }

  const elapsed = Date.now() - start; 
  console.log(`ใช้เวลา ${elapsed} ms`);
  return elapsed;
}

async function main() {
  const ids = ["6701", "6702", "6703"];
  await reportSequential(ids);
}

main();

// ส่วน2
async function reportParalle() {
    const start = Date.now();

    const students = await Promise.all(id => fetchStudentById(id));
    for (const student of students) {
        console.log(`พบข้อมูล: ${student.name} (เกรด ${student.score})`)
    }

}
