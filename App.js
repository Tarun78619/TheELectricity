import React,{useState,useEffect} from "react"
//import ReactDom from "react-dom-client"
import './App.css';
import UserTable from "./table.js" 
//import './styles/globals.css'; 
const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /*useEffect(() => {
      const fetchUsers = async () => {
          try {
              const response = await fetch('./components/users.json');
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setUsers(data);
              setLoading(false);
          } catch (error) {
              console.error('Error fetching users:', error);
              setLoading(false);
          }
      };

      fetchUsers();
  }, []);*/

  return (
      <div className="batman">
          <h1>PEOPLE DATA</h1>
          <UserTable/>
          
      </div>
  );
};
//const root=React.CreateRoot(document.getElementById("root"))
export default App;
