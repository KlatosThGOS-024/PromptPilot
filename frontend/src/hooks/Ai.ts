const getAIresponse = async (message: string) => {
  try {
    const url = `http://localhost:3000/api/v1/ai/get-answer`;
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
const getChats = async (id: string) => {
  try {
    const url = `http://localhost:3000/api/v1/ai/get-chats?id=${id}`;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzcyODNhNTUwNWU0NjAxOWUzNjYyNTYiLCJ1c2VybmFtZSI6IkFwcGxlQDEyMyIsImlhdCI6MTczNTU1ODQ3NH0.28_wiCxu8vchb0x8PdDAOonXue5ac5o9JHSRDcMikwI";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const text = await data.data;
    console.log(text);
  } catch (error) {
    console.log(error);
  }
};
const saveChat = async (message: any, id: any) => {
  try {
    const url = `http://localhost:3000/api/v1/ai/save-chat?id=${id}`;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzcyODNhNTUwNWU0NjAxOWUzNjYyNTYiLCJ1c2VybmFtZSI6IkFwcGxlQDEyMyIsImlhdCI6MTczNTU1ODQ3NH0.28_wiCxu8vchb0x8PdDAOonXue5ac5o9JHSRDcMikwI";
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
    const text = await data.data;
    console.log(text);
  } catch (error) {
    console.log(error);
  }
};
export { getAIresponse, getChats, saveChat };
