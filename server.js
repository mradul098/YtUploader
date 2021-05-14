const express = require('express');
const youtube = require('youtube-api');
const uuid = require('uuid');
const cors = require('cors');
const open = require('open');
const multer = require('multer');
const fs = require('fs');
const opn = require('opn');
const credentials = require('./cs8.json');
const { flushSync } = require('react-dom');
const dta = require("./src/components/data.json")
// const dta = require('./data.json');
const app = express();
const fsp = require("fs/promises");

// const customer = {
//     "url":"hjghjg"
// }
// const jsonString = JSON.stringify(customer)
// fs.writeFile('./data.json', jsonString, err => {
//     if (err) {
//         console.log('Error writing file', err)
//     } else {
//         console.log('Successfully wrote file')
//     }
// })
// fs.readFile('./src/components/data.json', (err, data) => {
//     if (err) throw err;
//     // console.log(data.url.uri);
//     let student = JSON.parse(data);
//     console.log(student.url.uri);
// });

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: './',
    filename(req, file, cb) {
        const newFileName = `${file.originalname}`

        cb(null, newFileName);
    }
})

const uploadVideoFile = multer({
    storage: storage
}).single("videoFile");

app.post('/upload', uploadVideoFile, (req, res) => {
    if (req.file) {
        console.log("inside /uplaod ",req.file);
        const filename = req.file.filename;
        const { title, description } = req.body;

        open(oAuth.generateAuthUrl({
           
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/youtube.upload',
            state: JSON.stringify({
                filename, title, description
            })
        }))
    }
})

app.get('/oauth2callback', (req, res) => {
    
    const { filename, title, description } = JSON.parse(req.query.state);

    oAuth.getToken(req.query.code, (err, tokens) => {
        if (err) {
            console.log(err);
            return;
        }

        oAuth.setCredentials(tokens);

        youtube.videos.insert({
            onBehalfOfContentOwner: "UCXeqbOOFiXthxScmpcd_t5Q",
            resource: {
                snippet: { title, description },
                status: { "privacyStatus": "public" }
            },
            part: 'snippet,status',
            media: {
                body: fs.createReadStream(filename)
            }
        }, (err, data) => {
            console.log("---------------Your Video Link-------------------");
            console.log(`https://www.youtube.com/watch?v=${data.data.id}`);
            console.log("-------------------------------------------------");

            let student = (data);
            console.log(student.data.id);
            console.log(typeof(data));
            console.log(typeof(student.data.id));
            const customer = {
            "url": student.data.id,
            }
            console.log(customer);
            const jsonString = JSON.stringify(customer)
            console.log(jsonString);

          
                fs.writeFile('./src/components/data.json', jsonString, err => {
                    if (err) {
                        console.log('Error writing file', err)
                    } else {
                        console.log('Successfully wrote file');
                        res.redirect("http://localhost:3006/success"); 
                        process.exit();
                    }
                });
            
                
            
            
                
            

        })
    })
})

const oAuth = youtube.authenticate({
    type: 'oauth',
    client_id: credentials.web.client_id
  , client_secret: credentials.web.client_secret
  , redirect_url: credentials.web.redirect_uris[0]
});

const PORT = 3000;

app.listen(3000, (req, res) => {
    console.log('app is listening on port 3000');
})