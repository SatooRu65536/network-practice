const express = require('express')
const app = express()
const port = 3001   // 今回は3001番を使用します

app.use(express.urlencoded()) // URLエンコード機能の有効化
app.use(express.json()) // JSON形式のデータ受付を行う

app.post('/uranai', (req, res) => {
    class Random {
        constructor(seed = 19681106) {
          this.x = 31415926535;
          this.y = 8979323846;
          this.z = 2643383279;
          this.w = seed;
        }
        
        // XorShift
        next() {
          let t;
       
          t = this.x ^ (this.x << 11);
          this.x = this.y; this.y = this.z; this.z = this.w;
          return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8)); 
        }
        
        // min以上max以下の乱数を生成する
        nextInt(min, max) {
          const r = Math.abs(this.next());
          return min + (r % (max + 1 - min));
        }
    }

    let num = 0;
    const data = req.body
    const dt = new Date();
    const date_num = Number(dt.getFullYear()) + Number(dt.getMonth()) + Number(dt.getDate())
    let random = new Random(date_num);
    num = random.nextInt(0, 10000);

    for (let i=0; i<data.name.length; i++) {
        num += data.name.charCodeAt(i)
    }
    console.log('num:',num);

  let unsei = ""
  let message = ""
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
    "unsei": unsei,
    "message": message,
  }

  res.set({'content-type': 'application/json'})
  res.send(response_data)
})


app.listen(port, () => {
  console.log(`Uranai Server is running at http://localhost:${port}/`)
})