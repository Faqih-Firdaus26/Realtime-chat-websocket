const WebSocket = require("ws");
const http = require("http");
const fs = require("fs");
const path = require("path");

// Function to get content type
function getContentType(extname) {
  switch (extname) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".json":
      return "application/json";
    default:
      return "text/plain";
  }
}

// Serve static files
const server = http.createServer((req, res) => {
  let filePath;

  if (req.url === "/" || req.url === "/index.html") {
    filePath = path.join(__dirname, "index.html");
  } else {
    filePath = path.join(__dirname, req.url);
  }

  const extname = path.extname(filePath);
  const contentType = getContentType(extname);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404);
        res.end("File tidak ditemukan");
      } else {
        res.writeHead(500);
        res.end("Server error");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("🟢 Client terhubung");

  socket.on("message", (message) => {
    const text = message.toString();
    console.log("📩", text);

    // Broadcast ke semua client
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text); // sudah dalam format JSON
      }
    });
  });

  socket.on("close", () => {
    console.log("🔴 Client keluar");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
