const ID_TOKEN_KEY = "id_token";
const ID_KEY = "id";
const ID_NAME = "name";
const ID_LNAME = "Lname";
const ID_UNAME = "Uname";
const ID_PHONE = "phoneNumber";

export const getToken = () => {
    return window.localStorage.getItem(ID_TOKEN_KEY);
};
export const getId = () => {
    return window.localStorage.getItem(ID_KEY);
};
export const getName = () => {
    return window.localStorage.getItem(ID_NAME);
};
export const getLName = () => {
    return window.localStorage.getItem(ID_LNAME);
};
export const getUName = () => {
    return window.localStorage.getItem(ID_UNAME);
};
export const getPhoneNumber = () => {
    return window.localStorage.getItem(ID_PHONE);
};
export const saveToken = token => {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
};
export const saveId = id => {
    window.localStorage.setItem(ID_KEY, id);
};
export const saveName = name => {
    window.localStorage.setItem(ID_NAME, name);
};
export const saveLName = lastname => {
    window.localStorage.setItem(ID_LNAME, lastname);
};
export const saveUName = username => {
    window.localStorage.setItem(ID_UNAME, username);
};
export const savePhoneNumber = phonenumber => {
    window.localStorage.setItem(ID_PHONE, phonenumber);
};
export const destroyToken = () => {
    window.localStorage.removeItem(ID_TOKEN_KEY);
};
export const destroyId = () => {
    window.localStorage.removeItem(ID_KEY);
};
export const destroyName = () => {
    window.localStorage.removeItem(ID_NAME);
};
export const destroyLName = () => {
    window.localStorage.removeItem(ID_LNAME);
};
export const destroyUName = () => {
    window.localStorage.removeItem(ID_UNAME);
};
export const destroyPhoneNumber = () => {
    window.localStorage.removeItem(ID_PHONE);
};

export default { getToken, saveToken, destroyToken, getId, saveId, destroyId, getName, saveName, destroyName, getLName, saveLName, destroyLName, getUName, saveUName, destroyUName, getPhoneNumber, savePhoneNumber, destroyPhoneNumber };