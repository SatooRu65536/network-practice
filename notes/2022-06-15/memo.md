# 第7回 NET分野実習 2022年6月15日

## JavaScript
* クライアント側（通常）とサーバー側（Node.js）がある
* クライアントサイドはブラウザが処理する  
　→ファイル操作不可
* Node.js はファイル操作等さまざまある

## サイトの構造を見る
1. サイト開く
2. 右クリック
3. たのしい

コンソール
```JavaScript
window.alert(‘Hello, World!’)
```
> Hello, World!

<br>

```JavaScript
document.querySelectorAll('img').forEach((element)=> {
  element.style.transform = 'rotate(30deg)'
})
```
（画像が30度回転するcssを追加している）  

<br>

### 説明
`document`（htmlの要素）から `querySelectorAll('img')` で `img` タグを全て取得し、 `forEach` で一つず `element` に入れる。 element の `style`（css）に `rotate: 30deg;` を追加する。 


その他にも
```JavaScript
element.innerHTML
console.log(‘text’)
```

## 実際にやってみる

index.html
```HTML
<script src="./script.js"></script>
```

script.js
```JavaScript
console.log(‘Good!’)
```
> Good!


**変数**
```JavaScript
var hoge = 1	// 古い書き方
let fuga = 2	// おすすめ
```
（厳密には仕様が違う。再宣言の可不可等）

**定数**
```JavaScript
const piyo = 3  // 定数
```
（再代入不可）

* js は動的型付け
  （基本どんな型でも同じ変数に代入できる）
  ```JavaScript
  let hoge = 1
  console.log(typeof(hoge))	// -> number
  hoge = ‘hi’
  console.log(typeof(hoge))  // -> string
  ```

* 型の違いに注意（自動で型を変えてくれる）



**比較演算子**
```JavaScript
console.log (100 == ‘100’)    // -> true
console.log (100 === ‘100’)  // -> false
```

**関数の書き方**
```JavaScript
function kansu1(a, b) {
    return a + b
}

const kansu2 = (a, b) => {
    return a + b
}
```

**HTML要素から取得**
index.html
```HTML
<input type="number" value=”999”>
```
テキストボックスを追加。valueで初期値を設定（firefoxは不可）

script.js
```JavaScript
element.value  // テキストボックスの値を取得
element2.innerHTML = 'value'  // HTML要素に文字を表示
```

## 数当てゲーム
☆頑張ったポイント
* 無駄に乱数生成するときに範囲指定できるようにした

☆サンプルとの大きな違い
* リセットするタイミングの状態管理  
　HTMLテキスト → グローバル変数  
（表示内容変えてもそのまま使える変数が好き）

* 大きい小さい正解のcss  
　クラス付与 → css変更  
（cssが複雑になったときわかりやすいクラス付与がよさそう）

☆その他  
* ページ読み込み時の resset() 呼び出しもっといい書き方があるのではないか


[リポジトリ](https://github.com/SatooRu65536/practice_site/www/)  
[gitub-pages](https://satooru65536.github.io/practice_site/www/)  


## メモ
**おまじないは理解しよう！**  
**エラーと仲良くなろう！**

### pinguコマンド追加してみた
git インストール  
> sudo apt install git  

リポジトリをクローン  
> git clone https://github.com/sheepla/pingu  

Goをインストール  
> sudo apt install golang-go  

現在のフォルダのgoファイルをコンパイル  
> go build .  

実行  
> ./pingu 192.168.156.114  

パスを通す変わり  
> mv ./pingu  /usr/local/bin  

どこでも実行できる  
> pingu 192.168.156.114  
```
PING 1.1.1.1 (1.1.1.1) type `Ctrl-C` to abort
 ...        .     ...   ..    ..     .........            seq=0 32bytes from 1.1.1.1: ttl=58 time=20.182ms
 ...     ....          ..  ..      ... .....  .. ..       seq=1 32bytes from 1.1.1.1: ttl=58 time=27.495ms
 ...    .......      ...         ... . ..... #######      seq=2 32bytes from 1.1.1.1: ttl=58 time=24.755ms
.....  ........ .###############.....  ... ##########.  . seq=3 32bytes from 1.1.1.1: ttl=58 time=24.026ms
 .... ........#####################.  ... ###########     seq=4 32bytes from 1.1.1.1: ttl=58 time=29.607ms
      ....... ######################.... ############     seq=5 32bytes from 1.1.1.1: ttl=58 time=24.32ms
.    .  .... ########################... ###########      seq=6 32bytes from 1.1.1.1: ttl=58 time=23.406ms
   ..   ....#########################.. .###########      seq=7 32bytes from 1.1.1.1: ttl=58 time=25.051ms
    .       #########################.   .##########      seq=8 32bytes from 1.1.1.1: ttl=58 time=21.605ms
   ....     .########################.      ########      seq=9 32bytes from 1.1.1.1: ttl=58 time=19.22ms
  .....      .  ####################.        #######.     seq=10 32bytes from 1.1.1.1: ttl=58 time=28.964ms
......     .. . ################## . .      .#######      seq=11 32bytes from 1.1.1.1: ttl=58 time=236.967ms
......       #####################  .      .#######       seq=12 32bytes from 1.1.1.1: ttl=58 time=13.627ms
......   .###########################  ..  #######        seq=13 32bytes from 1.1.1.1: ttl=58 time=21.578ms
...    . ########################################.        seq=14 32bytes from 1.1.1.1: ttl=58 time=21.335ms
       ####################################### .          seq=15 32bytes from 1.1.1.1: ttl=58 time=22.704ms
      ##################################    .             seq=16 32bytes from 1.1.1.1: ttl=58 time=15.216ms
     ###################################  ........        seq=17 32bytes from 1.1.1.1: ttl=58 time=22.296ms
  .#####################################    .........     seq=18 32bytes from 1.1.1.1: ttl=58 time=110.598ms
 .#######################################       .... . .  seq=19 32bytes from 1.1.1.1: ttl=58 time=152.476ms
                                                          seq=20 32bytes from 1.1.1.1: ttl=58 time=20.163ms
                                                          seq=21 32bytes from 1.1.1.1: ttl=58 time=23.515ms
```



## 感想
JavaScriptはもともとよくやっていたが、関数の宣言方法があまりよくなかった。他は大体認識通りだったから作りながら理解するというスタンスでも問題なさそうだと思った。
