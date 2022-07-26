import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `/api/register`,
      { email, password },
      config
    )
    
    console.log(data)
  };
  return (
    <div>
      <form onSubmit={SubmitHandler}>
        <h1>Register</h1>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
