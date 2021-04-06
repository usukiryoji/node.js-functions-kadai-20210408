const functions = require("firebase-functions");
const express = require("express");
const requestPromise = require("request-promise-native"); 
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('01249e965a044fa09106549c84ca424a');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

const app = express();

// APIにリクエストを送る関数を定義
const getDataFromApi = async (keyword) => {
  // cloud functionsから実行する場合には地域の設定が必要になるため，`country=JP`を追加している
  const requestUrl =
    "https://newsapi.org/v2/top-headlines?country=jp&q=intitle:";
  const result = await requestPromise(`${requestUrl}${keyword}`);
  return result;
};


app.get("/user/:userId", (req, res) => {
  // 省略
});

// エンドポイント追加
app.get("/newsapi.org/:keyword", async (req, res) => {
  // APIリクエストの関数を実行
  const response = await getDataFromApi(req.params.keyword);
  res.send(response);
});

const api = functions.https.onRequest(app);
module.exports = { api };