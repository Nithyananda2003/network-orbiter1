import type React from 'react';
import { Network, Signal, Route, Waves, Shield, Bolt, Wind, Layers, Server, Settings } from 'lucide-react';

export type SolutionNavItem = {
  id: string;
  navLabel: string;
  navShortText: string;
  pageH1: string;
  headIntro: string;
  datasheet?: string;
  icon: React.ElementType;
};

export const slugifyNavLabel = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const solutions: SolutionNavItem[] = [
  {
    id: slugifyNavLabel('Wireless Transport/Backhaul'),
    navLabel: 'Wireless Transport/Backhaul',
    navShortText: 'High-throughput backhaul links for core and distribution networks.',
    pageH1: 'Wireless Transport and Backhaul',
    headIntro:
      'Network Orbiter’s high-performance radios are designed for wireless backhaul where capacity and reliability are critical. With throughput up to multi-gigabit levels and support for wide channel bandwidths, these solutions provide a strong alternative or complement to wired backhaul, enabling rapid deployment and scalable network growth.',
    datasheet: 'Datasheet_Oriter_XB Series',
    icon: Bolt,
  },
  {
    id: slugifyNavLabel('WISP Access Networks'),
    navLabel: 'WISP Access Networks',
    navShortText: 'End-to-end wireless access infrastructure for service providers.',
    pageH1: 'WISP Access Networks',
    headIntro:
      'Wireless Internet Service Providers can use Network Orbiter radios and base stations to build scalable access infrastructure. With point-to-point and point-to-multipoint capabilities, integrated switching and routing, and advanced traffic management, WISPs can serve a wide range of subscribers while maintaining consistent performance and efficient spectrum usage.',
    datasheet: 'Datasheet_Oriter_XB Series',
    icon: Signal,
  },
  {
    id: slugifyNavLabel('Enterprise Private 5G'),
    navLabel: 'Enterprise Private 5G',
    navShortText: 'Secure, high-speed private cellular networks for enterprise operations.',
    pageH1: 'Enterprise Private 5G Solutions',
    headIntro:
      'Network Orbiter delivers robust Enterprise Private 5G solutions tailored for mission-critical communications. Providing low latency, high reliability, and enhanced security, our private 5G infrastructure supports automation, dedicated connectivity, and seamless mobility within corporate campuses, factories, and logistics hubs.',
    icon: Shield,
  },
  {
    id: slugifyNavLabel('Smart City Networks'),
    navLabel: 'Smart City Networks',
    navShortText: 'Connected infrastructure for intelligent urban management and safety.',
    pageH1: 'Smart City Network Infrastructure',
    headIntro:
      'Network Orbiter platforms support the backbone of Smart City initiatives, connecting traffic management systems, public Wi-Fi, environmental sensors, and video surveillance. Our high-capacity wireless links ensure real-time data transmission and robust connectivity essential for modern urban efficiency and public safety.',
    datasheet: 'Datasheet_Oriter_XB Series',
    icon: Network,
  },
  {
    id: slugifyNavLabel('Industrial IoT Edge'),
    navLabel: 'Industrial IoT Edge',
    navShortText: 'Ruggedized connectivity for industrial automation and IoT data collection.',
    pageH1: 'Industrial IoT Edge Connectivity',
    headIntro:
      'Engineered for harsh industrial environments, Network Orbiter’s IoT Edge solutions provide reliable wireless links for automation, telemetry, and remote monitoring. Withstanding extreme temperatures and conditions, our systems ensure continuous data flow from the edge to the core, empowering predictive maintenance and operational intelligence.',
    datasheet: 'Orbiter NXG5-bSBS',
    icon: Layers,
  },
];
