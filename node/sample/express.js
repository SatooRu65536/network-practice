const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded()) // URLエンコード機能の有効化
app.use(express.json()) // JSON形式のデータ受付を行う

app.get('/', (req, res) => {
  res.set({'content-type': 'text/plain'})
  res.send('Hello, World!!')
})

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})