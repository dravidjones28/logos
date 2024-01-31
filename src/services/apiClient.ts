import axios, { AxiosRequestConfig } from "axios";
import CryptoJS, { AES } from "crypto-js";

export interface FetchResponse<T> {
  status: string;
  data: T;
}

// Basic bG9nb3NyZXRyZWF0OlF3ZXIxMjMh
// let mainAPI = "https://sleepy-gold-pumps.cyclic.app/api";
let localAPI = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: localAPI,
});

export interface PaymentReceive {
  message: string;
  orderId: {
    amount: number;
    currency: string;
    entity: string;
    id: string;
    receipt: string;
    status: string;
  };
}

class APIClient<T, K> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    const headers: AxiosRequestConfig["headers"] = {
      Authorization: "Basic bG9nb3NyZXRyZWF0OlF3ZXIxMjMh",
    };
    return axiosInstance
      .get<T>(this.endpoint, { ...config, headers })
      .then((res) => res.data);
  };

  getAll1 = (config: AxiosRequestConfig) => {
    const session = () => {
      if (sessionStorage.getItem("user")) {
        const session_storage = JSON.parse(sessionStorage.user);
        const decryptedObjectString = AES.decrypt(
          session_storage,
          "secretKey"
        ).toString(CryptoJS.enc.Utf8);
        const parse = JSON.parse(decryptedObjectString);
        return parse;
      }
    };
    const database = session();
    const headers: AxiosRequestConfig["headers"] = {
      "x-auth-token": database?.accesstoken,

      Authorization: "Basic bG9nb3NyZXRyZWF0OlF3ZXIxMjMh",
    };
    return axiosInstance
      .get<T>(this.endpoint, { ...config, headers })
      .then((res) => res.data);
  };

  getStats = () => {
    const session = () => {
      if (sessionStorage.getItem("user")) {
        const session_storage = JSON.parse(sessionStorage.user);
        const decryptedObjectString = AES.decrypt(
          session_storage,
          "secretKey"
        ).toString(CryptoJS.enc.Utf8);
        const parse = JSON.parse(decryptedObjectString);
        return parse;
      }
    };
    const database = session();
    const headers: AxiosRequestConfig["headers"] = {
      "x-auth-token": database?.accesstoken,

      Authorization: "Basic bG9nb3NyZXRyZWF0OlF3ZXIxMjMh",
    };
    return axiosInstance
      .get<T>(this.endpoint, { headers })
      .then((res) => res.data);
  };

  postData(data: K) {
    const session = () => {
      if (sessionStorage.getItem("user")) {
        const session_storage = JSON.parse(sessionStorage.user);
        const decryptedObjectString = AES.decrypt(
          session_storage,
          "secretKey"
        ).toString(CryptoJS.enc.Utf8);
        const parse = JSON.parse(decryptedObjectString);
        console.log(parse);
        return parse;
      }
    };
    const database = session();

    const headers: AxiosRequestConfig["headers"] = {
      "x-auth-token": database?.accesstoken,
      Authorization: "Basic bG9nb3NyZXRyZWF0OlF3ZXIxMjMh",
      // Provide a default value if session?.accesstoken is undefined
    };
    return axiosInstance
      .post<T>(this.endpoint, data, {
        headers,
      })
      .then((res) => {
        console.log(res);
        return res.data;
      });
  }

  postDataFile(data: K) {
    const session = () => {
      if (sessionStorage.getItem("user")) {
        const session_storage = JSON.parse(sessionStorage.user);
        const decryptedObjectString = AES.decrypt(
          session_storage,
          "secretKey"
        ).toString(CryptoJS.enc.Utf8);
        const parse = JSON.parse(decryptedObjectString);
        console.log(parse);
        return parse;
      }
    };
    const database = session();

    const headers: AxiosRequestConfig["headers"] = {
      "x-auth-token": database?.accesstoken,

      Authorization: "Basic bG9nb3NyZXRyZWF0OlF3ZXIxMjMh",
    };
    return axiosInstance
      .post<T>(this.endpoint, data, {
        headers,
      })
      .then((res) => {
        console.log(res);
        return res.data;
      });
  }

  verfiy(data: K, signature: string) {
    const session = () => {
      if (sessionStorage.getItem("user")) {
        const session_storage = JSON.parse(sessionStorage.user);
        const decryptedObjectString = AES.decrypt(
          session_storage,
          "secretKey"
        ).toString(CryptoJS.enc.Utf8);
        const parse = JSON.parse(decryptedObjectString);
        console.log(parse);
        return parse;
      }
    };
    const database = session();
    const headers: AxiosRequestConfig["headers"] = {
      "x-auth-token": database?.accesstoken,
      "x-razorpay-signature": signature,
    };
    return axiosInstance
      .post<T>(
        this.endpoint,
        { author: database?._id, bookingName: database?.name, ...data },
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res);
        return res.data;
      });
  }

  putData(data: K, id: string) {
    const session = () => {
      if (sessionStorage.getItem("user")) {
        const session_storage = JSON.parse(sessionStorage.user);
        const decryptedObjectString = AES.decrypt(
          session_storage,
          "secretKey"
        ).toString(CryptoJS.enc.Utf8);
        const parse = JSON.parse(decryptedObjectString);
        console.log(parse);
        return parse;
      }
    };
    const database = session();

    const headers: AxiosRequestConfig["headers"] = {
      "x-auth-token": database?.accesstoken,
      Authorization: "Basic bG9nb3NyZXRyZWF0OlF3ZXIxMjMh",
      // Provide a default value if session?.accesstoken is undefined
    };

    return axiosInstance
      .put<T>(`${this.endpoint}/${id}`, data, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  }

  register(data: K) {
    return axiosInstance
      .post<T>(this.endpoint, data, {
        headers: {
          Authorization: "Basic bG9nb3NyZXRyZWF0OlF3ZXIxMjMh",
        },
      })
      .then((res) => {
        return res.data;
      });
  }

  payment(data: K) {
    const session = () => {
      if (sessionStorage.getItem("user")) {
        const session_storage = JSON.parse(sessionStorage.user);
        const decryptedObjectString = AES.decrypt(
          session_storage,
          "secretKey"
        ).toString(CryptoJS.enc.Utf8);
        const parse = JSON.parse(decryptedObjectString);
        return parse;
      }
    };
    const database = session();
    const headers: AxiosRequestConfig["headers"] = {
      "x-auth-token": database?.accesstoken,
      Authorization: "Basic bG9nb3NyZXRyZWF0OlF3ZXIxMjMh",
    };
    return axiosInstance
      .post<T>(this.endpoint, data, { headers })
      .then((res) => {
        return res.data;
      });
  }

  get = (id: number | string) => {
    const session = () => {
      if (sessionStorage.getItem("user")) {
        const session_storage = JSON.parse(sessionStorage.user);
        const decryptedObjectString = AES.decrypt(
          session_storage,
          "secretKey"
        ).toString(CryptoJS.enc.Utf8);
        const parse = JSON.parse(decryptedObjectString);
        console.log(parse);
        return parse;
      }
    };
    const database = session();
    const headers: AxiosRequestConfig["headers"] = {
      "x-auth-token": database?.accesstoken,
      Authorization: "Basic bG9nb3NyZXRyZWF0OlF3ZXIxMjMh",
      // Provide a default value if session?.accesstoken is undefined
    };
    return axiosInstance
      .get<T>(this.endpoint + "/" + id, { headers })
      .then((res) => res.data);
  };

  getWithAccess = (token: string) => {
    const headers: AxiosRequestConfig["headers"] = {
      "x-auth-token": token,
      Authorization: "Basic bG9nb3NyZXRyZWF0OlF3ZXIxMjMh",
    };
    return axiosInstance
      .get<T>(this.endpoint, { headers })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((error) => console.log(error));
  };
}

export default APIClient;
