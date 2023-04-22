from flask import Flask, jsonify, request
from fastai.vision.all import *

app = Flask(__name__)

@app.route('/classify', methods=['POST'])
def classify_image():
    print(request)
    # Load the trained model and transform
    model = load_learner('models/hotdog_nothotdog.pkl')
    # Get the image data from the request object
    img_file = request.files['image0']
    img_bytes = img_file.read()
    img = PILImage.create(img_bytes)

    # Make a prediction and return the results
    pred, label, probs = model.predict(img)
    response = {'prediction': str(label), 'probabilities': probs.tolist()}
    return jsonify(response)

if __name__ == '__main__':
    app.run()
