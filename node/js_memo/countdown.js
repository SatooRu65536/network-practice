let text = 'aatimer 10 12'
let text_split = text.split(' ')

console.log(text_split);

if (text_split[0] == 'timer') {

    n = Number(text_split[1])
    console.log('timer');
    
    setInterval(
        function(){
            console.log(n);
            n = n - 1;
        },1000);
} else {
    console.log(2, 'その他');
}