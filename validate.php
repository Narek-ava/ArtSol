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
            border-radius:12px;5
            height:50px;
            width:10%;
        }
        #n4{
            border-radius:12px;
            height:50px;s
            width:30%;
        }
        
    </style>

</head>
<body style="background-color:#2a4a4e;">
  <?php
     require('chek.php');
      if (isset($_POST['Login']) && isset($_POST['Password'])) {
        $username = $_POST['Login'];
        $password = $_POST['Password'];
        $email = $_POST['Email'];
        $query = "INSERT INTO `register-bg`( `Login`, `Password`, `Email`) VALUES ('$username','$password','$email')";
        $result = mysqli_query( $connection,$query);

       if ($result) {
         $smsg = "Congretulatios";
        }
        else {
         $fsmsg = "error";
        }
      }
     echo "";
  ?>
   <form action="validate.php" method="post">
      <?php if (isset($smsg)) { ?>
        <div class="alert alert-success" role="alert">
        <?php echo $smsg; ?>  
      </div><?php } ?>
      <?php if (isset($fsmsg)) { ?>
        <div class="alert alert-danger" role="alert">
      <?php echo $fsmsg; ?>
      </div><?php } ?>
      <br><input placeholder="Login" name="Login" type="text" class="design" ><br>
      <input placeholder="Password" name="Password" class="design" type="text"><br>
      <input placeholder="Email" name="Email" class="design" type="Email"><br>
      <br><input class="design" type="submit" value="Registrate"><br>
   </form>    
   <form action="logout.php" method="post">
     <input class="design" type="submit" value="Login"><br>
   </form>
</body>
</html>