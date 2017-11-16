<?php

error_reporting(E_ALL);

header("Content-Type: application/json; Access-Control-Allow-Origin: *");

$database = new PDO('mysql:host=localhost;dbname=iceberger', 'iceberger', 'x76nE6E9dbEn3j8RRH3REHdkca3BuYik'); //QWXVWZXSLJq6XWDCpwZyADVdxYF4hcmj
$database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

switch ($_GET['method']) :
    case 'login':
        $query = $database->prepare("SELECT * FROM `users` WHERE `email` = :email");
        $query->bindParam(':email', $_GET['email']);
        $query->execute();
        $user = $query->fetch();

        if (password_verify($_GET['password'], $user['password'])) :
            $json = json_encode([
            "success" => true,
            "user" => (int)$user['id'],
            "name" => $user['name'],
            "privilege" => (int)$user['privilege']
            ]);
        else :
            $json = json_encode([
            "success" => false
            ]);
        endif;

        break;
    case 'register':
        $query = $database->prepare("INSERT IGNORE INTO `users`(`name`, `email`, `password`) VALUES (:name, :email, :pass)");
        $database->beginTransaction();
        $query->bindValue(':name', $_GET['name']);
        $query->bindValue(':email', $_GET['email']);
        $query->bindValue(':pass', password_hash($_GET['password'], PASSWORD_DEFAULT));

        $query->execute();

        $id = $database->lastInsertId('id');
        $database->commit();

        if (!empty($id)) :
            $json = json_encode([
            "success" => true,
            "user" => (int)$id,
            "name" => $_GET['name']
            ]);
        else :
            $json = json_encode([
            "success" => false
            ]);
        endif;

        break;
    case 'registerstaff':
        $query = $database->prepare("INSERT IGNORE INTO `users`(`name`, `email`, `password`, `privilege`) VALUES (:name, :email, :pass, 1)");
        $database->beginTransaction();
        $query->bindValue(':name', $_GET['name']);
        $query->bindValue(':email', $_GET['email']);
        $query->bindValue(':pass', password_hash($_GET['password'], PASSWORD_DEFAULT));

        $query->execute();

        $id = $database->lastInsertId('id');
        $database->commit();

        if (!empty($id)) :
            $json = json_encode([
            "success" => true,
            "user" => (int)$id,
            "name" => $_GET['name']
            ]);
        else :
            $json = json_encode([
            "success" => false
            ]);
        endif;

        break;
    case 'deleteuser':
        $query = $database->prepare("DELETE FROM `users` WHERE `id`=:id");
        $query->bindValue(':id', $_GET['user']);
        $query->execute();

        $json = json_encode([
            "success" => true
        ]);

        break;
    case 'getinventory':
        if (isset($_GET['category']) && !empty($_GET['category'])) :
            $query = $database->prepare("SELECT * FROM `inventory_categories` WHERE `id`=:category");
            $query->bindValue(':category', $_GET['category']);
        else :
            $query = $database->prepare("SELECT * FROM `inventory_categories`");
        endif;
        $query->execute();
        $categories = $query->fetchAll();
        $data = [];

        foreach ($categories as $row => $category) :
            $data[$row] = $category;

            $query = $database->prepare("SELECT * FROM `inventory` WHERE `category_id`=:category ORDER BY `category_id` ASC");
            $query->bindValue(':category', $category['id']);
            $query->execute();
            $data[$row]['items'] = $query->fetchAll();
        endforeach;

        $json = json_encode([
            'inventory' => $data
        ]
        );

        break;
    case 'getusers':
        $query = $database->prepare("SELECT * FROM `users`");
        $query->execute();
        $users = $query->fetchAll();

        $userslist = [];

        foreach ($users as $row => $user) :
            $userslist[$row]['name'] = $user['name'];
            $userslist[$row]['email'] = $user['email'];
            $userslist[$row]['privilege'] = $user['privilege'];
        endforeach;

        $json = json_encode($userslist);

        break;
    case 'getuserburgers':
        $query = $database->prepare("SELECT `burgers`.*, `orders`.`date` FROM `burgers` LEFT JOIN `orders` ON `orders`.`id`=`order_id` WHERE `burgers`.`user_id`=:user ORDER BY `date` DESC");
        $query->bindValue(':user', $_GET['user']);
        $query->execute();
        $burgers = $query->fetchAll();

        $burgerslist = [];

        foreach ($burgers as $row => $burger) :
            $query = $database->prepare("SELECT * FROM `burger_ingredients` LEFT JOIN `inventory` ON `inventory_id`=`id` WHERE `burger_id`=:burger");
            $query->bindValue(':burger', $burger['id']);
            $query->execute();
            $ingredients = $query->fetchAll();

            $burgerslist[$row]['id'] = $burger['id'];
            $burgerslist[$row]['name'] = $burger['name'];
            $burgerslist[$row]['date'] = $burger['date'];
            $burgerslist[$row]['ingredients'] = $ingredients;
        endforeach;

        // var_dump($burgerslist);

        $json = json_encode([
            "burgers" => $burgerslist
        ]);

        break;
    case 'getuserorders':
        $query = $database->prepare("SELECT * FROM `orders` WHERE `user_id`=:user ORDER BY `date` DESC");
        $query->bindValue(':user', $_GET['user']);
        $query->execute();
        $orders = $query->fetchAll();

        $orderslist = [];

        foreach ($orders as $orderrow => $order) :
            $orderslist[$orderrow]['id'] = $order['id'];
            $orderslist[$orderrow]['date'] = $order['date'];

            $query = $database->prepare("SELECT * FROM `order_items` LEFT JOIN `inventory` ON `inventory_id`=`id` WHERE `order_id`=:order");
            $query->bindValue(':order', $order['id']);
            $query->execute();
            $items = $query->fetchAll();
            $orderslist[$orderrow]['sides'] = $items;

            $query = $database->prepare("SELECT * FROM `burgers` WHERE `order_id`=:order");
            $query->bindValue(':order', $order['id']);
            $query->execute();
            $burgers = $query->fetchAll();

            $burgerslist = [];

            foreach ($burgers as $burgerrow => $burger) :
                $query = $database->prepare("SELECT * FROM `burger_ingredients` LEFT JOIN `inventory` ON `inventory_id`=`id` WHERE `burger_id`=:burger");
                $query->bindValue(':burger', $burger['id']);
                $query->execute();
                $ingredients = $query->fetchAll();

                $burgerslist[$burgerrow]['id'] = $burger['id'];
                $burgerslist[$burgerrow]['order'] = $burger['order_id'];
                $burgerslist[$burgerrow]['name'] = $burger['name'];
                $burgerslist[$burgerrow]['ingredients'] = $ingredients;
            endforeach;

            $orderslist[$orderrow]['burgers'] = $burgerslist;
        endforeach;

        // var_dump($orderslist);

        $json = json_encode([
            "orders" => $orderslist
        ]);

        break;
    case 'getpresetburgers':
        $query = $database->prepare("SELECT * FROM `burger_presets` LEFT JOIN `burgers` ON `burger_id`=`id`");
        $query->execute();
        $burgers = $query->fetchAll();

        $burgerslist = [];

        foreach ($burgers as $row => $burger) :
            $query = $database->prepare("SELECT * FROM `burger_ingredients` LEFT JOIN `inventory` ON `inventory_id`=`id` WHERE `burger_id`=:burger");
            $query->bindValue(':burger', $burger['id']);
            $query->execute();
            $ingredients = $query->fetchAll();

            $burgerslist[$row]['id'] = $burger['id'];
            $burgerslist[$row]['name'] = $burger['name'];
            $burgerslist[$row]['ingredients'] = $ingredients;
        endforeach;

        $json = json_encode([
            "burgers" => $burgerslist
        ]);

        break;
    case 'getcustomers':
        $query = $database->prepare("SELECT * FROM `users` WHERE `privilege`=0");
        $query->execute();
        $users = $query->fetchAll();

        $userslist = [];

        foreach ($users as $row => $user) :
            $userslist[$row]['name'] = $user['name'];
            $userslist[$row]['email'] = $user['email'];
            $userslist[$row]['privilege'] = $user['privilege'];
        endforeach;

        $json = json_encode($userslist);

        break;
    case 'getstaff':
        $query = $database->prepare("SELECT * FROM `users` WHERE `privilege`=1");
        $query->execute();
        $users = $query->fetchAll();

        $userslist = [];

        foreach ($users as $row => $user) :
            $userslist[$row]['id'] = $user['id'];
            $userslist[$row]['name'] = $user['name'];
            $userslist[$row]['email'] = $user['email'];
            $userslist[$row]['privilege'] = $user['privilege'];
        endforeach;

        $json = json_encode($userslist);

        break;
    case 'updateinventory':
        $data = json_decode($_GET['stock']);
        foreach ($data as $id => $stock) :
                $query = $database->prepare("UPDATE `inventory` SET `stock_count`=:stock WHERE `id` = :id");
                $query->bindValue(':stock', (int)$stock);
                $query->bindValue(':id', (int)$id);
                $query->execute();
        endforeach;

        $json = json_encode([
            "success" => true
        ]);

        break;
    case 'checkorder':
        $query = $database->prepare("SELECT `status` FROM `orders` WHERE `id` = :id");
        $query->bindValue(':id', $_GET['order']);
        $query->execute();
        $r = $query->fetch();

        $json = json_encode([
            "status" => $r['status']
        ]);

        break;
    case 'submitorder':
        $data = json_decode($_GET['order']);

        $user_id = $_GET['user'] == "null" ? null : $_GET['user'];

        $query = $database->prepare("INSERT INTO `orders`(`user_id`) VALUES (:user)");
        $database->beginTransaction();
        $query->bindValue(':user', $user_id);
        $query->execute();

        $order_id = $database->lastInsertId('id');
        $database->commit();

        if (!isset($_GET['callback'])) {
            // var_dump($data);
            // var_dump($_GET['user']);
        }

        foreach ($data as $item) {
            if (!is_null($item->id)) {
                $query = $database->prepare("INSERT INTO `order_items`(`order_id`, `inventory_id`) VALUES (:order, :inventory)");
                $query->bindValue(':order', $order_id);
                $query->bindValue(':inventory', $item->id);
                $query->execute();

                $query = $database->prepare("UPDATE `inventory` SET `stock_count` = `stock_count` - 1 WHERE `id`=:inventory");
                $query->bindValue(':inventory', $item->id);
                $query->execute();
            } else {
                $query = $database->prepare("INSERT INTO `burgers`(`order_id`, `user_id`, `name`) VALUES (:order, :user, :name)");
                $database->beginTransaction();
                $query->bindValue(':order', $order_id);
                $query->bindValue(':user', $user_id);
                $query->bindValue(':name', $item->name);
                $query->execute();

                $burger_id = $database->lastInsertId('id');
                $database->commit();

                foreach ($item->ingredients as $ingredient) {
                    $query = $database->prepare("INSERT INTO `burger_ingredients`(`burger_id`, `inventory_id`) VALUES (:burger, :inventory)");
                    $query->bindValue(':burger', $burger_id);
                    $query->bindValue(':inventory', $ingredient->id);
                    $query->execute();

                    $query = $database->prepare("UPDATE `inventory` SET `stock_count` = `stock_count` - 1 WHERE `id`=:inventory");
                    $query->bindValue(':inventory', $ingredient->id);
                    $query->execute();
                }
            }
        }

        $json = json_encode([
            "success" => true,
            "id" => $order_id
        ]);

        break;
    default:
        $json = json_encode([
        'error' => 'invalid method'
        ]);
        break;
endswitch;

if (isset($_GET['callback'])) {
    print($_GET['callback'] . '(' . $json . ')');
} else {
    print($json);
}
