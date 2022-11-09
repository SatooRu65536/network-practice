from flask import Flask, request, render_template
import random

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
    
    hand = request.form.get("hand", None)
    cpu = random.choice(["rock", "scissor", "paper"])

    if hand == cpu:
        result_message = "あいこ"
    elif hand == "saikyou":
        result_message = f"{name}の完勝"
    else:
        if hand == "rock":
            if cpu == "scissor":
                result_message = f"{name}の勝ち"
            else:
                result_message = f"{name}の負け"
        elif hand == "scissor":
            if cpu == "paper":
                result_message = f"{name}の勝ち"
            else:
                result_message = f"{name}の負け"
        elif hand == "paper":
            if cpu == "rock":
                result_message = f"{name}の勝ち"
            else:
                result_message = f"{name}の負け"
        else:
            result_message = "後出しはダメです。"

    return render_template('janken_play.html',result_message=result_message,name=name,hand=hand,cpu=cpu)


if __name__ == '__main__':
    app.run(debug=True)