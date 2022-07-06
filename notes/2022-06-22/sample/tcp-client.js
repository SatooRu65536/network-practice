const net = require('net');

const client = net.connect('3000', 'localhost', () => { // 接続先を指定
  console.log('サーバーに接続しました。');
  // client.write('Hello, Server!!'); // サーバーにデータを送信する場合はwriteしましょう。
});

client.on('data', data => {
    console.log('サーバーからデータ受信: ' + data);
    client.destroy();  // クライアントを破棄します。
});

client.on('close', () => {
  console.log('サーバーから切断しました。');
});