let welcomeMsgShown = false;

window.addEventListener("scroll", function () {
  if (window.scrollY > 150 && !welcomeMsgShown) {
    const welcome = document.getElementById("chat-welcome-msg");
    welcome.classList.add("show");

    welcomeMsgShown = true;

    // After a few seconds, fade it back
    setTimeout(() => {
      welcome.classList.remove("show");
      welcome.classList.add("hide");

      // Optional: Remove from DOM after animation
      setTimeout(() => {
        welcome.remove();
      }, 600);
    }, 3000); // Show for 3 seconds
  }
});



function toggleChat() {
  const chatbot = document.getElementById("chatbot");
  chatbot.style.display = chatbot.style.display === "none" || chatbot.style.display === "" ? "block" : "none";
}

// Listen for outside clicks
document.addEventListener("click", function (event) {
  const chatbot = document.getElementById("chatbot");
  const toggle = document.getElementById("chat-toggle");

  // If click is outside both chatbot and toggle button, close chatbot
  if (
    chatbot.style.display === "block" &&
    !chatbot.contains(event.target) &&
    !toggle.contains(event.target)
  ) {
    chatbot.style.display = "none";
  }
});

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");

    // Animate paper plane fly
  const sendIcon = document.getElementById("send-icon");
  sendIcon.classList.add("fly");

  setTimeout(() => {
    sendIcon.classList.remove("fly");
  }, 600); // match animation duration

  // User message
  const userBubble = document.createElement("div");
  userBubble.className = "user-msg";
  userBubble.textContent = message;
  chatBox.appendChild(userBubble);

  input.value = "";

  // Bot reply after delay
  setTimeout(() => {
    const botBubble = document.createElement("div");
    botBubble.className = "bot-msg";
    botBubble.textContent = getBotResponse(message);

    chatBox.appendChild(botBubble);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 600);
}

function getBotResponse(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello there! How can I help you today?";
  } else if (msg.includes("your name") || msg.includes("who are you")) {
    return "I'm Senu, your friendly chatbot here to guide you on Sandip's portfolio! 🤖";
  } else if (msg.includes("what do you do") || msg.includes("what is your work")) {
    return "I assist visitors like you in exploring Sandip's work, projects, and skills!";
  } else if (msg.includes("How are you")) {
    return "I am Fine! How are you?";
  } else if (msg.includes("good") || msg.includes("great")) {
    return "That's awesome! I'm glad you're having a good day!";
  } else if (msg.includes("sandip") || msg.includes("Who is sandip")) {
    return "Sandip Saha is a passionate tech enthusiast and full-stack developer with a BCA background from Brainware University.";
  } else if (msg.includes("who is he") || msg.includes("What do you know about sandip ?")) {
    return "Sandip is a hardworking developer who loves building web apps, exploring new tech, and helping others!";
  } else if (msg.includes("Tell me about his character") || msg.includes("What is his personality")) {
    return "Sandip is curious, creative, and dedicated to continuous learning. He believes in smart work and self-improvement.";
  } else if (msg.includes("His skills") || msg.includes("technologies") || msg.includes("what he knows")) {
    return "Sandip knows HTML, CSS, JavaScript, React, Bootstrap, Java, Spring Boot, Node.js, MongoDB, MySQL, Git, and more!";
  } else if (msg.includes("His projects")) {
    return "Sandip has worked on InstaClone, Snapgram, PG Life, Transparent Tax Filing App, and more exciting projects!";
  } else if (msg.includes("contact") || msg.includes("How to reach out to him ?")) {
    return "You can contact Sandip through the Contact section or WhatsApp using the green button!";
  } else if (msg.includes("resume") || msg.includes("cv")) {
    return "Sure! You can view or download Sandip's resume from the Resume section in the navigation.";
  } else if (msg.includes("portfolio")) {
    return "You’re already on Sandip’s portfolio! Explore the sections to see his work, skills, and contact info.";
  } else if (msg.includes("github") || msg.includes("code")) {
    return "You can check Sandip’s GitHub profile to explore all his projects and code contributions!";
  } else if (msg.includes("linkedin")) {
    return "Yes! Sandip is on LinkedIn. Visit the Contact section or footer to connect.";
  } else if (msg.includes("thank") || msg.includes("thanks")) {
    return "You're welcome! Let me know if you have more questions 😊";
  } else if (msg.includes("No") || msg.includes(" No. Thanks")) {
    return "Thankyou🤗. Visit again🙂‍↕️";
  } else {
    return "I'm still learning! But feel free to ask anything.";
  }
}


 // ✅ Add this safely after DOM is ready
  window.onload = function () {
    const input = document.getElementById("user-input");
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        sendMessage();
      }
    });
  };