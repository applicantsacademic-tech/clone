<?php
/**
 * Admin Dashboard - Main Page
 */

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../database.php';

requireAdminLogin();

$database = new Database();
$db = $database->getConnection();

// Get stats
$puppyCount = 0;
$testimonialCount = 0;
$inquiryCount = 0;
$newInquiryCount = 0;

if ($db) {
    $stmt = $db->query("SELECT COUNT(*) FROM puppies");
    $puppyCount = $stmt->fetchColumn();
    
    $stmt = $db->query("SELECT COUNT(*) FROM testimonials");
    $testimonialCount = $stmt->fetchColumn();
    
    $stmt = $db->query("SELECT COUNT(*) FROM inquiries");
    $inquiryCount = $stmt->fetchColumn();
    
    $stmt = $db->query("SELECT COUNT(*) FROM inquiries WHERE status = 'new'");
    $newInquiryCount = $stmt->fetchColumn();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Santa's Little Wieners</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="min-h-screen bg-gray-100">
    <div class="flex">
        <!-- Sidebar -->
        <?php include 'sidebar.php'; ?>
        
        <!-- Main Content -->
        <main class="flex-1 ml-64 p-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
            
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-xl p-6 shadow-sm">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">Total Puppies</p>
                            <p class="text-3xl font-bold text-gray-900"><?php echo $puppyCount; ?></p>
                        </div>
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-dog text-green-700"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl p-6 shadow-sm">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">Testimonials</p>
                            <p class="text-3xl font-bold text-gray-900"><?php echo $testimonialCount; ?></p>
                        </div>
                        <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-star text-yellow-600"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl p-6 shadow-sm">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">Total Inquiries</p>
                            <p class="text-3xl font-bold text-gray-900"><?php echo $inquiryCount; ?></p>
                        </div>
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-envelope text-blue-600"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl p-6 shadow-sm">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">New Inquiries</p>
                            <p class="text-3xl font-bold text-gray-900"><?php echo $newInquiryCount; ?></p>
                        </div>
                        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-bell text-red-600"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="bg-white rounded-xl p-6 shadow-sm mb-8">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div class="flex flex-wrap gap-4">
                    <a href="puppies.php?action=add" class="flex items-center px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors">
                        <i class="fas fa-plus mr-2"></i>
                        Add New Puppy
                    </a>
                    <a href="testimonials.php?action=add" class="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                        <i class="fas fa-plus mr-2"></i>
                        Add Testimonial
                    </a>
                    <a href="../index.html" target="_blank" class="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <i class="fas fa-eye mr-2"></i>
                        View Website
                    </a>
                </div>
            </div>
            
            <!-- Recent Inquiries -->
            <div class="bg-white rounded-xl p-6 shadow-sm">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Inquiries</h2>
                <?php
                if ($db) {
                    $stmt = $db->query("SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 5");
                    $inquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    if (count($inquiries) > 0) {
                        echo '<div class="space-y-4">';
                        foreach ($inquiries as $inquiry) {
                            $statusClass = $inquiry['status'] === 'new' ? 'bg-red-100 text-red-600' : 
                                          ($inquiry['status'] === 'read' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600');
                            echo '<div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">';
                            echo '<div>';
                            echo '<p class="font-medium text-gray-900">' . htmlspecialchars($inquiry['first_name'] . ' ' . $inquiry['last_name']) . '</p>';
                            echo '<p class="text-sm text-gray-500">Interested in: ' . htmlspecialchars($inquiry['puppy']) . '</p>';
                            echo '</div>';
                            echo '<span class="px-2 py-1 text-xs rounded-full ' . $statusClass . '">' . $inquiry['status'] . '</span>';
                            echo '</div>';
                        }
                        echo '</div>';
                    } else {
                        echo '<p class="text-gray-500">No inquiries yet</p>';
                    }
                }
                ?>
                <a href="inquiries.php" class="inline-block mt-4 text-green-700 hover:underline">View all inquiries →</a>
            </div>
        </main>
    </div>
</body>
</html>