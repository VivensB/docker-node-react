import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
function App() {
  const [employees, setEmployees] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4500/employees");
        setEmployees(response.data.employees);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="container">
      <table className="table table-stripped table-hover mt-5">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Date Of Birth</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastname}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>{employee.phone_number}</td>
              <td>{moment(employee.dateOfBirth).format("DD/MM/YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
