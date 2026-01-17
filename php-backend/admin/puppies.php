<?php
/**
 * Admin - Puppies Management
 */

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../database.php';

requireAdminLogin();

$database = new Database();
$db = $database->getConnection();

$action = $_GET['action'] ?? 'list';
$id = $_GET['id'] ?? null;
$message = '';
$error = '';

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $sex = $_POST['sex'] ?? 'Male';
    $age = $_POST['age'] ?? '10 Weeks';
    $price = $_POST['price'] ?? 750;
    $originalPrice = $_POST['original_price'] ?? 850;
    $status = $_POST['status'] ?? 'Available';
    $image = $_POST['image'] ?? '';
    $description = $_POST['description'] ?? '';
    $coat = $_POST['coat'] ?? '';
    $features = $_POST['features'] ?? '';
    
    if (isset($_POST['add'])) {
        // Add new puppy
        $query = "INSERT INTO puppies (name, sex, age, price, original_price, status, image, description, coat, features) 
                  VALUES (:name, :sex, :age, :price, :original_price, :status, :image, :description, :coat, :features)";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ':name' => $name,
            ':sex' => $sex,
            ':age' => $age,
            ':price' => $price,
            ':original_price' => $originalPrice,
            ':status' => $status,
            ':image' => $image,
            ':description' => $description,
            ':coat' => $coat,
            ':features' => $features
        ]);
        $message = 'Puppy added successfully!';
        $action = 'list';
    } elseif (isset($_POST['update'])) {
        // Update puppy
        $query = "UPDATE puppies SET name=:name, sex=:sex, age=:age, price=:price, original_price=:original_price, 
                  status=:status, image=:image, description=:description, coat=:coat, features=:features WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ':id' => $id,
            ':name' => $name,
            ':sex' => $sex,
            ':age' => $age,
            ':price' => $price,
            ':original_price' => $originalPrice,
            ':status' => $status,
            ':image' => $image,
            ':description' => $description,
            ':coat' => $coat,
            ':features' => $features
        ]);
        $message = 'Puppy updated successfully!';
        $action = 'list';
    }
}

// Handle delete
if ($action === 'delete' && $id) {
    $stmt = $db->prepare("DELETE FROM puppies WHERE id = ?");
    $stmt->execute([$id]);
    $message = 'Puppy deleted successfully!';
    $action = 'list';
}

