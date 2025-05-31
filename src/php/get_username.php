<?php
session_start();
error_log("Session user_id: " . ($_SESSION['user_id'] ?? 'not set'));
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if ($origin === "http://localhost:5173") {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'database.php';

if (isset($_SESSION['user_id'])) {
    $userId = intval($_SESSION['user_id']);
    $result = $conn->query("SELECT username FROM users WHERE id = $userId");
    if ($row = $result->fetch_assoc()) {
        echo json_encode(['username' => $row['username'], 'userId' => $userId]);
        exit;
    }
}
echo json_encode(['username' => null, 'userId' => null]);
?>