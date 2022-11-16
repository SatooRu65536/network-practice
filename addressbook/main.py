from flask import Flask, request, render_template, jsonify
import json

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False


@app.route('/address', methods=["GET"])
def address_get():
    print()
    print()
    print('adsf', request.args)

    p_first_name = request.args.get('fn', None)
    p_last_name = request.args.get('ln', None)
    p_email = request.args.get('em', None)

    with open('address.json') as f:
        json_data = json.load(f)

    if p_first_name:
        json_data = list(filter(lambda item: p_first_name.lower()
                                in item["first_name"].lower(), json_data))
    if p_last_name:
        json_data = list(filter(lambda item: p_last_name.lower()
                                in item["last_name"].lower(), json_data))
    if p_email:
        json_data = list(filter(lambda item: p_email.lower()
                                in item["email"].lower(), json_data))

    return jsonify(json_data)


@app.route('/')
def index():
    return render_template("addressbook.html")


if __name__ == "__main__":
    app.run(debug=True)
