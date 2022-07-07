const qs = require("qs");
const http = require("http");
const fs = require("fs");

const sever = http.createServer((req, res) => {
  if (req.method === "GET") {
    fs.readFile("./views/caculation.html", (err, data) => {
      if (err) {
        console.log(err);
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      const parseData = qs.parse(data);
      fs.readFile("./views/index.html", "utf-8", (err, dataResponse) => {
        if (err) {
          console.log(err);
        }
        let result;
        let a = parseInt(parseData.input_a);
        let b = parseInt(parseData.input_b);
        let caculation = parseData.domath;
        if (caculation === "+") {
          result = a + b;
          dataResponse = dataResponse.replace("{plus}", result);
        } else if (caculation === "-") {
          result = a - b;
          dataResponse = dataResponse.replace("{subtraction}", result);
        } else if (caculation === "x") {
          result = a * b;
          dataResponse = dataResponse.replace("{multilple}", result);
        } else if (caculation === "/") {
          result = a / b;
          dataResponse = dataResponse.replace("{division}", result);
        }
        res.writeHead(200, {'Content' : 'text/html'});
        res.write(dataResponse);
        return res.end();
      });
    });
    req.on('error', () => console.log('error'));
  }
});

sever.listen(8080, 'localhost', () => console.log('Sever is running at localhost:8080'));

