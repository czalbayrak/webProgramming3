// models.js
// Data model for the University Course Management System.

export class Student {
    /**
     * @param {number} id - Unique student ID (read-only, cannot be deleted)
     * @param {string} name - Student's name
     * @param {Array<{courseId: number, grade: number}>} courses - Course records
     */
    constructor(id, name, courses = []) {
      // Immutability requirement: id is defined with Object.defineProperty
      Object.defineProperty(this, "id", {
        value: id,
        writable: false,     // cannot be changed
        configurable: false, // cannot be deleted or redefined
        enumerable: true,    // still shows up in console.log / Object.keys
      });
  
      this.name = name;
      // Copy the course objects so the raw data is not shared by reference
      this.courses = courses.map((c) => ({ courseId: c.courseId, grade: c.grade }));
    }
  
    // Adds a new course record to the student's list
    addCourse(courseId, grade) {
      this.courses.push({ courseId, grade });
    }
  
    // Returns the average grade across all of the student's courses
    getAverage() {
      if (this.courses.length === 0) return 0;
      const total = this.courses.reduce((sum, course) => sum + course.grade, 0);
      return total / this.courses.length;
    }
  }
  
  export default Student;