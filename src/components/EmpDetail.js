import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetail = () => {
  const { empid } = useParams();

  const [empDataDetail, setEmpDataDetail] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/employee/' + empid).then((res) => {
      return res.json();
    }).then((resp) => {
      setEmpDataDetail(resp)
    }).catch((err) => {
      console.log(err.message)
    })
  }, []);

  return (
    <div className="container">
      {
        empDataDetail &&
        <div className="mt-5 text-white">
          <h1>{empDataDetail.name}</h1>
          <h3>Contact Details</h3>
          <h5>Email is : {empDataDetail.email}</h5>
          <h5>Phone is : {empDataDetail.phone}</h5>
          <Link className="btn btn-danger" to="/">Back to Listing</Link>
        </div>
      }
    </div>
  )
}

export default EmpDetail;