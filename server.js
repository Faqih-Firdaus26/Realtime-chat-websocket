const WebSocket = require("ws");
const http = require("http");
const fs = require("fs");
const path = require("path");

// Serve index.html
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, "index.html");
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Gagal load halaman");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
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
