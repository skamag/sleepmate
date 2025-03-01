import axios from "axios"

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
// })

console.log(process.env.NODE_ENV)

const API =
  process.env.NODE_ENV === "production"
    ? axios.create({
        baseURL: "https://sleepmate-render-production.up.railway.app/api",
      })
    : axios.create({
        baseURL: "http://localhost:5000/api",
      })

// const API =
//   process.env.NODE_ENV === "production"
//     ? axios.create({
//         baseURL: "https://sleepmate-render-mern.onrender.com/api",
//       })
//     : axios.create({
//         baseURL: "http://localhost:5000/api",
//       })

export default API
