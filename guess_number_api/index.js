const express = require('express')
const app = express()
const port = 3001   // 今回は3001番を使用します

app.use(express.urlencoded()) // URLエンコード機能の有効化
app.use(express.json()) // JSON形式のデータ受付を行う

app.post('/uranai', (req, res) => {
    
  if (data.name) {  // 受け取ったデータの中に"name"という名前のデータがあったら
    switch (num % 5) {
      case 0:
        unsei = "大吉"
        message = "今日は良い日になるでしょう"
        break
      case 1:
        unsei = "中吉"
        message = "今日はそこそこいい日になるでしょう"
        break
      case 2:
        unsei = "吉"
        message = "今日はまあまあいい日になるでしょう"
        break
      case 3:
        unsei = "小吉"
        message = "今日はきっといい日になるでしょう"
        break
      default:
        unsei = "凶"
        message = "今日はいろいろなことに気をつけましょう"
        break
    }
  }

  const response_data = {
    "nums": [1,2,3,4,5,6,7,8,9,10],
  }
//   const response_data = {
//     "unsei": unsei,
//     "message": message,
//   }

  res.set({'content-type': 'application/json'})
  res.send(response_data)
})


app.listen(port, () => {
  console.log(`Uranai Server is running at http://localhost:${port}/`)
})