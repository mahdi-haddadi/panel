export const getLocal = <T>(key: string): T => {
  let value: T = JSON.parse(`${localStorage.getItem(key)}`);
  return value;
};
export const setLocal = <T>(key: string, initialValue: T) => {
  localStorage.setItem(key, JSON.stringify(initialValue));
};
export const removeLocal = (key:string) => {
  localStorage.removeItem(key)
}
export const getSession = <T>(key: string): T => {
  let value: T = JSON.parse(`${sessionStorage.getItem(key)}`);
  return value;
};
export const setSession = <T>(key: string, initialValue: T) => {
  sessionStorage.setItem(key, JSON.stringify(initialValue));
};
export const removeSession = (key:string) => {
  sessionStorage.removeItem(key)
}