const logOutUser = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch("http://localhost:8000/api/v1/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  localStorage.clear();
  return response;
};
const logInUser = async (params: {
  username: string;

  password: string;
}) => {
  const response = await fetch("http://localhost:8000/api/v1/user/login", {
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
  const response = await fetch("http://localhost:8000/api/v1/user/signUp", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return response;
};
const logInCheck = async () => {
  const response = await fetch("http://localhost:8000/api/v1/user/loginCheck", {
    method: "GET",
    credentials: "include",
  });
  return response;
};
const getUserProfile = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    "http://localhost:8000/api/v1/user/user-profile",

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export { logOutUser, logInUser, logInCheck, getUserProfile, createAccount };
