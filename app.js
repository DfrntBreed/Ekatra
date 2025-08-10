function startApp() {
  // Later we'll redirect to onboarding
  window.location.href = "pages/onboarding.html";
}
async function sendMessage(userMessage) {
  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    const botReply = data.reply;

    console.log("AI reply:", botReply);

    const chatBox = document.getElementById("chat-box");

    // Show Mahi's reply
    const botMessageElement = document.createElement("div");
    botMessageElement.textContent = "Ekatra: " + botReply;
    botMessageElement.classList.add("Ekatra-message");
    chatBox.appendChild(botMessageElement);

  } catch (error) {
    console.error("Error:", error);
  }
}

// Input aur button event listener
const input = document.getElementById("user-input");
const button = document.getElementById("send-btn");

button.addEventListener("click", () => {
  const userMessage = input.value.trim();
  if (userMessage === "") return;

  sendMessage(userMessage);

  const chatBox = document.getElementById("chat-box");

  // Show user's message
  const userMessageElement = document.createElement("div");
  userMessageElement.textContent = "You: " + userMessage;
  userMessageElement.classList.add("user-message");
  chatBox.appendChild(userMessageElement);

  input.value = ""; // clear input
});
