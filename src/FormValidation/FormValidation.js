import { useState } from "react";

export default function FormValidation() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const validation = () => {
    const newError = {};

    const checkEmail = email.trim();
    const regexValue = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!checkEmail) {
      newError.email = "Email is required";
    } else if (!regexValue.test(checkEmail)) {
      newError.email = "Invalid email format";
    }

    if (!password) {
      newError.password = "Password is required";
    } else if (password.length < 5) {
      newError.password = "Password must be at least 5 characters";
    }

    if (!confirmPassword) {
      newError.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }

    return newError;
  };

  const handleSubmitFormData = (e) => {
    e.preventDefault();
    const check = validation();
    setError(check);

    if (Object.keys(check).length === 0) {
      setSubmittedData({ email, password });
    } else {
      setSubmittedData(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitFormData}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email && <p style={{ color: "red" }}>{error.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password && <p style={{ color: "red" }}>{error.password}</p>}

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error.confirmPassword && (
          <p style={{ color: "red" }}>{error.confirmPassword}</p>
        )}

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div>
          <h3>Submitted Data:</h3>
          <p>Email: {submittedData.email}</p>
          <p>Password: {submittedData.password}</p>
        </div>
      )}
    </div>
  );
}
