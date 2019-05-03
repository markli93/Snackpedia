const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8080;
const app = express();  

app.use(express.static('asiansnack'));
app.use(express.static('africansnack'));
app.use(express.static('europesnack'));
app.use(express.static('nasnack'));
app.use(express.static('sasnack'));
app.use(express.static('oceansnack'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000'}));

app.use('/asia', require('./routes/Asiansnack'));
app.use('/na', require('./routes/NAsnack'));
app.use('/sa', require('./routes/SAsnack'));
app.use('/africa', require('./routes/Africasnack'));
app.use('/europe', require('./routes/Europesnack'));
app.use('/ocean', require('./routes/Oceaniasnack'));



app.listen(PORT, () => {
   console.log(`server is listening on port ${PORT}`);
});
