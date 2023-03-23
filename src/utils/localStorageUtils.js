function getLocalStorage(data) {
  return JSON.parse(localStorage.getItem(data));
}
function setLocalStorage(key, data) {
  JSON.stringify(localStorage.setItem(key, JSON.stringify(data)));
}

export { getLocalStorage, setLocalStorage };
