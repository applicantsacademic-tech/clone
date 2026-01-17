<?php
/**
 * Admin - Inquiries Management
 */

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../database.php';

requireAdminLogin();

$database = new Database();
$db = $database->getConnection();

$message = '';

// Handle status update
if (isset($_GET['mark']) && isset($_GET['id'])) {
    $status = $_GET['mark'];
    $id = $_GET['id'];
    if (in_array($status, ['read', 'replied'])) {
        $stmt = $db->prepare("UPDATE inquiries SET status = ? WHERE id = ?");
        $stmt->execute([$status, $id]);
        $message = 'Status updated successfully!';
    }
}

// Handle delete
if (isset($_GET['delete'])) {
    $stmt = $db->prepare("DELETE FROM inquiries WHERE id = ?");
    $stmt->execute([$_GET['delete']]);
    $message = 'Inquiry deleted successfully!';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Inquiries - Admin</title>
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
            
            <h1 class="text-2xl font-bold text-gray-900 mb-6">Contact Inquiries</h1>
            
            <?php
            $stmt = $db->query("SELECT * FROM inquiries ORDER BY created_at DESC");
            $inquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            if (count($inquiries) === 0):
            ?>
            <div class="bg-white rounded-xl p-12 text-center">
                <i class="fas fa-envelope text-gray-300 text-5xl mb-4"></i>
                <p class="text-gray-500">No inquiries yet</p>
            </div>
            <?php else: ?>
            <div class="space-y-4">
                <?php foreach ($inquiries as $inquiry):
                    $statusClass = $inquiry['status'] === 'new' ? 'bg-red-100 text-red-600' : 
                                  ($inquiry['status'] === 'read' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600');
                ?>
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <div class="flex items-start justify-between">
                        <div>
                            <h3 class="font-semibold text-lg text-gray-900">
                                <?php echo htmlspecialchars($inquiry['first_name'] . ' ' . $inquiry['last_name']); ?>
                            </h3>
                            <div class="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <span><i class="fas fa-envelope mr-1"></i><?php echo htmlspecialchars($inquiry['email']); ?></span>
                                <span><i class="fas fa-phone mr-1"></i><?php echo htmlspecialchars($inquiry['phone']); ?></span>
                            </div>
                        </div>
                        <span class="px-3 py-1 text-sm rounded-full <?php echo $statusClass; ?>">
                            <?php echo $inquiry['status']; ?>
                        </span>
                    </div>
                    
                    <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p class="text-sm text-gray-600 mb-2"><strong>Interested in:</strong> <?php echo htmlspecialchars($inquiry['puppy']); ?></p>
                        <?php if ($inquiry['address']): ?>
                        <p class="text-sm text-gray-600 mb-2"><strong>Address:</strong> <?php echo htmlspecialchars($inquiry['address']); ?></p>
                        <?php endif; ?>
                        <p class="text-gray-700"><?php echo nl2br(htmlspecialchars($inquiry['message'])); ?></p>
                    </div>
                    
                    <div class="flex items-center justify-between mt-4">
                        <div class="flex items-center gap-2">
                            <a href="?mark=read&id=<?php echo $inquiry['id']; ?>" 
                               class="px-3 py-1 text-sm bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100">
                                Mark as Read
                            </a>
                            <a href="?mark=replied&id=<?php echo $inquiry['id']; ?>" 
                               class="px-3 py-1 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                                Mark as Replied
                            </a>
                            <a href="mailto:<?php echo htmlspecialchars($inquiry['email']); ?>" 
                               class="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                                <i class="fas fa-reply mr-1"></i> Reply via Email
                            </a>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="text-xs text-gray-400">
                                <?php echo date('M j, Y g:i A', strtotime($inquiry['created_at'])); ?>
                            </span>
                            <a href="?delete=<?php echo $inquiry['id']; ?>" 
                               onclick="return confirm('Delete this inquiry?')"
                               class="text-red-500 hover:text-red-700">
                                <i class="fas fa-trash"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </main>
    </div>
</body>
</html>