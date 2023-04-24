from flask import Flask, jsonify, request
from fastai.vision.all import *

app = Flask(__name__)
model = load_learner('models/hotdog_nothotdog.pkl')

@app.route('/classify', methods=['POST'])
def classify_image():
    print(request)
    if 'file' not in request.files:
        return 'No file provided', 400
    # Load the trained model and transform
    # Get the image data from the request object

    # Format the image data
    stream = request.files['file'].stream
    image = PILImage.open(stream)
    image = image.resize((192, 192), 'squish')
    img_bytes = image.read()
    img = PILImage.create(img_bytes)
    # Make a prediction and return the results
    pred, label, probs = model.predict(img)
    response = {'prediction': str(label), 'probabilities': probs.tolist()}
    return jsonify(response)

if __name__ == '__main__':
    app.run()
