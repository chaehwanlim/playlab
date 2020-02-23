const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
global.fetch = require("node-fetch");

//데이터베이스 접근
const fs = require('fs');
const dbAndApiData = fs.readFileSync('./dbandapi.json');
const dbAndApi = JSON.parse(dbAndApiData);
const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: dbAndApi.mysql.host,
    user: dbAndApi.mysql.user,
    password: dbAndApi.mysql.password,
    port: dbAndApi.mysql.port,
    database: dbAndApi.mysql.database
});
dbConnection.connect();

//request.body에 오는 데이터를 json 형식으로 변환
app.use(bodyParser.json()); 
//request.body에 대한 url encoding을 확장할 수 있도록 true option 설정
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/music', (req, res) => {
    dbConnection.query(
        "SELECT title, artist, genre, c.categoryName, u.userName, t.transmediaName \
        FROM music AS m \
        LEFT OUTER JOIN category AS c ON (c.categoryID = m.categoryID) \
        LEFT OUTER JOIN users AS u ON (u.userID = m.adderID) \
        LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID);",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.get('/api/movie', (req, res) => {
    dbConnection.query(
        "SELECT title, director, genre, c.categoryName, u.userName, t.transmediaName, m.imageURL, m.actor\
        FROM movie AS m \
        LEFT OUTER JOIN category AS c ON (c.categoryID = m.categoryID) \
        LEFT OUTER JOIN users AS u ON (u.userID = m.adderID) \
        LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID);",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

var movieTitlesAndDirectors = [];

app.get('/api/book', (req, res) => {
    dbConnection.query(
        "SELECT title, author, genre, c.categoryName, u.userName, t.transmediaName, b.imageURL, b.description \
        FROM book AS b \
        LEFT OUTER JOIN category AS c ON (c.categoryID = b.categoryID) \
        LEFT OUTER JOIN users AS u ON (u.userID = b.adderID) \
        LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = b.transmediaID);",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

var optionForMovie = {
    query: "frozen 1",
    start: 1,
    display: 10,
    yearfrom: 1970,
    yearto: 2020,
}

var optionForBook = {
    query: "martian"
}

app.get('/api/movieSearch', (req, res) => {
    var naverapi_url = 'https://openapi.naver.com/v1/search/movie';
    var request = require('request');
    var options = {
        qs: optionForMovie,
        url: naverapi_url,
        headers: {
            'X-Naver-Client-Id': dbAndApi.naver.clientID, 
            'X-Naver-Client-Secret': dbAndApi.naver.clientSecret
        }
    };
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

app.get('/api/bookSearch', (req, res) => {
    var naverapi_url = 'https://openapi.naver.com/v1/search/book';
    var request = require('request');
    var options = {
        qs: optionForBook,
        url: naverapi_url,
        headers: {
            'X-Naver-Client-Id': dbAndApi.naver.clientID, 
            'X-Naver-Client-Secret': dbAndApi.naver.clientSecret
        }
    };
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

app.listen(port, () => {
    console.log('listening on port ${port}');
});