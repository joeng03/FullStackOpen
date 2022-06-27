import { useState } from "react";
const Login = ({ handleLogin, errMsg }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form>
      <h2>Log In to Application</h2>
      <div className="errMsg">{errMsg}</div>
      <div>
        Username:
        <input
          className="username"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
        />
      </div>

      <div>
        Password:
        <input
          className="password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
      </div>

      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleLogin({ username, password });
          setUsername("");
          setPassword("");
        }}
      >
        Login
      </button>
    </form>
  );
};
export default Login;
