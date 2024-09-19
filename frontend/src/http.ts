interface UserInput {
  name: string;
  surname: string;
  studentNum: string;
  phoneNum?: string;
  birthday: string;
  password: string;
}

export async function createUser(user: UserInput): Promise<Response> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response;
}

interface LoginInput {
  studentNum?: string;
  password?: string;
}
export async function login(user: LoginInput): Promise<Response> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response;
}

export async function logout() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
export async function getCurrentUser(): Promise<Response> {
  const response = await fetch("/api/auth/getAuthenticatedUser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
