from flask import Flask, request, render_template
app = Flask(__name__)


@app.route('/hello')
def hello():
    return "<html><h1>Hello, Flask!!</h1></html>"


@app.route('/')
def index():
    html = "<html><h3>index page</h3><ol>"
   
    for key, value in request.args.items():
        html += f"<li>{key}: {value}</li>"
    html += "</ol></html>"
    return html


@app.route('/get/')
@app.route('/get/<name>')
def get_param(name="no name"):
    return f"<html><h1>Hello, {name}!!</h1></html>"


@app.route('/post/', methods=["GET", "POST"])
def post_param():
    if request.method == 'POST':
        name = request.form.get("name")
        return f"<html><h1>Hello, {name}!!</h1></html>"
    else:
        name = "no name"
        return f"<html><h1>Hello, {name}!!</h1></html>"


# Jinjaを使ったテンプレートファイルのサンプル
# http://localhost:8888/template_sample/
# http://localhost:8888/template_sample/<String>
@app.route('/template_sample/')
@app.route('/template_sample/<name>')
def from_template(name=None):
    return render_template('index.html', name=name)


if __name__ == "__main__":
   
    app.run(host="localhost", port=8888, debug=True)