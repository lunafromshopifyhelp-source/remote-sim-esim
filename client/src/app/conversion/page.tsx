"use client";

import { useRouter } from "next/navigation";

const networks = [
  {
    name: "MTN",
    description: "MTN Nigeria",
    logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/MTN_Logo.svg",
  },
  {
    name: "Airtel",
    description: "Airtel Nigeria",
    logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Airtel_logo.svg",
  },
  {
    name: "Glo",
    description: "Globacom Nigeria",
    logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/GloLogo.png",
  },
  {
  name: "T2",
  description: "T2 Nigeria",
  logo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAABAwIEBQAHBv/EAEEQAAEDAgQCBQkGBAUFAAAAAAEAAgMEEQUSITFBUQYTYXGhFCIycoGRscHRI0JSU3OSBzNi4RY0NoOyFSRDgpP/xAAbAQACAwEBAQAAAAAAAAAAAAABBAACAwUGB//EADERAAICAQMDBAADBwUAAAAAAAABAgMRBBIhEzEyBSJBURVhcRQzNEJSkbEjJIHB4f/aAAwDAQACEQMRAD8AXVzVIqJj10ts52kPNeZ6+ZPDPoVdUNi4EeUz/nzfvP1U3vBfpV/R3lNR+fL+8qOUidKH0WRPK9gIlkBP9RSe+UZdy3Sh9FY1NQCR18un9Z+qcjZJ/JXow+h8U02S5mkN+bylrbJZ7hVUPoVJUz5zaeUDseVvXKSj3A6ofQGz1JNhPL+8oytaIqYfQwPqeNRL+931WT1LD0YfQC+q3E8p/wBw/VFaknRh9CzUVANjPMP/AHK1VjfZgdMPodDUTObrNJp/UUrY5J9yyqh9EX1FR1lhNLblnK1jZLZ3B0ofQyWomawkSyX9YrGuUnLuTpQ+hDZ6gmwnl/8Aofqm5WNLOQdGH0SMlUP/ADyn/cP1VFqPzD0YfRA1FQN55f3n6q6m32ZOjD6GwTzuuTPIR65WF1ks9yKqH0a2FzymB32r9H/iPILanc4iWohDf2MueRpqZW8Q93xKWtrakx6l+xCnxX1bohC1rhl8CSCDYiyZUsrIBsDtx7lhdHnIUCZtiCOKNUskYyP0AFjPyCVzqSm/5UVLIGRnZxKUbcpBQozngNFsqPsmQifmNEHS/gmRhyyN3BCyy4vkJGNmW6M5biEHH7YWWqWK2VJz/wAv2rOnG4LENdlN0zKKYEObNcgHRLyqwHIZG5mkjdVhLa+Qgg9E96td3AjVwo/YyfqfIJzT+AhqfMyKv/NTfqO+KkvJ5GafBAjkto7bmlp1JrKNcjXsD29vNZwm4MsV9WO03CY4kipJ8hcAChGvaQbEbsHYl7FiRYQ8WcQmY8xKssMIexKyW1liBhHA29i0Vz+QYAIf6ket+RMDGMyi11lKe4IZCQwlqEFlkKwNjdOOPGCpYtnZ3hKcxkWK7m5TYpuMtyACys+wCyz0Qkp9yyIwn0h2q9qxgCNbCx9g/wDUPwCb0z9ghqfMyath8pmdwzu+Ko7E5Mbq8EIRfbJcZG/KQ07HwWNtfGQ5GSRh47QsoTcSMQdDqm1zyAZA6xy89VjbHPIUTmjzat3Wddm3hkYjVp00KZxGQCYmf2KjqiTIeudyCHRiHJEyOPFHpRRMjzrH7EuuJhKvJOlRkcmTQ7LGdeeSDSGv4ArD3RZY4RsGuVF2SZCMsgDS1puSrV15eWBkIDZ+vJaWrKAjZwzSB3r/ACCFbe0S1HmUJjmnm02kcPFZ2xcZsaq/dopvFnkDa6Yg/bkuNYxpYNNSsJTe7AQRPto5WshnlEDIzMLjdUhNp4ZMCdQddE0sNAGsltofesJ1Z5QcjLNcNrrLMohImJvb71bqyJgHUtGxKt1mDAuRmUhaQnvAyfXDJax2Vel7skyJAJ2Wu5IhLKeR9yG+JAat5go4UiHFzjuSptRAKxDlCG1gp/7V99ftD8AtYRWBHUeZSqAGzy8PPcfFc+eZzHKvBFN5u4lMRWIlixH6ASs/IsVzqfam14pFRjJeDtljZV8oORj2NfvoVnGbiQruaWnUg9yajJSRVtIAPIo7UwkhI4cSqdOJA9a/8Xgp04kyGNktRK2ONrnyHZrRcq8YfEUVnNQWZPBrQ9HMVcM4w+c97LKOjUS7RFJeo6WPeZWq6SpoNKymlh5Z22WE9Pau6N6tTTb4STKxlbxuqdKRuS8x/b3quJRIJfGBq0my3hbnhkYtbAOQIbOENIpna7v+QV4W8CWo8zMrHE1MoJ0Ejh4qrglJ4Gan7ELY3M4DgqWS2o0Q95ysNvYlordIsVk3wVC1rnODWglxNgBxRSyCTwmz1Do50OpKGnZNiQbUVJAJa70GdgHzXXo0MILdNZZ4/XerW3Sca+EbPl+BxuEHlFE0g2yXamM0R44Eelqmt2GU8W6KYTi0JdHEyCVw82aAAf2KrZpa7Fxwb6f1LUaaXfK+meZ4nglbhuI+QyROkkJ+yLAT1g4ELkWaecJ7cHq6NfTbV1U8f9H0uA9AZpg2fF5DC06iCO2b2ngnKdA3zYcrV+uxi9tCy/s+0hpsJwCluxkFLGN3O3Pt3Ke21VLng4Mp6jVT7tszJeneBRuyieWS3FkRt4rJ62lfI3H0fVyWcGjQ4phXSGneyB8c7LWfG9uoHaCtoWVXLjkVt0+o0kk5Jo866a9Hm4LWskpgTSVBOS+uQjdq5Or06qeY9meo9J1z1MNk+6PnASDokpRTOuWI3B7bn2hKzjtYe4h7crrJmEsxAGJuZ4Qse2JDawz+Q634vkFSt+0T1HmZlRFeplJOnWOPijZdy8DFK9iBdrBsAFhzNmwh7855BNVw2rkDJQEXN9+Cpcn8ERewsxRYvRTSNHVtmbmv3o6W1RsjuFtZCUqJqPfB6r0rgq6rAKqLDievcARl3cLgkDvF16XUKUqnsfJ4nQyhXqIu3sePOpKljyx1NM1w0yujN/guE4Sz2PcRvpcU1JYPuf4f0+PU0+WaGRmHOGoqLix5tBXS0cbovnsed9Xs0k17PL8j7ubqYmmebI0RtJMjreaOOvBdDjuzz8dz9q+T4vHOnkTXGnwZglPGod6I7hxXN1WvUE1Dlne0fokp++7hfR8XilRXVbPKqwzyNc63WPvl7hwXIzbY908noKY6al7IYM5rS42A9itJ7VyNZPqegVJUux+CaAO6qMHrncLWOnvsmNA7J3px7HI9ZnUtO4y7/B9N/EoxHB4I5LZ3TXZz2N096pNKpfZyPQlL9pbXbB5i9uQ68dlyIT3cnriUB84hUtXtCiU42KrS/gjBB6fsVrfEBsYZ/Id6/wAghWvaJajzMyd7nVUzW6APcL+1GytRbyNUv2IGQEedr3rDc/g1A6JrttFeNjXcGBBGVxHJMJqSAPieHtyu3txS04beSdz7LAOmxoomUuKMfJE2wbM3UjvHFdfR+ocbbDzuv9Fc5OdP9j6IdMsBcAfKtTw6s3+C6D1dKWWzlfhWszjaUMQ6e0kQLaCnknfwc/zWpSz1WtcQWRun0G6XNjwfRhzcTwTMWgipptvWb/ddCLVtOftHJ2vT6jH9L/wzxzCpIaXEGOrKcTxRu8+Im2ZedlKNcluWUj3VkZ20YhLDa7nrWG4pg+LUoigfAW21gkABHZlXepupujiP9jxd+m1WnnmSf6/+g/wtgXWdYMNgB7AQPdsrS0tMuXFE/EdWuN7JVmI4RgNNZ8kFO0DSKO2Y9zQpvpojxwVhRqdXPhN/meZdIukE2OYiJSCynZdsUd9geJ7VxNZd1+fo9d6foY6WGP5n3Muf0NeaRqfODoi4vTC2t8QIZUeiO9ZU9wsXEbPGq1tXADaw0/YO9f5BZ1P2id/mZrreV1H6jviVbUvkZp8EJmJuAhSljk0Z0BOoQuilyiI6cWcDzCNPYjIMJa64WsllYAPID2JSL2ssVtinO8SuBwmFtQbpd1fQT2HojIZujWHuP5IHu0+S9PpP3EV+R4H1BY1U/wBTyptFPVY9NR0rM0rppA0XtxK4dtTsm4x75PYx1EKdLGyzthH0Y/h/iUrGvkqqaJ42AzHxsmaPTLYrOcHMs9d0/ZRbMnFsPxrA5GsraiYxPNmyMmcWn6LLVVX1rlsc0mo0eq5hFZ/RGTMHSecSXHmSufCznk6ShFdlgXCzziTwV7Z8YRZBnOllWmPyRiUyAJPN3vVVFZ4IFjS46ISko9yG1ht+od63yCyg1gTv8zKqHllXMRxe74lb2xUm0MU+CFPcXm/FCMVFGg6JmXU7lLWSyEVK679Ngt61iJGQWgCxCbt7krasSLCpGHPoCtITW3kAMjuRV96Bg9g6D/6Xob/hd/yK9DpHmpHhPU/4qf6nm3/UZMJ6TVFZCxr3xzyWa7Y3JXJ6rqtcker/AGVanSRrbwsL/BpP6aY06XrhNEBv1YjGU9nNZfiN+/Iv+C6WNbXz9n2XSvq6rohUy1DMpMLZA07tdoR4rtalxlQ3L6PP6DdXrYxg/nB5VEXZfOC8tZjPB7lImswinROLibjVbwtSWMAIiE8SFfromCbYQN9VnK1smCZc1g+SooykQ0cJfnp3m33/AJBO1VLbyI6jzM6piLqmY5hq9x27VjO7ljVS9iItja3XfvWLsbNASy6Wbvz5K9dWeWQRudEx2QBscPFx9iXnb9FhwDRoLBYvL5IRdI1psb3V4wcgA61nPwR6UkTJ650L/wBM0J4FpPiV6fRLFETwfqf8VP8AU8uxLK7E6rQEmd9v3Febt3OySX2e007Soi39L/B9X0T6IvdIytxNhZG3zo4Tu7tPYunotC89Sw4fqXq0dvRpff5I9OukcVTfDKSRpia68zwdCR90Ieoavf8A6UCejaHb/uLP+D4p0rRtqVy41N9z0jYvrHXvf2LXpR7AySEx5BVdK+CZD1x4AIKkOQAySbWA5qOMI9yEXsc3fVaQnF9gYNbBf8q/9Q/AJqte0R1HmZ9VK4VMoH43fFKzpW5jVXghV5Hjs7FVKEDUWtfjKAPhZxPFLWTzwgglkt5rfejXVnlkyGC+pOt1LUuyILm1eVpVxEgepdlup1UmDB6D0f6YYTh+B0tJUPlbNDHlcBGTqu3RrKo1pNnlNZ6XqLNRKcVwz5PAsRpKbpG2urWk0/WPf6NyL3tp7UhTZBW7n2O1q9PbZpOnX3wj77/HWB/nTd3VFdT9tp7JnmvwfV/0iKnpbgDqWXqo87yw5QYNzbRLz1+mSf2b1+la1SWeF+p5e7c33XMym9yPXRylgfHG0tBIvdK2TeS2BcrQ11hst655QGQViFiHVgStudwUGT0DdCCeQs0MFsKZ/wCofgF06/E5+o8zOmZmrJr7Z3fEpa6e1sap8EFzhG35JSMXJmwlgzv170zN7Y4ANldlb2lL1x3MJXunOxVlmMZWgJOfukEQTd2btTMViOADutGW/HksHU8hEE3cTzTKWEDIEcsHc5QI2F9jlKwtj8hJTMuMw3CpVPHBBTXuaLAraVabyBMiTc3KulhcEJ9U4NufcqdVZwHBFri06FFxUgBc5zt1FGMSGvhLclM7tffwCtGx4E9QveVJhaeX13fFLXvM2M0+CKb3ZnXW8IqKLjIB6RWVzCgTm7h3K1K4yRkYm5nW5K1ksIA2Z2VvaVhVHcwsrpp8AORRBscYc25KwnY4vAcBMI4OKqriYIPjLf7LVWJkwQGiv3QCzE/OLHcJWyG15QRUrMpuNita554Ixa2YCxFJmFjuEpZXhhISx2IIWldmeGQ6Ft3XKNs/gBsYbbqHev8AIKVR9onqH7yhVfz5vXd8VlPzYzV+7RRTZckx7mejxVZRUiAJLiSd0UlEhYiblaL78UpZLLwEQ92Z3YmK47YkyPiYA2/NL2TeSEZmjKSrVTeSCmvc0WaUw4JgyESvHL3KjqTDkayQO02KwlW48kIys4j3LSuz4ZMCmuLXXHBayjuQCw6z2d6VTcZBKx03TieUA4aG4UayiFljg8a7pScHEKJWDGlUy5PkjL+DuvTvv+YfgF1KYR2IQ1HmVKjWeb13fErn2cWMbp/dooJpdi5yJBsDL+cduCwtnjgKRKZ9m5RuqVQzyRiE0AayUAWIS8689ggklDxYK1de3uTItbZQDkMohymF2IWYnZm/FKWR2sKEStyuI56piEsxANgddpHJY3LnIULmFnrWp5iBkFrgg6BupcsLpfBEhheM2W+qx2PGQmlhlhC/Qav+QW9U2oiWoXvKNUcsspJ++74rJ+6bYzV4Io8U0uxbJyISxCbsASlixIJ3VNvc6+1DqSCcYW228UVZIghwyutyTMJbkUJRsz7+iqWWY4Ch3mM5JfMpFggtPIqe5EIPiG7dCrwtaAwQXD3C2ytc00AE+4Ro7EBTnzyEbvEiJTj0VWkLErfOAFoDIwDkEm/dIKKxN3F3EptLCwBmxg2tK/8AUPwC2ritolqH7xVTSMdUTXc/0zy59yrsSkzSqyWxCvIovxO8Popg06kjvIoubvD6KE6jOFHHuHPB7CENiaBvkE0jfxye9DpxDvkFlO1v3nHvKxtikTewPpIyb3d4K1S9pHZILKdjWgAnwWVi9wd7ImkY8nM5/gma4LBVzYDRRj7z/eFfYgb2TbC0C13JS6CRdTYeoZ26qmOETeyMlJG5+rneCZqSwV6kjmUkbXaF23YhavaFTYZKVjsoLnboUpZJvYG0UQI1d4LSa4J1JEjTtc0gudulq0skdkhZooxrmd4fRNg6kjWwelYKZ2rvT7OQW0FwIamb3n//2Q==",
},
];

