<!-- Admin Sidebar -->
<aside class="w-64 bg-green-800 text-white min-h-screen fixed left-0 top-0">
    <div class="p-6">
        <h1 class="text-xl font-bold">Santa's Little</h1>
        <p class="text-green-200 text-sm">Wieners Admin</p>
    </div>
    
    <nav class="mt-6">
        <a href="index.php" class="flex items-center px-6 py-3 hover:bg-white/10 transition-colors <?php echo basename($_SERVER['PHP_SELF']) === 'index.php' ? 'bg-white/10' : ''; ?>">
            <i class="fas fa-tachometer-alt w-5 mr-3"></i>
            Dashboard
        </a>
        <a href="puppies.php" class="flex items-center px-6 py-3 hover:bg-white/10 transition-colors <?php echo basename($_SERVER['PHP_SELF']) === 'puppies.php' ? 'bg-white/10' : ''; ?>">
            <i class="fas fa-dog w-5 mr-3"></i>
            Puppies
        </a>
        <a href="testimonials.php" class="flex items-center px-6 py-3 hover:bg-white/10 transition-colors <?php echo basename($_SERVER['PHP_SELF']) === 'testimonials.php' ? 'bg-white/10' : ''; ?>">
            <i class="fas fa-star w-5 mr-3"></i>
            Testimonials
        </a>
        <a href="inquiries.php" class="flex items-center px-6 py-3 hover:bg-white/10 transition-colors <?php echo basename($_SERVER['PHP_SELF']) === 'inquiries.php' ? 'bg-white/10' : ''; ?>">
            <i class="fas fa-envelope w-5 mr-3"></i>
            Inquiries
            <?php
            // Show badge for new inquiries
            require_once __DIR__ . '/../database.php';
            $database = new Database();
            $db = $database->getConnection();
            if ($db) {
                $stmt = $db->query("SELECT COUNT(*) FROM inquiries WHERE status = 'new'");
                $count = $stmt->fetchColumn();
                if ($count > 0) {
                    echo '<span class="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">' . $count . '</span>';
                }
            }
            ?>
        </a>
        <a href="settings.php" class="flex items-center px-6 py-3 hover:bg-white/10 transition-colors <?php echo basename($_SERVER['PHP_SELF']) === 'settings.php' ? 'bg-white/10' : ''; ?>">
            <i class="fas fa-cog w-5 mr-3"></i>
            Settings
        </a>
    </nav>
    
    <div class="absolute bottom-0 left-0 right-0 p-6">
        <a href="logout.php" class="w-full flex items-center justify-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
            <i class="fas fa-sign-out-alt mr-2"></i>
            Logout
        </a>
    </div>
</aside>