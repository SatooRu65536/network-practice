# 第17回 NET分野実習　2022年10月19日

## セキュリティに関するコンテスト
- CTF
  - [CTFについて](https://agest.co.jp/articles/19713/)
  - 情報セキュリティのスキルを競い合う
  - [SECCON](https://www.seccon.jp/2022/)
  - [ksnctf](https://ksnctf.sweetduet.info/)
- OSINT
  - [OSINTとは](https://www.isfnet-services.com/blog/59/osint)
  - 公開情報から目的の情報を見つける
  - 画像からでも位置は特定できる


## python

### python仮想環境
仮想環境生成
```
> python3 -m venv env
```

仮想環境切り替え
```
source env/bin/activate
```

仮想環境抜け出す
```
deactivate
```

### ライブラリ
pip アップデート
```
python3 -m pip install --upgrade pip
```

ライブラリインストール(numpy)
```
pip install numpy
(pip install -r requirements.txt)
```

ライブラリバージョンを書き出す
```shell
pip freeze > requirements.txt
```

### 実際に書いてみよう
- [ソースコード](../../python_ws/)


コメントは `#`  

フォーマット文字列
```python
print(f'{a} + {b} = {a+b}')
```

JSでいう
```js
console.log(`${a} + ${b} = ${a+b}`)
```

Pythonは動的型付け
```python
a = 10
print(type(a))  # => <class 'int'>

b = 'asd'
print(type(b))  # => <class 'strings'>

a = 'asdf'
print(type(a))  # => <class 'strings'>
```

配列の扱いが得意
```
arr = [1, 2, 3, 4, 5]
print(arr + arr)    # => [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
```

PythonはC言語のコードを使用できる

タプル
```python
arr = [1, 2, 3]
arr[0] = 9
print(arr)  # [9, 2, 3]

tup = (1, 2, 3)
# tup[0] = 9    # 変更できない(エラー)
```

機械学習などでは `numpy` の配列が必要な場合もある

## 感想
Pythonはよく触っていて大体知っていたが、仮想環境の良さは今回知った。  
今までは自分しか使わない物しか作っていなく使わないライブラリが
インストールされていても問題なかった。
しかし部活の出席確認システムを今後のためリポジトリを
部活の organization に置き、requirements.txt を追加した。  
その時に 関係無いものが混ざらないように全て消して入れ直す必要があり、
仮想環境にした所とても楽にできた。
