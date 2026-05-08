import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log(res.data);

      alert("Registered Successfully");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (

    <div className="container">

      <h1>Register</h1>

      <div className="input-section">

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={registerUser}>
          Register
        </button>

      </div>

    </div>
  );
}

export default Register;
