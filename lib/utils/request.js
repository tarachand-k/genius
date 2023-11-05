const baseAPIUrl = process.env.BASE_API_URL;
console.log(baseAPIUrl);

export async function getAllChats(id) {
  console.log("UID inside request", id);
  const response = await fetch(`/api/chats?uid=${id}`);
  console.log(response);
  const { success, data } = await response.json();

  if (!success) throw new Error("Error fetching chats");

  return data;
}

export async function getMessages(chatId) {
  const response = await fetch(`/api/chats/${chatId}`);
  const { success, data } = await response.json();

  if (!success) throw new Error("Error fetching messages");

  return data;
}

export async function createChat(uid) {
  console.log("creating chat");
  const response = await fetch(`/api/chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid }),
  });
  const { success, data } = await response.json();
  if (!success) throw new Error("Error while creating a chat");

  console.log("chat created successfully");
  return data;
}

export async function updateChatName({ chatId, prompt: name }) {
  console.log("name", name);
  const response = await fetch(`/api/chats/${chatId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  const { success, data } = await response.json();
  if (!success) throw new Error("Error deleting a chat");

  return data;
}

export async function deleteChat(chatId) {
  const response = await fetch(`/api/chats/${chatId}`, {
    method: "DELETE",
  });
  const { success, data } = await response.json();
  if (!success) throw new Error("Error deleting a chat");

  return data;
}

export async function sendMessage({ chatId, prompt: question }) {
  if (!chatId && !question) throw new Error("Invalid arguments");

  const response = await fetch(`/api/chats/${chatId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });
  const { success } = await response.json();

  if (!success) throw new Error("Error sending a chat");
  return { success };
}
