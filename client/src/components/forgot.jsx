import "../styles/forget.css";
import { useState } from "react";
import axios from "axios";
export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:5173/password-reset`;
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

  return (
    <div className="forget-wrapper">
      <div className="forget-content">
        <form onSubmit={handleSubmit}>
          <h1 className="forget-header">Enter your email</h1>
          <input
					type="email"
					placeholder="someone@email.com"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
					className="email-input"
          />
          {error && <div className="error_msg">{error}</div>}
          {msg && <div className="success_msg">{msg}</div>}
          <br />
          <button type="submit" className="conf browse-btn" id="forgot-btn">
            Submit
          </button>
        </form>
        {/* <Link to="/" className="conf browse-btn" id="forgot-btn">
          Submit
        </Link> */}
      </div>
    </div>
  );
};
