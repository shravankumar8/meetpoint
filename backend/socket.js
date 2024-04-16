const express = require("express");
const app = express();
const port = 3002;
const ipAddress = "192.168.29.52"; // Your desired IP address
 
 // Define a route for the root endpoint ("/")
 http: app.get("/", (req, res) => {
   res.send("Hello, World!");
 });

// Start the server and listen on the specified IP address and port
app.listen(port, ipAddress, () => {
  console.log(`Server is running on http://${ipAddress}:${port}`);
});
