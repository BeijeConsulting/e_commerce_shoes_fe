function getLocalStorage(data) {
  return JSON.parse(localStorage.getItem(data));
}
function setLocalStorage(key, data) {
  const result = JSON.stringify(
    localStorage.setItem(key, JSON.stringify(data))
  );
  console.log(result);
}

function clearLocalStorage(key) {
  localStorage.clear(key);
}

export { getLocalStorage, setLocalStorage, clearLocalStorage };
