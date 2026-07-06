<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $to = "sandipsaha70755@gmail.com"; // Corrected email
  $subject = htmlspecialchars($_POST['subject']);
  $name = htmlspecialchars($_POST['name']);
  $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  $message = htmlspecialchars($_POST['message']);

  $fullMessage = "Name: $name\n";
  $fullMessage .= "Email: $email\n\n";
  $fullMessage .= "Message:\n$message";

  $headers = "From: $email";

  if (mail($to, $subject, $fullMessage, $headers)) {
    echo "OK";
  } else {
    echo "Something went wrong. Please try again.";
  }
}
?>
