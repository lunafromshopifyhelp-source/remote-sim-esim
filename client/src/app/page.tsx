"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="page">
      
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="app-container"
          style={{
            minHeight: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: 800,
              color: "var(--primary)",
              fontSize: "20px",
            }}
          >
            <span
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "var(--primary)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                fontWeight: 800,
              }}
            >
              SE
            </span>

            SIMe
          </Link>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "22px",
            }}
          >
            <a
              href="#how-it-works"
              style={{
                color: "var(--muted)",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              How It Works
            </a>

            <a
              href="#networks"
              style={{
                color: "var(--muted)",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Networks
            </a>

            <a
              href="#faq"
              style={{
                color: "var(--muted)",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              FAQ
            </a>

            <Link
              href="/login"
              style={{
                color: "var(--primary)",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="btn btn-primary"
              style={{
                minHeight: "40px",
                padding: "0 16px",
                fontSize: "13px",
              }}
            >
              Create Account
            </Link>
          </nav>
        </div>
      </header>

      
      <section
        style={{
          padding: "85px 0 75px",
          background:
            "linear-gradient(135deg, #f7f9fc 0%, #eef5ff 55%, #eafafa 100%)",
        }}
      >
        <div
          className="app-container"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "7px 12px",
                borderRadius: "999px",
                background: "white",
                border: "1px solid var(--border)",
                color: "var(--primary)",
                fontSize: "12px",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              <span>●</span>
              SIMe V1 Prototype
            </div>

            <h1
              style={{
                margin: 0,
                maxWidth: "720px",
                fontSize: "clamp(40px, 6vw, 64px)",
                lineHeight: 1.05,
                letterSpacing: "-2px",
                color: "var(--primary)",
                fontWeight: 800,
              }}
            >
              Bringing the
              <br />
              <span style={{ color: "var(--accent)" }}>
                SIM → eSIM
              </span>
              <br />
              journey closer to you.
            </h1>

            <p
              style={{
                maxWidth: "650px",
                marginTop: "24px",
                fontSize: "18px",
                lineHeight: 1.7,
                color: "var(--muted)",
              }}
            >
              SIMe is being developed to make the physical SIM
              to eSIM conversion journey more digital, guided and
              convenient — reducing unnecessary trips to network
              service centres where the process can be handled
              remotely.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "30px",
              }}
            >
              <Link href="/signup" className="btn btn-primary">
                Create Account
                <span>→</span>
              </Link>

              <a
                href="#how-it-works"
                className="btn btn-secondary"
              >
                See How It Works
              </a>
            </div>

            <p
              style={{
                marginTop: "18px",
                fontSize: "12px",
                color: "var(--muted)",
              }}
            >
              The actual conversion process begins after account
              creation.
            </p>
          </div>

          {/* Hero visual */}
          <div
            className="card"
            style={{
              padding: "28px",
              background: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    color: "var(--muted)",
                    fontSize: "12px",
                  }}
                >
                  THE SIMe VISION
                </p>

                <h3
                  style={{
                    margin: "5px 0 0",
                    fontSize: "20px",
                  }}
                >
                  From service centre to digital journey
                </h3>
              </div>

              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "13px",
                  background: "var(--primary-light)",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "18px",
                }}
              >
                e
              </div>
            </div>

            {[
              ["01", "Customer", "Starts a request remotely"],
              ["02", "Verification", "Identity and eligibility checks"],
              ["03", "Network", "Authorized carrier processing"],
              ["04", "eSIM", "Activation and installation"],
            ].map(([number, title, text], index) => (
              <div
                key={number}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "15px 0",
                  borderTop:
                    index === 0
                      ? "none"
                      : "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background:
                      index === 0
                        ? "var(--primary)"
                        : "var(--primary-light)",
                    color:
                      index === 0
                        ? "white"
                        : "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 800,
                  }}
                >
                  {number}
                </span>

                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--primary)",
                    }}
                  >
                    {title}
                  </div>

                  <div
                    style={{
                      marginTop: "2px",
                      fontSize: "12px",
                      color: "var(--muted)",
                    }}
                  >
                    {text}
                  </div>
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: "18px",
                padding: "13px 14px",
                borderRadius: "10px",
                background: "#fffaeb",
                border: "1px solid #fedf89",
                fontSize: "11px",
                lineHeight: 1.5,
                color: "#93370d",
              }}
            >
              V1 prototype: carrier verification,
              authorization, provisioning and activation are
              simulated.
            </div>
          </div>
        </div>
      </section>

      
      <section style={{ padding: "75px 0" }}>
        <div className="app-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "55px",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  color: "var(--accent)",
                  fontWeight: 800,
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                The idea
              </p>

              <h2
                style={{
                  margin: "10px 0 0",
                  fontSize: "36px",
                  lineHeight: 1.2,
                  color: "var(--primary)",
                }}
              >
                Why should a digital device process always begin
                with a physical visit?
              </h2>

              <p
                style={{
                  marginTop: "18px",
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  fontSize: "15px",
                }}
              >
                Moving from a physical SIM to an eSIM can involve
                several steps, including subscriber identification,
                verification, device compatibility and network-side
                processing.
              </p>

              <p
                style={{
                  marginTop: "14px",
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  fontSize: "15px",
                }}
              >
                SIMe is being designed to bring the customer-facing
                part of that journey into one guided digital
                platform, while keeping the network's authorization
                and security requirements intact.
              </p>
            </div>

            <div
              className="card"
              style={{
                padding: "30px",
              }}
            >
              <div
                style={{
                  paddingBottom: "20px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  TRADITIONAL CUSTOMER JOURNEY
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--primary)",
                  }}
                >
                  Customer → Service Centre → Verification →
                  Network Processing
                </div>
              </div>

              <div
                style={{
                  paddingTop: "20px",
                }}
              >
                <div
                  style={{
                    color: "var(--accent)",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  SIMe VISION
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--primary)",
                  }}
                >
                  Customer → SIMe → Authorized Network Process
                </div>
              </div>

              <p
                style={{
                  margin: "18px 0 0",
                  color: "var(--muted)",
                  fontSize: "13px",
                  lineHeight: 1.7,
                }}
              >
                SIMe does not replace the mobile network. It is
                designed to simplify the customer's interaction
                with the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section
        style={{
          padding: "75px 0",
          background: "white",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="app-container">
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "var(--accent)",
                fontWeight: 800,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              About SIMe
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                fontSize: "36px",
                color: "var(--primary)",
              }}
            >
              A digital layer between the customer and the
              conversion process
            </h2>

            <p
              style={{
                marginTop: "18px",
                color: "var(--muted)",
                lineHeight: 1.8,
                fontSize: "16px",
              }}
            >
              SIMe is designed to guide customers through the
              customer-facing side of physical SIM to eSIM
              conversion, while authorized mobile-network processes
              remain responsible for verification, authorization,
              provisioning and activation.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "20px",
              marginTop: "45px",
            }}
          >
            {[
              {
                title: "Remote-first",
                text: "Designed to reduce unnecessary physical visits by bringing eligible parts of the journey online.",
              },
              {
                title: "Guided",
                text: "Customers are taken through the appropriate stages instead of figuring out the process alone.",
              },
              {
                title: "Trackable",
                text: "A digital request can provide customers with clearer visibility into its progress.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card"
                style={{
                  padding: "26px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "19px",
                    color: "var(--primary)",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: "10px 0 0",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    fontSize: "14px",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section
        id="how-it-works"
        style={{
          padding: "75px 0",
        }}
      >
        <div className="app-container">
          <div style={{ maxWidth: "720px" }}>
            <p
              style={{
                margin: 0,
                color: "var(--accent)",
                fontWeight: 800,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              How It Works
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                fontSize: "36px",
                color: "var(--primary)",
              }}
            >
              A guided journey from physical SIM to eSIM
            </h2>

            <p
              style={{
                marginTop: "15px",
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              The public website gives you the idea. The detailed
              requirements and request process become available
              after you create an account.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, minmax(0, 1fr))",
              gap: "16px",
              marginTop: "42px",
            }}
          >
            {[
              [
                "01",
                "Create your account",
                "Begin your SIMe journey securely.",
              ],
              [
                "02",
                "Provide required information",
                "Complete the information and verification steps applicable to your request.",
              ],
              [
                "03",
                "Network processing",
                "The request moves through the applicable authorized network process.",
              ],
              [
                "04",
                "eSIM installation",
                "When authorized and ready, the customer can follow the provided activation instructions.",
              ],
            ].map(([number, title, text]) => (
              <div
                key={number}
                style={{
                  padding: "24px",
                  borderRadius: "14px",
                  background: "white",
                  border: "1px solid var(--border)",
                  boxShadow:
                    "0 4px 18px rgba(16,24,40,.04)",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    width: "42px",
                    height: "42px",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    background: "var(--primary)",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: 800,
                  }}
                >
                  {number}
                </span>

                <h3
                  style={{
                    margin: "18px 0 8px",
                    color: "var(--primary)",
                    fontSize: "18px",
                  }}
                >
                  {title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "var(--muted)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "24px",
              padding: "18px 20px",
              borderRadius: "12px",
              background: "var(--primary-light)",
              border: "1px solid #d7e5fb",
              color: "var(--primary)",
              fontSize: "13px",
              lineHeight: 1.7,
            }}
          >
            <strong>Important:</strong> Identity verification,
            subscriber authorization and carrier-side processing
            remain subject to the requirements of the relevant
            mobile network and authorized service providers.
          </div>
        </div>
      </section>

     
      <section
        id="networks"
        style={{
          padding: "75px 0",
          background: "white",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="app-container">
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                margin: 0,
                color: "var(--accent)",
                fontWeight: 800,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              V1
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                fontSize: "36px",
                color: "var(--primary)",
              }}
            >
              Supported Networks
            </h2>

            <p
              style={{
                maxWidth: "650px",
                margin: "15px auto 0",
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              These networks are represented in the current SIMe
              V1 prototype.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, minmax(0, 1fr))",
              gap: "16px",
              marginTop: "38px",
            }}
          >
            {["MTN", "Airtel", "Glo", "T2"].map(
              (network) => (
                <div
                  key={network}
                  className="card"
                  style={{
                    minHeight: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "var(--primary)",
                  }}
                >
                  {network}
                </div>
              )
            )}
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: "18px",
              fontSize: "12px",
              color: "var(--muted)",
            }}
          >
            Availability and actual conversion processing remain
            subject to the relevant operator's requirements and
            authorization.
          </p>
        </div>
      </section>

      
      <section
        style={{
          padding: "75px 0",
          background:
            "linear-gradient(135deg, #eef5ff 0%, #f7f9fc 100%)",
        }}
      >
        <div className="app-container">
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "var(--accent)",
                fontWeight: 800,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              The Bigger Picture
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                fontSize: "36px",
                color: "var(--primary)",
              }}
            >
              What SIMe is trying to change
            </h2>

            <p
              style={{
                marginTop: "18px",
                color: "var(--muted)",
                lineHeight: 1.8,
                fontSize: "16px",
              }}
            >
              SIMe is being designed around a simple idea:
              where a process can be securely verified and
              authorized digitally, the customer should not
              necessarily have to make a physical trip just to
              move the process forward.
            </p>
          </div>

          <div
            style={{
              maxWidth: "900px",
              margin: "42px auto 0",
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "18px",
            }}
          >
            {[
              ["Customer", "Starts and follows the request remotely."],
              ["SIMe", "Organizes the customer-facing digital journey."],
              ["Network", "Performs the authorized carrier-side operations."],
            ].map(([title, text]) => (
              <div
                key={title}
                style={{
                  padding: "24px",
                  borderRadius: "14px",
                  background: "white",
                  border: "1px solid var(--border)",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "var(--primary)",
                    fontSize: "18px",
                  }}
                >
                  {title}
                </h3>

                <p
                  style={{
                    margin: "10px 0 0",
                    color: "var(--muted)",
                    fontSize: "13px",
                    lineHeight: 1.7,
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section
        style={{
          padding: "70px 0",
          background: "var(--primary)",
          color: "white",
        }}
      >
        <div
          className="app-container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                color: "#8fe8e8",
                fontWeight: 800,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Security
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                fontSize: "36px",
              }}
            >
              Built with sensitive information in mind.
            </h2>

            <p
              style={{
                marginTop: "18px",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8,
              }}
            >
              Identity and subscriber information must be handled
              responsibly. SIMe is designed so that sensitive
              information is collected inside the authenticated
              conversion journey rather than exposed on the public
              website.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            {[
              "Never request a SIM PIN.",
              "Never request a PUK.",
              "Never request a bank PIN.",
              "Never request a banking password.",
            ].map((item) => (
              <div
                key={item}
                style={{
                  padding: "17px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.08)",
                  border:
                    "1px solid rgba(255,255,255,0.12)",
                  fontSize: "14px",
                }}
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section style={{ padding: "65px 0" }}>
        <div className="app-container">
          <div
            style={{
              padding: "28px",
              borderRadius: "16px",
              background: "#fffaeb",
              border: "1px solid #fedf89",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#7a2e0b",
                fontSize: "22px",
              }}
            >
              About the SIMe V1 prototype
            </h2>

            <p
              style={{
                margin: "12px 0 0",
                color: "#93370d",
                lineHeight: 1.7,
                fontSize: "14px",
              }}
            >
              SIMe V1 is a prototype used to demonstrate the
              customer journey and platform architecture. Carrier
              authorization, identity verification, provisioning
              and activation shown in this version are simulated.
              The prototype does not independently activate a
              carrier eSIM profile or bypass operator or regulatory
              requirements.
            </p>
          </div>
        </div>
      </section>

      <section
        id="faq"
        style={{
          padding: "70px 0",
          background: "white",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="app-container">
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                margin: 0,
                color: "var(--accent)",
                fontWeight: 800,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              FAQ
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                fontSize: "36px",
                color: "var(--primary)",
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div
            style={{
              maxWidth: "800px",
              margin: "40px auto 0",
              display: "grid",
              gap: "12px",
            }}
          >
            {[
              [
                "What is SIMe?",
                "SIMe is a digital platform being developed to guide and manage the customer-facing journey for physical SIM to eSIM conversion.",
              ],
              [
                "Why does SIMe exist?",
                "The goal is to reduce unnecessary physical visits by moving eligible parts of the conversion journey into a secure digital process.",
              ],
              [
                "Will I need identity verification?",
                "Identity verification may be required as part of an authorized conversion process. The exact requirements depend on the applicable network and verification process.",
              ],
              [
                "What about NIN?",
                "Where NIN-based identity verification is required, it can form part of the authorized verification process. SIMe will not bypass identity or subscriber-verification requirements.",
              ],
              [
                "Does SIMe replace my mobile network?",
                "No. SIMe is not a mobile network. The relevant network remains responsible for authorized carrier-side processing.",
              ],
              [
                "Will I receive a QR code?",
                "Where the authorized eSIM provisioning process uses a QR code or another activation method, the customer can receive the applicable activation instructions through the authorized process.",
              ],
              [
                "Does SIMe currently activate a real eSIM?",
                "Not in V1. The carrier-side verification, provisioning and activation portions of the prototype are simulated.",
              ],
              [
                "Which networks are represented in V1?",
                "MTN, Airtel, Glo and T2 are represented in the current V1 prototype.",
              ],
              [
                "Do I need an account before starting?",
                "Yes. The actual conversion workflow and request-specific information are available after account creation and sign-in.",
              ],
            ].map(([question, answer]) => (
              <details
                key={question}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "18px 20px",
                  background: "var(--background)",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: 700,
                    color: "var(--primary)",
                  }}
                >
                  {question}
                </summary>

                <p
                  style={{
                    margin: "12px 0 0",
                    color: "var(--muted)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}
                >
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "75px 0",
          background:
            "linear-gradient(135deg, var(--primary), #0b2854)",
          color: "white",
          textAlign: "center",
        }}
      >
        <div
          className="app-container"
          style={{ maxWidth: "750px" }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "38px",
            }}
          >
            The future of the journey starts here.
          </h2>

          <p
            style={{
              margin: "15px auto 0",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
            }}
          >
            Create an account to explore the SIMe V1 conversion
            experience.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "28px",
            }}
          >
            <Link
              href="/signup"
              className="btn"
              style={{
                background: "white",
                color: "var(--primary)",
              }}
            >
              Create Account →
            </Link>

            <Link
              href="/login"
              className="btn"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border:
                  "1px solid rgba(255,255,255,0.25)",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      
      <footer
        style={{
          background: "#071a36",
          color: "white",
          padding: "45px 0 25px",
        }}
      >
        <div className="app-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1fr",
              gap: "45px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                }}
              >
                SIMe
              </div>

              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
                  fontSize: "13px",
                  maxWidth: "400px",
                }}
              >
                A V1 prototype exploring a secure, guided and more
                remote approach to the physical SIM to eSIM
                conversion journey.
              </p>
            </div>

            <div>
              <h4 style={{ margin: "0 0 15px" }}>
                Platform
              </h4>

              <div
                style={{
                  display: "grid",
                  gap: "10px",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                <a href="#how-it-works">How It Works</a>
                <a href="#networks">Networks</a>
                <a href="#faq">FAQ</a>
                <Link href="/signup">Create Account</Link>
                <Link href="/login">Login</Link>
              </div>
            </div>

            <div>
              <h4 style={{ margin: "0 0 15px" }}>
                Information
              </h4>

              <div
                style={{
                  display: "grid",
                  gap: "10px",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Use</a>
                <a href="#">Cookie Policy</a>
                <a href="#">Help & Support</a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div
            style={{
              marginTop: "40px",
              paddingTop: "20px",
              borderTop:
                "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
              flexWrap: "wrap",
              color: "rgba(255,255,255,0.45)",
              fontSize: "11px",
            }}
          >
            <span>
              © 2026 SIMe. V1 Prototype.
            </span>

            <span>
              SIMe does not independently activate carrier
              eSIM profiles.
            </span>
          </div>

         
          <div
            style={{
              marginTop: "18px",
              paddingTop: "16px",
              borderTop:
                "1px solid rgba(255,255,255,0.06)",
              textAlign: "center",
              color: "rgba(255,255,255,0.4)",
              fontSize: "11px",
            }}
          >
            Creative @Joel Benson • Dev @Simon Chimezie •
            Prototype @SIMe
          </div>
        </div>
      </footer>
    </main>
  );
}