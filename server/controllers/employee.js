const employee = require('../model/employee.js');
const Employee = require('../model/employee.js');

const createEmployee = async (req, res) => {
    try {

        const { name, email, mobile, designation, gender, course } = req.body;
        if (!name || !email || !mobile || !designation || !gender || !course) {
            return res.status(400).json({ message: 'Fill in all the fields.' });
        }
        const exists = await Employee.findOne({ email });
        if (exists) {
            return res.status(401).json({ message: 'Employee already exixts.' });
        }
        const employee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
        })
        employee.save();
        // const employee = await Employee.create({
        //     name,
        //     email,
        //     mobile,
        //     designation,
        //     gender,
        //     course,
        // });
        if (!employee) {
            return res.status(401).json({ message: 'Emloyee cannot be created.' });
        }
        res.status(200).json({ message: 'Employee created.', employee });


    } catch (err) {
        res.status(400).json({ message: 'Bad request', err });
    }
}

const getEmployeeList = async (req, res) => {
    try {

        const employeeList = await Employee.find();
        res.status(200).json(employeeList);

    } catch (err) {
        res.status(400).json({ message: 'Bad request', err });
    }
}

const getEmployee = async (req, res) => {
    try {

        const {id} = req.params;
        const employee = await Employee.findById(id);
        if(!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        res.status(200).json(employee);
        
    } catch (err) {
        res.status(400).json({ message: 'Bad request', err });
    }
}

const editEmployee = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, email, mobile, designation, gender, course } = req.body;

        if (!name || !email || !mobile || !designation || !gender || !course) {
            return res.status(400).json({ message: 'Fill in all the fields.' });
        }

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        employee.name = name;
        employee.email = email;
        employee.mobile = mobile;
        employee.designation = designation;
        employee.gender = gender;
        employee.course = course;

        const updatedEmployee = await employee.save();

        res.status(200).json({ message: 'Employee updated.', updatedEmployee });

    } catch (err) {
        res.status(400).json({ message: 'Bad request', err });
    }
}

const deleteEmployee = async (req, res) => {
    try {

        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        res.status(200).json({ message: 'Employee deleted.', employee });

    } catch (err) {
        res.status(400).json({ message: 'Bad request', err });
    }
}

module.exports = { createEmployee, getEmployeeList, getEmployee, editEmployee, deleteEmployee };