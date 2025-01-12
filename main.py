from flask import Flask, request, jsonify, render_template
from gradio_client import Client
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

port = os.getenv('PORT_FLASK')

app = Flask(__name__)

CORS(app)

@app.route('/send-message-gui', methods=['POST'])
def send_message():
    data = request.get_json()
    message = data.get('message')

    client = Client("wendellast/GUI")
    result = client.predict(
        message=message,
        max_tokens=512,
        temperature=0.7,
        top_p=0.95,
        api_name="/chat"
    )

    return jsonify({"response": result})

@app.route('/send-message-gui-portfolio', methods=['POST'])
def send_message_portfolio():
    data = request.get_json()
    message = data.get('message')

    client = Client("wendellast/GUI-Portfolio")
    result = client.predict(
        message=message,
        max_tokens=512,
        temperature=0.7,
        top_p=0.95,
        api_name="/chat"
    )

    return jsonify({"response": result})

@app.route('/send-message-gui-commitia', methods=['POST'])
def send_message_commitia():
    data = request.get_json()
    message = data.get('message')

    client = Client("wendellast/CommitIa")
    result = client.predict(
        message=message,
        max_tokens=100,
        temperature=0.7,
        top_p=0.95,
        api_name="/chat"
    )

    return jsonify({"response": result})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)