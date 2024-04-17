import { User } from "./models/user";

interface UserInput {
  name: string;
  surname: string;
  studentNum: number;
  phoneNum?: number;
  birthday: string;
  password: string;
}

export async function createUser(user: UserInput): Promise<User> {
  const response = await fetch("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response.json();
}

interface LoginInput {
  username?: string;
  password?: string;
}
export async function login(user: LoginInput): Promise<User> {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response.json();
}

export async function logout() {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
export async function getCurrentUser(): Promise<User> {
  const response = await fetch("/api/users/login", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
