from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from analogia import predict_analogy_from_sentence

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/send_text', methods=['POST'])
def send_text():
    data = request.get_json()
    input_sentence = data.get('input_sentence', '')

    # Llama a la función en analogia.py
    result = predict_analogy_from_sentence(input_sentence)

    # Devuelve el resultado al cliente
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)

