

//baseURL= import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api"
const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

export default baseURL;