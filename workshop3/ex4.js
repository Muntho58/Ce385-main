const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });

async function timeoutPromise(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout ${ms}ms`)), ms)
  );
}

async function main() { 
    try {
        const result1 = await Promise.all([  
            wait(300, "โปรไฟล์"),
            wait(400, "ตารางเรียน"),
            wait(500, "ประกาศ", false)
        ]);
        console.log("เปิดหน้าแรก: ...", result1);
    } catch (err) {
        console.log("หน้าแรกเปิดไม่ได้:", err.message);
    }

    const result2 = await Promise.allSettled([
        wait(300, "อีเมล"),
        wait(500, "SMS", true),
        wait(400, "แอป")
    ]);
    console.log("รายงานการแจ้งเตือน:", result2)

    try {
        const result3 = await Promise.any([
            wait(300, "mirror-A", true),
            wait(600, "mirror-B")
        ]);
        console.log("ใช้ข้อมูลจาก:", result3);
    } catch (err) {
        console.log("mirror ล้มหมด:", err.message);
    }

   try {
    const result4 = await Promise.race([
      wait(1200, "ฐานข้อมูล"),
      timeoutPromise(800)
    ]);
    console.log("ผลลัพธ์ฐาน:", result4);
  } catch (err) {
    console.log("เลิกรอ:", err.message);
  }
}

main ()

// หน้าแรก Promise.all เพราะต้องการ "ครบทุกชิ้น" ถ้ามีชิ้นเดียวล้มทั้งหมดล้ม
// แจ้งเตือน  Promise.allSettled เพราะต้องการ "รายงานทุกช่อง" แม้บางช่องล้มก็ยังเห็นสถานะ
// mirror server Promise.any เพราะต้องการ "ตัวแรกที่สำเร็จ" ไม่สนว่าตัวอื่นล้ม
// ฐานข้อมูล + timeout Promise.race เพราะต้องการ "ตัวแรกที่เสร็จ/พัง" เพื่อเลิกรอเมื่อ timeout ชนะ