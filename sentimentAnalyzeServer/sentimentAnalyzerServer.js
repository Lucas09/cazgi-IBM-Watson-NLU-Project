const express = require('express');
const app = new express();

/*This tells the server to use the client 
folder for all static resources*/
app.use(express.static('client'));

/*This tells the server to allow cross origin references*/
const cors_app = require('cors');
app.use(cors_app());

/*Uncomment the following lines to loan the environment 
variables that you set up in the .env file*/

const dotenv = require('dotenv');
dotenv.config();

const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;

const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: "2022-04-07",
  authenticator: new IamAuthenticator({
    apikey: api_key,
  }),
  serviceUrl:
  api_url,
});

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/url/emotion", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            "keywords": {
                "emotion": true,
                "limit": 1
            }
        }
      };

      naturalLanguageUnderstanding.analyze(analyzeParams)
      .then(analysisResults => {
        return res.send(analysisResults.result.keywords[0].emotion,null,2);
      })
      .catch(err => {
        console.log('error:', err);
      });
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            "keywords": {
                "sentiment": true,
                "limit": 1
            }
        }
      };

      naturalLanguageUnderstanding.analyze(analyzeParams)
      .then(analysisResults => {
        return res.send(analysisResults.result.keywords[0].sentiment,null,2);
      })
      .catch(err => {
        console.log('error:', err);
      });
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            "keywords": {
                "emotion": true,
                "limit": 1
            }
        }
      };

      naturalLanguageUnderstanding.analyze(analyzeParams)
      .then(analysisResults => {
        return res.send(analysisResults.result.keywords[0].emotion,null,2);
      })
      .catch(err => {
        console.log('error:', err);
      });
});

app.get("/text/sentiment", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            "keywords": {
                "sentiment": true,
                "limit": 1
            }
        }
      };
      naturalLanguageUnderstanding.analyze(analyzeParams)
      .then(analysisResults => {
        return res.send(analysisResults.result.keywords[0].sentiment,null,2);
      })
      .catch(err => {
        console.log('error:', err);
      });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
