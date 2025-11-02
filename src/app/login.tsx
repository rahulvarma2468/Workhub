"use client";

import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(isLogin ? "Logged in (dummy)!" : "Signed up (dummy)!");
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "rgba(255,255,255,0.95)", padding: "2.5rem", borderRadius: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.1)", minWidth: 340 }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ padding: "0.875rem 1rem", borderRadius: 10, border: "1px solid #ddd" }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: "0.875rem 1rem", borderRadius: 10, border: "1px solid #ddd" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ padding: "0.875rem 1rem", borderRadius: 10, border: "1px solid #ddd" }}
          />
          <button type="submit" style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)", color: "white", border: "none", borderRadius: 12, padding: "1rem 2rem", fontWeight: 600, fontSize: "1rem" }}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button type="button" onClick={() => { setIsLogin(!isLogin); setStatus(""); }} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontWeight: 500 }}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
        {status && <div style={{ marginTop: "1.5rem", textAlign: "center", color: "#059669", fontWeight: 500 }}>{status}</div>}
      </div>
    </main>
  );
}
