export type NavItem = { label: string; target: string };
export type Stat = { label: string; value: string; icon: string };
export type Service = {
  id?: number;
  icon?: string | null;
  title: string;
  description: string;
  order?: number;
};
export type Project = {
  id?: number;
  slug: string;
  title: string;
  categoryLabel: string;
  mainImage: string;
  categories: string[];
  location?: string | null;
  overview?: string | null;
  description?: string | null;
  gallery?: string[];
};
export type FilterOption = { label: string; value: string };
export type WhyUsItem = { icon: string; title: string; description: string };
export type Partner = {
  id?: number;
  name: string;
  logoUrl?: string | null;
  url?: string | null;
  icon?: string;
};

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
