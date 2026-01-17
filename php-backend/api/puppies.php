<?php
/**
 * API Endpoint: Get All Puppies
 * URL: /api/puppies.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../database.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

try {
    $query = "SELECT * FROM puppies ORDER BY created_at DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $puppies = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $puppies[] = [
            'id' => (int)$row['id'],
            'name' => $row['name'],
            'sex' => $row['sex'],
            'age' => $row['age'],
            'price' => (float)$row['price'],
            'originalPrice' => (float)$row['original_price'],
            'status' => $row['status'],
            'rating' => (float)$row['rating'],
            'image' => $row['image'],
            'description' => $row['description'],
            'coat' => $row['coat'],
            'features' => $row['features'] ? explode('|', $row['features']) : [],
            'created_at' => $row['created_at']
        ];
    }
    
    echo json_encode($puppies);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch puppies']);
}
?>