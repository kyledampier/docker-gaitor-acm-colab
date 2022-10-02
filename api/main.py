import io
import json
import numpy as np
from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
from PIL import Image
from pydantic import BaseModel

# Load model into RAM
model = tf.keras.models.load_model('cifar10_model.h5')
classes = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']

class PredictRequest(BaseModel):
    image: UploadFile

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/predict")
async def predict(image: UploadFile):
    '''
    This function takes an image file as input and returns the predicted classes and probabilities for the image.
    '''
    # Read image
    image_data = await image.read()
    image = Image.open(io.BytesIO(image_data))

    if image.size != (32, 32):
        print("Image size mismatch, changing to (32, 32)")
        image = image.resize((32, 32))

    if image.mode != 'RGB':
        print("Image mode mismatch, changing to RGB")
        image = image.convert('RGB')

    # Convert to numpy array
    img = np.array(image).astype(np.float32)

    # Normalize pixel values to be between 0 and 1
    img = img / 255.0

    # Add a batch dimension
    img = np.expand_dims(img, axis=0)
    prediction = model.predict(img)

    output = dict(zip(classes, prediction[0]))
    return str(output)
