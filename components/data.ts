export type NavItem = { label: string; target: string };
export type Stat = { label: string; value: string; icon: string };
export type Service = { icon: string; title: string; description: string };
export type Project = {
  slug: string;
  title: string;
  categoryLabel: string;
  image: string;
  categories: string[];
  location?: string;
  overview?: string;
  description?: string;
  gallery?: string[];
};
export type FilterOption = { label: string; value: string };
export type WhyUsItem = { icon: string; title: string; description: string };
export type Partner = { name: string; icon: string };

export const navItems: NavItem[] = [
  { label: "About", target: "about" },
  { label: "Services", target: "services" },
  { label: "Projects", target: "projects" },
  { label: "Why Us", target: "why-us" },
  { label: "Contact", target: "contact" }
];

export const stats: Stat[] = [
  { label: "Years of Experience", value: "20+", icon: "fas fa-briefcase" },
  { label: "Projects Completed", value: "500+", icon: "fas fa-diagram-project" },
  { label: "Clients Served", value: "200+", icon: "fas fa-users" }
];

export const services: Service[] = [
  {
    icon: "fas fa-industry",
    title: "Steel Structures",
    description:
      "Custom steel fabrication for buildings, bridges, and industrial structures with precision engineering and quality materials."
  },
  {
    icon: "fas fa-door-open",
    title: "Aluminum Doors & Windows",
    description:
      "High-quality aluminum framing systems for residential and commercial applications with modern design and durability."
  },
  {
    icon: "fas fa-building",
    title: "Curtain Walls",
    description:
      "Custom curtain wall systems for commercial buildings providing aesthetic appeal and energy efficiency."
  },
  {
    icon: "fas fa-stairs",
    title: "Handrails & Staircases",
    description:
      "Custom-designed handrails and staircases for safety and architectural enhancement in any space."
  },
  {
    icon: "fas fa-tools",
    title: "Custom Metal Works",
    description:
      "Specialized metal fabrication for unique projects including artistic installations and specialized equipment."
  },
  {
    icon: "fas fa-wrench",
    title: "Installation & Maintenance",
    description:
      "Professional installation services and comprehensive maintenance programs to ensure longevity of all metal structures."
  }
];

export const projects: Project[] = projectsData as Project[];

export const filterOptions: FilterOption[] = [
  { label: "All Projects", value: "all" },
  { label: "Steel", value: "steel" },
  { label: "Aluminum", value: "aluminum" }
];

export const whyUsItems: WhyUsItem[] = [
  {
    icon: "fas fa-award",
    title: "High-Quality Materials",
    description:
      "We use only premium steel and aluminum materials sourced from trusted suppliers to ensure durability and performance."
  },
  {
    icon: "fas fa-ruler-combined",
    title: "Precision & Craftsmanship",
    description:
      "Our skilled technicians employ advanced techniques and attention to detail to deliver flawless fabrication every time."
  },
  {
    icon: "fas fa-clock",
    title: "On-Time Delivery",
    description:
      "We pride ourselves on meeting deadlines without compromising quality, ensuring your project stays on schedule."
  },
  {
    icon: "fas fa-paint-brush",
    title: "Custom Solutions",
    description:
      "Every project is uniquely designed to meet your specific requirements and vision with personalized attention."
  },
  {
    icon: "fas fa-users",
    title: "Professional Team",
    description:
      "Our experienced team of engineers, fabricators, and installers brings expertise and dedication to every project."
  },
  {
    icon: "fas fa-shield-alt",
    title: "Quality Assurance",
    description:
      "Rigorous quality control processes ensure every piece meets the highest standards before delivery and installation."
  }
];

export const partners: Partner[] = [
  { name: "Contractor A", icon: "fas fa-helmet-safety" },
  { name: "Developer B", icon: "fas fa-building" },
  { name: "Architect C", icon: "fas fa-drafting-compass" },
  { name: "Builder D", icon: "fas fa-city" },
  { name: "Engineer E", icon: "fas fa-industry" },
  { name: "Civic Works", icon: "fas fa-people-group" },
  { name: "Harbor Architects", icon: "fas fa-bridge" },
  { name: "UrbanGrid", icon: "fas fa-layer-group" }
];
import projectsData from "../data/projects.json";
