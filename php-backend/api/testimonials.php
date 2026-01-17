<?php
/**
 * API Endpoint: Get All Testimonials
 * URL: /api/testimonials.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../database.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

try {
    $query = "SELECT * FROM testimonials ORDER BY created_at DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $testimonials = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $testimonials[] = [
            'id' => (int)$row['id'],
            'name' => $row['name'],
            'initials' => $row['initials'],
            'location' => $row['location'],
            'rating' => (int)$row['rating'],
            'review' => $row['review'],
            'puppyName' => $row['puppy_name'],
            'timeAgo' => $row['time_ago'],
            'created_at' => $row['created_at']
        ];
    }
    
    echo json_encode($testimonials);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch testimonials']);
}
?>