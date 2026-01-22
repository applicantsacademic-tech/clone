<?php
/**
 * Database Connection Class
 */

require_once __DIR__ . '/config.php';

class Database {
    private $host = "localhost";
    private $db_name =  santa_wieners;
    private $username = username;
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password,
                array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
            );
            $this->conn->exec("set names utf8mb4");
        } catch(PDOException $exception) {
            if (DEBUG_MODE) {
                echo "Connection error: " . $exception->getMessage();
            }
            return null;
        }

        return $this->conn;
    }
}
?>
