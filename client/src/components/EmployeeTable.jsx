import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditEmployee from './EditEmployee';


const EmployeeTable = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
  }

  useEffect(() => {

    const getData = async () => {
      setError('');
      try {

        const response = await axios.get('http://localhost:3000/api/employees');
        const employeeList = await response.data;
        setData(employeeList);
        console.log(employeeList);

      } catch (err) {
        setError(err || 'An error occured');
      }
    }

    getData();

  }, []);

  const onDelete = async (id) => {

    try {

      const userData = JSON.parse(localStorage.getItem('user'));
      const response = await axios.delete(`http://localhost:3000/api/employees/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userData.user.token}`
        }
      });

      if (response.status === 200) {
        setData(data.filter((employee) => employee._id !== id));
        console.log('Data deleted');
      } else {
        console.log("Could not delete the data, try again.");
      }

    } catch (err) {
      setError(err.message || 'An error occurred');
    }

  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>{item.designation}</td>
              <td>{item.gender}</td>
              <td>{item.course}</td>
              <td>
                <button onClick={handleModal} className="btn btn-edit">Edit</button>
                <EditEmployee isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} empId={item._id} />
                <button onClick={() => onDelete(item._id)} className="btn btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default EmployeeTable