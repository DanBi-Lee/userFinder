import axios from "axios";

const url = "https://api.github.com/search/users";

export const getUsers = async (username) => {
  const config = {
    method: "get",
    url: `${url}?q=${username}&per_page=100&page=1`,
    headers: {
      accept: "application/vnd.github.v3+json",
    },
  };
  const response = await axios(config);
  return response.data;
};
