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
          className="username border-b-2 border-teal-500/50 focus:outline-0 focus:border-teal-500"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
        />
      </div>

      <div>
        Password:
        <input
          className="password border-b-2 border-teal-500/50 focus:outline-0 focus:border-teal-500"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
      </div>

      <button
        className="py-1 px-2 rounded-full bg-teal-400/75"
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
