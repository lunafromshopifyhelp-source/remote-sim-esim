"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DevicePage() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [carrier, setCarrier] = useState("");
  const [checking, setChecking] = useState(true);
  const [compatible, setCompatible] = useState<boolean | null>(null);

  useEffect(() => {
    const storedPhone = sessionStorage.getItem(
      "conversionPhoneNumber"
    );

    const storedCarrier = sessionStorage.getItem(
      "selectedCarrier"
    );

    if (!storedPhone || !storedCarrier) {
      router.push("/conversion");
      return;
    }

    setPhoneNumber(storedPhone);
    setCarrier(storedCarrier);

    // Simulated device compatibility check
    const timer = setTimeout(() => {
      setCompatible(true);
      setChecking(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  if (checking) {
    return (
      <main className="page">
        <div className="app-container">
          <div
            className="page-content"
            style={{
              minHeight: "calc(100vh - 72px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="card"
              style={{
                width: "100%",
                maxWidth: "560px",
                padding: "48px 32px",
                textAlign: "center",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  margin: "0 auto 24px",
                  borderRadius: "20px",
                  background: "var(--primary-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "34px",
                }}
              >
                📱
              </div>

              <div
                style={{
                  display: "inline-flex",
                  padding: "7px 14px",
                  borderRadius: "999px",
                  background: "#f2f4f7",
                  color: "var(--muted)",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "18px",
                }}
              >
                Step 3 of 7
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "30px",
                  fontWeight: 700,
                  color: "#101828",
                }}
              >
                Checking your device
              </h1>

              <p
                style={{
                  margin: "12px auto 0",
                  maxWidth: "430px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  fontSize: "15px",
                }}
              >
                We're checking whether your device appears to support
                eSIM technology.
              </p>

              {/* Loading animation */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "30px",
                }}
              >
                <span
                  style={{
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: "var(--primary)",
                  }}
                />

                <span
                  style={{
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                  }}
                />

                <span
                  style={{
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: "#98a2b3",
                  }}
                />
              </div>

              <p
                style={{
                  marginTop: "20px",
                  fontSize: "13px",
                  color: "var(--muted)",
                }}
              >
                Please wait...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

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
                  padding: "7px 14px",
                  borderRadius: "999px",
                  background: "var(--primary-light)",
                  color: "var(--primary)",
                  fontSize: "13px",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                Step 3 of 7
              </div>

              <h1 className="page-title">
                Is your device eSIM compatible?
              </h1>

              <p className="page-subtitle">
                We've completed the compatibility check for your device.
              </p>
            </div>

            {/* Main card */}
            <section
              className="card"
              style={{
                padding: "32px",
              }}
            >
              {/* Success header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  paddingBottom: "25px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "16px",
                    background: "#ecfdf3",
                    color: "var(--success)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "27px",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  ✓
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
                    Device appears compatible
                  </h2>

                  <p
                    style={{
                      margin: "5px 0 0",
                      color: "var(--muted)",
                      fontSize: "14px",
                    }}
                  >
                    You can continue to provide your EID.
                  </p>
                </div>
              </div>

              {/* Information */}
              <div
                style={{
                  marginTop: "25px",
                  display: "grid",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "#f8fafc",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  <span
                    style={{
                      color: "var(--muted)",
                      fontSize: "14px",
                    }}
                  >
                    Network
                  </span>

                  <strong
                    style={{
                      color: "#101828",
                      fontSize: "14px",
                    }}
                  >
                    {carrier}
                  </strong>
                </div>

                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "#f8fafc",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  <span
                    style={{
                      color: "var(--muted)",
                      fontSize: "14px",
                    }}
                  >
                    Phone Number
                  </span>

                  <strong
                    style={{
                      color: "#101828",
                      fontSize: "14px",
                    }}
                  >
                    {phoneNumber}
                  </strong>
                </div>

                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "#ecfdf3",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      color: "var(--success)",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>

                  <span
                    style={{
                      color: "#027a48",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    eSIM compatibility check passed
                  </span>
                </div>
              </div>

              {/* Continue */}
              <button
                onClick={() => router.push("/conversion/eid")}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  marginTop: "28px",
                }}
              >
                Continue to EID
                <span>→</span>
              </button>
            </section>

            {/* Information notice */}
            <div
              className="card"
              style={{
                marginTop: "20px",
                padding: "18px 20px",
                background: "var(--accent-light)",
                borderColor: "#cceeee",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#344054",
                  fontSize: "13px",
                  lineHeight: 1.6,
                }}
              >
                <strong>Note:</strong> This prototype performs a simulated
                compatibility check. Actual eSIM support depends on your
                device model, software, and carrier.
              </p>
            </div>

            {/* Back */}
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              <button
                onClick={() => router.push("/conversion/phone")}
                className="btn btn-secondary"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}