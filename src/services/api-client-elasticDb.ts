import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:7188/api/elastic",
});
