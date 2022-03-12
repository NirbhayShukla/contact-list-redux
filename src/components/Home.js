import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();

  function deleteContact(id) {
    dispatch({ type: "DELETE_CONTACT", payload: id });
    toast.warning("Contact Deleted");
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 my-5 text-right">
          <Link to="/add" className="btn btn-outline-dark ">
            Add Contact
          </Link>
        </div>
        <div className="col-row-6 mx-auto">
          <table className="table table-hover">
            <thead className="text-white bg-dark text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => {
                return (
                  <tr key={contact.id}>
                    <td>{contact.id + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.number}</td>
                    <td>
                      <Link
                        to={`/edit/${contact.id}`}
                        className="btn btn-small btn-primary "
                      >
                        Edit
                      </Link>
                      <button
                        type="buttton"
                        className="btn btn-small btn-danger mx-2"
                        onClick={() => deleteContact(contact.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
