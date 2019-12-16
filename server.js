const express = require('express');
const cors = require('cors');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/tmp');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
   
var upload = multer({ storage: storage })

const server = express();

server.use(cors());
server.use(express.urlencoded({extended: true}));

server.post('/uploadfile', upload.single('file'), (req, res) => {
    try {
        res.send({
            fileInfo: req.file,
            reqBody: req.body
        });
    } catch(error) {
          console.log(error);
           res.send(400);
    }
});

server.get('/get', (req, res) => {
    return res.send(req);
});

server.listen(process.env.PORT || 8081);