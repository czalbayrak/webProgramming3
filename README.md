# University Course Management System — Assignment 3

A small JavaScript (Node.js, ES modules) project that fetches student data from a simulated
asynchronous "database", models it with ES6 classes that have immutable IDs, and prints an
analytics report.

## How to run

Requires Node.js (v14 or newer).

```bash
node main.js
# or
npm start
```

## File organization

| File | Responsibility |
|------|----------------|
| `models.js` | Defines and exports the `Student` class. The `id` is created with `Object.defineProperty()` as `writable: false` and `configurable: false`, so it can't be changed or deleted. Includes `addCourse(courseId, grade)` and `getAverage()`. |
| `database.js` | Exports `fetchStudents(callback)`, which uses `setTimeout` to wait 2 seconds and then passes the raw student data to the callback. |
| `analytics.js` | Exports `calculateClassAverage(students, courseId)`, `findTopStudent(students)` (built with `.reduce()`), and the higher-order function `filterStudents(students, criteriaFn)`. |
| `main.js` | Entry point. Calls `fetchStudents`, turns the raw data into `Student` instances inside the callback, tests ID immutability, and prints the analytics report. |
| `package.json` | Sets `"type": "module"` so `import`/`export` work in Node. |

## Sample output

```
Fetching data from database...
Data received!

Testing Immutability:
Original ID: 1
Attempting to change ID to 999...
(Caught TypeError: Cannot assign to read only property 'id' of object '#<Student>')
Final ID: 1 (Success: ID did not change)

--- Analytics Report ---
Class Average for Course 101: 73.33
Top Student: Ali (Average: 87.5)
Students in Course 102: Ali, Zeynep, Ahmet
```

## Challenges I faced

1. **Strict mode and read-only properties.** ES modules always run in strict mode. In strict
   mode, assigning to a non-writable property doesn't fail silently; it throws a `TypeError`.
   My first version crashed at `students[0].id = 999`, so I wrapped the assignment in a
   `try/catch` to show the error and then confirm the ID stayed the same.
2. **Using ES modules in Node.** `import`/`export` gave an error until I added
   `"type": "module"` to `package.json` and used the `.js` extension in import paths.
3. **Working inside a callback.** Because the data arrives after a 2-second delay, all the
   processing has to happen inside the callback passed to `fetchStudents`. Code written after
   the `fetchStudents(...)` call runs before the data exists.
4. **Top student result.** The example output in the assignment shows Zeynep as the top
   student, but with the given data Ali has the highest average ((90 + 85) / 2 = 87.5) and
   Zeynep has 82.5. My program prints the correct result calculated from the data.
5. **Sharing references.** The raw data objects are copied when creating a `Student`, so
   `addCourse` doesn't change the original data array.