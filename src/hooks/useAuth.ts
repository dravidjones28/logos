import CryptoJS, { AES } from "crypto-js";

export interface DB {
  _id: string;
  name: string;
  accesstoken: string;
  email: string;
  isAdmin: boolean;
}

function db(): DB | undefined {
  if (sessionStorage.getItem("user")) {
    const session_storage = JSON.parse(sessionStorage.user);
    const decryptedObjectString = AES.decrypt(
      session_storage,
      "secretKey"
    ).toString(CryptoJS.enc.Utf8);
    const parse = JSON.parse(decryptedObjectString);
    return parse;
  }
}
const useAuth = () => {
  const session = db();

  if (session) return session;
  return false;
};

export default useAuth;
