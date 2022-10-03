import "./App.css";
import { useState } from "react";
import { Input, Grid, LinearProgress } from "@mui/material";
let axios = require("axios");

// var predict_endpoint = "http://localhost:8000/predict";
var predict_endpoint =
  "https://docker-gaitor-acm-colab-api-vyx76o7miq-uc.a.run.app/predict";
var headers = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
};

const renderOuput = (obj) => {
  console.log(obj);
  if (obj)
    return (
      <table>
        <thead>
          <tr>
            <th className="class-name">Class Name</th>
            <th className="probability-label">Probability</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(obj).map((key) => (
            <tr>
              <td className="class-name">{key}</td>
              <td>
                <LinearProgress value={obj[key] * 100} variant="determinate" />
              </td>
              <td className="probability">{(obj[key] * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  else return <div></div>;
};

function App() {
  const [input, setInput] = useState(null);
  const [output, setOutput] = useState(null);

  const handleInput = async (e) => {
    var file_upload = e.target.files[0];

    var formData = new FormData();
    formData.append("image", file_upload);

    var request = axios.post(predict_endpoint, formData, { headers: headers });
    request
      .then((response) => {
        console.log(response.data);
        setOutput(JSON.parse(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    setInput(file_upload);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>GAITOR x ACM Demo</h1>
      </Grid>
      <Grid item sm={12} md={6} align="center">
        <Grid item xs={12}>
          <h2>Upload Image</h2>
        </Grid>
        <Grid item xs={12}>
          <Input
            placeholder="Upload Image File"
            title="Upload Image File"
            type="file"
            className="file-input"
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12}>
          <h3> Image Preview </h3>
          {input ? (
            <img
              src={URL.createObjectURL(input)}
              alt="Upload Preview"
              className="img-preview"
            />
          ) : (
            <p> No image selected.</p>
          )}
        </Grid>
      </Grid>
      <Grid item sm={12} md={6}>
        <h2>Output</h2>
        {renderOuput(output)}
      </Grid>
    </Grid>
  );
}

export default App;
