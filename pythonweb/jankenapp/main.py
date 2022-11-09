from flask import Flask, request, render_template
import random
import re

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/janken')
def janken():
    return render_template('janken_form.html')


@app.route('/janken/play', methods=["POST"])
def janken_play(): 
    name = request.form.get("name")
    if not name:
        name = "名無しさん"
    
    cpu = random.randint(0, 2)
    hand = request.form.get("hand", None)
    hands = ['rock', 'scissor', 'paper']
    hands_images = ['janken_gu.png', 'janken_choki.png', 'janken_pa.png']
    hand_num = -1 if hand not in hands else hands.index(hand)
    conjecture = None

    if hand == 'saikyou':
        result_message = f'{name}の完勝!!'
    elif hand_num == cpu:
        result_message = 'あいこ'
        conjecture = None
        # 忖度するべき相手か見極める
        if re.match(r'[\s\S]*様', name):
            conjecture = f'{name}のご勝利になります!!!'
    elif hand_num == (cpu+1)%3:
        result_message = f'{name}の負け...'
        # 忖度するべき相手か見極める
        if re.match(r'[\s\S]*様', name):
            conjecture = f'{name}のご勝利になります!!!'
    elif hand_num == (cpu+2)%3:
        result_message = f'{name}の勝ち!'

    cpu_hand = hands[cpu]
    winhand = hands_images[(hand_num+1)%3]
    
    return render_template(
        'janken_play.html',
        result_message=result_message,
        name=name,hand=hand,
        cpu=cpu_hand,
        conjecture=conjecture,
        winhand=winhand
    )


if __name__ == '__main__':
    app.run(debug=True)