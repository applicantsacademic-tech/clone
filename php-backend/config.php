<?php
/**
 * Database Configuration
 * Update these settings with your hosting provider's MySQL credentials
 */

// Database credentials - UPDATE THESE!
define('DB_HOST', 'localhost');
define('DB_NAME', 'santa_wieners');
define('DB_USER', 'your_username');  // Change this
define('DB_PASS', 'your_password');  // Change this

// Admin credentials - CHANGE THESE!
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'santapuppies2025');

// Site URL (update with your domain)
define('SITE_URL', 'https://yourdomain.com');

// Enable error reporting for debugging (set to false in production)
define('DEBUG_MODE', true);

if (DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Set timezone
date_default_timezone_set('America/New_York');

// Start session
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>