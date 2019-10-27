const express = require('express');

const printJSON = require('./shared/printJSON')

const app = express();


app.use('/',printJSON)


app.listen(80);