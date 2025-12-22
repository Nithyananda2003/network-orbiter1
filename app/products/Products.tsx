"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Wifi, Radio, Settings, Zap, ArrowDown, Check } from "lucide-react"

// Section header images (served from /public/assets)
const wirelessRadioImg = "/assets/wireless-radio.jpg"
const antennaDishImg = "/assets/antenna-dish.jpg"
const networkSwitchImg = "/assets/network-switch.jpg"
const powerSolutionImg = "/assets/power-solution.jpg"

// ============== DATA ==============
const sections = [
  { id: "wireless-systems", label: "Wireless Systems", icon: Wifi, number: "1.0" },
  { id: "antennas", label: "Antennas", icon: Radio, number: "2.0" },
  { id: "network-switches", label: "Network Switches", icon: Settings, number: "3.0" },
  { id: "power-solutions", label: "Power Solutions", icon: Zap, number: "4.0" },
]

// ============== COMPONENTS ==============

// Section Header with optional image
const SectionHeader: React.FC<{ number: string; title: string; description?: string; image?: string }> = ({
  number,
  title,
  description,
  image,
}) => (
  <div className="mb-10">
    {image && (
      <div className="relative mb-8 rounded-2xl overflow-hidden gradient-border">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 md:h-64 object-cover" />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="flex items-center gap-4">
            <span
              className="flex items-center justify-center w-12 h-12 rounded-xl backdrop-blur-sm border font-bold text-lg"
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.15)",
                borderColor: "rgba(34, 197, 94, 0.3)",
                color: "#22c55e",
              }}
            >
              {number}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              <span style={{ color: "#22c55e", textShadow: "0 0 10px rgba(34, 197, 94, 0.2)" }}>{title}</span>
            </h2>
          </div>
        </div>
      </div>
    )}

    {!image && (
      <div className="flex items-center gap-4 mb-4">
        <span
          className="flex items-center justify-center w-12 h-12 rounded-xl border font-bold text-lg"
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            borderColor: "rgba(34, 197, 94, 0.2)",
            color: "#22c55e",
          }}
        >
          {number}
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          <span style={{ color: "#22c55e", textShadow: "0 0 10px rgba(34, 197, 94, 0.2)" }}>{title}</span>
        </h2>
      </div>
    )}

    {description && (
      <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">{description}</p>
    )}
  </div>
)

// Subsection Title
const SubsectionTitle: React.FC<{ number: string; title: string; description?: string }> = ({
  number,
  title,
  description,
}) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-sm font-mono font-semibold" style={{ color: "#22c55e" }}>
        {number}
      </span>
      <h3 className="text-xl md:text-2xl font-semibold text-foreground">
        <span style={{ color: "#22c55e", textShadow: "0 0 8px rgba(34, 197, 94, 0.15)" }}>{title}</span>
      </h3>
    </div>
    {description && (
      <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">{description}</p>
    )}
    <div
      className="mt-3 h-px w-full"
      style={{ background: "linear-gradient(to right, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.1), transparent)" }}
    />
  </div>
)

// Product Card
const ProductCard: React.FC<{
  title: string
  subtitle?: string
  description: string
  features?: string[]
  icon?: "wireless" | "antenna" | "switch" | "power"
  highlight?: string
}> = ({ title, subtitle, description, features, icon = "wireless", highlight }) => {
  const iconMap = { wireless: Wifi, antenna: Radio, switch: Settings, power: Zap }
  const IconComponent = iconMap[icon]

  return (
    <div className="group relative gradient-border rounded-xl p-6 bg-card hover:bg-secondary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to bottom right, rgba(34, 197, 94, 0.05), transparent)" }}
      />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#22c55e" }}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          {highlight && (
            <span
              className="px-3 py-1 text-xs font-medium rounded-full border"
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                color: "#22c55e",
                borderColor: "rgba(34, 197, 94, 0.2)",
              }}
            >
              {highlight}
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
        {features && features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="w-1.5 h-1.5 mt-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#22c55e" }} />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

