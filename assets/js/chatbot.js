let portfolioData = {};

// Load portfolio JSON data
fetch("https://raw.githubusercontent.com/student-sandip/my-portfolio-api/refs/heads/main/portfolio-data.json")
  .then((res) => res.json())
  .then((data) => {
    portfolioData = data;
    const welcome = document.getElementById("chat-welcome-msg");
    if (welcome) welcome.style.display = "block";
  })
  .catch((err) => console.error("Failed to load portfolio data:", err));

function toggleChat() {
  const chatbot = document.getElementById("chatbot");
  chatbot.style.display = chatbot.style.display === "none" || chatbot.style.display === "" ? "block" : "none";
}

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");

  // Append user message
  const userBubble = document.createElement("div");
  userBubble.className = "user-msg";
  userBubble.textContent = message;
  chatBox.appendChild(userBubble);

  input.value = "";

  // Append bot reply after delay
  setTimeout(() => {
    const botBubble = document.createElement("div");
    botBubble.className = "bot-msg";
    botBubble.innerHTML = getBotResponse(message);
    chatBox.appendChild(botBubble);

    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);

  if (chatBox.children.length === 2) {
  chatBox.style.paddingTop = "0px";
}
}

function getBotResponse(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "👋 Hello! How can I help you today?";
  } else if (msg.includes("about")) {
    return portfolioData.about?.aboutMe?.paragraphs?.join("<br><br>") || "ℹ️ About info not available.";
  } else if (msg.includes("skill")) {
    return portfolioData.services?.skills?.map(skill => `✅ <b>${skill.title}</b>: ${skill.description}`).join("<br><br>") || "⚙️ Skills not found.";
  } else if (msg.includes("project")) {
    return portfolioData.portfolio?.projects?.map(project => `📌 <b>${project.title}</b>: ${project.description}<br><a href="${project.link}" target="_blank">View Project</a>`).join("<br><br>") || "📁 No projects listed.";
  } else if (msg.includes("contact")) {
    return portfolioData.contact?.contactInfo?.map(info => `📍 <b>${info.title}</b>: <a href="${info.link}" target="_blank">${info.value}</a>`).join("<br>") || "📞 Contact info not found.";
  } else if (msg.includes("resume")) {
    const resume = portfolioData.about?.resume?.url;
    return resume ? `📄 You can view his resume <a href="${resume}" target="_blank">here</a>.` : "📄 Resume not available.";
  } else if (msg.includes("education")) {
    return portfolioData.resume?.education?.map(edu => `🎓 <b>${edu.degree}</b> (${edu.duration})<br>${edu.institution}`).join("<br><br>") || "📘 Education info not found.";
  } else if (msg.includes("experience") || msg.includes("work")) {
    return portfolioData.resume?.experience?.map(exp => `💼 <b>${exp.role}</b> (${exp.duration})<br>${exp.company}, ${exp.location}`).join("<br><br>") || "🧳 Experience details not found.";
  } else if (msg.includes("name")) {
    return portfolioData.about?.basicInfo?.name ? `👤 his name is ${portfolioData.about.basicInfo.name}.` : "🙅‍♂️ Name not found.";
  } else if (msg.includes("email")) {
    const email = portfolioData.about?.basicInfo?.email;
    return email ? `📧 Email me at <a href="mailto:${email}">${email}</a>` : "📪 Email not found.";
  } else if (msg.includes("location") || msg.includes("city")) {
    const location = portfolioData.about?.basicInfo?.location; 
    return location ? `📍 I am located in ${location}.` : "🌍 Location not specified.";
  } else if("what's your name ?" === msg || "who are you ?" === msg || "what is your name ?" === msg ) {
    return "🤖 I'm <b>senu</b>, your personal chatbot assistant.";
  } else if ("who is sandip ?" === msg || "sandip ?" === msg || "So you know about sandip ?" === msg || "sandip " === msg || "tell me about sandip" === msg) {
    return "Sandip is a passionate web developer and designer with expertise in creating dynamic and responsive websites. He loves coding, learning new technologies, and sharing knowledge with others.";
  } else {
    return "🤖 I'm still learning. Try asking about <b>skills</b>, <b>projects</b>, <b>contact</b>, or <b>about</b>.";
  }
}

// Enable sending message with Enter key
window.onload = function () {
  document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
};
