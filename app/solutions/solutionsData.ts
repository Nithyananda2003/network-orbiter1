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
    id: slugifyNavLabel('Long-Range Rural Connectivity'),
    navLabel: 'Long-Range Rural Connectivity',
    navShortText: 'High-capacity wireless links that extend connectivity across rural and remote regions.',
    pageH1: 'Long-Range Rural Connectivity',
    headIntro:
      'Network Orbiter delivers long-range rural connectivity using high-performance point-to-point and point-to-multipoint radios designed for extended distances. With high-gain antennas and advanced radio features, our systems provide stable links over many kilometers, enabling broadband access where wired infrastructure is difficult or uneconomical to deploy.',
    datasheet: 'Datasheet_Oriter_XB Series',
    icon: Route,
  },
  {
    id: slugifyNavLabel('High-Capacity Last-Mile Access'),
    navLabel: 'High-Capacity Last-Mile Access',
    navShortText: 'Deliver high-speed last-mile connectivity with carrier-grade wireless.',
    pageH1: 'High-Capacity Last-Mile Access Infrastructure',
    headIntro:
      'Using Network Orbiter radios, service providers can build high-capacity last-mile access infrastructure that delivers reliable connectivity to end users. With support for high throughput and advanced QoS, these links ensure consistent performance for data, voice, and critical applications at the network edge.',
    datasheet: 'Datasheet_Oriter_XB Series',
    icon: Network,
  },
  {
    id: slugifyNavLabel('Wi-Fi Backhaul for Public Areas & Parks'),
    navLabel: 'Wi-Fi Backhaul for Public Areas & Parks',
    navShortText: 'Wireless backhaul to support public Wi-Fi in open spaces.',
    pageH1: 'Wi-Fi Backhaul for Public Areas and Parks',
    headIntro:
      'Network Orbiter solutions provide robust wireless backhaul for Wi-Fi deployments in public areas and parks. High-throughput radios and flexible networking features allow operators to aggregate Wi-Fi traffic and transport it securely over long distances, ensuring a consistent user experience in outdoor environments.',
    datasheet: 'Datasheet_Oriter_XB Series',
    icon: Waves,
  },
  {
    id: slugifyNavLabel('Video Surveillance & Public Safety'),
    navLabel: 'Video Surveillance & Public Safety',
    navShortText: 'Wireless infrastructure for surveillance, traffic systems, and public safety networks.',
    pageH1: 'Video Surveillance, Traffic Management and Public Safety Wireless Infrastructure',
    headIntro:
      'Network Orbiter platforms are ideal for building wireless infrastructure supporting video surveillance, traffic management, and public safety systems. High-capacity links and sectorized access options allow multiple video streams and control data to be carried reliably, with built-in QoS and security features to maintain service quality and protect critical traffic.',
    datasheet: 'Datasheet_Oriter_XB Series',
    icon: Shield,
  },
  {
    id: slugifyNavLabel('WISP Access Infrastructure'),
    navLabel: 'WISP Access Infrastructure',
    navShortText: 'End-to-end wireless access infrastructure for service providers.',
    pageH1: 'WISP Access Infrastructure',
    headIntro:
      'Wireless Internet Service Providers can use Network Orbiter radios and base stations to build scalable access infrastructure. With point-to-point and point-to-multipoint capabilities, integrated switching and routing, and advanced traffic management, WISPs can serve a wide range of subscribers while maintaining consistent performance and efficient spectrum usage.',
    datasheet: 'Datasheet_Oriter_XB Series',
    icon: Signal,
  },
  {
    id: slugifyNavLabel('High-Performance Wireless Backhaul'),
    navLabel: 'High-Performance Wireless Backhaul',
    navShortText: 'High-throughput backhaul links for core and distribution networks.',
    pageH1: 'High-Performance Wireless Backhaul',
    headIntro:
      'Network Orbiter’s high-performance radios, including the XB Series, are designed for wireless backhaul where capacity and reliability are critical. With throughput up to multi-gigabit levels and support for wide channel bandwidths, these solutions provide a strong alternative or complement to wired backhaul, enabling rapid deployment and scalable network growth.',
    datasheet: 'Datasheet_Oriter_XB Series',
    icon: Bolt,
  },
  {
    id: slugifyNavLabel('Outdoor Wireless for Harsh Environments'),
    navLabel: 'Outdoor Wireless for Harsh Environments',
    navShortText: 'Rugged wireless links built for demanding outdoor conditions.',
    pageH1: 'Outdoor Wireless Links for Harsh Environments',
    headIntro:
      'Network Orbiter radios and antennas are engineered for harsh outdoor environments, with operating temperatures from –40°C to +60°C, IP66/IP67 protection, and wind survivability up to 200 kph. These characteristics make them suited for challenging locations where environmental conditions require durable, reliable wireless infrastructure.',
    datasheet: 'Orbiter NXG5-bSBS',
    icon: Wind,
  },
  {
    id: slugifyNavLabel('Multi-Sector Point-to-Multipoint'),
    navLabel: 'Multi-Sector Point-to-Multipoint',
    navShortText: 'Sector-based PTMP solutions for serving multiple remote sites.',
    pageH1: 'Multi-Sector Point-to-Multipoint Wireless Networks',
    headIntro:
      'With sector base stations such as the NXG5-iSBS, NXG5-eSBS, and NXG5-bSBS, Network Orbiter enables point-to-multipoint connectivity for multiple remote locations. Integrated and beamforming antennas, combined with advanced MAC and QoS functions, allow efficient distribution of capacity across subscribers in a PTMP topology.',
    icon: Layers,
  },
  {
    id: slugifyNavLabel('LAN & Multi-Radio Aggregation'),
    navLabel: 'LAN & Multi-Radio Aggregation',
    navShortText: 'Aggregation platforms for multiple wireless units and LAN segments.',
    pageH1: 'LAN Aggregation and Multi-Radio Aggregation',
    headIntro:
      'The Orbiter Mint Switch and OS-MP Series switches provide aggregation for multiple wireless units and LAN devices. With multiple Gigabit Ethernet ports, native protocol support, and compact, fanless designs, these platforms are suited for consolidating traffic from radios and local networks, simplifying deployment and improving manageability.',
    icon: Server,
  },
  {
    id: slugifyNavLabel('Managed Wireless Networks'),
    navLabel: 'Managed Wireless Networks',
    navShortText: 'Umbrella category for centralized, enterprise-managed wireless operations.',
    pageH1: 'Managed Wireless Networks',
    headIntro:
      'A comprehensive, enterprise-managed framework that ties together access, backhaul, aggregation, and monitoring into a unified operational model. Centralized policy enforcement, multi-site orchestration, and end-to-end visibility simplify lifecycle management while improving reliability and performance across diverse deployments.',
    icon: Settings,
  },
];
