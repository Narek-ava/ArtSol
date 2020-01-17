<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        .design{
            border-radius: 12px;
            height:44px;
            width:30%;
            font-size:20px;
        }
        #n3{
            border-radius:12px;
            height:50px;
            width:10%;
        }
        #n4{
            border-radius:12px;
            height:50px;
            width:30%;
        }
        #link-color{
            color:black;
        }

    </style>

</head>

<body style="background-color:#2a4a4e;">
   <form action="index.php" method="post">
      <br><input placeholder="Login" type="text" name="Login" class="design" ><br>
      <input placeholder="Password" name="Password" class="design" type="password"><br>
   </form>
   <form action="login.php">
       <br><input class="design"  type="submit" value="Enter"><br>
   </form>
   <form action="validate.php" method="post">
       <input id="n4" type="submit" value="Registration">
   </form>
    <?php

     session_start();
     require('chek.php');
      if (isset($_POST['Login']) and isset($_POST['Password'])) {
        $username = $_POST['Login'];
        $password = $_POST['Password'];
        $query = "SELECT*FROM `register-bg` WHERE Login='$username' and Password='$password'";
        $result = mysqli_query($connection,$query) or die (msqli_error($connection));
        $count = mysqli_num_rows($result);
       if ($count == 1) {
           $_SESSION['Login'] = $username;

        }
       else {
           echo "error";
       }
      }

      if (isset($_SESSION['Login'])) {
          $_SESSION['Login'] = $username;
          header ('location:calc2.php');
          exit;
          }


    ?>
</body>
</html>

