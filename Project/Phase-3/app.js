const express = require("express");
const Vite = require("vite");
const nunjucks = require("nunjucks");
const path = require("path");

const { NODE_ENV } = process.env;
const PROXY_PORT = 3030;

async function main() {
  const port = process.env.PORT || 3000;
  const app = express();

  nunjucks.configure("dist", {
    autoescape: true,
    express: app,
    noCache: true,
  });

  // serve a page from express
  app.get("/contact", (req, res) => {
    res.send("Hello, from express");
  });

  // add the src directory
  const srcDir = path.join(__dirname, "/src");

  // serve static files from the public directory
  app.use(express.static(srcDir));

  // virtual route to forward to
  app.get("/", async (req, res) => {
    const config = { message: Date.now() };
    if (NODE_ENV == "dev") {
      res.sendFile(path.join(__dirname, "index.html"));
    } else {
      res.render("index.html", { config });
    }
  });

  const server = await app.listen(port);

  if (NODE_ENV == "dev") {
    const Proxy = require("http-proxy");

    var proxy = new Proxy.createProxyServer({
      target: { host: "localhost", port: PROXY_PORT },
    });

    // proxy anything yet-unhandled back to vite
    app.get("*", (req, res) => proxy.web(req, res));

    // proxy hmr ws back to vite
    server.on("upgrade", (req, socket, head) => {
      if (req.url == "/") proxy.ws(req, socket, head);
    });

    // start our vite dev server
    const vite = await Vite.createServer({
      server: {
        port: PROXY_PORT,
        hmr: {
          overlay: true, // enables an overlay on the webpage when a HMR update fails
        },
        watch: {
          usePolling: true,
        },
      },
    });
    vite.listen();
  } else {
    // serve built static files
    console.log("Building static files...");
    app.use(express.static(__dirname + "/dist"));
  }

  console.log(`listening on port ${port}`);
}

main();
