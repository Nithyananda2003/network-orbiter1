'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Radio, 
  Network, 
  Shield, 
  ThermometerSun, 
  Layers, 
  Settings,
  Gauge,
  MapPin,
  Waves,
  Signal,
  Bolt,
  Sliders,
  Target,
  BarChart,
  Radar,
  RotateCw,
  TrendingUp,
  Route,
  Filter,
  Server,
  Lock,
  Key,
  Droplet,
  Wind,
  Factory,
  Wrench,
  Monitor,
  Activity,
  Download,
  AlertCircle,
  Rocket,
  CheckCircle
} from 'lucide-react';

const WhyNetworkOrbiter: React.FC = () => {
  return (
    <div className="w-full bg-black text-white">

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex items-center bg-black overflow-hidden">
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-semibold backdrop-blur-sm">
                <Zap className="w-4 h-4" />
                About Network Orbiter
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-green-200 to-purple-200 bg-clip-text text-transparent">
                WHY NETWORK
              </span>
              <br />
              <span className="text-green-400">ORBITER?</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
              Network Orbiter delivers carrier-grade wireless communication systems
              engineered for high throughput, robust reliability, and secure connectivity
              across long distances and extreme environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="bg-black py-20 px-6 relative">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/5 via-transparent to-transparent"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Feature Blocks */}
          <div className="space-y-16 md:space-y-24">

            {/* 1 */}
            <FeatureBlock
              icon={<Zap className="w-6 h-6 md:w-7 md:h-7" />}
              title="High Performance Wireless Connectivity"
              content={[
                { text: "Wireless capacity up to 2.1 Gbps (XB Series)", icon: <Gauge className="w-5 h-5" /> },
                { text: "Long-distance operation exceeding 30 km PTMP and 200 km PTP", icon: <MapPin className="w-5 h-5" /> },
                { text: "Wide frequency support from 4.9 GHz to 7.1 GHz", icon: <Waves className="w-5 h-5" /> },
                { text: "High-gain antennas up to 35 dBi for interference-resilient links", icon: <Signal className="w-5 h-5" /> },
                { text: "Delivers fiber-class performance using only wireless infrastructure", icon: <Bolt className="w-5 h-5" /> },
              ]}
              index={0}
            />

            {/* 2 */}
            <FeatureBlock
              icon={<Radio className="w-6 h-6 md:w-7 md:h-7" />}
              title="Advanced Radio Technology"
              content={[
                { text: "Adaptive TDMA technology (NXG Series)", icon: <Radio className="w-5 h-5" /> },
                { text: "Automatic Bitrate & Transmit Power Control", icon: <Sliders className="w-5 h-5" /> },
                { text: "Automatic Distance Learning", icon: <Target className="w-5 h-5" /> },
                { text: "Spectrum Analyzer Mode", icon: <BarChart className="w-5 h-5" /> },
                { text: "DFS / Radar Detection", icon: <Radar className="w-5 h-5" /> },
                { text: "Advanced Antenna Alignment Tools", icon: <RotateCw className="w-5 h-5" /> },
                { text: "Optimized throughput with low latency & stable connectivity", icon: <TrendingUp className="w-5 h-5" /> },
              ]}
              index={1}
            />

            {/* 3 */}
            <FeatureBlock
              icon={<Network className="w-6 h-6 md:w-7 md:h-7" />}
              title="Integrated L2/L3 Networking & Routing"
              content={[
                { text: "Full Layer-2 switching", icon: <Layers className="w-5 h-5" /> },
                { text: "Layer-3 routing: RIPv2, OSPFv2, Static Routes", icon: <Route className="w-5 h-5" /> },
                { text: "VLAN, Q-in-Q, MAC/IP Filtering", icon: <Filter className="w-5 h-5" /> },
                { text: "DHCP Server / Relay / Client", icon: <Server className="w-5 h-5" /> },
                { text: "NAT & Multi-pool NAT", icon: <Shield className="w-5 h-5" /> },
                { text: "QoS with up to 17 priority queues", icon: <BarChart className="w-5 h-5" /> },
              ]}
              index={2}
            />

            {/* 4 */}
            <FeatureBlock
              icon={<Shield className="w-6 h-6 md:w-7 md:h-7" />}
              title="Strong Security Built-In"
              content={[
                { text: "Integrated firewall (NXG & XB Series)", icon: <Shield className="w-5 h-5" /> },
                { text: "Traffic scrambling (XB Series)", icon: <Lock className="w-5 h-5" /> },
                { text: "SSH & HTTPS secure access", icon: <Key className="w-5 h-5" /> },
                { text: "Password protection & storm/flood prevention", icon: <Shield className="w-5 h-5" /> },
                { text: "Pseudo-radio interface for secure 3rd-party device integration", icon: <Network className="w-5 h-5" /> },
              ]}
              index={3}
            />

            {/* 5 */}
            <FeatureBlock
              icon={<ThermometerSun className="w-6 h-6 md:w-7 md:h-7" />}
              title="Engineered for Extreme Environments"
              content={[
                { text: "Operating Temperature: -40°C to +60°C", icon: <ThermometerSun className="w-5 h-5" /> },
                { text: "IP66/IP67 water & dust protection", icon: <Droplet className="w-5 h-5" /> },
                { text: "100% humidity (condensing)", icon: <Droplet className="w-5 h-5" /> },
                { text: "Wind survivability up to 200 kmph", icon: <Wind className="w-5 h-5" /> },
                { text: "Built for industrial, outdoor & remote environments", icon: <Factory className="w-5 h-5" /> },
              ]}
              index={4}
            />

            {/* 6 */}
            <FeatureBlock
              icon={<Layers className="w-6 h-6 md:w-7 md:h-7" />}
              title="Complete End-to-End Ecosystem"
              content={[
                { text: "PTP & PTMP Radios: O-Series, NXG-Series, XB-Series", icon: <Radio className="w-5 h-5" /> },
                { text: "High-gain parabolic & mesh antennas", icon: <Signal className="w-5 h-5" /> },
                { text: "Industrial OS-MP PoE switches", icon: <Server className="w-5 h-5" /> },
                { text: "Intel Atom-based Orbiter Mint Switch", icon: <Server className="w-5 h-5" /> },
                { text: "Complete mounting kits & accessories", icon: <Wrench className="w-5 h-5" /> },
              ]}
              index={5}
            />

            {/* 7 */}
            <FeatureBlock
              icon={<Settings className="w-6 h-6 md:w-7 md:h-7" />}
              title="Easy Deployment & Centralized Management"
              content={[
                { text: "Intuitive Web GUI", icon: <Monitor className="w-5 h-5" /> },
                { text: "EMS NEXT centralized monitoring platform", icon: <BarChart className="w-5 h-5" /> },
                { text: "Remote firmware upgrades", icon: <Download className="w-5 h-5" /> },
                { text: "Real-time diagnostics via LED indicators", icon: <Activity className="w-5 h-5" /> },
                { text: "Auto configuration and optimization tools", icon: <Settings className="w-5 h-5" /> },
                { text: "Faster installations with minimal downtime", icon: <Rocket className="w-5 h-5" /> },
              ]}
              index={6}
            />

          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyNetworkOrbiter;

interface ContentItem {
  text: string;
  icon: React.ReactNode;
}

interface FeatureBlockProps {
  title: string;
  content: ContentItem[];
  icon: React.ReactNode;
  index: number;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({ title, content, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 md:p-10 hover:border-green-500/50 transition-all duration-300 backdrop-blur-sm overflow-hidden">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex-1 w-full">
            {/* Icon and Title */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-colors duration-300">
                {icon}
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                {title}
              </h2>
            </div>

            {/* Content List */}
            <ul className="space-y-3 ml-0 md:ml-16">
              {content.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.05 }}
                  className="flex items-start gap-3 text-gray-300 text-base md:text-lg group/item"
                >
                  <span className="text-green-500 mt-1.5 flex-shrink-0 group-hover/item:text-green-400 transition-colors duration-300">
                    {item.icon}
                  </span>
                  <span className="leading-relaxed">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Large Right Side Icon */}
          <div className="hidden lg:flex flex-shrink-0 items-center justify-center p-4">
            <div className="text-green-500/10 group-hover:text-green-500/20 transition-colors duration-500 transform group-hover:scale-110">
              {React.isValidElement(icon) 
                ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-48 h-48 lg:w-64 lg:h-64", strokeWidth: 1 }) 
                : null}
            </div>
          </div>
        </div>

        {/* Hover effect gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
      </div>
    </motion.div>
  );
};
