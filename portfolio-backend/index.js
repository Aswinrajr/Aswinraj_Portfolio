const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const router = require("./routes/mailRoute");


const PORT = 3000;
const app = express();
const server = http.createServer(app);

app.set("trust proxy", true);


// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = ["https://aswinraj-portfolio.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS error: Origin ${origin} is not allowed`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.disable("x-powered-by");

// ✅ Register Routes
app.use("/api", router);

server.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
