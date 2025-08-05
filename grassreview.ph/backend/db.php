<?php
// Enable error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Create data directory
if (!is_dir('../data')) mkdir('../data', 0777, true);

// Connect to SQLite
$db = new SQLite3('../data/review.db');

// Create tables
$db->exec("CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
);");

$db->exec("CREATE TABLE IF NOT EXISTS exam_results (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    subject TEXT,
    score INTEGER,
    total INTEGER,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
);");

echo "✅ Database initialized at ../data/review.db<br>";
echo "✅ Tables: users, exam_results created.";
?>
