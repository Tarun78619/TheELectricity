import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { data } from "./components/users.js";
import AddUser from "./AddUser.js";  
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




const UserTable = () => {
  const [currentUsers, setCurrentUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);  // filteredData will now be used
  //const [newdata,setnewdata]=usestate([]) 

  


  useEffect(() => {
    setUsers(data);
    setLoading(false);
  }, []);

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const deleteUser = (id) => {
    const user = users.find((user) => user.ID === id); 
    if (user && user.Status === 'Rejected') {
      setUsers((prevUsers) => prevUsers.filter((user) => user.ID !== id)); 
    } else {
      alert('User can only be deleted if the status is Rejected.');
    }
  };
  /*const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.ID !== id));
  };*/

  const changeStatus = (id, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.ID === id ? { ...user, Status: newStatus } : user
      )
    );
  };

  const ChangeStatus = ({ user }) => {
    return (
      <select
        value={user.Status}  
        onChange={(e) => changeStatus(user.ID, e.target.value)} 
      >
        <option value={user.Status}>{user.Status}</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
        <option value="Pending">Pending</option>
        <option value="Connection Released">Connection Released</option>
      </select>
    );
  };

  useEffect(() => {
    // Filter users based on the search query (Application ID)
    if (searchQuery === "") {
      setFilteredUsers(users); // If no query, show all users
    } else {
      const filtered = users.filter((user) =>
        user.ID.toString().includes(searchQuery)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  useEffect(() => {
    if (filteredUsers.length > 0) {
      const indexOfLastUser = (currentPage + 1) * usersPerPage;
      const indexOfFirstUser = indexOfLastUser - usersPerPage;
      setCurrentUsers(filteredUsers.slice(indexOfFirstUser, indexOfLastUser));
    }
  }, [filteredUsers, currentPage, usersPerPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    const formattedDate = `20${year}-${month}-${day}`;
    return new Date(formattedDate);
  };
  
  /*const filterByDate = () => {
    if (startDate && endDate) {
      const filteredo = users.filter((user) => {
        const userDate = parseDate(user.Date_of_Application);
        return userDate >= startDate && userDate <= endDate;
      });
      setFilteredData(filteredo);
    } else {
      setFilteredData([]);
    }
  };*/

  
  const filterByDate = () => {
    if (startDate && endDate) {
      const filteredo = users.filter((user) => {
        const userDate = new Date(user.Date_of_Application);
        return userDate >= startDate && userDate <= endDate;
      });
      setFilteredData(filteredo);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Users</h2>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Application ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          className="search-input"
        />
      </div>

      {/* Date Filter */}
      <div className="date-filter">
      <input
  type="date"
  value={startDate ? startDate.toISOString().split("T")[0] : ""} // Formatting date
  onChange={(e) => setStartDate(new Date(e.target.value))}  // Handling date change
  placeholder="Start Date"
/>

<input
  type="date"
  value={endDate ? endDate.toISOString().split("T")[0] : ""}  // Formatting date
  onChange={(e) => setEndDate(new Date(e.target.value))}  // Handling date change
  placeholder="End Date"
  min={startDate ? startDate.toISOString().split("T")[0] : ""}  // Preventing end date before start date
/>

     {/* <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)} // Update start date
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)} // Update end date
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate} // Prevent selecting an end date before start date
          placeholderText="End Date"
        />*/}
        <button onClick={filterByDate}>Filter</button>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <AddUser addUser={addUser} /> 
          
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Application Date</th> 
      
                <th>Approval Date</th>  
                <th>State</th> 
                <th>District</th>    
                <th>Pincode</th>    
                <th>Ownership</th>  
                <th>Load Applied</th> 
                <th>Modified Date</th> 
                


                <th>STATUS</th>
              </tr>
            </thead>

            {/* Updated rendering logic */}
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((user) => (
                  <tr key={user.ID}>
                    <td>{user.ID}</td>
                    <td>{user.Applicant_Name}</td>
                    <td>{user.Date_of_Application}</td>
                    <td>
                      <ChangeStatus user={user} />
                      <button onClick={() => deleteUser(user.ID)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.ID}>
                    <td>{user.ID}</td>
                    <td>{user.Applicant_Name}</td>
                    <td>{user.Date_of_Application}</td>

                    <td>{user.Date_of_Approval}</td>
                    <td>{user.State}</td>
                    <td>{user.District}</td>
                    <td>{user.Pincode}</td>
                    <td>{user.Ownership}</td>
                    <td>{user.Load_Applied}</td>  
                    <td>{user.Modified_Date}</td> 
                    


                    <td>
                      <ChangeStatus user={user} />
                      <button onClick={() => deleteUser(user.ID)}>Delete</button>
                    </td>
                    
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination-container">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              previousClassName={"page-item"}
              nextClassName={"page-item"}
              activeClassName={"active-page"}
              disabledClassName={"disabled-page"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserTable;
