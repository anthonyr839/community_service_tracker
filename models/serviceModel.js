// ============================================================
// models/serviceModel.js
// This file contains the functions that read and write
// community service records to the database.
// ============================================================
//
// ✏️  TASK (COMMENT): Each function below has a comment placeholder.
//     Replace each placeholder with a real comment that explains:
//       1. What the function does
//       2. What parameters it takes (if any)
//       3. What it returns
//
// ============================================================

const db = require('../db');

// getAllRecords:
// Description: Retrieves all service records from the database, ordered by activity date in descending order (most recent first).
// Parameters: None
// Returns: An array of service record objects from the database query result.
const getAllRecords = async () => {
  const res = await db.query(
    'SELECT * FROM service_records ORDER BY activity_date DESC'
  );
  return res.rows;
};

// addRecord:
// Description: Inserts a new service record into the service_records table with the provided student and activity details, then returns the newly created record.
// Parameters:
//   - student_name: Name of the student submitting the service record
//   - student_id: Unique identifier for the student
//   - activity_date: Date when the service activity took place
//   - hours: Number of service hours completed
//   - recipient: Organization or recipient of the service activity
// Returns: The newly inserted service record object from the database.
const addRecord = async (student_name, student_id, activity_date, hours, recipient) => {
  const res = await db.query(
    `INSERT INTO service_records
       (student_name, student_id, activity_date, hours, recipient)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [student_name, student_id, activity_date, hours, recipient]
  );
  return res.rows[0];
};

// getHoursByStudent:
// Description: Retrieves the total accumulated service hours for each student by grouping records in the database and summing their hours.
// Parameters: None
// Returns: An array of objects, each containing a student’s name, student ID, and their total service hours.
const getHoursByStudent = async () => {
  const res = await db.query(
    `SELECT student_name, student_id, SUM(hours) AS total_hours
     FROM service_records
     GROUP BY student_name, student_id
     ORDER BY student_name ASC`
  );
  return res.rows;
};

module.exports = { getAllRecords, addRecord, getHoursByStudent };
