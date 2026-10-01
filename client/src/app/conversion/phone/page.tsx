"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PhoneNumberPage() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [selectedCarrier, setSelectedCarrier] = useState("");

  useEffect(() => {
    const storedCarrier = sessionStorage.getItem("selectedCarrier");

    if (!storedCarrier) {
      router.push("/conversion");
      return;
    }

    setSelectedCarrier(storedCarrier);
  }, [router]);

  const handleContinue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!selectedCarrier) {
      router.push("/conversion");
      return;
    }

    const cleanedNumber = phoneNumber.replace(/\s+/g, "");

    if (!/^0\d{10}$/.test(cleanedNumber)) {
      setError(
        "Enter a valid Nigerian phone number, for example 08012345678."
      );
      return;
    }

    sessionStorage.setItem("conversionPhoneNumber", cleanedNumber);

    router.push("/conversion/device");
  };

  return (
    <main className="page">
      <div className="app-container">
        <div className="page-content">
          <div
            style={{
              maxWidth: "620px",
              margin: "0 auto",
            }}
          >
            {/* Progress */}
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
                Step 2 of 7
              </div>

              <h1 className="page-title">
                Enter your phone number
              </h1>

              <p className="page-subtitle">
                Enter the Nigerian phone number currently connected
                to the physical SIM you want to convert.
              </p>
            </div>

            {/* Main card */}
            <div className="card card-padding">
              {/* Selected network */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "15px",
                  padding: "14px 16px",
                  background: "#f8fafc",
                  borderRadius: "12px",
                  marginBottom: "28px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--muted)",
                      marginBottom: "4px",
                    }}
                  >
                    Selected network
                  </div>

                  <strong
                    style={{
                      fontSize: "15px",
                      color: "#101828",
                    }}
                  >
                    {selectedCarrier || "Not selected"}
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/conversion")}
                  style={{
                    background: "transparent",
                    color: "var(--primary)",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Change
                </button>
              </div>

              <form onSubmit={handleContinue}>
                <label
                  htmlFor="phoneNumber"
                  className="form-label"
                >
                  Existing phone number
                </label>

                <div
                  style={{
                    display: "flex",
                    alignItems: "stretch",
                    border: error
                      ? "1px solid var(--danger)"
                      : "1px solid #d0d5dd",
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0 14px",
                      background: "#f8fafc",
                      borderRight: "1px solid #d0d5dd",
                      color: "#344054",
                      fontWeight: 600,
                      fontSize: "15px",
                    }}
                  >
                    +234
                  </div>

                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                      if (error) setError("");
                    }}
                    placeholder="8012345678"
                    maxLength={11}
                    required
                    style={{
                      width: "100%",
                      height: "50px",
                      padding: "0 14px",
                      border: "none",
                      outline: "none",
                      fontSize: "16px",
                      color: "#101828",
                    }}
                  />
                </div>

                {/* Example */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      color: "var(--muted)",
                    }}
                  >
                    Example:
                  </span>

                  <span
                    style={{
                      fontSize: "14px",
                      color: "#344054",
                      fontWeight: 600,
                    }}
                  >
                    08012345678
                  </span>
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
                  Continue
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
                <span style={{ fontSize: "18px" }}>🔒</span>

                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    lineHeight: 1.6,
                    color: "var(--muted)",
                  }}
                >
                  Your phone number is used only to identify the
                  existing SIM conversion request in this prototype.
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
                onClick={() => router.push("/conversion")}
                className="btn btn-secondary"
              >
                ← Back to network selection
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
              Prototype environment — no real SIM replacement is
              performed.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}