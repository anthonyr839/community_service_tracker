-- ============================================================
-- schema.sql
-- This file defines the database table for community service records.
-- It runs automatically when the server starts.
-- ============================================================

CREATE TABLE IF NOT EXISTS service_records (
  id          SERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  student_id   TEXT NOT NULL,
  activity_date DATE NOT NULL,


  -- ✏️ TASK (ADD CODE): A column called "hours" is missing below!
  -- Add a column named "hours" that stores a number with decimals (use NUMERIC(5,2))
  -- and does NOT allow null values.
  -- Hint: look at how the other columns above are written.
  -- YOUR CODE HERE:
  hours         NUMERIC(5,2) NOT NULL,
  recipient     TEXT NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
