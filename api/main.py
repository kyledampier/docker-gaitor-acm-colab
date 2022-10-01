import typing from Union
from fastapi import FastAPI
import tensorflow as tf


model = tf.keras.models.load_model('cifar10_model.h5')

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/predict")
def predict(image: typing.Union[bytes, str] = File(...)):
    return {"image": image}