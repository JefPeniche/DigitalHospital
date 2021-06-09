const express = require('express');
const hospitalRoutes = require('./routes/hospital.routes');
const patientRoutes = require('./routes/patient.routes');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Digital Hospital Server");
});

app.use('/api/hospitals', hospitalRoutes)
app.use('/api/patients', patientRoutes)


app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});
