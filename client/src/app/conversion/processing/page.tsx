"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Conversion = {
  _id: string;
  carrier: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
  completedAt?: string;
};

const statusSteps = [
  "SUBMITTED",
  "CARRIER_PROCESSING",
  "ESIM_READY",
  "INSTALLING",
  "ACTIVATED",
  "COMPLETED",
];

const statusLabels: Record<string, string> = {
  SUBMITTED: "Request submitted",
  CARRIER_PROCESSING: "Carrier processing",
  ESIM_READY: "eSIM ready",
  INSTALLING: "eSIM installation",
  ACTIVATED: "Activation confirmed",
  COMPLETED: "Conversion completed",
};

const statusDescriptions: Record<string, string> = {
  SUBMITTED:
    "Your conversion request has been received and is ready for processing.",

  CARRIER_PROCESSING:
    "The request is being processed by the simulated carrier system.",

  ESIM_READY:
    "The simulated eSIM profile is ready for the next stage.",

  INSTALLING:
    "The prototype is simulating the eSIM installation process.",

  ACTIVATED:
    "The prototype has simulated successful activation.",

  COMPLETED:
    "The simulated SIM → eSIM conversion workflow is complete.",
};

export default function ProcessingPage() {
  const router = useRouter();

  const [conversion, setConversion] =
    useState<Conversion | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const conversionId =
      sessionStorage.getItem("conversionId");

    if (!token || !conversionId) {
      setError(
        "Your session or conversion request could not be found."
      );
      setLoading(false);
      return;
    }

    const loadConversion = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/conversions/${conversionId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message ||
              "Unable to load conversion request."
          );
          setLoading(false);
          return;
        }

        setConversion(data.conversion);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Unable to connect to the server.");
        setLoading(false);
      }
    };

    loadConversion();
  }, []);

  useEffect(() => {
    if (!conversion) {
      return;
    }

    const token = sessionStorage.getItem("token");
    const conversionId =
      sessionStorage.getItem("conversionId");

    if (!token || !conversionId) {
      return;
    }

    const currentIndex = statusSteps.indexOf(
      conversion.status
    );

    if (currentIndex === -1) {
      return;
    }

    if (conversion.status === "COMPLETED") {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/conversions/${conversionId}/process`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message ||
              "Unable to process conversion."
          );
          return;
        }

        setConversion((previous) => {
          if (!previous) {
            return null;
          }

          return {
            ...previous,
            status: data.conversion.status,
            completedAt:
              data.conversion.completedAt,
          };
        });
      } catch (error) {
        console.error(error);

        setError(
          "Unable to connect to the processing service."
        );
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [conversion]);

  /* ----------------------------- */
  /* Loading state                  */
  /* ----------------------------- */

  if (loading) {
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
              <div
                className="card"
                style={{
                  padding: "60px 30px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    margin: "0 auto 20px",
                    borderRadius: "50%",
                    background: "var(--primary-light)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "25px",
                  }}
                >
                  ↻
                </div>

                <h1
                  style={{
                    margin: 0,
                    fontSize: "24px",
                  }}
                >
                  Loading your request
                </h1>

                <p
                  style={{
                    marginTop: "10px",
                    color: "var(--muted)",
                    fontSize: "14px",
                  }}
                >
                  Please wait while we retrieve your conversion
                  request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ----------------------------- */
  /* Error state                    */
  /* ----------------------------- */

  if (error) {
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
              <div
                className="card"
                style={{
                  padding: "40px 28px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    margin: "0 auto 18px",
                    borderRadius: "50%",
                    background: "#fef3f2",
                    color: "var(--danger)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: 700,
                  }}
                >
                  !
                </div>

                <h1
                  style={{
                    margin: 0,
                    fontSize: "24px",
                  }}
                >
                  Processing error
                </h1>

                <p
                  style={{
                    marginTop: "10px",
                    color: "var(--muted)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  {error}
                </p>

                <button
                  onClick={() =>
                    router.push("/conversion/review")
                  }
                  className="btn btn-primary"
                  style={{
                    marginTop: "22px",
                  }}
                >
                  Back to review
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!conversion) {
    return null;
  }

  const currentIndex = statusSteps.indexOf(
    conversion.status
  );

  const progress =
    currentIndex >= 0
      ? (currentIndex / (statusSteps.length - 1)) * 100
      : 0;

  const completed =
    conversion.status === "COMPLETED";

  return (
    <main className="page">
      <div className="app-container">
        <div className="page-content">
          <div
            style={{
              maxWidth: "800px",
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
                  background: completed
                    ? "#ecfdf3"
                    : "var(--primary-light)",
                  color: completed
                    ? "#027a48"
                    : "var(--primary)",
                  fontSize: "13px",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                {completed
                  ? "Conversion complete"
                  : "Step 7 of 7"}
              </div>

              <h1 className="page-title">
                {completed
                  ? "Conversion completed"
                  : "Your request is being processed"}
              </h1>

              <p className="page-subtitle">
                {completed
                  ? "The prototype conversion workflow has reached the final stage."
                  : "Track the progress of your SIM → eSIM conversion request below."}
              </p>
            </div>

            {/* Current status hero */}
            <section
              className="card"
              style={{
                padding: "30px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  margin: "0 auto 18px",
                  borderRadius: "50%",
                  background: completed
                    ? "#ecfdf3"
                    : "var(--primary-light)",
                  color: completed
                    ? "#027a48"
                    : "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  fontWeight: 700,
                }}
              >
                {completed ? "✓" : "↻"}
              </div>

              <span
                className={`status-badge ${
                  completed
                    ? "status-success"
                    : "status-processing"
                }`}
              >
                {statusLabels[conversion.status] ||
                  conversion.status}
              </span>

              <h2
                style={{
                  margin: "14px 0 0",
                  fontSize: "22px",
                  fontWeight: 700,
                }}
              >
                {statusLabels[conversion.status] ||
                  conversion.status}
              </h2>

              <p
                style={{
                  maxWidth: "540px",
                  margin: "8px auto 0",
                  color: "var(--muted)",
                  fontSize: "13px",
                  lineHeight: 1.6,
                }}
              >
                {statusDescriptions[conversion.status] ||
                  "Your conversion request is being processed."}
              </p>
            </section>

            {/* Request details */}
            <section
              className="card"
              style={{
                marginTop: "20px",
                padding: "24px 28px",
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
                    borderRadius: "11px",
                    background: "var(--primary-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "19px",
                  }}
                >
                  📋
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "18px",
                    }}
                  >
                    Request details
                  </h2>

                  <p
                    style={{
                      margin: "3px 0 0",
                      color: "var(--muted)",
                      fontSize: "12px",
                    }}
                  >
                    Your conversion request
                  </p>
                </div>
              </div>

              <DetailRow
                label="Request ID"
                value={conversion._id}
                monospace
              />

              <DetailRow
                label="Network"
                value={conversion.carrier}
              />

              <DetailRow
                label="Phone number"
                value={conversion.phoneNumber}
                last
              />
            </section>

            {/* Progress tracker */}
            <section
              className="card"
              style={{
                marginTop: "20px",
                padding: "28px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "28px",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "19px",
                    }}
                  >
                    Conversion progress
                  </h2>

                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "var(--muted)",
                      fontSize: "12px",
                    }}
                  >
                    {completed
                      ? "All prototype stages completed."
                      : "Your request is moving through the conversion workflow."}
                  </p>
                </div>

                <strong
                  style={{
                    color: completed
                      ? "#027a48"
                      : "var(--primary)",
                    fontSize: "14px",
                  }}
                >
                  {Math.round(progress)}%
                </strong>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "#eaecf0",
                  borderRadius: "999px",
                  overflow: "hidden",
                  marginBottom: "30px",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: completed
                      ? "var(--success)"
                      : "var(--primary)",
                    borderRadius: "999px",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>

              {/* Status steps */}
              <div
                style={{
                  display: "grid",
                  gap: "0",
                }}
              >
                {statusSteps.map((status, index) => {
                  const isCompleted =
                    index < currentIndex ||
                    completed;

                  const isCurrent =
                    index === currentIndex &&
                    !completed;

                  const isLast =
                    index === statusSteps.length - 1;

                  return (
                    <div
                      key={status}
                      style={{
                        display: "flex",
                        gap: "15px",
                        minHeight: isLast
                          ? "54px"
                          : "76px",
                        position: "relative",
                      }}
                    >
                      {/* Connector */}
                      {!isLast && (
                        <div
                          style={{
                            position: "absolute",
                            left: "17px",
                            top: "38px",
                            width: "2px",
                            height: "38px",
                            background:
                              index < currentIndex
                                ? "var(--success)"
                                : "#e4e7ec",
                          }}
                        />
                      )}

                      {/* Circle */}
                      <div
                        style={{
                          position: "relative",
                          zIndex: 2,
                          flexShrink: 0,
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background:
                            isCompleted
                              ? "var(--success)"
                              : isCurrent
                              ? "var(--primary)"
                              : "#f2f4f7",
                          color:
                            isCompleted || isCurrent
                              ? "white"
                              : "#98a2b3",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          fontWeight: 700,
                          border: isCurrent
                            ? "4px solid var(--primary-light)"
                            : "none",
                        }}
                      >
                        {isCompleted
                          ? "✓"
                          : index + 1}
                      </div>

                      {/* Text */}
                      <div
                        style={{
                          paddingTop: "2px",
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "9px",
                            flexWrap: "wrap",
                          }}
                        >
                          <strong
                            style={{
                              fontSize: "14px",
                              color:
                                isCompleted ||
                                isCurrent
                                  ? "#101828"
                                  : "#98a2b3",
                            }}
                          >
                            {statusLabels[status]}
                          </strong>

                          {isCurrent && (
                            <span
                              className="status-badge status-processing"
                            >
                              Processing
                            </span>
                          )}

                          {isCompleted &&
                            index !==
                              currentIndex && (
                              <span
                                style={{
                                  fontSize: "11px",
                                  color: "#027a48",
                                  fontWeight: 600,
                                }}
                              >
                                Complete
                              </span>
                            )}
                        </div>

                        {isCurrent && (
                          <p
                            style={{
                              margin: "5px 0 0",
                              fontSize: "12px",
                              color: "var(--muted)",
                            }}
                          >
                            {statusDescriptions[status]}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Completed message */}
            {completed && (
              <section
                style={{
                  marginTop: "20px",
                  padding: "22px",
                  borderRadius: "13px",
                  background: "#ecfdf3",
                  border: "1px solid #abefc6",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "13px",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      flexShrink: 0,
                      borderRadius: "50%",
                      background: "var(--success)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </div>

                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: "17px",
                        color: "#027a48",
                      }}
                    >
                      Conversion completed
                    </h2>

                    <p
                      style={{
                        margin: "7px 0 0",
                        fontSize: "13px",
                        lineHeight: 1.6,
                        color: "#05603a",
                      }}
                    >
                      Your simulated SIM → eSIM conversion
                      workflow has completed successfully.
                    </p>

                    {conversion.completedAt && (
                      <p
                        style={{
                          margin: "9px 0 0",
                          fontSize: "12px",
                          color: "#05603a",
                        }}
                      >
                        <strong>Completed:</strong>{" "}
                        {new Date(
                          conversion.completedAt
                        ).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Prototype notice */}
            <section
              style={{
                marginTop: "20px",
                padding: "17px 18px",
                borderRadius: "11px",
                background: "#fffaeb",
                border: "1px solid #fedf89",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <span style={{ fontSize: "17px" }}>
                  ⚠️
                </span>

                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    lineHeight: 1.6,
                    color: "#93370d",
                  }}
                >
                  <strong>Prototype notice:</strong>{" "}
                  All carrier processing, eSIM provisioning,
                  installation, and activation shown here are
                  simulated. No real carrier eSIM profile was
                  provisioned or activated.
                </p>
              </div>
            </section>

            {/* Dashboard */}
            <button
              onClick={() => router.push("/dashboard")}
              className="btn btn-secondary"
              style={{
                width: "100%",
                marginTop: "22px",
              }}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ----------------------------- */
/* Detail row                     */
/* ----------------------------- */

function DetailRow({
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
        gap: "20px",
        padding: "14px 0",
        borderBottom: last
          ? "none"
          : "1px solid var(--border)",
      }}
    >
      <span
        style={{
          color: "var(--muted)",
          fontSize: "13px",
        }}
      >
        {label}
      </span>

      <strong
        style={{
          color: "#101828",
          fontSize: "13px",
          textAlign: "right",
          fontFamily: monospace
            ? "monospace"
            : "inherit",
          wordBreak: "break-all",
        }}
      >
        {value}
      </strong>
    </div>
  );
}