<?php
    $data = json_decode($_COOKIE['datos']);
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>        
        <link rel="stylesheet" href="../../../css/styles.css"/>
        <title>Comedor EVG</title>
    </head>
    <body>
        <h1>Bienvenido/a <?php echo $data->given_name; ?></h1>
    </body>
</html>