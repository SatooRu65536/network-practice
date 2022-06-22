const net = require('net');

const server = net.createServer((socket) => {
  console.log('クライアント接続 - from ' + socket.remoteAddress + ':' + socket.remotePort);
  socket.on('close', () => {  // 通信終了したら実行する関数
      console.log('通信終了 - from ' + socket.remoteAddress + ':' + socket.remotePort);
  });

  // クライアントにデータ送信
  socket.write('Hello World!\r\n');
  // クライアント切断
  socket.pipe(socket);
}).listen(3000); // 通信待ち受けポート

console.log('localhostの3000番ポートでサーバー起動しています。');