// Spec Table
const SpecTable: React.FC<{
  title: string
  headers: string[]
  rows: (string | React.ReactNode)[][]
  compact?: boolean
}> = ({ title, headers, rows, compact = false }) => (
  <div className="gradient-border rounded-xl overflow-hidden bg-card">
    <div className="px-6 py-4 border-b border-border" style={{ backgroundColor: "rgba(34, 197, 94, 0.05)" }}>
      <h4 className="text-lg font-semibold text-foreground">
        <span style={{ color: "#22c55e", textShadow: "0 0 8px rgba(34, 197, 94, 0.15)" }}>{title}</span>
      </h4>
    </div>
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border" style={{ backgroundColor: "rgba(34, 197, 94, 0.08)" }}>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`text-left text-xs font-semibold uppercase tracking-wider text-foreground/80 ${compact ? "px-4 py-3" : "px-6 py-4"}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{ animationDelay: `${rowIndex * 35}ms` }}
              className="group border-b border-border/50 last:border-0"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`text-sm text-foreground/90 transition-colors duration-200 ${compact ? "px-4 py-3" : "px-6 py-4"} ${cellIndex === 0 ? "font-medium" : ""} group-hover:bg-primary/5`}
                  style={cellIndex === 0 ? { color: "#22c55e" } : {}}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

