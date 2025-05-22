<?php
//dito magadjust ng dirs para di magulo nalang

$user = "root";
$pass = "root";

$conn = new mysqli('localhost', $user, $pass);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the database exists, temporary muna para di kayo magcreate ng create
$dbCheck = $conn->query("SHOW DATABASES LIKE 'ccisconnectusers'");
if ($dbCheck->num_rows == 0) {
    $conn->query("CREATE DATABASE ccisconnectusers");
    $conn->select_db('ccisconnectusers');

    $createTableSQL = "
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        studentID VARCHAR(10) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    if (!$conn->query($createTableSQL)) {
        die("Error creating table: " . $conn->error);
    }
}


$conn = new mysqli('localhost', $user, $pass , 'ccisconnectusers');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
?>