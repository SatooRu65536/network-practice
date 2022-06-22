const text = document.getElementById('text');
const btn = document.getElementById('btn');

const min = 0;
const max = 999;

let correct_num = null;
let count = 1;
let condition = 'challenge'

const randon_num = () => {
    const diff = Math.abs(max - min) + 1;
    const num = Math.trunc(Math.random() * diff + min);
    return num;
}

const reset = () => {
    const input_num = document.getElementById('input').value;
    const result = document.getElementById('result');

    count = 0;
    input_num.value = min;
    btn.innerHTML = 'CHECK!'
    result.style.color = 'black';
    result.innerHTML = `${min} ~ ${max} の数字を入力してください`;
    correct_num = randon_num()

    condition = 'challenge';
}

reset()

btn.addEventListener('click', (e) => {
    const input_num = document.getElementById('input').value;
    const result = document.getElementById('result');
    console.log(input_num, correct_num);

    if (condition == 'reset') {
        reset();
        return null;
    }
    
    if (input_num > correct_num) {
        count += 1;
        result.innerHTML = `もっと小さい! 試行回数 ${count}回`;
    } else if (input_num < correct_num) {
        count += 1;
        result.innerHTML = `もっと大きい! 試行回数 ${count}回`;
    } else {
        result.style.color = 'red';
        result.innerHTML = `正解! 試行回数 ${count}回`;
        correct_num = randon_num(min, max);

        btn.innerHTML = 'RESET!';
        condition = 'reset'
    }
})