// Feature List
const FeatureList: React.FC<{ title: string; features: string[]; columns?: 1 | 2 | 3 }> = ({
  title,
  features,
  columns = 2,
}) => {
  const gridCols = { 1: "grid-cols-1", 2: "grid-cols-1 md:grid-cols-2", 3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" }

  return (
    <div className="gradient-border rounded-xl p-6 bg-card">
      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-1 h-6 rounded-full" style={{ backgroundColor: "#22c55e" }} />
        {title}
      </h4>
      <ul className={`grid ${gridCols[columns]} gap-3`}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-foreground/80">
            <span
              className="flex items-center justify-center w-5 h-5 mt-0.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#22c55e" }}
            >
              <Check className="w-3 h-3" />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Navigation
const ProductsNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState("wireless-systems")

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((s) => ({ id: s.id, element: document.getElementById(s.id) }))
      for (const section of sectionElements.reverse()) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        scrollToSection(hash);
      }
    };

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Call on initial load

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("hashchange", handleHashChange);
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="font-semibold" style={{ color: "#22c55e" }}>
            Products
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin">
            {sections.map((section) => {
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${isActive ? "" : "text-muted-foreground border-border hover:text-foreground hover:bg-secondary/40"
                    }`}
                  style={
                    isActive
                      ? {
                        backgroundColor: "rgba(34, 197, 94, 0.12)",
                        color: "#22c55e",
                        borderColor: "rgba(34, 197, 94, 0.3)",
                      }
                      : {}
                  }
                >
                  {section.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

// Hero
const ProductsHero: React.FC = () => (
  <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
    <div
      className="absolute inset-0"
      style={{ background: "radial-gradient(ellipse at top, rgba(34, 197, 94, 0.12) 0%, transparent 50%)" }}
    />
    <div
      className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
      style={{ backgroundColor: "rgba(34, 197, 94, 0.08)" }}
    />
    <div
      className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse-glow"
      style={{ backgroundColor: "rgba(20, 184, 166, 0.08)", animationDelay: "1.5s" }}
    />

    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex items-center justify-center gap-2 mb-8 text-sm text-muted-foreground">
        <span>Home</span>
        <span>/</span>
        <span className="font-medium" style={{ color: "#22c55e" }}>
          Products
        </span>
      </div>
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-2xl blur-xl animate-pulse-glow"
            style={{ backgroundColor: "rgba(34, 197, 94, 0.15)" }}
          />
          <div
            className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(to bottom right, #22c55e, #14b8a6)" }}
          >
            <Wifi className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
        <span className="text-foreground">Network Orbiter</span>
        <br />
        <span style={{ color: "#22c55e", textShadow: "0 0 12px rgba(34, 197, 94, 0.2)" }}>Product Portfolio</span>
      </h1>
      <p
        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        High-performance wireless hardware and networking solutions for WISPs, carriers, and enterprise networks.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        {[
          { value: "2.1", unit: "Gbps", label: "Max Throughput" },
          { value: "200+", unit: "km", label: "Range" },
          { value: "800", unit: "Mbps", label: "PTMP Capacity" },
          { value: "370", unit: "W", label: "PoE Budget" },
        ].map((stat) => (
          <div key={stat.label} className="gradient-border rounded-xl p-4 bg-card/50">
            <div className="text-2xl sm:text-3xl font-bold" style={{ color: "#22c55e" }}>
              {stat.value}
              <span className="text-lg text-muted-foreground ml-1">{stat.unit}</span>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground mx-auto" />
      </div>
    </div>
  </section>
)

// ============== SECTIONS ==============

const WirelessSystemsSection: React.FC = () => (
  <section id="wireless-systems" className="py-16 border-b border-border">
    <SectionHeader
      number="1.0"
      title="High-Performance Wireless Systems"
      description="Form the backbone for everything from last-mile subscriber access to long-range backhauling between network nodes."
      image={wirelessRadioImg}
    />

    <div id="orbiter-xb-series" className="mb-16">
      <SubsectionTitle
        number="1.1"
        title="ORBITER XB Series"
        description="Next-generation point-to-point solutions with throughput up to 2.1 Gbps."
      />
      <a className="px-2 py-2 bg-emerald-500" href="https://drive.google.com/file/d/11lI6RRvemWs1llbbUtaeTOPJZ42A8L3F/view?usp=drive_link">Download</a>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <ProductCard
          icon="wireless"
          title="2.1 Gbps Throughput"
          description="Groundbreaking wireless performance in 160 MHz channels"
          highlight="160 MHz"
        />
        <ProductCard
          icon="wireless"
          title="Integrated Router"
          description="Built-in router eliminates need for separate SOHO equipment"
          highlight="All-in-One"
        />
        <ProductCard
          icon="wireless"
          title="QAM1024 Modulation"
          description="Expanded coding schemes for high-interference environments"
          highlight="Robust"
        />
        <ProductCard
          icon="wireless"
          title="Built-in Security"
          description="Firewall, MAC/IP filtering, and SSH access included"
          highlight="Secure"
        />
      </div>
      <SpecTable
        title="ORBITER XB Series Technical Specifications"
        headers={["Model", "Description", "Distance", "Antenna", "Interfaces", "Dimensions", "Download"]}
        rows={[
          [
            "OXB5-25 / OXB6-25",
            "Integrated antenna STU",
            "15-20 km",
            "25 dBi dual-pol",
            "1x GbE + 1x SFP",
            "350×350×71.5 mm",
            <button
              key="download1"
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://drive.google.com/file/d/1Vvvu12StTN7c2L9atz2tFVGdK2BARnNO/view?usp=drive_link';
                link.download = 'OXB5-25_OXB6-25-specs.pdf'; // Optional: suggest filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download
            </button>,
          ],
          [
            "OXB5-28 / OXB6-28",
            "Integrated antenna STU",
            "25+ km",
            "28 dBi dual-pol",
            "1x GbE + 1x SFP",
            "600×600×68 mm",
            <button
              key="download1"
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://drive.google.com/file/d/1hbIRj6uzBf93Jh_kWzgPopG3fsOpOhNj/view?usp=drive_link';
                link.download = 'OXB5-25_OXB6-25-specs.pdf'; // Optional: suggest filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download
            </button>,
          ],
          [
            "OXB5-E / OXB6-E",
            "External antenna STU",
            "30+ km",
            "2× N-type connectors",
            "1x GbE + 1x SFP",
            "188×190×86 mm",
            <button
              key="download1"
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://drive.google.com/file/d/1BcOJvPoePujFE-R3nwLy-XxrUctZKvYY/view?usp=drive_link';
                link.download = 'OXB5-25_OXB6-25-specs.pdf'; // Optional: suggest filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download
            </button>,
          ],
        ]}
      />

      <div className="mt-6">
        <FeatureList
          title="Advanced Radio & Networking Features"
          features={[
            "SU-MIMO 2x2 with Polling duplex method",
            "Automatic Bitrate Control & Transmit Power Control",
            "Voice/RTP Aware Superpacketing for VoIP",
            "Built-in spectrum analyzer & DFS/Radar detection",
            "Ethernet-over-IP and IP-over-IP tunneling",
            "Full L2 switch and L2/L3 firewall",
          ]}
          columns={2}
        />
      </div>
    </div>

    <div id="orbiter-nxg-series" className="mb-16">
      <SubsectionTitle
        number="1.2"
        title="Orbiter NXG Series"
        description="Flexible devices for PTP and PTMP deployments with up to 800 Mbps aggregate throughput."
      />
      <h4 className="text-lg font-semibold mb-4 mt-8" style={{ color: "#22c55e" }}>
        NXG5 Base Station Sectors
      </h4>
      <SpecTable
        title="Base Station Models"
        headers={["Model", "Throughput", "Antenna", "Distance", "Key Feature", "Download"]}
        rows={[
          [
            "NXG5-bSBS",
            "Up to 800 Mbps",
            "21 dBi, 90×8° (20° Az-steerable)",
            "Up to 30 km",
            "20° Azimuth-steerable beam",
            <button
              key="download1"
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://drive.google.com/file/d/1QbeJ6yzcJcYfuBDrLMs6P5LYm6wKyi94/view?usp=drive_link';
                link.download = 'NXG5-bSBS-specs.pdf'; // Optional: suggest filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download
            </button>,
          ],
          [
            "NXG5-eSBS",
            "Up to 800 Mbps",
            "2× N-type for external antenna",
            "40+ km",
            "External antenna flexibility",
            <button
              key="download2"
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://drive.google.com/file/d/1-qAvmgXdY7KiZt_F2PbU2aDK_9RMu4Vu/view?usp=drive_link';
                link.download = 'NXG5-eSBS-specs.pdf'; // Optional: suggest filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download
            </button>,
          ],
          [
            "NXG5-iSBS",
            "Up to 800 Mbps",
            "16 dBi integrated (90°)",
            "Up to 20 km",
            "Integrated 90° sector antenna",
            <button
              key="download3"
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://drive.google.com/file/d/1lncu6MfTg8gVHJdzxnuKXVExT0ZOjoGx/view?usp=drive_link';
                link.download = 'NXG5-iSBS-specs.pdf'; // Optional: suggest filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download
            </button>,
          ],
        ]}
      />
      <h4 className="text-lg font-semibold mb-4 mt-8" style={{ color: "#22c55e" }}>
        NXG5 & NXG6 Subscriber Terminals
      </h4>
      <SpecTable
        title="Subscriber Terminal Models"
        headers={["Model", "Frequency", "Throughput", "Antenna", "Distance", "Interface", "Download"]}
        rows={[
          ["NXG5-ST18", "5 GHz", "Up to 670 Mbps", "18 dBi", "Up to 10 km", "1x GbE", <button
            key="download4"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/1ONjtlMvnibMnQaI02HX4CUa0U2bBI2z0/view?usp=drive_link';
              link.download = 'NXG5-ST18-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
          ["NXG6-18", "6 GHz", "Up to 670 Mbps", "18 dBi", "Up to 10 km", "1x GbE", <button
            key="download5"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/1xsxhmEvi4yYf4NrZPR1nTrOWGkvhFt5q/view?usp=drive_link';
              link.download = 'NXG6-18-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
          ["NXG5-ST25", "5 GHz", "Up to 670 Mbps", "25 dBi", "Up to 15 km", "1x GbE", <button
            key="download6"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/1ehwy_b_KYIU9bNLaPs9_Jr_QD_Fv8r7-/view?usp=drive_link';
              link.download = 'NXG5-ST25-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
          ["NXG5-ST28", "5 GHz", "Up to 670 Mbps", "28 dBi", "25+ km", "1x GbE", <button
            key="download7"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/15CtneZrvgOuWNDhhEiqh_Ix34FTbmV6n/view?usp=drive_link';
              link.download = 'NXG5-ST28-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
          ["NXG5-STE", "5 GHz", "Up to 670 Mbps", "External", "30+ km", "1x GbE + 2× N-type",
            <button
              key="download8"
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://drive.google.com/file/d/13Ivmd0ENojQP2cAJkwRxyrplIDOzvCqI/view?usp=drive_link';
                link.download = 'NXG5-STE-specs.pdf'; // Optional: suggest filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download
            </button>],
        ]}
      />
    </div>

    <div>
      <SubsectionTitle
        number="1.3"
        title="Orbiter O4 & O5 Series"
        description="Purpose-built for extreme long-range PTP links, delivering reliable high-capacity backhaul over 200+ km."
      />
      <SpecTable
        title="O-Series Model Comparison"
        headers={["Model", "Frequency", "Antenna", "Distance", "Interfaces", "Download"]}
        rows={[
          ["O4-E", "4000-5000 MHz", "External (2× N-type)", "200+ km", "1x Combo GbE/SFP", <button
            key="download8"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/13Ivmd0ENojQP2cAJkwRxyrplIDOzvCqI/view?usp=drive_link';
              link.download = 'NXG5-STE-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
          ["O5-18", "4900-6000 MHz", "18 dBi integrated", "Up to 20 km", "1x Gigabit Ethernet", <button
            key="download9"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/1xRcqoqU8JJZQxjfPJ791VR4GEck88A_V/view?usp=drive_link';
              link.download = 'NXG5-STE-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
          ["O5-23", "4900-6000 MHz", "23 dBi integrated", "Up to 40 km", "1x Combo GbE/SFP", <button
            key="download10"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/1cn5Ytdohx3TanrZ2to580S3Hxl90x2OX/view?usp=drive_link';
              link.download = 'NXG5-STE-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
          ["O5-25", "4900-6000 MHz", "25 dBi integrated", "Up to 60 km", "1x Combo GbE/SFP", <button
            key="download11"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/1Vvvu12StTN7c2L9atz2tFVGdK2BARnNO/view?usp=drive_link';
              link.download = 'NXG5-STE-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
          ["O5-28", "4900-6000 MHz", "28 dBi integrated", "Up to 80 km", "1x Combo GbE/SFP", <button
            key="download12"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/1hbIRj6uzBf93Jh_kWzgPopG3fsOpOhNj/view?usp=drive_link';
              link.download = 'NXG5-STE-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
          ["O5-E", "4900-6000 MHz", "External (2× N-type)", "200+ km", "1x Combo GbE/SFP", <button
            key="download12"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/1BcOJvPoePujFE-R3nwLy-XxrUctZKvYY/view?usp=drive_link';
              link.download = 'NXG5-STE-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
        ]}
      />
      <div className="mt-6">
        <FeatureList
          title="Key Technological Advantages"
          features={[
            "Instant DFS: Hitless channel changes with background spectrum monitoring",
            "Automatic Bitrate Control (ABC) for dynamic optimization",
            "Integrated full-fledged L2 switch for transparent Ethernet transport",
            "8 priority queues with IEEE 802.1p and IP DiffServ support",
          ]}
          columns={2}
        />
      </div>
    </div>
  </section>
)

const AntennasSection: React.FC = () => (
  <section id="antennas" className="py-16 border-b border-border">
    <SectionHeader
      number="2.0"
      title="High-Performance Antennas"
      description="A comprehensive collection of high-gain dish, mesh, and omni-directional antennas designed to support a wide array of deployment scenarios."
      image={antennaDishImg}
    />

    <div className="mb-12">
      <SubsectionTitle
        number="2.1"
        title="Parabolic Dish & Mesh Antennas"
        description="High-gain, highly directional antennas ideal for Point-to-Point connections and long-range backhaul."
      />
      <SpecTable
        title="Antenna Specifications"
        headers={["Model", "Description", "Frequency", "Gain", "Diameter", "Connector","Download"]}
        rows={[
          ["OANT-4G-28-MH", "2 ft Dish Antenna", "4.4-5.0 GHz", "28 ±1 dBi", "0.6 m", "N Male/Female",<button
            key="download12"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/1aAKhLCJBu2MLcbKSgrLOOUhCTdBDpvNI/view?usp=drive_link';
              link.download = 'NXG5-STE-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
          ["OANT-4G-30-MH", "3 ft Dish Antenna", "4.4-5.0 GHz", "30 ±1 dBi", "0.9 m", "N Male/Female",<button
            key="download13"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/1gbJzh13Y4tNsneN8IUjMy2X3OUwrTS4T/view?usp=drive_link';
              link.download = 'NXG5-STE-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>], 
          ["OANT30-6SD-C", "2 ft MIMO Solid Dish", "4.9-7.125 GHz", "30 dBi", "0.6 m", "Connectorized",<button
            key="download14"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/1YQYGXuq10uB6uG0DFxHF6hPcs-eA7iZ7/view?usp=drive_link';
              link.download = 'NXG5-STE-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
          ["OANT30-MH-C", "2 ft MIMO Mesh Dish", "4.9-7.125 GHz", "30 dBi", "0.6 m", "Connectorized",<button
            key="download15"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/1JqVcK_3WzCh1id0OET6Dgy_bwwHsJvQU/view?usp=drive_link';
              link.download = 'NXG5-STE-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
          ["OANT34-6MH-C", "3 ft Mesh Pizza Dish", "4.9-7.125 GHz", "31.5-34 dBi", "0.9 m", "2× N-Female",<button
            key="download16"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/1e7HZQqE--bmQ2Cs-wJj-ymOeWNpxKqpR/view?usp=drive_link';
              link.download = 'NXG5-STE-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
          ["OANT-11G35D", "2 ft Parabolic Pizza", "10-11.7 GHz", "33.8-35.2 dBi", "0.6 m", "Circle Waveguide",<button
            key="download17"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://drive.google.com/file/d/1cqOgqJS0DiS_XOcUDMMf4BbP21Nm4FJK/view?usp=drive_link';
              link.download = 'NXG5-STE-specs.pdf'; // Optional: suggest filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>],
        ]}
      />
    </div>

    <div>
      <SubsectionTitle
        number="2.2"
        title="Omni-directional Antennas"
        description="360-degree horizontal coverage ideal for Point-to-Multipoint base station deployments."
      />
      <div className="grid md:grid-cols-2 gap-6">
        <ProductCard
          icon="antenna"
          title="OANT-5G-11-90"
          subtitle="5 GHz, 11 dBi, 90° Sector"
          description="Dual-pol sector antenna, ideal for PtMP base stations covering wider areas."
          features={["90° horizontal beamwidth", "11 dBi gain", "Integrated mount"]}
        />
        <ProductCard
          icon="antenna"
          title="OANT-5G-12-120"
          subtitle="5 GHz, 12 dBi, 120° Sector"
          description="Wider coverage sector antenna for base station applications."
          features={["120° horizontal beamwidth", "12 dBi gain", "Dual polarization"]}
        />
      </div>
    </div>
  </section>
)

const NetworkSwitchesSection: React.FC = () => (
  <section id="network-switches" className="py-16 border-b border-border">
    <SectionHeader
      number="3.0"
      title="Network Switches"
      description="Versatile switching devices with PoE and SFP connectivity for aggregation, distribution, and backhaul."
      image={networkSwitchImg}
    />

    <div className="mb-12">
      <SubsectionTitle
        number="3.1"
        title="Managed Switches"
        description="Full-featured Layer 2 managed switches for network control and optimization."
      />
      <SpecTable
        title="Switch Portfolio"
        headers={["Model", "Ports", "PoE Budget", "Uplinks", "Mounting"]}
        rows={[
          ["OSW-8G-120W", "8× Gigabit", "120 W", "2× SFP", "Desktop/Rack"],
          ["OSW-16G-150W", "16× Gigabit", "150 W", "2× SFP+", "Rackmount"],
          ["OSW-24G-370W", "24× Gigabit", "370 W", "4× SFP+", "Rackmount"],
          ["OSW-48G-740W", "48× Gigabit", "740 W", "4× SFP+", "Rackmount"],
        ]}
      />
      <div className="mt-6">
        <FeatureList
          title="Switch Features"
          features={[
            "IEEE 802.3af/at/bt PoE support",
            "VLAN configuration and port isolation",
            "Link Aggregation (LACP)",
            "Storm control and rate limiting",
            "IGMP Snooping for multicast",
            "SNMP v1/v2c/v3 monitoring",
          ]}
          columns={2}
        />
      </div>
    </div>
  </section>
)

const PowerSolutionsSection: React.FC = () => (
  <section id="power-solutions" className="py-16">
    <SectionHeader
      number="4.0"
      title="Power Solutions"
      description="PoE injectors and power supplies to reliably energize your wireless radios and network devices."
      image={powerSolutionImg}
    />

    <div className="mb-12">
      <SubsectionTitle
        number="4.1"
        title="PoE Injectors"
        description="Deliver power and data over a single Ethernet cable to remote devices."
      />
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <ProductCard
          icon="power"
          title="OPOE-30W"
          subtitle="30W PoE Injector"
          description="IEEE 802.3af/at compliant for powering APs and cameras."
          features={["Gigabit passthrough", "Compact design"]}
        />
        <ProductCard
          icon="power"
          title="OPOE-60W"
          subtitle="60W PoE Injector"
          description="High-power PoE++ for demanding wireless radios."
          features={["802.3bt support", "LED indicators"]}
          highlight="60W"
        />
        <ProductCard
          icon="power"
          title="OPOE-90W"
          subtitle="90W PoE Injector"
          description="Maximum power delivery for high-performance equipment."
          features={["Up to 90W output", "Surge protection"]}
          highlight="90W"
        />
      </div>
    </div>

    <div>
      <SubsectionTitle
        number="4.2"
        title="Power Supplies"
        description="Reliable DC and AC power supplies for switches and radios."
      />
      <SpecTable
        title="Power Supply Options"
        headers={["Model", "Output", "Efficiency", "Application"]}
        rows={[
          ["OPS-48V-1.25A", "48V DC, 1.25A", ">85%", "Single radio / small AP"],
          ["OPS-56V-2.5A", "56V DC, 2.5A", ">88%", "High-power radio"],
          ["OPS-Universal", "12-56V adjustable", ">90%", "Multi-device support"],
        ]}
        compact
      />
    </div>
  </section>
)

// ============== MAIN ==============
export default function ProductsPage() {
  // This project’s global theme variables are currently light-only (see app/globals.css).
  // The Products page relies on token classes like bg-background/bg-card/text-primary, so
  // we define the needed CSS variables locally to keep the intended dark + green styling.
  const productsThemeVars = {
    "--background": "#050B10",
    "--foreground": "#E5E7EB",
    "--border": "rgba(255,255,255,0.10)",
    "--muted": "rgba(255,255,255,0.06)",
    "--muted-foreground": "rgba(229,231,235,0.70)",
    "--card": "rgba(255,255,255,0.04)",
    "--secondary": "rgba(255,255,255,0.06)",
    "--secondary-foreground": "#E5E7EB",
    "--primary": "#00FF55",
    "--primary-foreground": "#00204A",
    // Slightly different green for gradients/highlights
    "--accent": "#19FF8C",
  } as React.CSSProperties

  return (
    <main style={productsThemeVars} className="min-h-screen bg-background text-foreground">
      <ProductsNavigation />
      <ProductsHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WirelessSystemsSection />
        <AntennasSection />
        <NetworkSwitchesSection />
        <PowerSolutionsSection />
      </div>

      {/* Local animations used by this page */}
      <style jsx global>{`
        @keyframes specRowIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 700ms ease-out both;
        }

        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(1);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.05);
          }
        }

        .animate-pulse-glow {
          animation: pulseGlow 2.8s ease-in-out infinite;
        }

        /* New styles from updates */
        .gradient-border {
          position: relative;
          border: 1px solid rgba(34, 197, 94, 0.15);
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.05);
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.3);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </main>
  )
}
