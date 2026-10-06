import residential from "../assets/residential.webp";
import factory from "../assets/factory.webp";
import commercial from "../assets/guard-hero.webp";
export const services = [
  {
    slug: "housing",
    number: "01",
    icon: "home",
    title: "Housing guards",
    category: "RESIDENTIAL SECURITY",
    image: residential,
    alt: "Security guard checking a tablet at a residential entrance",
    description:
      "A reassuring presence for your home and everyone who calls it theirs.",
    longDescription:
      "From the first visitor of the morning to the last patrol at night, create a considered security presence for your apartment community, gated development, or private residence.",
    features: [
      "Visitor & entry management",
      "Community patrols",
      "Resident assistance",
    ],
    audience: "Apartment communities, gated societies, and private residences",
  },
  {
    slug: "factory",
    number: "02",
    icon: "factory",
    title: "Factory guards",
    category: "INDUSTRIAL SECURITY",
    image: factory,
    alt: "Uniformed security team patrolling a modern industrial facility",
    description:
      "Keep your people, property, and operations moving with confidence.",
    longDescription:
      "Bring structure to busy industrial environments with a security plan that considers shift patterns, vehicle movement, restricted areas, and your workforce.",
    features: [
      "Gate & vehicle checks",
      "Perimeter monitoring",
      "Workforce access control",
    ],
    audience: "Factories, warehouses, logistics hubs, and industrial sites",
  },
  {
    slug: "commercial",
    number: "03",
    icon: "building",
    title: "Commercial & more",
    category: "BUSINESS & EVENT SECURITY",
    image: commercial,
    alt: "Professional security guards outside a modern commercial building",
    description:
      "Professional protection that makes the right first impression.",
    longDescription:
      "Welcome guests with confidence while protecting the spaces where your business happens. Plan a professional security presence for your workplace, store, or event.",
    features: [
      "Office & retail security",
      "Event access management",
      "Front-desk security",
    ],
    audience:
      "Corporate offices, retail properties, venues, and private events",
  },
];
