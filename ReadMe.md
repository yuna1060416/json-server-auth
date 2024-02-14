# 六角 js 直播班用 json-server-auth Fake API

## 參考說明


## 安裝方式

```js
npm install

npm start

// 成功訊息
// json-server-auth is running at http://localhost:3033 ~
```

## PORT 設定

```js
//server.js:1
const PORT: {port}
```

## Token 時效性
```
為 1 小時有效，過期顯示 "jwt expired"，需重新 POST /login/ 取得
```

## 預設 API 說明

<h3 id="Member">會員</h3>

#### 註冊

```js
-POST /signup/

// Request
{
    "email" : 必填，[唯一值],
    "password": 必填,
    // ... 其他可自訂欄位
}

// Responese
{
    "accessToken": Bearer Token,
    "user": {
        "email": email,
        // ... 若有其他欄位一並回傳
        "id": 系統產生 id，之後的 userId
    }
}
```

#### 登入

```js
-POST /login/

// Request
{
    "email" : 必填，唯一值,
    "password": 必填,
}

// Responese
{
    "accessToken": [Bearer Token],
    "user": {
        "email": email,
        "id": 系統產生 id，之後的 userId
    }
}
```

#### 修改會員資料

```js
-PATCH /users/{userId}
Header Authorization: Bearer [Token]

// Request
{
    // 欲修改欄位....
    "name": "new Name"
}

// Responese
 {
    "email": email,
    "password": password,
    "id": userId
    // ... 其他自定義欄位
}
```

#### 刪除會員資料 (無法恢復)

```js
-DELETE /users/{userId}
Header Authorization: Bearer {Token}

// Responese
{}
```

####

---

<h3 id="Product">商品</h3>

#### 商品全部列表

```js
-GET /api/products/all

// Responese
[
    {
        "name": "使用 HTML、CSS 開發一個網站",
        "price": 1200,
        "category": "html",
        "platform": [
            "Udemy, Teachable"
        ],
        "id": 1
    },
    {
        "name": "使用 jQuery 打造互動性網頁動畫效果",
        "price": 1300,
        "category": "js",
        "platform": [
            "Udemy, Teachable"
        ],
        "id": 2
    },
    // ....
]

```

#### 商品某分類列表

```js
-GET /api/products/category/{:category}
-GET /api/products/category/html

// Response
[
    {
        "name": "使用 HTML、CSS 開發一個網站",
        "price": 1200,
        "category": "html",
        "platform": [
            "Udemy, Teachable"
        ],
        "id": 1
    }
]
```

#### 新增商品

```js
-POST /api/admin/products/
Header Authorization: Bearer {Token}

// Request
{
    "name": name,
    "price": price,
    "category": category,
    // ... 可自訂義欄位
}

// Response
{
    "success": true,
    "message": {
        "name": name,
        "price": price,
        "category": category,
        // ... 可自訂義欄位
        "id": 系統自動產生
    }
}
```

#### 修改商品

```js
-PATCH /api/admin/products/{productId}
Header Authorization: Bearer {Token}

// Request
{
    "name": name,
    "price": price,
    "category": category,
    // ... 可自訂義欄位
}

// Response
{
    "name": name,
    "price": price,
    "category": category,
    "platform": Platform,
    // ... 可自訂義欄位
    "id": 系統自動產生
}
```

#### 刪除商品

```js
-DELETE /api/admin/products/{productId}
Header Authorization: Bearer {Token}

// Response
{
    "success": true,
    "message": {}
}
```

####
