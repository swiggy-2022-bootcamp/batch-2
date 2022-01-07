const express = require('express');
const cors = require('cors');
const app = express();

//optional
var corsOptions = {
    origin:"*"
}

app.use(cors(corsOptions));
app.use(express.json());
const db = require('./app/models');
db.mongoose.connect(db.url, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log('connected to db');
}).catch(err => {
    console.log('cannot connect to db');
    process.exit();
})

app.get('/test', (req, res) => {
    res.status(201).json({
        message:"message with status code"
    })
})

require('./app/routes/userRoutes')(app);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})