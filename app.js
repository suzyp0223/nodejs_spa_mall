const express = require('express');
const connect = require("./schemas");   //"./schemas/index" index생략가능
const app = express();
const port = 3000;

connect();

const goodsRouter = require("./routes/goods");  // ./는 상대경로 app.js안에서 찾는다
const cartsRouter = require("./routes/carts");  //내경로 기준으로 routes경로에가서 carts를 가져온다.


const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl, " - ", new Date());
    next();
};

app.use(express.json());
app.use(requestMiddleware);

// app.use("/api", [goodsRouter, userRouter]); //   /api라는 경로로 goodsRouter,userRouter실행
app.use("/api", [goodsRouter, cartsRouter]); //   /api라는 경로가 겹치면 앞에걸 먼저 실행


app.get('/', (req, res) => {
  res.send('Hello World@@@@!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});