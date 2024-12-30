const logOutUser = async () => {
  const response = await fetch("http://localhost:3000/api/v1/user/logout", {
    method: "POST",
  });
  return response;
};
const logInUser = async (params: {
  username: string;

  password: string;
}) => {
  const response = await fetch("http://localhost:3000/api/v1/user/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return response.json();
};
const createAccount = async (params: {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const response = await fetch("http://localhost:3000/api/v1/user/signUp", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return response;
};
const logInCheck = async () => {
  const response = await fetch("http://localhost:3000/api/v1/user/loginCheck", {
    method: "GET",
    credentials: "include",
  });
  return response;
};
const getCurrentUser = async () => {
  const response = await fetch(
    "http://localhost:3000/api/v1/user/get-currentUser",
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export { logOutUser, logInUser, logInCheck, getCurrentUser, createAccount };
