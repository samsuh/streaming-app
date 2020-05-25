//instance of axios created and exported from here

import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001",
});
