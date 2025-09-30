import {   FaPhoneAlt, FaBlog ,FaRegHandshake , FaConciergeBell , FaTasks } from 'react-icons/fa';
const menuData = [
  {
    id: 2,
    title: "Our Divisions",
    newTab: false,
    icon: FaConciergeBell ,
    
    submenu: [
      {
        id: 21,
        title: "GLASS PROCESSING DIVISION",
        newTab: false,
        path: "/divisions/GlassDivision",
        logo: "/images/icon/divisions/glasspro.webp",
        details: "Processing of high-quality glass materials.",
      },
      {
        id: 22,
        title: "COMMERCIAL DIVISION",
        newTab: false,
        path: "/divisions/CommercialDivision",
        logo: "/images/icon/divisions/commercial.webp",
        details: "Serving commercial projects with precision.",
      },
      {
        id: 23,
        title: "KITCHEN DIVISION",
        newTab: false,
        path: "/divisions/KitchenDivision",
        logo: "/images/icon/divisions/kitchen.webp",
        details: "Designing and producing kitchen installations.",
      },
      {
        id: 24,
        title: "FABRICATION DIVISION",
        newTab: false,
        path: "",
        logo: "/images/icon/divisions/fabri.webp",
        details: "Specializing in advanced fabrication solutions.",
        submenu: [
          {
            id: 241,
            title: "ARCHITECTUAL ALUMINIUM",
            newTab: false,
            path: "/divisions/ArchitecturalAluminium",
            logo: "/images/icon/divisions/acralum.webp",
            details: "Fabricating custom aluminium structures.",
          },
          {
            id: 242,
            title: "FIRE RATED GLAZED DOORS",
            newTab: false,
            path: "/divisions/FireRatedGlazedDoors",
            logo: "/images/icon/divisions/fire.webp",
            details: "Designing and producing.",
          },
          {
            id: 243,
            title: "AUTOMATIC ENTRANCE",
        newTab: false,
        path: "/divisions/AutomaticEntrance",
        logo: "/images/icon/divisions/autoent.webp",
        details: "Designing and producing.",
          },
        ],
      },
    ],
  },
  {
    id: 2.1,
    title: "Our Partners",
    newTab: false,
    path: "/partners",
    icon: FaRegHandshake  ,
  },
  {
    id: 2.5,
    title: "Our Projects",
    newTab: false,
    path: "/project",
    icon: FaTasks  ,
  },
  {
    id: 3,
    title: "Blog",
    newTab: false,
    path: "/blog",
    icon: FaBlog  ,
  },
  {
    id: 4,
    title: "Contact",
    newTab: false,
    path: "/contacts",
    icon: FaPhoneAlt,
  },
 
];

export default menuData;
