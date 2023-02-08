const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'togatherdb.cywj8sblqaxg.ap-northeast-2.rds.amazonaws.com',
    user:'togather_root',
    password:'dhthrhkr',
    port:3306,
    database:'test2'
}); //db 접속 정보

function getAllhome(call_back) {
    connection.query(`SELECT * FROM USER_INF`, (err,rows) => {
        if(err) throw err;
        call_back(rows);
    });
} //db에 보낼 쿼리문 전송 및 콜백 함수

function getUser(call_back) {
    connection.query(`SELECT * FROM USER_INF`, (err,rows) => {
        if(err) throw err;
        call_back(rows);
    });

} //db에 보낼 쿼리문 전송 및 콜백 함수


module.exports = {
    getAllhome,
    getUser
}