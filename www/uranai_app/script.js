// ボタンのイベント設定
document.getElementById('do_uranai').addEventListener('click', (e) => {

    e.preventDefault() // もともとのボタン処理をさせない
  
    // formdataの取得
    const form = document.getElementById("form1")
    const fd = new FormData(form)
  
    // 入力内容のチェックを行います
    const name = fd.get("name")
    if (name == "") {
      document.querySelector(".name-error").innerHTML = "名前を入力してください"
      return
    } else {
      document.querySelector(".name-error").innerHTML = ""
    }
  
    // api へデータをpostして結果を取得する
    fetch(`http://localhost/uranai_api/uranai`,{
      method: "POST",
      body: JSON.stringify(Object.fromEntries(fd)),
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
  })