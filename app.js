const express = require("express");
const dbConnect = require("./config/dbConnect");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const path = require("node:path");

const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

dbConnect();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/loginRoutes"));
app.use("/contacts", require("./routes/contactRoutes"));

app.use(require("./middlewares/errorhandler"));

const server = app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중`);
});

server.on("error", (error) => {
  console.error(error.code === "EADDRINUSE"
    ? "3000번 포트가 사용 중입니다. 실행 중인 06 또는 다른 서버를 종료한 뒤 다시 실행하세요."
    : error.message);
  process.exitCode = 1;
});
