"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EIDPage() {
  const router = useRouter();

  const [eid, setEid] = useState("");
  const [error, setError] = useState("");
  const [carrier, setCarrier] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const storedCarrier = sessionStorage.getItem("selectedCarrier");
    const storedPhone = sessionStorage.getItem(
      "conversionPhoneNumber"
    );

    if (!storedCarrier || !storedPhone) {
      router.push("/conversion");
      return;
    }

    setCarrier(storedCarrier);
    setPhoneNumber(storedPhone);
  }, [router]);

  const handleContinue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const cleanedEid = eid.replace(/\s+/g, "");

    if (!/^\d{32}$/.test(cleanedEid)) {
      setError("EID must contain exactly 32 digits.");
      return;
    }

    sessionStorage.setItem("conversionEid", cleanedEid);

    router.push("/conversion/verification");
  };

  return (
    <main className="page">
      <div className="app-container">
        <div className="page-content">
          <div
            style={{
              maxWidth: "680px",
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
                Step 4 of 7
              </div>

              <h1 className="page-title">
                Enter your device EID
              </h1>

              <p className="page-subtitle">
                Your EID helps identify the eSIM-capable device
                that will receive the eSIM profile.
              </p>
            </div>

            {/* Device information */}
            <div
              className="card"
              style={{
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(2, minmax(0, 1fr))",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    padding: "15px",
                    background: "#f8fafc",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--muted)",
                      marginBottom: "5px",
                    }}
                  >
                    Network
                  </div>

                  <strong
                    style={{
                      fontSize: "15px",
                      color: "#101828",
                    }}
                  >
                    {carrier}
                  </strong>
                </div>

                <div
                  style={{
                    padding: "15px",
                    background: "#f8fafc",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--muted)",
                      marginBottom: "5px",
                    }}
                  >
                    Phone Number
                  </div>

                  <strong
                    style={{
                      fontSize: "15px",
                      color: "#101828",
                    }}
                  >
                    {phoneNumber}
                  </strong>
                </div>
              </div>
            </div>

            {/* EID form */}
            <div className="card card-padding">
              <form onSubmit={handleContinue}>
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
                      fontSize: "25px",
                      flexShrink: 0,
                    }}
                  >
                    📱
                  </div>

                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: "19px",
                        fontWeight: 700,
                        color: "#101828",
                      }}
                    >
                      Device EID
                    </h2>

                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "var(--muted)",
                        fontSize: "13px",
                      }}
                    >
                      32-digit device identifier
                    </p>
                  </div>
                </div>

                <label
                  htmlFor="eid"
                  className="form-label"
                >
                  Enter your EID
                </label>

                <input
                  id="eid"
                  type="text"
                  inputMode="numeric"
                  value={eid}
                  onChange={(event) => {
                    setEid(
                      event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 32)
                    );

                    if (error) {
                      setError("");
                    }
                  }}
                  placeholder="Enter your 32-digit EID"
                  maxLength={32}
                  required
                  className="form-input"
                  style={{
                    fontFamily: "monospace",
                    letterSpacing: "1px",
                  }}
                />

                {/* Progress */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color:
                        eid.length === 32
                          ? "var(--success)"
                          : "var(--muted)",
                      fontWeight:
                        eid.length === 32 ? 600 : 400,
                    }}
                  >
                    {eid.length === 32
                      ? "✓ EID complete"
                      : "Enter 32 digits"}
                  </span>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--muted)",
                      fontWeight: 600,
                    }}
                  >
                    {eid.length}/32
                  </span>
                </div>

                {/* Character progress bar */}
                <div
                  style={{
                    height: "5px",
                    background: "#eaecf0",
                    borderRadius: "999px",
                    marginTop: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(eid.length / 32) * 100}%`,
                      background:
                        eid.length === 32
                          ? "var(--success)"
                          : "var(--accent)",
                      borderRadius: "999px",
                      transition: "width 0.15s ease",
                    }}
                  />
                </div>

                {/* Help */}
                <div
                  style={{
                    marginTop: "20px",
                    padding: "15px",
                    borderRadius: "10px",
                    background: "#f8fafc",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "#475467",
                    }}
                  >
                    <strong>Where can I find my EID?</strong>
                    <br />
                    You can usually find it in your device's
                    SIM, mobile network, or eSIM settings.
                    Some devices also display it when you
                    dial <strong>*#06#</strong>.
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      marginTop: "16px",
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

                {/* Continue */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    marginTop: "28px",
                  }}
                >
                  Continue to verification
                  <span>→</span>
                </button>
              </form>

              {/* Privacy note */}
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
                  Your EID is sensitive device information.
                  Only provide it through this secure conversion
                  process.
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
                  router.push("/conversion/device")
                }
                className="btn btn-secondary"
              >
                ← Back to device check
              </button>
            </div>

            {/* Prototype notice */}
            <div
              style={{
                marginTop: "24px",
                textAlign: "center",
                color: "var(--muted)",
                fontSize: "12px",
                lineHeight: 1.5,
              }}
            >
              Prototype environment — no real eSIM profile is
              provisioned at this stage.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}