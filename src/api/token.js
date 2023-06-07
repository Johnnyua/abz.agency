import axios from "axios";

export async function getToken(url) {
  try {
    const token = await axios.get(url);
    return token;
  } catch (error) {
    console.log(error);
  }
}

export function getTokenFromLocalStorage() {
  const token = localStorage.getItem('abztoken');
  return token;
}

export function saveTokenToLocalStorage(token) {
  localStorage.setItem("abztoken", token);
}

export function removeTokenFromLocalStorage(token) {
  localStorage.removeItem("abztoken", token);
}
