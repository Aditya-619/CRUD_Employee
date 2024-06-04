require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/user.js');
const employeeRoute = require('./routes/employee.js');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database connected');
}

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use('/api/users', userRoute);
server.use('/api/employees', employeeRoute);

server.listen(process.env.PORT, () => {
    console.log('Server running');
})
