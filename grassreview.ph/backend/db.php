<?php
\$db = new SQLite3('data/review.db');
\$db->exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);");
?>
