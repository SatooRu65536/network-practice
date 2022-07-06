# node

##  1. 挨拶君(Mr.Greeting)

**プロトコル**
```
「やあ」  
→時間に合わせて挨拶  
（「おはよう」「こんにちは」「こんばんは」）  
「何時？」  
→「今は {datetime} だよ」  
「帰りたい」  
→「帰れ」or「頑張って！」  
```

[ソースコード](https://github.com/satooru65536/practice/node/law_game.js)  
practice/node/law_game.js

<br>

---

## 2.法則ゲーム(Law Game)

**プロトコル**
* ランダムな法則性のある数列の[n]番目を当てる
* 正解すると[?]がでてからの時間が返されrう
* 間違っていると「It's not 8」と出る
```
> start
1 3 5 [?] 9 11 13 ...
> 7
CORRECT!!
TIME: 3.14s

> start
3 4 6 9 13 [?] 24 31 39 48 58 ...
> 8
It's not '8'
> 18
CORRECT!!
TIME: 14.18s
```

[ソースコード](https://github.com/satooru65536/practice/node/law_game.js)  
practice/node/law_game.js
