const net = require('net');
const moment = require('moment');

const server = net.createServer((socket) => {
  console.log('クライアント接続 - from ' + socket.remoteAddress + ':' + socket.remotePort);

  socket.on('close', () => {  // 通信終了したら実行する関数
      console.log('通信終了 - from ' + socket.remoteAddress + ':' + socket.remotePort);
  });

  socket.on('data', (data) => {  // dataにはクライアントからのデータ入ってきます。(※中身のデータをよく確認しましょう)
    console.log('クライアントからのデータ: ' + data + ' from ' + socket.remoteAddress + ':' + socket.remotePort);

    data = String(data);
    console.log(data);
    
    if (data.match(/やあ/)) {
        const datas = data.split(' ');
        const currentTime = moment();
        time = Number(currentTime.format("HH"));
        
        if (datas.length > 1 && datas[1].match(/[0-9]{2}/)) time = datas[1]

        if (time >= 18) socket.write('こんばんは');
        else if (time >= 10) socket.write('こんにちは！');
        else if (time >= 10) socket.write('おはよー！');
        else socket.write('こんばんは')
    }
  });

}).listen(3000);

console.log('localhostの3000番ポートでサーバー起動しています。');