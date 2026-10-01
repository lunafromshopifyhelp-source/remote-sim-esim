"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="app-container"
        style={{
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "var(--primary)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "17px",
            }}
          >
            SE
          </div>

          <div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--primary)",
              }}
            >
              SIMe
            </div>

            <div
              style={{
                fontSize: "11px",
                color: "var(--muted)",
              }}
            >
              SIM → eSIM
            </div>
          </div>
        </Link>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#475467",
            }}
          >
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              color: "#475467",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}