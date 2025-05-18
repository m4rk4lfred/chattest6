<?php include 'database.php'; ?>

<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin, bale para mafetch to ni jsx
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

    $stmt = $conn->prepare("SELECT password, username FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashedPassword, $username);
        $stmt->fetch();

        if (password_verify($password, $hashedPassword)) {
            echo json_encode(["success" => true, "username" => $username]);
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