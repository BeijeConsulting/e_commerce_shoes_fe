function getLocalStorage(data) {
  return JSON.parse(localStorage.getItem(data));
}
function setLocalStorage(key, data) {
  JSON.stringify(localStorage.setItem(key, JSON.stringify(data)));
}

function clearLocalStorage(key) {
  localStorage.clear(key);
}

export { getLocalStorage, setLocalStorage, clearLocalStorage };
