<?php include 'database.php'; ?>

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');



ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204); # what it means is that the request is OK and the server is ready to handle it
  exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);
    $usernamedefault = "defaultuser-" . $data["student_id"]; //set a default username based on student ID, yung id sana pero di yun maset until nainsert na sa sql ata
    $email = $conn->real_escape_string($data["email"]);
    $student_id = $conn->real_escape_string($data["student_id"]);
    $password = password_hash($data["password"], PASSWORD_BCRYPT); //store a hashed password

    $sql = "INSERT INTO users (email, studentID, password) VALUES ('$email', '$student_id', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
}

$conn->close();
?>