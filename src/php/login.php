<?php include 'database.php'; ?>

<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow requests from any origin, bale para mafetch to ni jsx
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204); # what it means is that the request is OK and the server is ready to handle it
  exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $stmt = $conn->prepare("SELECT id, password, username FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($userId, $hashedPassword, $username);
        $stmt->fetch();

        if (password_verify($password, $hashedPassword)) {
            $_SESSION['user_id'] = $userId; //added
            echo json_encode(["success" => true, "username" => $username, "userId" =>  $userId]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid credentials"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    }

    $stmt->close();
}
$conn->close();
?>