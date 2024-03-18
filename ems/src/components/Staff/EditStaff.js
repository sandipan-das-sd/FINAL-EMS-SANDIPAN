import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function EditStaff() {
  const { id } = useParams();
  const navigate = useHistory();
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
  }, []);


  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_sex: "",
    user_age: "",
    user_jobtitle: "",
    user_address: "",
    user_zip: "",
    user_city: "",
    user_state: "",
    user_district: "",
    user_phone: "",
    user_birthday: "",
    user_docx: "",
    user_department: "",
    user_workingtype: "",
    user_doj: "",
    user_emergencyphneno: "",
    user_emergency_contact_name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:${port}/editStaff/${id}`);
        const userData = response.data;
        const formattedBirthday = userData.user_birthday.split("T")[0];
        const formattedDoj = userData.user_doj.split("T")[0];
        setFormData({
          user_name: userData.user_name,
          user_email: userData.user_email,
          user_age: userData.user_age,
          user_sex: userData.user_sex,
          user_jobtitle: userData.user_jobtitle,
          user_address: userData.user_address,
          user_zip: userData.user_zip,
          user_city: userData.user_city,
          user_state: userData.user_state,
          user_district: userData.user_district,
          user_phone: userData.user_phone,
          user_birthday: formattedBirthday,
          user_docx: "",
          user_department: userData.user_department,
          user_workingtype: userData.user_workingtype,
          user_doj: formattedDoj,
          user_emergencyphneno: userData.user_emergencyphneno,
          user_emergency_contact_name: userData.user_emergency_contact_name,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (port && id) {
      fetchData();
    }
  }, [id, port]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!port) {
      console.error("Port not set");
      return;
    }
    try {
      await axios.put(`http://localhost:${port}/updateStaffs/${id}`, formData);
      alert("Data Successfully Updated");
      navigate.push("/staffList");
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  return (
    <div style={{ backgroundColor: "green" }}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.heading}>Edit Employee</h1>
        <fieldset style={styles.fieldset}>
          <legend style={styles.legend}>
            <span style={styles.number}>1</span> Employee Information
          </legend>
          <label style={styles.label} htmlFor="name">
            Full Name:
            <input
              type="text"
              id="name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label} htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label} htmlFor="age">
            Age:
            <input
              type="number"
              id="age"
              name="user_age"
              value={formData.user_age}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          {/* Add other input fields similarly */}
          {/* ... */}
          <label style={styles.label} htmlFor="name">
            Sex:
            <select
              id="sex"
              name="user_sex"
              value={formData.user_sex}
              onChange={handleChange}
              style={styles.input}
            >
              <option disabled selected value="disablevalue">
                ---Choose your Sex ----
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label style={styles.label} htmlFor="name">
            Birthday:
            <input
              type="date"
              id="birthday"
              name="user_birthday"
              value={formData.user_birthday}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label} htmlFor="name">
            Upload Your Photo:
          </label>
          <input
            type="file"
            accept="image/png"
            id="user_docx"
            name="user_docx"
            onChange={handleChange}
            style={styles.input}
          />
          {formData.user_docx && <p>{formData.user_docx.name}</p>}

          <legend style={styles.legend}>
            <span style={styles.number}>2</span> Your Job Details
          </legend>
          <label style={styles.label} htmlFor="name">
            Title:
            <input
              type="text"
              id="jobtitle"
              name="user_jobtitle"
              value={formData.user_jobtitle}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label} htmlFor="name">
            Department:
            <input
              type="text"
              id="department"
              name="user_department"
              value={formData.user_department}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label} htmlFor="name">
            Working Type:
            <select
              id="workingtype"
              name="user_workingtype"
              value={formData.user_workingtype}
              onChange={handleChange}
              style={styles.input}
            >
              <option disabled value="disablevalue">
                ---Select Your Working Type----
              </option>
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </label>
          <label style={styles.label} htmlFor="name">
            City:
            <input
              type="text"
              id="city"
              name="user_city"
              value={formData.user_city}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label} htmlFor="name">
            PinCode:
            <input
              type="text"
              id="zip"
              name="user_zip"
              placeholder="Enter Number Only"
              value={formData.user_zip}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label} htmlFor="name">
            District:
            <input
              type="text"
              id="district"
              name="user_district"
              value={formData.user_district}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label} htmlFor="name">
            State:
            <input
              type="text"
              id="state"
              name="user_state"
              value={formData.user_state}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <label style={styles.label} htmlFor="name">
            Phone Number:
            <input
              type="number"
              id="phone"
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label} htmlFor="name">
            Start Date:
            <input
              type="date"
              id="doj"
              name="user_doj"
              value={formData.user_doj}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <legend style={styles.legend}>
            <span style={styles.number}>3</span> Emergency Contact Details
            <label style={styles.label} htmlFor="name">
              Contact Information:
              <input
                type="number"
                id="emergencyphoneno"
                name="user_emergencyphneno"
                value={formData.user_emergencyphneno}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label} htmlFor="name">
              Contact Perosn Name:
              <input
                type="text"
                id="name"
                name="user_emergency_contact_name" // Change the name attribute
                value={formData.user_emergency_contact_name} // Adjust value and onChange accordingly
                onChange={handleChange}
                style={styles.input}
              />
            </label>
          </legend>
        </fieldset>
        <button type="submit" style={styles.button}>
          Update Employee
        </button>
      </form>
    </div>
  );
}

const styles = {
  form: {
    maxWidth: "1000px",
    margin: "10px auto",
    marginBottom: "10px",
    padding: "10px 20px",
    background: "#f4f7f8",
    borderRadius: "8px",
  },
  heading: {
    margin: "0 0 30px 0",
    textAlign: "center",
  },
  fieldset: {
    marginBottom: "30px",
    border: "none",
  },
  legend: {
    fontSize: "1.4em",
    marginBottom: "10px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
  },
  input: {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    fontSize: "16px",
    height: "auto",
    margin: "0",
    outline: "0",
    padding: "15px",
    width: "100%",
    backgroundColor: "#e8eeef",
    color: "#8a97a0",
    boxShadow: "0 1px 0 rgba(0,0,0,0.03) inset",
    marginBottom: "30px",
  },
  button: {
    padding: "19px 39px 18px 39px",
    color: "#FFF",
    backgroundColor: "#4bc970",
    fontSize: "18px",
    textAlign: "center",
    fontStyle: "normal",
    borderRadius: "5px",
    width: "100%",
    border: "1px solid #3ac162",
    borderWidth: "1px 1px 3px",
    boxShadow: "0 -1px 0 rgba(255,255,255,0.1) inset",
    marginBottom: "10px",
  },
  number: {
    backgroundColor: "#5fcf80",
    color: "#fff",
    height: "30px",
    width: "30px",
    display: "inline-block",
    fontSize: "0.8em",
    marginRight: "4px",
    lineHeight: "30px",
    textAlign: "center",
    textShadow: "0 1px 0 rgba(255,255,255,0.2)",
  },
};
