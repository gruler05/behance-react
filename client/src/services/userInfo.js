const BASE_URL = "api/users/";
const callApi = async route => {
  try {
    const response = await fetch(`${BASE_URL}${route}`);
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
export const getUsers = async term => {
  const data = await callApi(`?user=${term}`);
  return data;
};

export const getUserProfileInfo = async username => {
  const data = await callApi(username);
  return data;
};
export const getUserProjects = async username => {
  const data = await callApi(`${username}/projects`);
  return data;
};
export const getUserWorkExperience = async username => {
  const data = await callApi(`${username}/workExperience`);
  return data;
};
export const getUserConnections = async (username, connectionType) => {
  const data = await callApi(`${username}/${connectionType}`);
  return data;
};
