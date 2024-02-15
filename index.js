const PORT = 3033;
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.db = router.db;

const rules = auth.rewriter({
  users: 600,
  "/users/:email": "/users?email=:email",
  "/api/*": "/$1",
  "/products/all": "/products/",
  "/admin/*": "/664/$1",
});

// 產品
server.post("/api/admin/products/", (req, res, next) => {
  const { title } = req.body;

  // 新增時檢查欄位
  if (!title ) {
    res.json({ success: false, message: "需輸入完整資訊" });
    return;
  }

  // if (isNaN(Number(price))) {
  //   res.json({ success: false, message: "價格欄位需為數字" });
  //   return;
  // }
  next();
});


server.use(rules);
server.use(auth);
server.use(router);

router.render = (req, res) => {
  // // GET 購物車只列出登入的 User 的
  // if (req.url == "/carts/" && req.method == "GET") {
  //   console.log(req.claims);
  //   res.locals.data = res.locals.data.filter(
  //     (item) => item.userId == req.claims.sub
  //   );
  // }

  // // GET 訂單只列出登入的 User 的
  // if (req.url == "/orders/" && req.method == "GET") {
  //   res.locals.data = res.locals.data.filter(
  //     (item) => item.userId == req.claims.sub
  //   );
  // }

  // 自定義輸出結果，除原本的物件外多一個屬性 success
  res.json({
    success: res.statusCode >= 400 ? false : true,
    message: res.locals.data,
  });
};

server.listen(PORT, () => {
  console.log(`json-server-auth is running at http://localhost:${PORT} ~`);
});
