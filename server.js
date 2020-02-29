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
app.use(bodyParser.json())
//request.body에 대한 url encoding을 확장할 수 있도록 true option 설정
app.use(bodyParser.urlencoded({extended: true}));


//routing 1 : query의 결과를 musicDB path에 전송
app.get('/api/musicDB', (req, res) => {
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

app.get('/api/movieDB', (req, res) => {
    dbConnection.query(
        "SELECT title, director, genre, c.categoryName, u.userName, t.transmediaName, m.imageURL, m.actor, m.year, m.userRating\
        FROM movie AS m \
        LEFT OUTER JOIN category AS c ON (c.categoryID = m.categoryID) \
        LEFT OUTER JOIN users AS u ON (u.userID = m.adderID) \
        LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID);",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.get('/api/bookDB', (req, res) => {
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

app.get('/api/categoryDB', (req, res) => {
    dbConnection.query(
        "SELECT * FROM category;",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.get('/api/transmediaDB', (req, res) => {
    dbConnection.query(
        "SELECT * FROM transmedia;",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

//프론트단에서 보낸 영화 검색 키워드를 받아 변수에 담는다.
var movieKeyword = {
    query: "",
    start: 1,
    display: 20,
    yearfrom: 1970,
    yearto: 2020,
};
app.post('/api/movieSearchKeyword', (req, res) => {
    movieKeyword.query = req.body.keyword;
})

var bookKeyword = {
    query: "",
    start: 1,
    display: 20,
}
app.post('/api/bookSearchKeyword', (req, res) => {
    bookKeyword.query = req.body.keyword;
})

app.get('/api/movieSearch', (req, res) => {
    var naverapi_url = 'https://openapi.naver.com/v1/search/movie';
    var request = require('request');
    var options = {
        qs: movieKeyword,
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
        qs: bookKeyword,
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

//post
const multer = require('multer');

app.post('/api/musicAdd', (req, res) => {
    let sql = "INSERT INTO music VALUES (NULL, ?, ?, ?, 1001, ?, ?);"
    let title = req.body.title;
    let artist = req.body.artist;
    let genre = req.body.genre;
    let categoryID = req.body.categoryID;
    let transmediaID = req.body.transmediaID;
    let params = [title, artist, genre, categoryID, transmediaID];
    dbConnection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
            console.log('music add query succeed');
        }
    );
});

app.post('/api/movieAdd', (req, res) => {
    let sql = "INSERT INTO movie VALUES (NULL, ?, ?, NULL, 1001, ?, ?, ?, ?, ?, ?);"
    let title = req.body.title;
    let director = req.body.director;
    let categoryID = req.body.categoryID;
    let transmediaID = req.body.transmediaID;
    let imageURL = req.body.imageURL;
    let actor = req.body.actor;
    let userRating = req.body.userRating;
    let year = req.body.year;
    let params = [title, director, categoryID, transmediaID, imageURL, actor, userRating, year];
    dbConnection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log('movie add query succeed');
        }
    );
});

app.post('/api/bookAdd', (req, res) => {
    let sql = "INSERT INTO book VALUES (NULL, ?, ?, NULL, 1001, ?, ?, ?, ?);"
    let title = req.body.title;
    let author = req.body.author;
    let categoryID = req.body.categoryID;
    let transmediaID = req.body.transmediaID;
    let imageURL = req.body.imageURL;
    let description = req.body.description;
    let params = [title, author, categoryID, transmediaID, imageURL, description];
    dbConnection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log('book add query succeed');
        }
    );
});

app.post('/api/createUser', (req, res) => {
    let sql = 'INSERT INTO users VALUES (NULL, ?, NULL, ?);'
    let userName = req.body.userName;
    let userPassword = req.body.userPassword;
    let params = [userName, userPassword];
    dbConnection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log('user create query succeed');
        }
    );
});

app.listen(port, () => {
    console.log('listening on port 3000');
});