// ボタンのイベント設定
document.getElementById('btn').addEventListener('click', () => {
    fetch(`http://127.0.0.1/api/get-data`)
        .then(response => {
            // console.log(response.status); // HTTPのステータスコード
            // console.log(response);
            response.json().then((data) => {
                // console.log(data);  // 取得されたレスポンスデータ
                document.getElementById("message").innerHTML = data.message;
            });
        });
});