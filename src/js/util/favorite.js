export const favoriteList = () =>
  JSON.parse(localStorage.getItem("favorite")) || [];

export const favoriteData = () =>
  JSON.parse(localStorage.getItem("favoriteData")) || {};