// Get puppy for editing
$puppy = null;
if ($action === 'edit' && $id) {
    $stmt = $db->prepare("SELECT * FROM puppies WHERE id = ?");
    $stmt->execute([$id]);
    $puppy = $stmt->fetch(PDO::FETCH_ASSOC);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Puppies - Admin</title>
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
            <!-- List View -->
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-bold text-gray-900">Manage Puppies</h1>
                <a href="?action=add" class="flex items-center px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
                    <i class="fas fa-plus mr-2"></i>
                    Add Puppy
                </a>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php
                $stmt = $db->query("SELECT * FROM puppies ORDER BY created_at DESC");
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)):
                    $statusClass = $row['status'] === 'Available' ? 'bg-green-100 text-green-600' : 
                                  ($row['status'] === 'Sold' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600');
                ?>
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <img src="<?php echo htmlspecialchars($row['image']); ?>" alt="<?php echo htmlspecialchars($row['name']); ?>" 
                         class="w-full h-48 object-cover" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
                    <div class="p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="font-semibold text-lg"><?php echo htmlspecialchars($row['name']); ?></h3>
                            <span class="px-2 py-1 text-xs rounded-full <?php echo $statusClass; ?>">
                                <?php echo $row['status']; ?>
                            </span>
                        </div>
                        <p class="text-gray-600 text-sm"><?php echo $row['sex']; ?> • <?php echo $row['age']; ?></p>
                        <p class="text-green-700 font-bold text-lg mt-2">$<?php echo number_format($row['price'], 2); ?></p>
                        <div class="flex gap-2 mt-4">
                            <a href="?action=edit&id=<?php echo $row['id']; ?>" 
                               class="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                                <i class="fas fa-edit mr-1"></i> Edit
                            </a>
                            <a href="?action=delete&id=<?php echo $row['id']; ?>" 
                               onclick="return confirm('Are you sure you want to delete this puppy?')"
                               class="flex-1 flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                                <i class="fas fa-trash mr-1"></i> Delete
                            </a>
                        </div>
                    </div>
                </div>
                <?php endwhile; ?>
            </div>
            
            <?php elseif ($action === 'add' || $action === 'edit'): ?>
            <!-- Add/Edit Form -->
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-bold text-gray-900">
                    <?php echo $action === 'add' ? 'Add New Puppy' : 'Edit Puppy'; ?>
                </h1>
                <a href="puppies.php" class="text-gray-600 hover:text-gray-800">
                    <i class="fas fa-arrow-left mr-2"></i> Back to List
                </a>
            </div>
            
            <div class="bg-white rounded-xl shadow-sm p-6">
                <form method="POST" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                            <input type="text" name="name" required
                                   value="<?php echo htmlspecialchars($puppy['name'] ?? ''); ?>"
                                   class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Sex *</label>
                            <select name="sex" class="w-full px-4 py-2 border border-gray-200 rounded-lg">
                                <option value="Male" <?php echo ($puppy['sex'] ?? '') === 'Male' ? 'selected' : ''; ?>>Male</option>
                                <option value="Female" <?php echo ($puppy['sex'] ?? '') === 'Female' ? 'selected' : ''; ?>>Female</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <input type="text" name="age" 
                                   value="<?php echo htmlspecialchars($puppy['age'] ?? '10 Weeks'); ?>"
                                   class="w-full px-4 py-2 border border-gray-200 rounded-lg">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select name="status" class="w-full px-4 py-2 border border-gray-200 rounded-lg">
                                <option value="Available" <?php echo ($puppy['status'] ?? '') === 'Available' ? 'selected' : ''; ?>>Available</option>
                                <option value="Sold" <?php echo ($puppy['status'] ?? '') === 'Sold' ? 'selected' : ''; ?>>Sold</option>
                                <option value="Reserved" <?php echo ($puppy['status'] ?? '') === 'Reserved' ? 'selected' : ''; ?>>Reserved</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                            <input type="number" name="price" step="0.01" required
                                   value="<?php echo htmlspecialchars($puppy['price'] ?? '750'); ?>"
                                   class="w-full px-4 py-2 border border-gray-200 rounded-lg">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Original Price ($)</label>
                            <input type="number" name="original_price" step="0.01"
                                   value="<?php echo htmlspecialchars($puppy['original_price'] ?? '850'); ?>"
                                   class="w-full px-4 py-2 border border-gray-200 rounded-lg">
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                        <input type="url" name="image" required
                               value="<?php echo htmlspecialchars($puppy['image'] ?? ''); ?>"
                               placeholder="https://example.com/puppy.jpg"
                               class="w-full px-4 py-2 border border-gray-200 rounded-lg">
                        <p class="text-xs text-gray-500 mt-1">Enter a direct URL to the puppy's image</p>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea name="description" rows="3"
                                  class="w-full px-4 py-2 border border-gray-200 rounded-lg"><?php echo htmlspecialchars($puppy['description'] ?? ''); ?></textarea>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Coat Description</label>
                        <textarea name="coat" rows="2"
                                  class="w-full px-4 py-2 border border-gray-200 rounded-lg"><?php echo htmlspecialchars($puppy['coat'] ?? ''); ?></textarea>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Features (separate with | )</label>
                        <input type="text" name="features"
                               value="<?php echo htmlspecialchars($puppy['features'] ?? 'Lifetime health guarantee|Potty and crate trained|Up to date vaccinations|Up to date de-worming|Starter Kit included'); ?>"
                               placeholder="Feature 1|Feature 2|Feature 3"
                               class="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    </div>
                    
                    <div class="flex justify-end gap-4">
                        <a href="puppies.php" class="px-6 py-2 text-gray-600 hover:text-gray-800">Cancel</a>
                        <button type="submit" name="<?php echo $action === 'add' ? 'add' : 'update'; ?>"
                                class="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
                            <i class="fas fa-save mr-2"></i>
                            <?php echo $action === 'add' ? 'Add Puppy' : 'Update Puppy'; ?>
                        </button>
                    </div>
                </form>
            </div>
            <?php endif; ?>
        </main>
    </div>
</body>
</html>