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
export default getAIresponse;
