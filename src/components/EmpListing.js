import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {

  const [empData, setEmpData] = useState(null)
  const navigate = useNavigate();

  const loadDetail = (id) => {
    navigate('/employee/detail/'+id)
  }

  const loadEdit = (id) => {
    navigate('/employee/edit/'+id)
  }

  const removeEmp = (id) => {
    if(window.confirm("Do you want to remove this record?")){
      fetch("http://localhost:8000/employee/" + id, {
      method: 'DELETE',
    }).then((res) => {
      alert('Removed Successfully')
      window.location.reload();
    }).catch((err) => {
      console.log(err.message)
    })
    }
  }

  useEffect(() => {
    fetch('http://localhost:8000/employee').then((res => {
      return res.json()
    })).then((resp) => {
      setEmpData(resp)
      console.log(resp)
    }).catch((err) => {
      console.log(err.message)
    })
  }, [])

  return (
    <div className="container">
      <div className="card bg-black border-white">
        <div className="card-title">
          <h2 className="text-white">Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className=" text-end mb-2">
            <Link to='/employee/create' className=" btn btn-success">Add mployee + </Link>
          </div>
          <table className="table table-bordered table-dark">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                empData && 
                empData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <button onClick={() => loadEdit(item.id)} className="btn btn-success mx-1">Edit</button>
                      <button onClick={() => removeEmp(item.id)} className="btn btn-danger mx-1">Delete</button>
                      <button onClick={() => loadDetail(item.id)} className="btn btn-info mx-1">Details</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}

export default EmpListing;