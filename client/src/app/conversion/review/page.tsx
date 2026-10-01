"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewPage() {
  const router = useRouter();

  const [carrier, setCarrier] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [eid, setEid] = useState("");
  const [fullName, setFullName] = useState("");
  const [verificationId, setVerificationId] = useState("");

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const storedCarrier = sessionStorage.getItem("selectedCarrier");

    const storedPhone = sessionStorage.getItem(
      "conversionPhoneNumber"
    );

    const storedEid = sessionStorage.getItem("conversionEid");

    const storedFullName = sessionStorage.getItem(
      "verificationFullName"
    );

    const storedVerificationId = sessionStorage.getItem(
      "verificationId"
    );

    const verificationStatus = sessionStorage.getItem(
      "verificationStatus"
    );

    if (
      !storedCarrier ||
      !storedPhone ||
      !storedEid ||
      !storedFullName ||
      !storedVerificationId ||
      verificationStatus !== "VERIFIED"
    ) {
      router.push("/conversion");
      return;
    }

    setCarrier(storedCarrier);
    setPhoneNumber(storedPhone);
    setEid(storedEid);
    setFullName(storedFullName);
    setVerificationId(storedVerificationId);
  }, [router]);

  const handleSubmitRequest = async () => {
    try {
      setSubmitting(true);

      const token = sessionStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/conversions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            carrier,
            phoneNumber,
            eid,
            fullName,
            verificationId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to submit conversion request"
        );

        setSubmitting(false);
        return;
      }

      console.log("Conversion created:", data);

      sessionStorage.setItem(
        "conversionId",
        data.conversion.id
      );

      sessionStorage.setItem(
        "conversionStatus",
        data.conversion.status
      );

      router.push("/conversion/processing");
    } catch (error) {
      console.error(
        "Submit conversion error:",
        error
      );

      alert("Unable to connect to the server.");

      setSubmitting(false);
    }
  };

  return (
    <main className="page">
      <div className="app-container">
        <div className="page-content">
          <div
            style={{
              maxWidth: "760px",
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
                Step 6 of 7
              </div>

              <h1 className="page-title">
                Review your request
              </h1>

              <p className="page-subtitle">
                Carefully review your information before
                submitting your conversion request.
              </p>
            </div>

            {/* Network information */}
            <section className="card">
              <div
                style={{
                  padding: "22px 26px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: "var(--primary-light)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                  }}
                >
                  📱
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    Network information
                  </h2>

                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "var(--muted)",
                      fontSize: "12px",
                    }}
                  >
                    Your selected mobile network
                  </p>
                </div>
              </div>

              <div style={{ padding: "10px 26px" }}>
                <ReviewRow
                  label="Network"
                  value={carrier}
                />

                <ReviewRow
                  label="Phone number"
                  value={phoneNumber}
                  last
                />
              </div>
            </section>

            {/* Device information */}
            <section
              className="card"
              style={{ marginTop: "18px" }}
            >
              <div
                style={{
                  padding: "22px 26px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: "var(--accent-light)",
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                  }}
                >
                  📲
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    Device information
                  </h2>

                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "var(--muted)",
                      fontSize: "12px",
                    }}
                  >
                    Your compatible eSIM device
                  </p>
                </div>
              </div>

              <div style={{ padding: "10px 26px" }}>
                <ReviewRow
                  label="Device EID"
                  value={eid}
                  monospace
                  last
                />
              </div>
            </section>

            {/* Identity verification */}
            <section
              className="card"
              style={{ marginTop: "18px" }}
            >
              <div
                style={{
                  padding: "22px 26px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: "#ecfdf3",
                    color: "#027a48",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                  }}
                >
                  ✓
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    Identity verification
                  </h2>

                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "var(--muted)",
                      fontSize: "12px",
                    }}
                  >
                    Verification information
                  </p>
                </div>
              </div>

              <div style={{ padding: "10px 26px" }}>
                <ReviewRow
                  label="Full name"
                  value={fullName}
                />

                <ReviewRow
                  label="Verification ID"
                  value={verificationId}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    padding: "15px 0",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: "var(--muted)",
                    }}
                  >
                    Verification status
                  </span>

                  <span className="status-badge status-success">
                    ✓ VERIFIED
                  </span>
                </div>
              </div>
            </section>

            {/* Important notice */}
            <section
              style={{
                marginTop: "20px",
                padding: "18px",
                borderRadius: "12px",
                background: "#fffaeb",
                border: "1px solid #fedf89",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                  }}
                >
                  ⚠️
                </span>

                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "14px",
                      color: "#93370d",
                      marginBottom: "5px",
                    }}
                  >
                    Prototype environment
                  </strong>

                  <p
                    style={{
                      margin: 0,
                      color: "#93370d",
                      fontSize: "12px",
                      lineHeight: 1.6,
                    }}
                  >
                    This prototype uses simulated carrier and
                    verification processes. No real SIM replacement
                    or eSIM activation occurs at this stage.
                  </p>
                </div>
              </div>
            </section>

            {/* Submit section */}
            <section
              className="card"
              style={{
                marginTop: "20px",
                padding: "26px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "54px",
                    height: "54px",
                    margin: "0 auto 14px",
                    borderRadius: "50%",
                    background: "var(--primary-light)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  →
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 700,
                  }}
                >
                  Ready to submit?
                </h2>

                <p
                  style={{
                    margin: "8px auto 0",
                    maxWidth: "500px",
                    color: "var(--muted)",
                    fontSize: "13px",
                    lineHeight: 1.6,
                  }}
                >
                  Once submitted, your request will move to the
                  processing stage.
                </p>
              </div>

              <button
                onClick={handleSubmitRequest}
                disabled={submitting}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  marginTop: "24px",
                  opacity: submitting ? 0.7 : 1,
                  cursor: submitting
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {submitting
                  ? "Submitting request..."
                  : "Submit conversion request"}

                {!submitting && <span>→</span>}
              </button>

              <button
                onClick={() =>
                  router.push("/conversion/verification")
                }
                disabled={submitting}
                className="btn btn-secondary"
                style={{
                  width: "100%",
                  marginTop: "10px",
                  cursor: submitting
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                ← Back to verification
              </button>
            </section>

            {/* Security note */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "22px",
                color: "var(--muted)",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              <span>🔒</span>

              <span>
                Review your information before submitting.
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ----------------------------- */
/* Review row                     */
/* ----------------------------- */

function ReviewRow({
  label,
  value,
  monospace = false,
  last = false,
}: {
  label: string;
  value: string;
  monospace?: boolean;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "24px",
        padding: "15px 0",
        borderBottom: last
          ? "none"
          : "1px solid var(--border)",
      }}
    >
      <span
        style={{
          fontSize: "13px",
          color: "var(--muted)",
        }}
      >
        {label}
      </span>

      <strong
        style={{
          fontSize: "13px",
          color: "#101828",
          textAlign: "right",
          fontFamily: monospace
            ? "monospace"
            : "inherit",
          wordBreak: "break-word",
        }}
      >
        {value}
      </strong>
    </div>
  );
}