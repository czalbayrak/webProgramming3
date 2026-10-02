// database.js
// Simulates a slow database connection using setTimeout and a callback.

const rawData = [
    { id: 1, name: "Ali", courses: [{ courseId: 101, grade: 90 }, { courseId: 102, grade: 85 }] },
    { id: 2, name: "Zeynep", courses: [{ courseId: 101, grade: 70 }, { courseId: 102, grade: 95 }] },
    { id: 3, name: "Ahmet", courses: [{ courseId: 101, grade: 60 }, { courseId: 102, grade: 55 }] },
  ];
  
  export function fetchStudents(callback) {
    // Simulate a 2-second network/database delay
    setTimeout(() => {
      callback(rawData);
    }, 2000);
  }