const net = require('net');

const server = net.createServer((socket) => {
  console.log('クライアント接続 - from ' + socket.remoteAddress + ':' + socket.remotePort);

  socket.on('close', () => {  // 通信終了したら実行する関数
      console.log('通信終了 - from ' + socket.remoteAddress + ':' + socket.remotePort);
  });

  socket.on('data', (data) => {  // dataにはクライアントからのデータ入ってきます。(※中身のデータをよく確認しましょう)
    console.log('クライアントからのデータ: ' + data + ' from ' + socket.remoteAddress + ':' + socket.remotePort);

    socket.write('S: ', data);  // 受け取ったデータをそのまま返す
  });

}).listen(3000);

console.log('localhostの3000番ポートでサーバー起動しています。');