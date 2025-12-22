export type Product = {
  id: string;
  name: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  products: Product[];
};

export const productCategories: ProductCategory[] = [
  {
    id: 'wireless-systems',
    name: 'Wireless Systems',
    products: [
      { id: 'orbiter-xb-series', name: 'Orbiter XB Series' },
      { id: 'orbiter-nxg-series', name: 'Orbiter NXG Series' },
      { id: 'orbiter-o4-o5-series', name: 'Orbiter O4 & O5 Series' },
    ],
  },
  {
    id: 'antennas',
    name: 'Antennas',
    products: [
      { id: 'dish-mesh-antennas', name: 'Dish & Mesh Antennas' },
      { id: 'sector-antennas', name: 'Sector Antennas' },
    ],
  },
  {
    id: 'network-switches',
    name: 'Network Switches',
    products: [
      { id: 'managed-switches', name: 'Managed Switches' },
    ],
  },
  {
    id: 'power-solutions',
    name: 'Power Solutions',
    products: [
      { id: 'poe-injectors', name: 'PoE Injectors' },
      { id: 'power-supplies', name: 'Power Supplies' },
    ],
  },
];
