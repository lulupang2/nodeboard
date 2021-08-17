const express = require('express')


const mysql = require('mysql2')
const dbconfig = require('./config/dbconfig')
const dbs = mysql.createConnection(dbconfig)

const http = require('http')

const bodyParser = require('body-parser') //bodyPaser =>request.body에 데이터 접근하기 위해 사용

const fs = require('fs') //파일 시스템 모듈
const ejs = require('ejs') // 템플릿 엔진, jsp 처럼 스크립틀릿 형태로 사용가능
const app = express()
const moment = require('moment')



//urlencoded jQuery,ajax 기본타입인 Content-Type 데이터로 받음
//extended: false => 쿼리스트링 인코딩방식 선택 객체 depth에 따라 선택
app.use(bodyParser.urlencoded({
        extended: false
    }))
    //3333번 포트로 listen
app.listen(3333, function() {
        console.log('Server is running at : http://127.0.0.1:3333')
    })
    // root 경로로 접속시 함수 실행
    //fs 모듈을 사용하지않고 단순히 res.send(결과)를 했을때는 json 형식의 데이터 출력
app.get('/', function(요청, 응답) {
    fs.readFile('list.ejs', 'utf8', function(에러, 데이터) {
        dbs.query('select * from board order by num desc', function(에러, 결과) {
            if (에러) {
                응답.send(에러)
            } else {
                응답.send(ejs.render(데이터, {
                    데이터: 결과
                }))
            }
        })
    })
})

//:id 비교 후 삭제 왜 안되노
app.get('/delete/:num', function(요청, 응답) {
        dbs.query('delete from board where num=?;', [요청.params.num], function() {
            //응답.redirect('/'), 
            응답.send(http)


        })
    })
    //insert 페이지로 바로 이동
app.get('/insert', function(요청, 응답) {
    fs.readFile('insert.html', 'utf8', function(에러, 데이터) {
        응답.send(데이터)
    })
})

app.post('/insert', function(요청, 응답) {
    const body = 요청.body

    dbs.query('insert into board (name, email, subject, passwd, content, wdate) values (?, ?, ?, ?, ?,now());', [
        body.name,
        body.email,
        body.subject,
        body.content,
        body.passwd
    ], function() {
        응답.redirect('/')
    })


})

app.get('/edit/:id', function(요청, 응답) {

})

app.post('/edit/:id', function(요청, 응답) {

})