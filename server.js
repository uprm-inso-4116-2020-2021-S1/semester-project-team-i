const express = require('express');
const app = express();

app.use(express.static('./build/find-and-eat'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'build/find-and-eat/'}
    );
});

app.listen(process.env.PORT || 8080);
