<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$app = new Silex\Application();


/* BILLS PAY*/
function getBills()
{
    $json = file_get_contents(__DIR__ . '/bills.json');
    $data = json_decode($json, true);
    return $data['bills'];
}

function findIndexById($id)
{
    $bills = getBills();
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBills($bills)
{
    $data = ['bills' => $bills];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/bills.json', $json);
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->get('api/bills', function () use ($app) {
    $bills = getBills();
    return $app->json($bills);
});

$app->get('api/bills/total', function () use ($app) {
    $bills = getBills();
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills/{id}', function ($id) use ($app) {
    $bills = getBills();
    $bill = $bills[findIndexById($id)];
    return $app->json($bill);
});

$app->post('api/bills', function (Request $request) use ($app) {
    $bills = getBills();
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills);
    return $app->json($data);
});

$app->put('api/bills/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills();
    $data = $request->request->all();
    $index = findIndexById($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills);
    return $app->json($bills[$index]);
});

$app->delete('api/bills/{id}', function ($id) {
    $bills = getBills();
    $index = findIndexById($id);
    array_splice($bills,$index,1);
    writeBills($bills);
    return new Response("", 204);
});
/* end BILLS PAY*/

/* BILLS RECEIVE*/
function getBillsReceive()
{
    $json = file_get_contents(__DIR__ . '/bills-receive.json');
    $data = json_decode($json, true);
    return $data['bills-receive'];
}

function findIndexReceiveById($id)
{
    $bills = getBillsReceive();
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBillsReceive($bills)
{
    $data = ['bills-receive' => $bills];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/bills-receive.json', $json);
}

$app->get('api/bills-receive', function () use ($app) {
    $bills = getBillsReceive();
    return $app->json($bills);
});

$app->get('api/bills-receive/total', function () use ($app) {
    $bills = getBillsReceive();
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills-receive/{id}', function ($id) use ($app) {
    $bills = getBillsReceive();
    $bill = $bills[findIndexReceiveById($id)];
    return $app->json($bill);
});

$app->post('api/bills-receive', function (Request $request) use ($app) {
    $bills = getBillsReceive();
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBillsReceive($bills);
    return $app->json($data);
});

$app->put('api/bills-receive/{id}', function (Request $request, $id) use ($app) {
    $bills = getBillsReceive();
    $data = $request->request->all();
    $index = findIndexReceiveById($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBillsReceive($bills);
    return $app->json($bills[$index]);
});

$app->delete('api/bills-receive/{id}', function ($id) {
    $bills = getBillsReceive();
    $index = findIndexReceiveById($id);
    array_splice($bills,$index,1);
    writeBillsReceive($bills);
    return new Response("", 204);
});


/* end BILLS RECEIVE*/


$app->match("{uri}", function($uri){
    return "OK";
})
->assert('uri', '.*')
->method("OPTIONS");


$app->run();