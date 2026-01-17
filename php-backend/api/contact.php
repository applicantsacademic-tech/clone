<?php
/**
 * API Endpoint: Submit Contact Form
 * URL: /api/contact.php
 * Method: POST
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/../database.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// Validate required fields
$required = ['firstName', 'lastName', 'email', 'phone', 'puppy', 'message'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

try {
    $query = "INSERT INTO inquiries (first_name, last_name, email, phone, address, puppy, message, status) 
              VALUES (:first_name, :last_name, :email, :phone, :address, :puppy, :message, 'new')";
    
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':first_name' => htmlspecialchars($data['firstName']),
        ':last_name' => htmlspecialchars($data['lastName']),
        ':email' => htmlspecialchars($data['email']),
        ':phone' => htmlspecialchars($data['phone']),
        ':address' => htmlspecialchars($data['address'] ?? ''),
        ':puppy' => htmlspecialchars($data['puppy']),
        ':message' => htmlspecialchars($data['message'])
    ]);
    
    $id = $db->lastInsertId();
    
    echo json_encode([
        'message' => 'Thank you for your inquiry! We will get back to you within 24 hours.',
        'id' => $id
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to submit inquiry']);
}
?>