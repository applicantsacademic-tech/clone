<?php
/**
 * Admin - Settings
 */

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../config.php';

requireAdminLogin();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings - Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="min-h-screen bg-gray-100">
    <div class="flex">
        <?php include 'sidebar.php'; ?>
        
        <main class="flex-1 ml-64 p-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
            
            <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Admin Credentials</h2>
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p class="text-yellow-800 text-sm">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        To change admin credentials, edit the <code class="bg-yellow-100 px-1 rounded">config.php</code> file on your server.
                    </p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="mb-2"><strong>Current Username:</strong> <?php echo ADMIN_USERNAME; ?></p>
                    <p><strong>Password:</strong> ********</p>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Database Status</h2>
                <?php
                $database = new Database();
                $db = $database->getConnection();
                if ($db):
                ?>
                <div class="flex items-center text-green-600">
                    <i class="fas fa-check-circle mr-2"></i>
                    <span>Connected to database successfully</span>
                </div>
                <?php else: ?>
                <div class="flex items-center text-red-600">
                    <i class="fas fa-times-circle mr-2"></i>
                    <span>Database connection failed. Check your config.php settings.</span>
                </div>
                <?php endif; ?>
            </div>
            
            <div class="bg-white rounded-xl shadow-sm p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
                <div class="space-y-3">
                    <a href="../index.html" target="_blank" class="flex items-center text-green-700 hover:underline">
                        <i class="fas fa-external-link-alt mr-2"></i>
                        View Public Website
                    </a>
                    <a href="../api/puppies.php" target="_blank" class="flex items-center text-blue-600 hover:underline">
                        <i class="fas fa-code mr-2"></i>
                        Test Puppies API
                    </a>
                    <a href="../api/testimonials.php" target="_blank" class="flex items-center text-blue-600 hover:underline">
                        <i class="fas fa-code mr-2"></i>
                        Test Testimonials API
                    </a>
                </div>
            </div>
        </main>
    </div>
</body>
</html>