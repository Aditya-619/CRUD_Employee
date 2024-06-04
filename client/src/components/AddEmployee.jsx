import React, { useState } from 'react'
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';

const AddEmployee = ({ isOpen, setIsModalOpen }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: ''
    })
    const [error, setError] = useState();

    const handleInputChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = JSON.parse(localStorage.getItem('user'));
            // console.log(data.user.token)
            const response = await axios.post('http://localhost:3000/api/employees', formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${data.user.token}`
                }
            });
            const newData = response.data;
            // console.log(newData);
            if (!newData) {
                setError('Could not add the employee, try again.');
            } else {
                setIsModalOpen(false)
                navigate('/dashboard');
                location.reload();
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        }
    };


    if (!isOpen) {
        return null;
    }


    return (

        <div className="modal-overlay">
            <div className="modal">
                <h2>Add New Entry</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="form_error-message">{error}</p>}
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Mobile"
                        required
                    />
                    <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Designation"
                        required
                    />
                    <input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Gender"
                        required
                    />
                    <input
                        type="text"
                        name="course"
                        value={formData.course}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Course"
                        required
                    />
                    <button type="submit" className="btn btn-submit">Submit</button>
                    <button type="button" className="btn btn-close" onClick={() => setIsModalOpen(false)}>Close</button>
                </form>
            </div>
        </div>

    )
}

export default AddEmployee