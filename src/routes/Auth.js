import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={onChange}
          required
        />
      </form>
      <form>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={onChange}
          required
        />
        <input type="submit" value="Log In" onSubmit={onSubmit} />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
