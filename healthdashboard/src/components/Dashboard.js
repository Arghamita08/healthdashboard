import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function Dashboard() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [name, setName] = useState('');
  const [formData, setFormData] = useState({
    patientNo: '',
    gender: '',
    age: '',
    doctorId: '',
    file: null,
    date: ''
  });

  const [uploadHistory, setUploadHistory] = useState([
    {
      patientNo: 'P010',
      gender: 'Female',
      age: 29,
      doctorId: 'D003',
      file: 'blood-test.pdf',
      date: '01-07-2025'
    },
    {
      patientNo: 'P010',
      gender: 'Female',
      age: 29,
      doctorId: 'D002',
      file: 'xray-report.pdf',
      date: '20-06-2025'
    }
  ]);

  useEffect(() => {
    const storedName = localStorage.getItem('patientName') || 'Patient';
    setName(storedName);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      patientNo: formData.patientNo,
      gender: formData.gender,
      age: formData.age,
      doctorId: formData.doctorId,
      file: formData.file?.name || 'N/A',
      date: formData.date
    };
    setUploadHistory([newEntry, ...uploadHistory]);
    setFormData({
      patientNo: '',
      gender: '',
      age: '',
      doctorId: '',
      file: null,
      date: ''
    });
  };

  return (
    <div className={`dashboard ${isDarkMode ? 'dark' : ''}`}>
      <div className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode
          ? <FaSun size={24} color="#FFD700" />
          : <FaMoon size={24} color="#000090" />
        }
        <h6 className="text-on-hover">Choose Your Theme?</h6>
      </div>

      <h2 className="welcome-message">Welcome Patient, {name}!</h2>
        <h3 className="details">Fill The Patient's Details Here In This Form :</h3>
      <form className="upload-section" onSubmit={handleSubmit}>
        <label>Enter Your Patient No : </label>
        <input
          type="text"
          name="patientNo"
          placeholder="Patient No"
          value={formData.patientNo}
          onChange={handleChange}
          required
        />
        <br></br>
        <label>Select Your Gender : </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <br></br>
        <label>Enter Your Age : </label>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <br></br>  
      <label>Enter the Doctor ID : </label>
        <input
          type="text"
          name="doctorId"
          placeholder="Doctor ID"
          value={formData.doctorId}
          onChange={handleChange}
          required
        />
        <br></br>  
      <label>Choose File (PDF) : </label>
        <input
          type="file"
          name="file"
          accept="application/pdf"
          onChange={handleChange}
          required
        />
        <br></br>       
        <label>Select Date : </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <br></br>
        <button className="upload-button" type="submit">Upload</button>
      </form>

      <div className="history">
        <h3>Upload History</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Patient No</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Doctor ID</th>
                <th>File</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {uploadHistory.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.patientNo}</td>
                  <td>{entry.gender}</td>
                  <td>{entry.age}</td>
                  <td>{entry.doctorId}</td>
                  <td>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      {entry.file}
                    </a>
                  </td>
                  <td>{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="logout-link">
    <a href="/" onClick={() => localStorage.removeItem('patientName')}>Logout</a>
  </div>
    </div>
  );
}

export default Dashboard;
