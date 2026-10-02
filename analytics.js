// analytics.js
// Helper functions for generating analytical reports.

// Returns the average score of all students who took the given course.
export function calculateClassAverage(students, courseId) {
    const grades = students
      .map((student) => student.courses.find((c) => c.courseId === courseId))
      .filter((record) => record !== undefined)
      .map((record) => record.grade);
  
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + grade, 0);
    return total / grades.length;
  }
  
  // Uses .reduce() to return the Student with the highest overall average.
  export function findTopStudent(students) {
    if (students.length === 0) return null;
    return students.reduce((best, current) =>
      current.getAverage() > best.getAverage() ? current : best
    );
  }
  
  // Higher-order function: returns a new array of students for whom criteriaFn returns true.
  export function filterStudents(students, criteriaFn) {
    const result = [];
    for (const student of students) {
      if (criteriaFn(student) === true) {
        result.push(student);
      }
    }
    return result;
  }