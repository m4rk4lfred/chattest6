<?php
header('Content-Type: application/json');
include 'database.php';
session_start();
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