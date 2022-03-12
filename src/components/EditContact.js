import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditContact() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contacts = useSelector((state) => state);
  const currentContact = contacts.filter(
    (contact) => contact.id === parseInt(id)
  );

  const [name, setName] = React.useState(currentContact[0].name);
  const [email, setEmail] = React.useState(currentContact[0].email);
  const [number, setNumber] = React.useState(currentContact[0].number);

  function handleSubmit(e) {
    e.preventDefault();

    const checkEmail = contacts.find(
      (contact) =>
        contact.id !== parseInt(id) && contact.email === email && email
    );

    const checkNumber = contacts.find(
      (contact) =>
        contact.id !== parseInt(id) && contact.number === number && true
    );

    if (!name || !email || !number) {
      return toast.warning("Please fill in all Fields");
    }
    if (checkEmail) {
      return toast.error("This email already exists");
    }
    if (checkNumber) {
      return toast.error("This Number already exists");
    }

    const data = {
      id: parseInt(id),
      name,
      email,
      number,
    };

    dispatch({ type: "EDIT_CONTACT", payload: data });
    toast.success("Contact Updated");
    navigate("/");
  }

  return (
    <div className="container">
      <div className="row">
        <h1 className="display-3  text-center">
          Edit Contact {parseInt(id) + 1}
        </h1>
        <div className="col-row-6 shadow mx-auto p-5 mt-2">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className="form-control m-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                className="form-control m-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Number"
                className="form-control m-3"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <input
                type="submit"
                value="Update Student"
                className="btn btn-dark btn-block "
              />
              <Link to="/" className="btn btn-danger mx-2">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditContact;
