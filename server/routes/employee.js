const { Router } = require('express');
const auth = require('../middlewares/auth.js');
const {
    createEmployee,
    getEmployeeList,
    getEmployee,
    editEmployee,
    deleteEmployee
} = require('../controllers/employee.js');

const employeeRoute = Router();

employeeRoute.post('/', auth, createEmployee);
employeeRoute.get('/', getEmployeeList);
employeeRoute.get('/:id', getEmployee);
employeeRoute.patch('/:id', auth, editEmployee);
employeeRoute.delete('/:id', auth, deleteEmployee);

module.exports = employeeRoute;