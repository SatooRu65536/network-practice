from flask import Flask, render_template, jsonify
app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False


@app.route('/json_sample')
def json_sample():
    ret = {
        "message": "こんにちは！WebAPI!!!",
    }
    return jsonify(ret)


@app.route('/')
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
