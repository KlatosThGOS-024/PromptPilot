const getAIresponse = async (message: string) => {
  try {
    const url = `http://localhost:8000/api/v1/ai/get-answer`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        getQuestion: message,
      }),
    });
    const data = await response.json();
    const text = await data.data;
    return text;
  } catch (error) {
    console.log(error);
  }
};
const getAllChats = async () => {
  try {
    const url = `http://localhost:8000/api/v1/ai/get-all-chat`;
    const token = localStorage.getItem("accessToken");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getParticularChat = async (id: string) => {
  try {
    const url = `http://localhost:8000/api/v1/ai/get-particular-chat?id=${id}`;
    const token = localStorage.getItem("accessToken");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const text = await data.data;
    return text;
  } catch (error) {
    console.log(error);
  }
};
const saveNewChat = async (message: any, id: any) => {
  try {
    const url = `http://localhost:8000/api/v1/ai/save-chat-new?id=${id}`;
    const token = localStorage.getItem("accessToken");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        chat: {
          messages: message,
        },
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const saveOldSessionChat = async (message: any, id: any) => {
  try {
    const url = `http://localhost:8000/api/v1/ai/save-chat-old?id=${id}`;
    const token = localStorage.getItem("accessToken");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        chat: {
          messages: message,
        },
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export {
  getAIresponse,
  getAllChats,
  saveNewChat,
  getParticularChat,
  saveOldSessionChat,
};
