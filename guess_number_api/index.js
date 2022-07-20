const express = require('express')
const app = express()
const port = 3001   // 今回は3001番を使用します

app.use(express.urlencoded()) // URLエンコード機能の有効化
app.use(express.json()) // JSON形式のデータ受付を行う

app.post('/check', (req, res) => {

  const response_data = {
    "nums": [1,2,3,4,5,6,7,8,9,10],
  }

  res.set({'content-type': 'application/json'})
  res.send(response_data)
})


app.listen(port, () => {
  console.log(`Uranai Server is running at http://localhost:${port}/`)
})