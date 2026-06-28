import { useState } from 'react';

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!email || !password) {
      setError('Please fill all fields!');
      return;
    }
    if (isSignup && !name) {
      setError('Please enter your name!');
      return;
    }

    if (isSignup) {
      // Signup — save user
      const user = { name, email, password };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('loggedIn', 'true');
      onLogin(user);
    } else {
      // Login — check user
      const saved = localStorage.getItem('user');
      if (!saved) {
        setError('No account found! Please sign up first.');
        return;
      }
      const user = JSON.parse(saved);
      if (user.email !== email || user.password !== password) {
        setError('Wrong email or password!');
        return;
      }
      localStorage.setItem('loggedIn', 'true');
      onLogin(user);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#F0FDFA",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "20px",
        padding: "40px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        border: "1px solid #CCFBF1"
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "48px", marginBottom: "8px" }}>💰</div>
          <h1 style={{ color: "#0F766E", fontSize: "24px", fontWeight: "700" }}>
            Smart Expense Tracker
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>
            {isSignup ? 'Create your account' : 'Welcome back!'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: "8px",
            padding: "10px 14px",
            marginBottom: "16px",
            color: "#DC2626",
            fontSize: "13px"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Name — only signup */}
        {isSignup && (
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "6px" }}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Diksha Jain"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%", padding: "12px 14px",
                borderRadius: "10px", border: "1px solid #CCFBF1",
                fontSize: "14px", outline: "none",
                backgroundColor: "#F0FDFA"
              }}
            />
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: "14px" }}>
          <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "6px" }}>
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%", padding: "12px 14px",
              borderRadius: "10px", border: "1px solid #CCFBF1",
              fontSize: "14px", outline: "none",
              backgroundColor: "#F0FDFA"
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "6px" }}>
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%", padding: "12px 14px",
              borderRadius: "10px", border: "1px solid #CCFBF1",
              fontSize: "14px", outline: "none",
              backgroundColor: "#F0FDFA"
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%", padding: "12px",
            backgroundColor: "#0F766E", color: "#fff",
            border: "none", borderRadius: "10px",
            fontSize: "15px", fontWeight: "600",
            cursor: "pointer", marginBottom: "16px"
          }}>
          {isSignup ? 'Create Account' : 'Login'}
        </button>

        {/* Toggle */}
        <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280" }}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <span
            onClick={() => { setIsSignup(!isSignup); setError(''); }}
            style={{ color: "#0F766E", fontWeight: "600", cursor: "pointer" }}>
            {isSignup ? 'Login' : 'Sign Up'}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;