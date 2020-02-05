<!DOCTYPE html>
<html lang="en">
<head>
    <title>CSS Template</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * {
            box-sizing: border-box;
            font-family: Arial, Helvetica, sans-serif;
        }

        body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
        }


        .topnav {
            overflow:hidden ;
            background-color: #333;
        }


        .topnav a {
            float: left;
            display: block;
            color:;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;


        }


        .topnav a:hover {
            background-color: #ddd;
            color: black;
        }


        .content {
            background-color: #ddd;
            padding: 10px;
            height: 488px; /* Should be removed. Only for demonstration */
        }


        .footer {
            background-color: #a5a0a0;
            padding: 10px;
        }
    </style>
</head>
<body>

<div class="topnav">
    <a href="#">Home</a>
    <a href="#">Projects</a>
    <a href="#">Pricings</a>
    <a href="#">Contacts</a>
</div>

<div class="content">
    <h2>Content</h2>
    <p></p>
</div>

<div class="footer">
    <p>Narek Pduction :)</p>
</div>

</body>
</html>

