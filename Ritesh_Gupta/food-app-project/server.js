const express = require('express');
const cors = require("cors");
const port = 4000;

const corsOptions = {
    origin:"*"
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());




app.listen(port, () => {
    console.log("Connection successful port : ", port);
});