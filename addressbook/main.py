from flask import Flask, request, render_template, jsonify
import json
import re

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False


@app.route('/address', methods=["GET"])
def address_get():  
    p_first_name = request.args.get('fn', None)
    p_last_name = request.args.get('ln', None)
    p_email = request.args.get('em', None)
    mode = request.args.get('mode', None)

    with open('address.json') as f:
        json_data = json.load(f)

    status = {
        'isError': False,
        'errorCode': 0,
        'message': ''
    }

    if mode == 'add':
        email_list = [d['email'] for d in json_data]

        # 入力データが不足している
        if not (p_first_name and p_last_name and p_email):
            status = {
                'isError': True,
                'errorCode': 400,
                'message': '全て入力してください'
            }

        elif not re.match('[\s\S]@[\s\S]', p_email):
            status = {
                'isError': True,
                'errorCode': 401,
                'message': 'メールアドレスの形式が正しくありません'
            }

        # email が未登録
        elif p_email not in email_list:
            status = {
                'isError': False,
                'errorCode': 200,
                'message': 'アドレスを追加しました'
            }
            add_data = {
                "email": p_email,
                "first_name": p_first_name,
                "last_name": p_last_name
            }
            json_data.append(add_data)
            with open('address.json', 'w') as f:
                f.write(json.dumps(json_data))

        # email が登録済み
        else:
            status = {
                'isError': True,
                'errorCode': 450,
                'message': 'アドレスは登録済みです'
            }

    elif mode == 'search':
        if p_first_name:
            json_data = list(filter(lambda item: p_first_name.lower()
                                    in item["first_name"].lower(), json_data))
        if p_last_name:
            json_data = list(filter(lambda item: p_last_name.lower()
                                    in item["last_name"].lower(), json_data))
        if p_email:
            json_data = list(filter(lambda item: p_email.lower()
                                    in item["email"].lower(), json_data))

        if len(json_data) > 0:
            status = {
                'isError': False,
                'errorCode': 200,
                'message': f'{len(json_data)}件みつかりました'
            }
        else:
            status = {
                'isError': True,
                'errorCode': 451,
                'message': '見つかりませんでした'
            }

    recv_data = {
        'status': status,
        'body': json_data
    }
    return jsonify(recv_data)


@app.route('/')
def index():
    return render_template("addressbook.html")


if __name__ == "__main__":
    app.run(debug=True)
