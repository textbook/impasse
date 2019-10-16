import axios from "axios";

export const get = (url, params) => axios.get(url, { params }).then((res) => res.data);
