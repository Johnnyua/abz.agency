import axios from "axios";

export async function getUsers(url, params = {}) {
  try {
    const users = axios.get(url, {
      params: params,
    });
    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function getUsersPositions(url) {
  try {
    const positions = axios.get(url);
    return positions;
  } catch (error) {
    console.log(error);
  }
}

export async function postUser(url, user, headers) {
  try {
    const result = await axios.post(url, user, {
      headers,
    });
    return result;
  } catch (error) {
    return error;
  }
}
