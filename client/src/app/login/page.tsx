"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      // Save the login token for our prototype
      sessionStorage.setItem("token", data.token);

      setMessage("Login successful!");

      // Move to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  const isError =
    message &&
    !message.toLowerCase().includes("successful");

  return (
    <main
      className="page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
        }}
      >
        {/* Brand */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "54px",
              height: "54px",
              margin: "0 auto 14px",
              borderRadius: "14px",
              background: "var(--primary)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "21px",
              boxShadow:
                "0 8px 20px rgba(18, 59, 122, 0.18)",
            }}
          >
            SE
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "25px",
              fontWeight: 750,
              letterSpacing: "-0.4px",
              color: "var(--primary)",
            }}
          >
            SIMe
          </h1>

          <p
            style={{
              margin: "5px 0 0",
              color: "var(--muted)",
              fontSize: "13px",
            }}
          >
            SIM → eSIM
          </p>
        </div>

        {/* Login card */}
        <div
          className="card"
          style={{
            padding: "32px",
          }}
        >
          <div
            style={{
              marginBottom: "26px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "23px",
                fontWeight: 700,
                color: "#101828",
              }}
            >
              Welcome back
            </h2>

            <p
              style={{
                margin: "7px 0 0",
                color: "var(--muted)",
                fontSize: "14px",
                lineHeight: 1.5,
              }}
            >
              Sign in to continue your SIM → eSIM request.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="email"
                className="form-label"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="form-input"
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "22px" }}>
              <label
                htmlFor="password"
                className="form-label"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="form-input"
              />
            </div>

            {/* Message */}
            {message && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "12px 14px",
                  marginBottom: "18px",
                  borderRadius: "10px",
                  background: isError
                    ? "#fef3f2"
                    : "#ecfdf3",
                  border: `1px solid ${
                    isError ? "#fecdca" : "#abefc6"
                  }`,
                }}
              >
                <span
                  style={{
                    color: isError
                      ? "var(--danger)"
                      : "var(--success)",
                    fontWeight: 700,
                  }}
                >
                  {isError ? "!" : "✓"}
                </span>

                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    lineHeight: 1.5,
                    color: isError
                      ? "#b42318"
                      : "#027a48",
                  }}
                >
                  {message}
                </p>
              </div>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: "100%",
                opacity: loading ? 0.7 : 1,
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading ? "Logging in..." : "Login"}

              {!loading && <span>→</span>}
            </button>
          </form>

          {/* Security note */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "9px",
              marginTop: "22px",
              paddingTop: "20px",
              borderTop: "1px solid var(--border)",
            }}
          >
            <span style={{ fontSize: "16px" }}>
              🔒
            </span>

            <p
              style={{
                margin: 0,
                color: "var(--muted)",
                fontSize: "11px",
                lineHeight: 1.6,
              }}
            >
              Your session is authenticated using the
              prototype's secure token-based login system.
            </p>
          </div>
        </div>

        {/* Prototype notice */}
        <div
          style={{
            marginTop: "18px",
            padding: "13px 16px",
            borderRadius: "10px",
            background: "#fffaeb",
            border: "1px solid #fedf89",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#93370d",
              fontSize: "11px",
              lineHeight: 1.5,
            }}
          >
            Prototype environment — carrier integrations
            are simulated.
          </p>
        </div>

        <p
          style={{
            textAlign: "center",
            margin: "20px 0 0",
            color: "#98a2b3",
            fontSize: "11px",
          }}
        >
          SIMe • SIM → eSIM
        </p>
      </div>
    </main>
  );
}