import React, { useState } from 'react';

const AddUser = ({ addUser }) => {
  const [newUser, setNewUser] = useState({
    Applicant_Name: '',
    Date_of_Application: '',
    Status: '', // default value
  });

  // Handle input change and update the state
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Assign a random ID when submitting the form
    const userWithID = {
      ...newUser,
      ID: Math.floor(Math.random() * 10000), // Random ID generation
    };

    // Call the function passed down via props to add the new user
    addUser(userWithID);

    // Clear the form after submission
    setNewUser({
      Applicant_Name: '',
      Date_of_Application: '',
      Status: 'pending',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Applicant_Name"
        value={newUser.Applicant_Name}
        onChange={handleInputChange}
        placeholder="Name"
        required
      />
      <input
        type="date"
        name="Date_of_Application"
        value={newUser.Date_of_Application}
        onChange={handleInputChange}
        required
      />
      <select
        name="Status"
        value={newUser.Status}
        onChange={handleInputChange}
      >
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;





































































/*import React, { useState } from 'react';
//const [name,setApplicantName]=useState("");
const AddUser = ({ addUser }) => {
  const [newUser, setNewUser] = useState({
    ID: '',
    Applicant_Name: '',
    Date_of_Application: '',
    Status: 'pending',
  });
  const onAddUser=()=>{

  };
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const newUser = {
      ID: Math.random(),
      Applicant_Name: e.target.name,
      Date_of_Application: e.target.value,
    }; 
    
    onAddUser(newUser);
    /*setApplicantName("");
    setApplicationDate("");
    setStatus("Pending"); */
  /*};


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="ID"
        value={newUser.ID}
        onChange={handleInputChange}
        placeholder="ID"
        required
      />
      <input
        type="text"
        name="Applicant_Name"
        value={newUser.Applicant_Name}
        onChange={handleInputChange}
        placeholder="Name"
        required
      />
      <input
        type="date"
        name="Date_of_Application"
        value={newUser.Date_of_Application}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
*/