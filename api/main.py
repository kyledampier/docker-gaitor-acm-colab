import typing, BaseModel from Union
from fastapi import FastAPI
import tensorflow as tf
import Image from PIL

# Load model into RAM
model = tf.keras.models.load_model('cifar10_model.h5')

class PredictionRequest(BaseModel):
    image: Union[bytes, str]

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/predict")
def predict(request: PredictionRequest):
    image = request.image
    image = Image.open(image)
    image = image.resize((32, 32))
    prediction = model.predict([image])
    return {"image": image}