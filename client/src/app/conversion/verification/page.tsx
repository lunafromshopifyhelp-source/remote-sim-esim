"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerificationPage() {
  const router = useRouter();

  const [carrier, setCarrier] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [eid, setEid] = useState("");

  const [fullName, setFullName] = useState("");
  const [verificationId, setVerificationId] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const storedCarrier = sessionStorage.getItem("selectedCarrier");
    const storedPhone = sessionStorage.getItem(
      "conversionPhoneNumber"
    );
    const storedEid = sessionStorage.getItem("conversionEid");

    if (!storedCarrier || !storedPhone || !storedEid) {
      router.push("/conversion");
      return;
    }

    setCarrier(storedCarrier);
    setPhoneNumber(storedPhone);
    setEid(storedEid);
  }, [router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!verificationId.trim()) {
      setError("Please enter your verification ID.");
      return;
    }

    // Simulated verification
    sessionStorage.setItem(
      "verificationFullName",
      fullName.trim()
    );

    sessionStorage.setItem(
      "verificationId",
      verificationId.trim()
    );

    sessionStorage.setItem(
      "verificationStatus",
      "VERIFIED"
    );

    router.push("/conversion/review");
  };

  return (
    <main className="page">
      <div className="app-container">
        <div className="page-content">
          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            {/* Header */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "7px 14px",
                  borderRadius: "999px",
                  background: "var(--primary-light)",
                  color: "var(--primary)",
                  fontSize: "13px",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                Step 5 of 7
              </div>

              <h1 className="page-title">
                Verify your identity
              </h1>

              <p className="page-subtitle">
                Confirm your identity before submitting your
                SIM → eSIM conversion request.
              </p>
            </div>

            {/* Request summary */}
            <div
              className="card"
              style={{
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "var(--primary-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "21px",
                  }}
                >
                  📋
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#101828",
                    }}
                  >
                    Request information
                  </h2>

                  <p
                    style={{
                      margin: "3px 0 0",
                      color: "var(--muted)",
                      fontSize: "12px",
                    }}
                  >
                    Information already provided
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    padding: "12px 14px",
                    background: "#f8fafc",
                    borderRadius: "9px",
                  }}
                >
                  <span
                    style={{
                      color: "var(--muted)",
                      fontSize: "13px",
                    }}
                  >
                    Network
                  </span>

                  <strong
                    style={{
                      fontSize: "13px",
                      color: "#101828",
                    }}
                  >
                    {carrier}
                  </strong>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    padding: "12px 14px",
                    background: "#f8fafc",
                    borderRadius: "9px",
                  }}
                >
                  <span
                    style={{
                      color: "var(--muted)",
                      fontSize: "13px",
                    }}
                  >
                    Phone Number
                  </span>

                  <strong
                    style={{
                      fontSize: "13px",
                      color: "#101828",
                    }}
                  >
                    {phoneNumber}
                  </strong>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    padding: "12px 14px",
                    background: "#f8fafc",
                    borderRadius: "9px",
                  }}
                >
                  <span
                    style={{
                      color: "var(--muted)",
                      fontSize: "13px",
                    }}
                  >
                    EID
                  </span>

                  <strong
                    style={{
                      fontSize: "13px",
                      color: "#101828",
                      fontFamily: "monospace",
                    }}
                  >
                    {eid}
                  </strong>
                </div>
              </div>
            </div>

            {/* Verification form */}
            <div className="card card-padding">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: "var(--accent-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  🛡️
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#101828",
                    }}
                  >
                    Identity verification
                  </h2>

                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "var(--muted)",
                      fontSize: "13px",
                    }}
                  >
                    Provide the requested identification details.
                  </p>
                </div>
              </div>

              {/* Prototype notice */}
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  background: "#fffaeb",
                  border: "1px solid #fedf89",
                  marginBottom: "24px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#93370d",
                    fontSize: "13px",
                    lineHeight: 1.6,
                  }}
                >
                  <strong>Prototype:</strong> Identity verification
                  is simulated in this version. Production will use
                  an authorized identity verification provider.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Full name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="form-label"
                  >
                    Full name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(event) => {
                      setFullName(event.target.value);

                      if (error) {
                        setError("");
                      }
                    }}
                    placeholder="Enter your full name"
                    required
                    className="form-input"
                  />
                </div>

                {/* Verification ID */}
                <div style={{ marginTop: "20px" }}>
                  <label
                    htmlFor="verificationId"
                    className="form-label"
                  >
                    Verification ID
                  </label>

                  <input
                    id="verificationId"
                    type="text"
                    value={verificationId}
                    onChange={(event) => {
                      setVerificationId(event.target.value);

                      if (error) {
                        setError("");
                      }
                    }}
                    placeholder="Enter test verification ID"
                    required
                    className="form-input"
                  />

                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: "12px",
                      color: "var(--muted)",
                    }}
                  >
                    Use a test ID while working with the prototype.
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      marginTop: "18px",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "#fef3f2",
                      border: "1px solid #fecdca",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--danger)",
                        fontWeight: 700,
                      }}
                    >
                      !
                    </span>

                    <p
                      style={{
                        margin: 0,
                        color: "#b42318",
                        fontSize: "13px",
                        lineHeight: 1.5,
                      }}
                    >
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    marginTop: "28px",
                  }}
                >
                  Verify identity
                  <span>→</span>
                </button>
              </form>

              {/* Security note */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "22px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: "17px" }}>🔒</span>

                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    lineHeight: 1.6,
                    color: "var(--muted)",
                  }}
                >
                  Only provide information required for the
                  authorized verification process. Never provide
                  passwords, SIM PINs, PUKs, or banking credentials.
                </p>
              </div>
            </div>

            {/* Back */}
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  router.push("/conversion/eid")
                }
                className="btn btn-secondary"
              >
                ← Back to EID
              </button>
            </div>

            {/* Prototype footer */}
            <div
              style={{
                marginTop: "24px",
                textAlign: "center",
                color: "var(--muted)",
                fontSize: "12px",
                lineHeight: 1.5,
              }}
            >
              Prototype environment — identity verification is simulated.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}