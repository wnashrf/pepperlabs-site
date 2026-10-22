<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataDir = __DIR__ . '/../data/comments/';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function getComments($postId) {
    global $dataDir;
    $filePath = $dataDir . 'post-' . intval($postId) . '-comments.json';
    
    if (!file_exists($filePath)) {
        return array();
    }
    
    $json = file_get_contents($filePath);
    $comments = json_decode($json, true);
    
    return is_array($comments) ? $comments : array();
}

function saveComment($postId, $comment) {
    global $dataDir;
    $filePath = $dataDir . 'post-' . intval($postId) . '-comments.json';
    
    $comments = getComments($postId);
    $comment['id'] = 'comment-' . time() . '-' . rand(1000, 9999);
    $comment['timestamp'] = date('Y-m-d\TH:i:s\Z');
    $comment['status'] = 'approved';
    
    $comments[] = $comment;
    
    $json = json_encode($comments, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    return file_put_contents($filePath, $json) !== false;
}

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($method === 'GET' && $action === 'list') {
    $postId = isset($_GET['post']) ? intval($_GET['post']) : 0;
    
    if ($postId <= 0) {
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid post ID'));
        exit();
    }
    
    $comments = getComments($postId);
    echo json_encode(array(
        'success' => true,
        'postId' => $postId,
        'comments' => $comments,
        'count' => count($comments)
    ));
    
} elseif ($method === 'POST' && $action === 'add') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $postId = isset($input['post_id']) ? intval($input['post_id']) : (isset($input['postId']) ? intval($input['postId']) : 0);
    $author = isset($input['author']) ? sanitizeInput($input['author']) : '';
    $email = isset($input['email']) ? sanitizeInput($input['email']) : '';
    $content = isset($input['content']) ? sanitizeInput($input['content']) : '';
    
    // Validation
    $errors = array();
    
    if ($postId <= 0) {
        $errors[] = 'Invalid post ID';
    }
    
    if (empty($author) || strlen($author) < 2 || strlen($author) > 100) {
        $errors[] = 'Name must be between 2 and 100 characters';
    }
    
    if (empty($email) || !validateEmail($email)) {
        $errors[] = 'Invalid email address';
    }
    
    if (empty($content) || strlen($content) < 3 || strlen($content) > 2000) {
        $errors[] = 'Comment must be between 3 and 2000 characters';
    }
    
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(array(
            'success' => false,
            'errors' => $errors
        ));
        exit();
    }
    
    $comment = array(
        'author' => $author,
        'email' => $email,
        'content' => $content,
        'parentCommentId' => null
    );
    
    if (saveComment($postId, $comment)) {
        echo json_encode(array(
            'success' => true,
            'message' => 'Comment added successfully',
            'comment' => $comment
        ));
    } else {
        http_response_code(500);
        echo json_encode(array(
            'success' => false,
            'error' => 'Failed to save comment'
        ));
    }
    
} else {
    http_response_code(400);
    echo json_encode(array('error' => 'Invalid request'));
}
?>
