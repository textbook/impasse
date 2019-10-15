import axios from "axios";

export const get = (url) => axios.get(url).then((res) => res.data);
