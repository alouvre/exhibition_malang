/**
 * Anti-Gravity Design System: Museum Domain Models
 * Type-safe definitions and curatorial metadata for Museum Musik Indonesia (MMI) & Malang Exhibition.
 */

export interface CollectionMetric {
  id: string;
  label: string;
  value: string;
  description: string;
  iconName: string;
}

export interface MuseumInfo {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  vision: string;
  mission: string[];
  establishedYear: number;
  location: {
    address: string;
    city: string;
    province: string;
    country: string;
    coordinates?: string;
  };
  metrics: CollectionMetric[];
  websiteUrl: string;
  catalogRegistryId: string;
}

export interface MuseumMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  curatorialTag: string;
  iconName: string;
}

export interface Curator {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  specialty: string;
}

export interface TypefaceSpec {
  role: string;
  fontName: string;
  utilityClass: string;
  description: string;
}

export interface CuratorialColophon {
  title: string;
  description: string;
  typefacePairings: TypefaceSpec[];
  designPhilosophy: string;
  grantAccreditation: string;
  curatorialTeamCredit: string;
}

/* ==========================================================================
   INITIAL MOCK / DOMAIN CONSTANTS FOR MUSEUM MUSIK INDONESIA
   ========================================================================== */

export const MMI_MOCK_INFO: MuseumInfo = {
  id: "mmi-malang-main",
  name: "Museum Musik Indonesia",
  shortName: "MMI",
  tagline: "Preserving the Sonic Heritage of Nusantara & Beyond",
  vision:
    "Menjadi pusat dokumentasi, preservasi, dan edukasi sejarah musik Indonesia yang terkemuka di tingkat Asia Tenggara.",
  mission: [
    "Mengumpulkan, merawat, dan mendokumentasikan fisik rekaman musik Nusantara (piringan hitam, kaset, pita reel, instrumen tradisi).",
    "Menyediakan akses riset dan edukasi publik bagi akademisi, kurator, dan penggiat kebudayaan.",
    "Menyelenggarakan pameran interaktif berbasis teknologi anti-gravity vision dan akustik modern."
  ],
  establishedYear: 2009,
  location: {
    address: "Gedung Kesenian Gajayana, Jl. Nusa Kambangan No. 19",
    city: "Malang",
    province: "Jawa Timur",
    country: "Indonesia",
    coordinates: "7.9826° S, 112.6308° E"
  },
  metrics: [
    {
      id: "metric-1",
      label: "Vinyl & Cassette Archives",
      value: "25,000+",
      description: "Piringan hitam, kaset rilis awal, dan pita audio sejarah",
      iconName: "Disc"
    },
    {
      id: "metric-2",
      label: "Archival Epoch",
      value: "1950 – 2026",
      description: "Dekade musik populer, etnis, dan eksperimental Indonesia",
      iconName: "Music"
    },
    {
      id: "metric-3",
      label: "National Sound Catalog",
      value: "100%",
      description: "Terakreditasi museum resmi dan terdaftar di Kemendikbudristek",
      iconName: "BookOpen"
    },
    {
      id: "metric-4",
      label: "Exhibition Gallery",
      value: "Vision 2026",
      description: "Integrasi ruang pameran digital & galeri maestro Malang",
      iconName: "Sliders"
    }
  ],
  websiteUrl: "https://museummusikindonesia.id",
  catalogRegistryId: "MMI-MLG-EXH-2026"
};

export const MMI_MILESTONES: MuseumMilestone[] = [
  {
    id: "ms-2009",
    year: "2009",
    title: "Pendirian Komunitas Galeri Malang Karaoke",
    description:
      "Berawal dari inisiatif para kolektor & pecinta musik di Malang yang mengumpulkan karya fisik musisi tanah air.",
    curatorialTag: "FOUNDATION",
    iconName: "Heart"
  },
  {
    id: "ms-2013",
    year: "2013",
    title: "Resmi Menjadi Museum Musik Indonesia",
    description:
      "Mendapatkan legalitas resmi sebagai museum fisik pertama yang khusus mendokumentasikan musik di Indonesia.",
    curatorialTag: "ACCREDITATION",
    iconName: "BookOpen"
  },
  {
    id: "ms-2016",
    year: "2016",
    title: "Relokasi ke Gedung Kesenian Gajayana",
    description: "Memperluas ruang galeri pameran fisik, perpustakaan rekaman, dan ruang arsip audio analog.",
    curatorialTag: "EXPANSION",
    iconName: "Home"
  },
  {
    id: "ms-2021",
    year: "2021",
    title: "Inisiasi Preservasi & Digitalisasi Audio",
    description: "Kerjasama hibah UNESCO & Kemendikbud untuk restorasi rekaman langka kaset dan piringan hitam etnis.",
    curatorialTag: "DIGITALIZATION",
    iconName: "Disc"
  },
  {
    id: "ms-2026",
    year: "2026",
    title: "Peluncuran Music Gallery Vision",
    description: "Pameran kurasi interaktif modern berbasis Anti-Gravity Clean Architecture dan Swiss Editorial typography.",
    curatorialTag: "VISION 2026",
    iconName: "Sliders"
  }
];

export const MMI_CURATORS: Curator[] = [
  {
    id: "cur-1",
    name: "Hengki Herwanto",
    role: "Pendiri & Ketua Kurator MMI",
    bio: "Pengarsip senior musik Indonesia dengan pengalaman lebih dari 20 tahun dalam restorasi fisik audio.",
    specialty: "Preservasi Analog & Sejarah Pop Nusantara"
  },
  {
    id: "cur-2",
    name: "Candra Malik",
    role: "Kurator Etnomusikologi",
    bio: "Peneliti ritme tradisional Nusantara dan instrumen langka daerah Jawa Timur.",
    specialty: "Instrumen Tradisi & Musik Etnis"
  },
  {
    id: "cur-3",
    name: "Tim Anti-Gravity Curation",
    role: "Tim Kurasi Digital & UI Architecture",
    bio: "Mengembangkan pengalaman galeri digital Music Gallery Vision berbasis Swiss Neo-Minimalism.",
    specialty: "Digital Experience & Visual Design System"
  }
];

export const MMI_COLOPHON: CuratorialColophon = {
  title: "Swiss Editorial & Acoustic Architecture Colophon",
  description:
    "Antarmuka Music Gallery Vision dirancang dengan disiplin Swiss Design, tipografi tinggi, dan grid asimetris untuk menghormati estetika arsip musik.",
  typefacePairings: [
    {
      role: "Swiss Display / Heading",
      fontName: "Helvetica Neue / Bodoni Moda",
      utilityClass: "font-helvetica / font-display",
      description: "Gaya tipografi poster kuratorial resolusi tinggi dengan bobot tegas."
    },
    {
      role: "Editorial Body Text",
      fontName: "Plus Jakarta Sans / Satoshi",
      utilityClass: "font-jakarta / font-satoshi",
      description: "Keterbacaan teks narasi sejarah dan catatan arsip museum."
    },
    {
      role: "Badge & Catalog Tag",
      fontName: "Satoshi Monospace / Inter",
      utilityClass: "font-satoshi",
      description: "Penanda nomor katalog, label arsip, dan stempel kuratorial."
    }
  ],
  designPhilosophy: "Stark Minimalism with Obsidian & Crimson Accents (#CD001F on #F6F4EE Luxury Canvas).",
  grantAccreditation: "Didukung oleh Kemendiktisaintek, BINUS University, dan Museum Musik Indonesia.",
  curatorialTeamCredit: "Music Gallery Vision Curation & Engineering Team 2026."
};
