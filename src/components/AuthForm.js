import React, { useState } from "react";
import { authService } from "fbase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();

    let data;
    try {
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (e) {
      setError(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={onChange}
          required
        />
        <input
          type="submit"
          value={newAccount ? "Create new account" : "Log In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "sign in" : "create account"}
      </span>
    </div>
  );
};

export default AuthForm;
