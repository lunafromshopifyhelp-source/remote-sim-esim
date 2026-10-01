"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed");
        return;
      }

      setMessage(
        "Account created successfully. Redirecting..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  const isError =
    message &&
    !message.toLowerCase().includes("successfully");

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

        {/* Signup card */}
        <div
          className="card"
          style={{
            padding: "32px",
          }}
        >
          <div style={{ marginBottom: "26px" }}>
            <h2
              style={{
                margin: 0,
                fontSize: "23px",
                fontWeight: 700,
              }}
            >
              Create your account
            </h2>

            <p
              style={{
                margin: "7px 0 0",
                color: "var(--muted)",
                fontSize: "14px",
                lineHeight: 1.5,
              }}
            >
              Create an account to manage your SIM → eSIM
              requests.
            </p>
          </div>

          <form onSubmit={handleSignup}>
            {/* Phone */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="phone"
                className="form-label"
              >
                Phone number
              </label>

              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                placeholder="08012345678"
                autoComplete="tel"
                required
                className="form-input"
              />

              <p
                style={{
                  margin: "6px 0 0",
                  color: "var(--muted)",
                  fontSize: "11px",
                }}
              >
                Enter your existing Nigerian mobile number.
              </p>
            </div>

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
                placeholder="Create a password"
                autoComplete="new-password"
                required
                minLength={8}
                className="form-input"
              />

              <p
                style={{
                  margin: "6px 0 0",
                  color: "var(--muted)",
                  fontSize: "11px",
                }}
              >
                Use at least 8 characters.
              </p>
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

            {/* Create account */}
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
              {loading
                ? "Creating account..."
                : "Create account"}

              {!loading && <span>→</span>}
            </button>
          </form>

          {/* Login link */}
          <div
            style={{
              textAlign: "center",
              marginTop: "22px",
              paddingTop: "20px",
              borderTop: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                color: "var(--muted)",
              }}
            >
              Already have an account?{" "}
            </span>

            <button
              type="button"
              onClick={() => router.push("/login")}
              style={{
                background: "transparent",
                color: "var(--primary)",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                padding: 0,
              }}
            >
              Login
            </button>
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