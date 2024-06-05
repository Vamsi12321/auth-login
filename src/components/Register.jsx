import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth, db } from "./firebase";
import Login from "./Login";
import { Link } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const formRef = useRef("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setFname("");
    setLname("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fName,
          lastName: lName,
        });
      }
      console.log("user registered successfulyy");
      toast.success("user registered successfully!", {
        position: "top-center",
      });
      formRef.current.reset();
    } catch (error) {
      console.log(error.message);
      toast.success(error.message, {
        position: "bottom-center",
      });
    }
  };
  return (
    <form onSubmit={handleRegister} className="register" ref={formRef}>
      <h3>Register</h3>
      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => {
            setFname(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => {
            setLname(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="footer">
        {" "}
        already registerd?{" "}
        <Link to="/login" element={<Login />}>
          {" "}
          Login{" "}
        </Link>
      </p>
    </form>
  );
}

export default Register;
