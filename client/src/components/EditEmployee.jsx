import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EditEmployee = ({ isOpen, setIsModalOpen, empId }) => {


    const [empName, setEmpName] = useState('');
    const [empEmail, setEmpEmail] = useState('');
    const [empMobile, setEmpMobile] = useState();
    const [empDesignation, setEmpDesignation] = useState('');
    const [empGender, setEmpGender] = useState('');
    const [empCourse, setEmpCourse] = useState('');
    const [error, setError] = useState();
    
    const navigate = useNavigate();

    useEffect(() => {

        const getData = async () => {

            try {

                const response = await axios.get(`http://localhost:3000/api/employees/${empId}`);
                setEmpName(response.data.name);
                setEmpEmail(response.data.email);
                setEmpMobile(response.data.mobile);
                setEmpDesignation(response.data.designation);
                setEmpGender(response.data.gender);
                setEmpCourse(response.data.course);

            } catch (err) {
                setError(err.message || 'An error occured');
            }
        }

        getData();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const editedData = new FormData();
        editedData.set('name', empName);
        editedData.set('email', empEmail);
        editedData.set('mobile', empMobile);
        editedData.set('designation', empDesignation);
        editedData.set('gender', empGender);
        editedData.set('course', empCourse);

        try {

            const userData = JSON.parse(localStorage.getItem('user'));
            const response = await axios.patch(`http://localhost:3000/api/employees/${empId}`, editedData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userData.user.token}`
                }
            });

            console.log(response.data)

            if(response.status === 200) {
                setIsModalOpen(false)
                // navigate('/dashboard');
                location.reload();
            } else {
                setError(err.message || 'An error occured');
            }
            
        } catch (err) {
            setError(err.message || 'An error occured')
        }

    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit employee</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="form_error-message">{error}</p>}
                    <input
                        type="text"
                        name="name"
                        value={empName}
                        onChange={(e)=>setEmpName(e.target.value)}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={empEmail}
                        onChange={(e)=>setEmpEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="number"
                        name="mobile"
                        value={empMobile}
                        onChange={(e)=>setEmpMobile(e.target.value)}
                        placeholder="Mobile"
                        required
                    />
                    <input
                        type="text"
                        name="designation"
                        value={empDesignation}
                        onChange={(e)=>setEmpDesignation(e.target.value)}
                        placeholder="Designation"
                        required
                    />
                    <input
                        type="text"
                        name="gender"
                        value={empGender}
                        onChange={(e)=>setEmpGender(e.target.value)}
                        placeholder="Gender"
                        required
                    />
                    <input
                        type="text"
                        name="course"
                        value={empCourse}
                        onChange={(e)=>setEmpCourse(e.target.value)}
                        placeholder="Course"
                        required
                    />
                    <button type="submit" className="btn btn-submit">Update</button>
                    <button type="button" className="btn btn-close" onClick={() => setIsModalOpen(false)}>Close</button>
                </form>
            </div>
        </div>
    )
}

export default EditEmployee