# GAITOR Club x ACM Collaboration

## Run it on your own machine

Make sure Docker is installed on your machine before running.

### Step 1

Clone the repository and change current working directory to the repository:

```git clone https://github.com/kyledampier/docker-gaitor-acm-colab```

```cd docker-gaitor-acm-colab```

### Step 2

Run this docker compose command:

```docker compose up --build```

`--build` just means that it will override the current docker image build.

### Step 3

Open https://localhost:3000 in your browser to view.

## Making Changes

### Python API

The python api is entirely within the `api/` directory. To **re-train/tune** the model edit the `train.py`, which by default will save the model to the `cifar10_model.h5` file. To **change the api** edit the `main.py` file, which uses fastapi to asynchronously provide API requests.

### Node Frontend

The main source code for the React app is entirely in the `App.js` file.
