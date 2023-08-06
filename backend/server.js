const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'webinar'
});

db.connect((err) => {  
    if(!err) {  
        console.log("DB Connection Succeed");  
    }  
    else{  
        console.log("DB connect Failed \n Error :" + JSON.stringify(err,undefined,2));  
    }  
}); 

app.get('/', (req, res) => {
    const sql = "SELECT * FROM schedule";

    db.query(sql, (err,data) => {
        if(err) {   
            console.log(err);
            return res.json("error");
        }
        return res.json(data);
    });
});

app.get('/view/:Date', (req, res) => {
    const sql = "SELECT * FROM schedule WHERE STR_TO_DATE(Date, '%d-%m-%Y') >= STR_TO_DATE(?, '%d-%m-%Y');";
    const { Date } = req.params;
  
    db.query(sql, [Date], (err, data) => {
      if (err) {
        console.log(err);
        return res.json('error');
      }
      const formattedData = data.map((row) => row);
      return res.json(formattedData);
    });
  });

app.post('/form', (req, res) => {
    
    const jsonData = {
        Time: req.body.Time,
        Title: req.body.Title,
        Speaker: req.body.Speaker,
        Designation: req.body.Designation,
        Description: req.body.Description
      };
      console.log(req.body.Time);

    const values = [
        req.body.Date,
        req.body.Destination,
        JSON.stringify(jsonData)
    ];

    const sql = "INSERT INTO schedule (Date, Destination, JsonData) VALUES (?, ?, ?)";

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error storing data:', err);
            return res.status(500).json('Error storing data');
          }
          console.log('Data stored successfully!', data);
          console.log(values);
          return res.status(200).json({ message: 'Data stored successfully' });
    });
});


app.listen(8081, ()=> {
    console.log("listening");
})