<?php
/**
 * Admin - Testimonials Management
 */

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../database.php';

requireAdminLogin();

$database = new Database();
$db = $database->getConnection();

$action = $_GET['action'] ?? 'list';
$id = $_GET['id'] ?? null;
$message = '';

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add'])) {
    $name = $_POST['name'] ?? '';
    $location = $_POST['location'] ?? '';
    $rating = $_POST['rating'] ?? 5;
    $review = $_POST['review'] ?? '';
    $puppyName = $_POST['puppy_name'] ?? '';
    
    // Generate initials
    $nameParts = explode(' ', $name);
    $initials = '';
    foreach (array_slice($nameParts, 0, 2) as $part) {
        $initials .= strtoupper(substr($part, 0, 1));
    }
    
    $query = "INSERT INTO testimonials (name, initials, location, rating, review, puppy_name, time_ago) 
              VALUES (:name, :initials, :location, :rating, :review, :puppy_name, 'Just now')";
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':name' => $name,
        ':initials' => $initials,
        ':location' => $location,
        ':rating' => $rating,
        ':review' => $review,
        ':puppy_name' => $puppyName
    ]);
    $message = 'Testimonial added successfully!';
    $action = 'list';
}

// Handle delete
if ($action === 'delete' && $id) {
    $stmt = $db->prepare("DELETE FROM testimonials WHERE id = ?");
    $stmt->execute([$id]);
    $message = 'Testimonial deleted successfully!';
    $action = 'list';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Testimonials - Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="min-h-screen bg-gray-100">
    <div class="flex">
        <?php include 'sidebar.php'; ?>
        
        <main class="flex-1 ml-64 p-8">
            <?php if ($message): ?>
            <div class="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                <?php echo htmlspecialchars($message); ?>
            </div>
            <?php endif; ?>
            
            <?php if ($action === 'list'): ?>
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-bold text-gray-900">Manage Testimonials</h1>
                <a href="?action=add" class="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                    <i class="fas fa-plus mr-2"></i>
                    Add Testimonial
                </a>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <?php
                $stmt = $db->query("SELECT * FROM testimonials ORDER BY created_at DESC");
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)):
                ?>
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <div class="flex items-start justify-between">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white font-semibold">
                                <?php echo htmlspecialchars($row['initials']); ?>
                            </div>
                            <div class="ml-3">
                                <p class="font-semibold text-gray-900"><?php echo htmlspecialchars($row['name']); ?></p>
                                <p class="text-sm text-gray-500"><?php echo htmlspecialchars($row['location']); ?></p>
                            </div>
                        </div>
                        <a href="?action=delete&id=<?php echo $row['id']; ?>" 
                           onclick="return confirm('Delete this testimonial?')"
                           class="text-red-500 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </a>
                    </div>
                    <div class="flex mt-3">
                        <?php for ($i = 0; $i < 5; $i++): ?>
                        <i class="fas fa-star <?php echo $i < $row['rating'] ? 'text-yellow-400' : 'text-gray-300'; ?>"></i>
                        <?php endfor; ?>
                    </div>
                    <p class="text-gray-600 mt-3 text-sm"><?php echo htmlspecialchars($row['review']); ?></p>
                    <p class="text-xs text-gray-400 mt-2">Adopted: <?php echo htmlspecialchars($row['puppy_name']); ?></p>
                </div>
                <?php endwhile; ?>
            </div>
            
            <?php elseif ($action === 'add'): ?>
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-bold text-gray-900">Add New Testimonial</h1>
                <a href="testimonials.php" class="text-gray-600 hover:text-gray-800">
                    <i class="fas fa-arrow-left mr-2"></i> Back to List
                </a>
            </div>
            
            <div class="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
                <form method="POST" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                        <input type="text" name="name" required placeholder="John Smith"
                               class="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                        <input type="text" name="location" required placeholder="Austin, Texas"
                               class="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Puppy Name *</label>
                        <input type="text" name="puppy_name" required placeholder="Bella"
                               class="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <select name="rating" class="w-full px-4 py-2 border border-gray-200 rounded-lg">
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Review *</label>
                        <textarea name="review" rows="4" required
                                  class="w-full px-4 py-2 border border-gray-200 rounded-lg"></textarea>
                    </div>
                    <div class="flex justify-end gap-4">
                        <a href="testimonials.php" class="px-6 py-2 text-gray-600">Cancel</a>
                        <button type="submit" name="add" class="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                            Add Testimonial
                        </button>
                    </div>
                </form>
            </div>
            <?php endif; ?>
        </main>
    </div>
</body>
</html>