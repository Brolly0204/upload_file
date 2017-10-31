const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const upload = multer({dest: 'public/upload/'});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // 静态资源处理

const server = app.listen(7000, function() {
  console.log(`Server at listening to ${server.address().port}`);
})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/user', function(req, res) {
    console.log(req.body);
    res.send(req.body);
});

app.post('/file_upload', upload.single('file'), function(req, res) { // 单张图片上传
  console.log(req.file);
  res.send(req.file.filename);
});
app.post('/files_upload', upload.array('files', 3), function(req, res) { // 多张图片上传
  console.log(req.files);
  console.log(req.body);
  res.send(req.files);
})
