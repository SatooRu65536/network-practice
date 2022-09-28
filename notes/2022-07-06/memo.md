# 第10回 NET分野実習　2022年7月6日

## KDDI システム障害
* 一つのルーターの設定ミス
* VOLTE (Voice Over LTE)
  LTE がTCP/IPでそこに音声をのせる
* 加入者DBを使用している

1. 音声通信とLTEを繋ぐルーターの設定ミス
2. 気づいて指し直した後にパンク

* 人為ミスであるが、夜中でも通信が多かったという時代背景もある
* ルーター一つのミスなら問題なく動くはずだった（**冗長化**）

#### **冗長化**とは
* システムを運用する上で必須である
* バックアップをとるなど

#### **稼働率**
* 99%でも低い（100日の内、1日停止）
* 限りなく100%に近づけるように
* システムアップデート時に停止してしまう  
→ 複数台で稼働する（サーバーを一箇所におかない）
* A社が使えなくなった場合のためにB社とも契約するなど

<br>

専門知識がある人と一般人では差が大きい  
  → 簡単にわかりやすく説明できるといいね

<br>

## 選挙 について
* ユポ紙という合成素材を使用している
* ユポ紙と鉛筆の組み合わせがいい
* 破れづらく、折っても開く
* ちゃんと選挙しようね

#### 電子投票ができない理由 
* 現在の選挙では誰にも影響されない状況で投票する
* どこでもできると暴力、脅し等の環境下で投票を強制されてしまう可能性がある
* 現時点では対策できないため電子投票ができない
* 技術的には可能だが紙よりは不具合起きる可能性はある

<br>

## Webアプリケーションの作成

### webサーバー自体は簡単に作れる
```JavaScript
const http = require('http')

// IP(ドメイン)とポート番号を指定 (http://127.0.0.1:3000/$PATH)
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello, World!!\n')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
```
* リクエストが来たら'Hello, World!!'と帰ってくる  
<image src="./images/pic-0.png" width="70%">

<br>

### 見つからないフォルダには 404を返す
```JavaScript
const http = require('http')

// IP(ドメイン)とポート番号を指定 (http://127.0.0.1:3000/$PATH)
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  if (res.url == '/favicon.ico') {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('ERROR File Not Found!\n')
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
```
* 見つからないファイルを指定された場合は404を返す  
<image src="./images/pic-0.png" width="70%">

* すべて作るとコードが長くなる  
-> ライブラリを使おう

<br>

## npmでプロジェクト作成
```shell
$ mkdir webapp
$ cd webapp
$ code .
# プロジェクトを初期化
$ npm init -y
# express インストール
$ npm install express --save
```
* package.js にインストールしたライブラリ等の設定を保存される
```json
"dependencies": {
  "express": "^4.18.1",
  "moment": "^2.29.3"
}
```
* package-locked.json は詳細
* このファイルがある場合は以下のコマンドを使用したほうがいい
```shell
$ npm ci
```

<br>

## Express を使用してみる

```JavaScript
const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded()) // URLエンコード機能の有効化
app.use(express.json()) // JSON形式のデータ受付を行う

// '/'にアクセスが来た場合
app.get('/', (req, res) => {
  res.set({'content-type': 'text/plain'})
  res.send('Hello, World!!')
})

// '/get-data'にアクセスが来た場合
app.get('/get-data', (req, res) => {
  res.set({'content-type': 'application/json'})
  res.send(`{"message": "hello,web api!!"}`)
})

app.post('/post-data', (req, res) => {
  const data = req.body
  console.log(data) // データの確認

  res.set({'content-type': 'application/json'})
  res.send(data) // 送られてきたデータをそのまま返す
})

// サーバー自体の立ち上げ
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
```
* get, post メソットも判断できる  
<image src="./images/express-0.png" width="70%">

* 'http://localhost:3000/' ->テキストとして送信される  
<image src="./images/express-2.png" width="70%">

* 'http://localhost:3000/get-data' -> jsonとして送信される

### curl コマンドで取得データを確認

```shell
$ curl 127.0.0.1
# プロキシに引っかかる場合
$ curl 127.0.0.1 --noproxy 127.0.0.1
```


### **GET** と **POST**
#### GET
* urlの後ろにつけられる   
  例）googleの検索ワード等

#### POST
* 表には表示されない
* 履歴の残っては困る場合等に使用  
  例）個人情報

<br>

## Node と Nginx のブリッジ
* :80(Nginx) から特定のアクセスがあれば :3000(Node) を動かす
  -> セキュリティ的にもよい
  クロスオリジン

webサイトへのアクセスをNodeへ  
（Nginx の機能を借りる感じ）

```
[/etc/nginx/sites-available/default]

server {
  ...
  server_name _;

+  location /api/ {
+    proxy_pass         http://127.0.0.1:3000/;
+    proxy_http_version 1.1;
+    proxy_set_header   Upgrade $http_upgrade;
+    proxy_set_header   Connection "upgrade";
+  }

  location / {
    # First attempt to serve request as file, then
    # as directory, then fall back to displaying a 404.
    try_files $uri $uri/ =404;
  }

  ...
}
```
* /api/ にアクセスされたら proxy_pass に飛ばす
* この働きをリバースプロキシという

'127.0.0.1/' にアクセス  
<image src="./images/nginx_to_node-1.png" width="70%">

* NginxがHTMLを返す

'127.0.0.1/api/' にアクセス  
<image src="./images/nginx_to_node-0.png" width="70%">

* NodeがNginx経由で受け取って返す

<br>

```JavaScript
// ボタンのイベント設定
document.getElementById('btn').addEventListener('click', () => {
    // APIデータ取得
    fetch(`http://localhost/api/get-data`)
        .then(response => {
            // console.log(response.status); // HTTPのステータスコード
            // console.log(response);
            // 取得したデータを表示
            response.json().then((data) => {
                // console.log(data);  // 取得されたレスポンスデータ
                document.getElementById("message").innerHTML = data.message;
            });
        });
});
```
* APIから取得した情報をリロードなしで更新できる

<br>

## Ajax
埋め込んだjs内から取得する  
-> リアルタイムで画面を更新できる

## 同一生成ポリシー
* JS でクライアントから他のサーバーにアクセスできない
* サーバーが他のサーバーから受け取ってクライアントに返せば実現できてしまう


<br>

## メモ
- [ ] 同一生成元ポリシー 
- [ ] Ajax

* Ajax は React とか Vue とかそこら辺だと思っていたが違いそう
* 失敗を繰り返すこと
* 自分のやって来たことを可視化しよう
* チャンスを逃さないために勉強しよう
* 人に仕事を振れるように

<br>

## 感想
学校のiPadの制限を突破するために、制限の掛かってない自分のサーバーを経由して別のサーバー（見たいサイト）からデータを取得してクライアントに返すという物を作った事があった。何気なくやっていた別の所からデータを貰ってサイトを更新する、という事がwebAPI等に関連している事に驚いた。
今回のNginxのように通常のwebサーバーを介したデータのやり取りを出来ることを知って今まで作ってきた物にも応用出来そうだと思った。知識は選択肢を広げてくれるので大切だと感じた
