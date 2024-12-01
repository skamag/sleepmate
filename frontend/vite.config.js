import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: true, // Enable access from the local network
  //   port: 5173, // Optional: Specify a port if needed
  // },
})
