const app = require('express')();
const cors = require('cors');
const port = process.env.port || 3000;

const routes = require('./routes');

app.use(cors());
app.use('/', routes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});