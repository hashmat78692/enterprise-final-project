const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require('multer');
const fs = require('fs');

const uploadDir = './uploads';

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
})

app.get("/", (req,res) => {
    const sql = "SELECT * from employees";
    db.query(sql,(err,data)=> {
        if(err) return res.json("Error");
        return res.json(data);
    })

});

app.post('/create', (req,res) => {
    const sql = "INSERT INTO employees (`first_name`, `last_name`, `department`) VALUES (?)";
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.department,
    ]
    db.query(sql, [values], (err,data)=> {
        if(err) return res.json("Error");
        return res.json(data);
    })

});

app.put('/update/:id', (req,res) => {
    const sql = " update employees set  `first_name` = ?, `last_name` = ?, `department` = ? WHERE id = ? ";
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.department,
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err,data)=> {
        if(err) return res.json("Error");
        return res.json(data);
    })

});

app.delete('/employee/:id', (req,res) => {
    const sql = "DELETE FROM employees WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err,data)=> {
        if(err) return res.json("Error");
        return res.json(data);
    })

});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post('/imageupload', upload.single('image'), (req, res) => {
    const image = req.file;
    const imagePath = image.path;

    const sql = 'INSERT INTO images (image_name, image_data) VALUES (?, ?)';
    const values = [image.originalname, fs.readFileSync(imagePath)];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error uploading image to database:', err);
            return res.json("Error");
        } else {
            console.log('Image uploaded to database successfully');
            return res.json(data);
        }
    });
});

app.get('/images', (req, res) => {
    const sql = 'SELECT * FROM images';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching images from database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const images = result.map((row) => ({
                id: row.id,
                image_name: row.image_name,
                image_data: Buffer.from(row.image_data).toString('base64'), // Convert binary data to base64 string
            }));
            res.json(images);
        }
    });
});
app.delete('/image/:id', (req,res) => {
    const sql = "DELETE FROM images WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err,data)=> {
        if(err) return res.json("Error");
        return res.json(data);
    })

});


app.listen(8081, ()=> {
console.log("listening");
});

