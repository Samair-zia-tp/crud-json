import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {

  const { empid } = useParams();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/employee/' + empid).then((res) => {
      return res.json();
    }).then((resp) => {
      setId(resp.id)
      setName(resp.name)
      setEmail(resp.email)
      setPhone(resp.phone)
      setActive(resp.active)
    }).catch((err) => {
      console.log(err.message)
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id, name, email, phone, active);

    const empData = {
      id, name, email, phone, active
    }

    fetch("http://localhost:8000/employee/" + empid, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(empData)
    }).then((res) => {
      alert('Edited Successfully')
      navigate('/')
    }).catch((err) => {
      console.log(err.message)
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="card p-4" style={{ "textAlign": "left" }}>
              <div className="card-title">
                <h2>Employee Create</h2>
              </div>
              <div className="card-body">
                <div className="row">

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input disabled="disabled" value={id} className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group mt-2">
                      <label>Name</label>
                      <input value={name} required onChange={e => setName(e.target.value)} className="form-control"></input>

                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group mt-2">
                      <label>Email</label>
                      <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group mt-2">
                      <label>Phone</label>
                      <input value={phone} onChange={e => setPhone(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-check mt-2">
                      <input checked={active} onChange={e => setActive(e.target.chacked)} type="checkbox" className="form-check-input"></input>
                      <label className="form-check-label">Is Active</label>

                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mt-3">
                      <button className="btn btn-success" type="submit">Save</button>
                      <Link to="/" className="btn btn-danger mx-2">Back</Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default EmpEdit;