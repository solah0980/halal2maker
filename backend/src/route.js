let db = require('./config/config')
var multer = require('multer')
var upload = multer()
let path = require('path')
module.exports = (app) => {
    app.post('/item/add', (req, res) => {
        let {
            name,
            description,
            type,
            price,
            picture
        } = req.body
        var sql = `INSERT INTO product (name,description,type,price,picture) VALUES ('${name}', '${description}','${type}','${price}','${picture}')`;
        db.run(sql, function (err, result) {
            if (err) throw err;
            res.send("add item success")
        });
    })

    app.post('/category/add', (req, res) => {
        let {
            name,
        } = req.body
        var sql = `INSERT INTO category (name) VALUES ('${name}')`;
        db.run(sql, function (err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Rows inserted ${this.changes}`);
        });
    })

    app.get('/products', (req, res) => {
        var sql = "SELECT * FROM product";
        db.all(sql, function (err, result) {
            if (err) throw err;
            let data = JSON.stringify(result)
            res.send(data);
        });
    })
    app.get('/categorys', (req, res) => {
        var sql = "SELECT * FROM category";
        db.all(sql, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    })




    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, 'public/uploads'));
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    });

    var upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
        }
    });

    app.post('/upload', upload.single('file'), (req, res) => {
        res.send("uploads success")
    })




}