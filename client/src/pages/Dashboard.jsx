import React, { useState } from 'react'
import EmployeeTable from '../components/EmployeeTable'
import AddEmployee from '../components/AddEmployee';

const Dashboard = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }


  return (
    <>
      <button className='add-btn' onClick={handleOpenModal}>Add Employee</button>
      <AddEmployee isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <EmployeeTable />
    </>
  )
}

export default Dashboard