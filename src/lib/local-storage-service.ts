export function setItem(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
}

export function getItem(key: string) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function removeItem(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
}