# 第9回 NET分野実習　2022年7月20日

## オリジナルアプリ
[数当てゲーム](../2022-06-15/memo.md) をつくる

1. node.jsの設定追加
```text
location /uranai_api/ {
        proxy_pass         http://127.0.0.1:3001/;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
}
```

2. あらかじめ用意した数字を配列で送信するようにした
```JavaScript
app.post('/check', (req, res) => {

  const response_data = {
    "nums": [1,2,3,4,5,6,7,8,9,10],
  }

  res.set({'content-type': 'application/json'})
  res.send(response_data)
})
```

3. クライアント側JSを読み込んだら取得するように書き換えた
```JavaScript
window.onload = () => {
  // api へデータをpostして結果を取得する
  fetch(`http://localhost/guess_number_api/check`, {
    method: "POST",
    body: null,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);  // 取得されたレスポンスデータをデバッグ表示しておく

      // メッセージの表示
      document.getElementById("response").innerHTML = data.unsei + ": " + data.message
    })
}
```

3. 結果
> [ERROR] 同一生成ポリシーにより...

問題点を探す
* `localhost` と `127.0.0.1` が混ざってる  
-> そんなことない
* サーバーの設定ミス  
-> 多分あってる
* uranai_app で試す  
-> 普通にできた  

...うーん

💡あれ、URLが`うらない`と違う...?  
うらない -> `localhosst/uranai_app/`  
数字当て -> `localhost:5500/www/guess_number_app_`  

> **原因**  
> NginxではなくVScodeの `Live Share` 使ってた為おかしくなってた  
> （`Live Share` でMacからコード書いてて、サイトもMacからアクセス出来ないか試してた）  

4. リロードしてみる
> [ERROR] SyntaxError: Jsonがなんかおかしいよ
```JavaScript
fetch(`http://localhost/guess_number_api/check`, {
    method: "POST",
    body: null,
    headers: {
      'Content-Type': 'application/json',
    },
  })
```
よくわからなかったからとりあえず `body: null` としたのがだめ?

```JavaScript
// ボタンのイベント設定
window.onload = () => {
  // api へデータをpostして結果を取得する
  fetch(`http://localhost/guess_number_api/check`, {
    method: "POST",
    body: JSON.stringify('{"mode": "easy"}'),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);  // 取得されたレスポンスデータをデバッグ表示しておく

      // メッセージの表示
      document.getElementById("response").innerHTML = data.unsei + ": " + data.message
    })
}
```
今後実装予定だったモード設定を送信するようにした
```JavaScript
...
 body: JSON.stringify('{"mode": "easy"}'),
...
```
-> エラー消えず。ちゃんとエラーの意味調べた

> エラーメッセージ  
> SyntaxError: JSON.parse: unexpected character at line 1 column 1 of the JSON data

> エラーの意味  
> `JSON.parse()` が文字列をJSONとして解釈するのに失敗した場合に発生します

なるほど.....そんなの使ったっけ??  
-> VScode の探せる機能使ったけどなし。。  
（でもブラウザのターミナルからエラー吐いてるから原因はクライアント側...?）

<br>

###  メモ
* **おすすめ書籍**  
プロフェッショナルIPv6
* 図書館を活用しよう

<br>

## 感想
[オリジナルアプリ](#オリジナルアプリ) を作る時、単純に送信するjsonデータを書き換えるだけでできると思っていた。しかし作っているとエラーが多くでてしまった。一から作ったわけではないので思い通りの挙動でなかったり、エラーの意味がわかってもどこで起きてるかがわからなかった。共同開発や他人が作ったプログラムを使用する場合はしっかり読んでから始めるべきだと実感した。

> P.S.  
ノートまとめる気力が無かったのでめっちゃ応援してくれるソフト作りました。

https://user-images.githubusercontent.com/87361015/180658355-7577177b-ee06-4e8a-9eb0-a8297b729b60.mov

<br>

### 一学期編 FIN

### next > 「夏休み編」
~~Nginx用意しなきゃできなくね...~~