export default function ConversionPage() {
  const router = useRouter();

  const handleSelectNetwork = (network: string) => {
    sessionStorage.setItem("selectedCarrier", network);
    router.push("/conversion/phone");
  };

  return (
    <main className="page">
      <div className="app-container">
        <div className="page-content">
          <div style={{ maxWidth: "780px", margin: "0 auto" }}>

            {/* Header */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "40px",
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
                Step 1 of 7
              </div>

              <h1 className="page-title">
                Choose your network
              </h1>

              <p className="page-subtitle">
                Select the mobile network currently associated with your SIM.
              </p>
            </div>

            {/* Network cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "18px",
              }}
            >
              {networks.map((network) => (
                <button
                  key={network.name}
                  onClick={() => handleSelectNetwork(network.name)}
                  style={{
                    background: "white",
                    border: "1px solid var(--border)",
                    borderRadius: "18px",
                    padding: "28px 24px",
                    textAlign: "left",
                    cursor: "pointer",
                    boxShadow:
                      "0 4px 18px rgba(16, 24, 40, 0.04)",
                    transition:
                      "transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-3px)";
                    e.currentTarget.style.borderColor =
                      "var(--primary)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px rgba(16, 24, 40, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.borderColor =
                      "var(--border)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 18px rgba(16, 24, 40, 0.04)";
                  }}
                >
                  {/* Logo */}
                  <div
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "16px",
                      background: "#f8fafc",
                      border: "1px solid #eef2f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={network.logo}
                      alt={`${network.name} logo`}
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* Name */}
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "19px",
                      fontWeight: 700,
                      color: "#101828",
                    }}
                  >
                    {network.name}
                  </h2>

                  {/* Description */}
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: "14px",
                      color: "var(--muted)",
                    }}
                  >
                    {network.description}
                  </p>

                  {/* Action */}
                  <div
                    style={{
                      marginTop: "22px",
                      color: "var(--primary)",
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    Select network →
                  </div>
                </button>
              ))}
            </div>

            {/* Information */}
            <div
              className="card"
              style={{
                marginTop: "28px",
                padding: "20px",
                background: "var(--accent-light)",
                borderColor: "#cceeee",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "#344054",
                }}
              >
                <strong>Important:</strong> Selecting a network only
                identifies the operator associated with your existing SIM.
                It does not authorize or perform a real SIM replacement.
              </p>
            </div>

            {/* Back */}
            <div
              style={{
                marginTop: "24px",
                textAlign: "center",
              }}
            >
              <button
                onClick={() => router.push("/dashboard")}
                className="btn btn-secondary"
              >
                ← Back to Dashboard
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}