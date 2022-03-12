import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddContact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [number, setNumber] = React.useState("");

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const checkEmail = contacts.find(
      (contact) => contact.email === email && email
    );

    const checkNumber = contacts.find(
      (contact) => contact.number === number && true
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
      id: contacts[contacts.length - 1].id + 1,
      name,
      email,
      number,
    };

    dispatch({ type: "ADD_CONTACT", payload: data });
    toast.success("Contact Added");
    navigate("/");
  }

  return (
    <div className="container">
      <div className="row">
        <h1 className="display-3  text-center">Add Contact</h1>
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
                value="Add Student"
                className="btn btn-dark btn-block "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddContact;
