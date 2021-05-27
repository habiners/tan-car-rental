from nltk.stem import PorterStemmer
from nltk.stem.snowball import SnowballStemmer

from Tan_chunker import *

ps = PorterStemmer()
sbstemmer = SnowballStemmer("english") # Better daw ni

from nltk.sentiment.vader import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()

# pip install --upgrade pip setuptools # Done
# pip install virtualenv # Done
# pip install flask
# pip install flask flask-jsonpify flask-sqlalchemy flask-restful flask-cors

from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from flask_jsonpify import jsonify

app = Flask(__name__)
api = Api(app)
CORS(app)

@app.route('/')
def greet():
    return jsonify({"text": "Welcome to the Sentiment Analysis Web Service!"})

@app.route('/sentiment-analysis/<userInput>')
def getSentimentAnalysis(userInput):
  tokenizedRow = userInput.split(' ')
  stemmed = ""
  for word in tokenizedRow:
    stemmed += (sbstemmer.stem(word) + " ")
  sentiment = analyzer.polarity_scores(stemmed)
  return jsonify(sentiment)

@app.route('/chunker/<usrInput>')
def getChunked(usrInput):
  print("HII")
  print(usrInput)
  tokenized = tokenize(usrInput.strip())
  print(f"Tokenized: {tokenized}")
  words_with_pos_tag = getPOSTag(tokenized)
  chunked_sentence = chunking(words_with_pos_tag)
  print("Creating tree")
  createTree(chunked_sentence[0], chunked_sentence[1])
  return jsonify({'result': True})

if __name__ == "__main__":
    app.run(port=5002)
