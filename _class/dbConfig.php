<?php
class dbConfig
{
    // private $host     = "localhost";
    // private $dbName   = "u140335295_easystamp";
    // private $userName = "u140335295_easystamp";
    // private $password = "EasyStamp@123";
    private $host     = "localhost";
    private $dbName   = "easystamp";
    private $userName = "root";
    private $password = "";
    public $con;
    public function getConnection()
    {
        $this->con = "null";
        $this->con = mysqli_connect($this->host, $this->userName, $this->password, $this->dbName);
        if ($this->con) {
            return $this->con;
        } else {
            echo "connection error!";
        }
    }
}
