// main.js
// Entry point: fetches the data and prints the analytics report.

import { Student } from "./models.js";
import { fetchStudents } from "./database.js";
import { calculateClassAverage, findTopStudent, filterStudents } from "./analytics.js";

console.log("Fetching data from database...");

fetchStudents((rawData) => {
  console.log("Data received!\n");

  // 1. Convert raw data into real Student instances
  const students = rawData.map((s) => new Student(s.id, s.name, s.courses));

  // 2. Prove that the id is immutable
  console.log("Testing Immutability:");
  const originalId = students[0].id;
  console.log(`Original ID: ${originalId}`);
  console.log("Attempting to change ID to 999...");
  try {
    // ES modules run in strict mode, so assigning to a read-only
    // property throws a TypeError instead of failing silently.
    students[0].id = 999;
  } catch (err) {
    console.log(`(Caught ${err.name}: ${err.message})`);
  }
  const success = students[0].id === originalId;
  console.log(
    `Final ID: ${students[0].id} (${success ? "Success: ID did not change" : "Failed: ID changed"})\n`
  );

  // 3. Analytics report
  console.log("--- Analytics Report ---");

  const avg101 = calculateClassAverage(students, 101);
  console.log(`Class Average for Course 101: ${avg101.toFixed(2)}`);

  const top = findTopStudent(students);
  console.log(`Top Student: ${top.name} (Average: ${top.getAverage()})`);

  const in102 = filterStudents(students, (student) =>
    student.courses.some((c) => c.courseId === 102)
  );
  console.log(`Students in Course 102: ${in102.map((s) => s.name).join(", ")}`);
});