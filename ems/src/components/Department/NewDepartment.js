import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function NewDepartment() {
  const [formData, setFormData] = useState({
    deptName: "",
    deptID: "",
  });
  const navigate = useHistory();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [port, setPort] = useState(null);

  useEffect(() => {
    const fetchPort = async () => {
      try {
        const response = await axios.get('/getPort');
        setPort(response.data.port);
      } catch (error) {
        console.error('Error fetching port:', error);
        setPort(3001); // Default to port 3001 if fetching fails
      }
    };

    fetchPort();
  }, []); // Empty dependency array to fetch port only once

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!port){
      console.error("Port is not set");
    }
    if (!formData.deptName || !formData.deptID) {
      alert("Please enter both department name and department ID");
      if (!formData.deptName) {
        document.getElementById("deptname").focus(); // Focus on department name input
      } else if (!formData.deptID) {
        document.getElementById("deptid").focus(); // Focus on department ID input
      }
      return; // Prevent further execution of the function
    }

    try {
      const res = await axios.post(`http://localhost:${port}/adddept`, formData);
      if (res.status === 201) {
        setShowSuccessAlert(true);
        setShowErrorAlert(false); // Reset the error alert state
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 3000); // Hides the success alert after 3 seconds
      } else {
        setShowErrorAlert(true);
        setErrorMessage("Failed to add department.");
        
      }
    } catch (error) {
      // console.error("Error adding Department Details:", error);
      // console.error("Axios error:", error);
      // console.error("Error message:", error.message);
      // console.error("Response details:", error.response);
      // console.error("Request details:", error.request);
      // console.error("Request configuration:", error.config);
      // console.error("Stack trace:", error.stack);
      setShowErrorAlert(true);
      setErrorMessage(`  Error adding Department Details: ${error.message}`);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
    }

    setFormData({
      deptName: "",
      deptID: "",
    });
  };

  return (
    <>
      {showSuccessAlert && (
        <div
          className="alert alert-success d-flex align-items-center"
          role="alert"
          style={{ width: "1285px" }}
        >
          <span className="me-10" role="img" aria-label="Success">
            ✅
          </span>
          <div>Department added Successfully!!!</div>
        </div>
      )}

      {showErrorAlert && (
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
          style={{ width: "1285px" }}
        >
          <span className="me-10" role="img" aria-label="Error">
            ❌
          </span>
          {errorMessage}
        </div>
      )}

      <div className="container my-10" style={{ textAlign: "center" }}>
        <h2
          style={{ color: "#007bff", marginBottom: "20px", fontWeight: "bold" }}
        >
          Add Department
        </h2>
        <hr style={{ borderTop: "3px solid #007bff" }} />
      </div>

      <div
        className="container-fluid py-5"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ width: "600px", maxWidth: "90%" }}
        >
          <div
            className="mb-3"
            style={{
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              border: "2px solid #80bdff",
              borderRadius: "10px",
              padding: "30px",
              transition: "border-color 0.3s",
            }}
          >
            <h3
              style={{
                color: "#007bff",
                marginBottom: "15px",
                borderBottom: "2px solid #007bff",
                paddingBottom: "10px",
              }}
            >
              Add Department
            </h3>
            <div className="mb-3">
              <label htmlFor="deptName" className="form-label">
                Department Name
              </label>
              <input
                type="text"
                name="deptName"
                id="deptname"
                value={formData.deptName}
                placeholder="Enter department name in Caps"
                onChange={handleChange}
                className="form-control"
                style={{
                  border: "1px solid #ced4da",
                  borderRadius: "5px",
                  transition: "border-color 0.3s",
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deptID" className="form-label">
                Department ID
              </label>
              <input
                type="text"
                name="deptID"
                id="deptid"
                value={formData.deptID}
                onChange={handleChange}
                className="form-control"
                style={{
                  border: "1px solid #ced4da",
                  borderRadius: "5px",
                  transition: "border-color 0.3s",
                }}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-success btn-lg ms-3"
                onClick={() => navigate.push("/manageDepartment")}
              >
                Manage Department
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
