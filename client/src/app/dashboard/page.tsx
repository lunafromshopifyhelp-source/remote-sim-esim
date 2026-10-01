"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

type User = {
  email: string;
  phone: string;
  status: string;
};

type Conversion = {
  _id: string;
  carrier: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const loadDashboard = async () => {
      try {
        const userResponse = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userResponse.ok) {
          sessionStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const userData = await userResponse.json();

        setUser(userData.user);

        const conversionResponse = await fetch(
          "http://localhost:5000/api/conversions/my-requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (conversionResponse.ok) {
          const conversionData =
            await conversionResponse.json();

          setConversions(
            conversionData.conversions || []
          );
        }
      } catch (error) {
        console.error(
          "Dashboard loading error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  const getStatusClass = (status: string) => {
    if (
      status === "COMPLETED" ||
      status === "ACTIVATED"
    ) {
      return "status-badge status-success";
    }

    if (
      status === "CARRIER_PROCESSING" ||
      status === "ESIM_READY" ||
      status === "INSTALLING"
    ) {
      return "status-badge status-processing";
    }

    if (
      status === "VERIFICATION_FAILED" ||
      status === "CARRIER_REJECTED" ||
      status === "ACTIVATION_FAILED"
    ) {
      return "status-badge status-error";
    }

    return "status-badge status-submitted";
  };

  if (loading) {
    return (
      <main className="page">
        <Navbar />

        <div
          className="app-container"
          style={{
            paddingTop: "70px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "var(--muted)" }}>
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <Navbar />

      <div className="app-container page-content">
        {/* HEADER */}

        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--accent)",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              YOUR ACCOUNT
            </p>

            <h1
              className="page-title"
              style={{ marginTop: "6px" }}
            >
              Welcome back
            </h1>

            <p className="page-subtitle">
              Manage your SIM → eSIM conversion requests
              from one place.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() =>
              router.push("/conversion")
            }
          >
            Start Conversion
            <span>→</span>
          </button>
        </section>

        {/* ACCOUNT CARDS */}

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginTop: "35px",
          }}
        >
          <div className="card card-padding">
            <p
              style={{
                margin: 0,
                color: "var(--muted)",
                fontSize: "13px",
              }}
            >
              Account Email
            </p>

            <p
              style={{
                marginTop: "8px",
                marginBottom: 0,
                fontWeight: 600,
                wordBreak: "break-word",
              }}
            >
              {user?.email}
            </p>
          </div>

          <div className="card card-padding">
            <p
              style={{
                margin: 0,
                color: "var(--muted)",
                fontSize: "13px",
              }}
            >
              Phone Number
            </p>

            <p
              style={{
                marginTop: "8px",
                marginBottom: 0,
                fontWeight: 600,
              }}
            >
              {user?.phone}
            </p>
          </div>

          <div className="card card-padding">
            <p
              style={{
                margin: 0,
                color: "var(--muted)",
                fontSize: "13px",
              }}
            >
              Total Requests
            </p>

            <p
              style={{
                marginTop: "8px",
                marginBottom: 0,
                fontSize: "28px",
                fontWeight: 700,
                color: "var(--primary)",
              }}
            >
              {conversions.length}
            </p>
          </div>
        </section>

        {/* MAIN CTA */}

        <section
          className="card"
          style={{
            marginTop: "30px",
            padding: "35px",
            background:
              "linear-gradient(135deg, #123b7a 0%, #0b2854 100%)",
            color: "white",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              maxWidth: "650px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                padding: "7px 12px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.12)",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "15px",
              }}
            >
              SIM → eSIM
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: "28px",
                lineHeight: 1.2,
              }}
            >
              Move from physical SIM to eSIM
            </h2>

            <p
              style={{
                marginTop: "12px",
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.6,
              }}
            >
              Start a conversion request from your
              existing SIM. The process remains subject
              to carrier authorization.
            </p>

            <button
              className="btn"
              onClick={() =>
                router.push("/conversion")
              }
              style={{
                marginTop: "18px",
                background: "white",
                color: "var(--primary)",
              }}
            >
              Start a Conversion →
            </button>
          </div>
        </section>

        {/* REQUESTS */}

        <section style={{ marginTop: "45px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "22px",
                }}
              >
                My Conversion Requests
              </h2>

              <p
                style={{
                  marginTop: "6px",
                  color: "var(--muted)",
                  fontSize: "14px",
                }}
              >
                Track your previous and current requests.
              </p>
            </div>
          </div>

          {conversions.length === 0 ? (
            <div
              className="card"
              style={{
                marginTop: "20px",
                padding: "45px 25px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  margin: "0 auto 15px",
                  borderRadius: "14px",
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

              <h3 style={{ margin: 0 }}>
                No conversion requests yet
              </h3>

              <p
                style={{
                  color: "var(--muted)",
                  marginTop: "8px",
                }}
              >
                Start your first SIM → eSIM conversion.
              </p>

              <button
                className="btn btn-primary"
                onClick={() =>
                  router.push("/conversion")
                }
                style={{ marginTop: "15px" }}
              >
                Start Conversion
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              {conversions.map((conversion) => (
                <div
                  key={conversion._id}
                  className="card"
                  style={{
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 700,
                        fontSize: "16px",
                      }}
                    >
                      {conversion.carrier}
                    </p>

                    <p
                      style={{
                        margin: "5px 0 0",
                        color: "var(--muted)",
                        fontSize: "14px",
                      }}
                    >
                      {conversion.phoneNumber}
                    </p>

                    <p
                      style={{
                        margin: "5px 0 0",
                        color: "var(--muted)",
                        fontSize: "12px",
                      }}
                    >
                      {new Date(
                        conversion.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={getStatusClass(
                      conversion.status
                    )}
                  >
                    {conversion.status.replace(
                      /_/g,
                      " "
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}