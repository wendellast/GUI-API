from flask import Flask, request, jsonify,  render_template
from gradio_client import Client
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.get_json()
    message = data.get('message')

    # Configuração do cliente Gradio
    client = Client("wendellast/GUI")
    result = client.predict(
        message=message,
        max_tokens=512,
        temperature=0.7,
        top_p=0.95,
        api_name="/chat"
    )

    return jsonify({"response": result})

if __name__ == '__main__':
    app.run(port=5000)
