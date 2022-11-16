from flask import Flask, request, render_template, jsonify
import json

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False


@app.route('/address', methods=["GET"])
def address_get():

    # 検索パラメータの取得
    p_first_name = request.args.get('fn', None)
    p_last_name = request.args.get('ln', None)
    p_email = request.args.get('em', None)
    print("これ", p_first_name, p_last_name, p_email)

    with open('address.json') as f:
        json_data = json.load(f)

    # パラメータにより返すデータをフィルタリングする
    if p_first_name is not None:
        json_data = list(filter(lambda item: p_first_name.lower()
                                in item["first_name"].lower(), json_data))
    if p_last_name is not None:
        json_data = list(filter(lambda item: p_last_name.lower()
                                in item["last_name"].lower(), json_data))
    if p_email is not None:
        json_data = list(filter(lambda item: p_email.lower()
                                in item["email"].lower(), json_data))

    return jsonify(json_data)


@app.route('/')
def index():
    return render_template("addressbook.html")


if __name__ == "__main__":
    app.run(debug=True)
