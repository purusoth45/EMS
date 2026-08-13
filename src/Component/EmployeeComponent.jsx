import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  console.log("Employee ID:", id);

  // Get employee for update
  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          console.log("Employee data:", response.data);

          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error("Error fetching employee:", error);
        });
    }
  }, [id]);

  // Validation
  function validateForm() {
    let valid = true;

    const errorsCopy = {
      firstName: "",
      lastName: "",
      email: "",
    };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  // Save or Update
  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const employee = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    console.log("Employee:", employee);

    if (id) {
      // UPDATE
      console.log("Updating employee ID:", id);

      updateEmployee(id, employee)
        .then((response) => {
          console.log("Update successful:", response.data);
          navigate("/employees");
        })
        .catch((error) => {
          console.error("Update failed:", error);
        });
    } else {
      // CREATE
      console.log("Creating employee");

      createEmployee(employee)
        .then((response) => {
          console.log("Create successful:", response.data);
          navigate("/employees");
        })
        .catch((error) => {
          console.error("Create failed:", error);
        });
    }
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-4 offset-md-4">
            {pageTitle()}

            <div className="card-body">
              <form onSubmit={saveOrUpdateEmployee}>

                {/* First Name */}
                <div className="form-group mb-2">
                  <label className="form-label">First Name:</label>

                  <input
                    type="text"
                    placeholder="Enter Employee First Name"
                    name="firstName"
                    value={firstName}
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  {errors.firstName && (
                    <div className="invalid-feedback">
                      {errors.firstName}
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div className="form-group mb-2">
                  <label className="form-label">Last Name:</label>

                  <input
                    type="text"
                    placeholder="Enter Employee Last Name"
                    name="lastName"
                    value={lastName}
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setLastName(e.target.value)}
                  />

                  {errors.lastName && (
                    <div className="invalid-feedback">
                      {errors.lastName}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="form-group mb-2">
                  <label className="form-label">Email:</label>

                  <input
                    type="email"
                    placeholder="Enter Employee Email"
                    name="email"
                    value={email}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-success">
                  {id ? "Update Employee" : "Save Employee"}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;