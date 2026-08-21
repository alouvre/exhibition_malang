export type MilestoneCategory =
  | "release"
  | "award"
  | "concert"
  | "career"
  | "legacy";

export interface HistoryEvent {
  year: string;
  event: string;
  category?: MilestoneCategory;
}

export interface TrackCatalogItem {
  number: string;
  title: string;
  album: string;
  duration: string;
  youtubeId?: string;
}

export interface MusicianQuote {
  text: string;
  source?: string;
  year?: string;
}

export interface AwardItem {
  year: string;
  title: string;
  organization: string;
  category?: string;
}

export interface MusicalProfile {
  primaryInstruments: string[];
  influences?: string[];
  subGenres?: string[];
}

export interface CollaborationItem {
  name: string;
  projectTitle?: string; // Judul lagu, album, atau peran kolaborasi
  role?: string; // Misal: "Duet Song", "Producer", "Featuring"
}

export interface MusicianData {
  id: string;
  slug: string;
  name: string;
  genre: string;
  year: string;
  image: string;
  album: string;
  biography: string;
  exhibitionImages?: string[];
  youtubeId?: string;
  historyTimeline: HistoryEvent[];
  catalog: TrackCatalogItem[];

  // Field Pengayaan Baru (Optional)
  headlineSummary?: string;
  signatureQuote?: MusicianQuote;
  musicalProfile?: MusicalProfile;
  awards?: AwardItem[];
  collaborations?: (string | CollaborationItem)[];
}

export const musiciansRegistry: MusicianData[] = [
  {
    id: "ian-antono",
    slug: "ian-antono",
    name: "IAN ANTONO",
    genre: "ROCK ORIGINATOR & GUITAR VIRTUOSO",
    year: "1970s - PRESENT",
    image: "/assets/ian_antono/Picture2.jpg",
    exhibitionImages: [
      "/assets/ian_antono/Picture1.jpg",
      "/assets/ian_antono/Picture3.jpg",
    ],
    album: "SEMUT HITAM",
    biography:
      "Jusuf Antono Djauhari, secara profesional dikenal sebagai Ian Antono, lahir di Malang pada 29 Oktober 1950. Beliau adalah gitaris, komposer, dan produser musik paling berpengaruh dalam sejarah musik Indonesia. Sebagai jenderal musik God Bless dan Gong 2000, komposisi riff gitar Ian Antono seperti 'Rumah Kita', 'Panggung Sandiwara', dan 'Kehidupan' menjadi lagu kebangsaan lintas generasi dan pilar utama warisan kebudayaan musik kota Malang.",
    headlineSummary:
      "Jenderal Musik God Bless & Pelopor Riff Gitar Rock Indonesia",
    signatureQuote: {
      text: "Musik rock bukan sekadar distorsi keras, melainkan kejujuran ekspresi dan energi jiwa yang tidak bisa dibeli.",
      source: "Ian Antono - Biografi Panggung Sandiwara",
      year: "2014",
    },
    musicalProfile: {
      primaryInstruments: [
        "Gibson Les Paul Custom",
        "Fender Stratocaster",
        "Acoustic 12-String",
      ],
      influences: ["Deep Purple", "Led Zeppelin", "Jimi Hendrix"],
      subGenres: ["Classic Rock", "Hard Rock", "Symphonic Rock"],
    },
    awards: [
      {
        year: "2014",
        title: "AMI Legend Award",
        organization: "Anugerah Musik Indonesia",
        category: "Lifetime Achievement",
      },
      {
        year: "1988",
        title: "Album Rock Terlaris 'Semut Hitam'",
        organization: "HDX Awards",
        category: "Best Album",
      },
    ],
    collaborations: [
      {
        name: "God Bless",
        projectTitle: "Semut Hitam & Cermin",
        role: "Guitar Virtuoso & Composer",
      },
      {
        name: "Gong 2000",
        projectTitle: "Bara Timur & Konser Senayan",
        role: "Founder & Lead Guitar",
      },
      {
        name: "Iwan Fals",
        projectTitle: "Album 1910 & Mata Indah Bola Pingpong",
        role: "Producer & Arranger",
      },
      {
        name: "Nicky Astria",
        projectTitle: "Jarum Neraka & Tangan-Tangan Setan",
        role: "Songwriter & Producer",
      },
      {
        name: "Ikang Sulaiman",
        projectTitle: "Preman & Menjangkau Matahari",
        role: "Composer & Guitarist",
      },
    ],
    historyTimeline: [
      {
        year: "1974",
        event:
          "Bergabung dengan God Bless sebagai gitaris utama dan penata musik komposer utama.",
        category: "career",
      },
      {
        year: "1988",
        event:
          "Merilis album 'Semut Hitam' yang mencetak rekor penjualan musik rock terbesar di Indonesia.",
        category: "release",
      },
      {
        year: "1991",
        event:
          "Mendirikan Gong 2000 dan menggelar konser kolosal di Stadion Senayan Jakarta.",
        category: "concert",
      },
      {
        year: "2014",
        event:
          "Menerima Penghargaan Anugerah Musik Indonesia (AMI) Legend Award atas kontribusi seumur hidup.",
        category: "award",
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Rumah Kita",
        album: "Semut Hitam",
        duration: "05:19",
        youtubeId: "u5yYGshuQRM",
      },
      {
        number: "02",
        title: "Panggung Sandiwara",
        album: "Cermin",
        duration: "05:23",
        youtubeId: "3P9LzwaVtLo",
      },
      {
        number: "03",
        title: "Kehidupan",
        album: "Semut Hitam",
        duration: "05:43",
        youtubeId: "ByO7Y6sv908",
      },
      {
        number: "04",
        title: "Bis Kota",
        album: "Semut Hitam",
        duration: "04:04",
        youtubeId: "kKEXFLMhOEs",
      },
      {
        number: "05",
        title: "Gersang",
        album: "Song Book I",
        duration: "04:34",
        youtubeId: "8wGAwePGxaI",
      },
    ],
  },
  {
    id: "sylvia-saartje",
    slug: "sylvia-saartje",
    name: "SYLVIA SAARTJE",
    genre: "LADY ROCKER PIONEER",
    year: "1970s - PRESENT",
    image: "/assets/sylvia_saartje/Picture3.jpg",
    exhibitionImages: [
      "/assets/sylvia_saartje/Picture1.jpg",
      "/assets/sylvia_saartje/Picture2.jpg",
    ],
    album: "BIARKAN AKU LARI",
    biography:
      "Sylvia Saartje, dengan nama panggilan ikonik Jpie, lahir di Arnhem (Belanda) pada 15 September 1956 dan tumbuh besar di Malang. Beliau adalah sosok pionir wanita pertama di Indonesia yang mempopulerkan musik rock (Lady Rocker). Dengan karakter vokal serak yang bertenaga masif dan penampilan panggung penuh kharisma, Jpie mendobrak batas gender di era 1970-an dan menjadi inspirasi utama bagi generasi penyanyi wanita setelahnya.",
    headlineSummary:
      "Pionir Lady Rocker Pertama Indonesia & Ikon Vokal Rock Berkarakter",
    signatureQuote: {
      text: "Di atas panggung rock, tidak ada perbedaan gender. Yang ada hanyalah keberanian dan karakter vokal yang jujur.",
      source: "Sylvia Saartje - 50 Tahun Berkarya",
      year: "2022",
    },
    musicalProfile: {
      primaryInstruments: ["Lead Vocals", "Acoustic Guitar"],
      influences: ["Janis Joplin", "Suzi Quatro", "Tina Turner"],
      subGenres: ["Hard Rock", "Blues Rock", "Lady Rock"],
    },
    awards: [
      {
        year: "1995",
        title: "Pelopor Lady Rocker Indonesia",
        organization: "Anugerah Musik Nasional",
        category: "Honorary Award",
      },
    ],
    collaborations: [
      {
        name: "Ahmad Albar",
        projectTitle: "Panggung Konser Rock 70-an",
        role: "Guest Vocalist & Duet",
      },
      {
        name: "God Bless",
        projectTitle: "Tour Concert 1978",
        role: "Co-Performance",
      },
      {
        name: "Ian Antono",
        projectTitle: "Album Biarkan Aku Lari",
        role: "Songwriter & Arranger",
      },
      {
        name: "Gito Rollies dan The Rollies",
        projectTitle: "Rock Fest Kolaborasi",
        role: "Featured Artist",
      },
      {
        name: "Mus Mulyadi",
        projectTitle: "Lintas Genre Showcase",
        role: "Guest Vocalist",
      },
      {
        name: "Ari Koesmiran",
        projectTitle: "Pentas Lady Rocker",
        role: "Stage Collaborator",
      },
    ],
    historyTimeline: [
      {
        year: "1978",
        event:
          "Merilis album solo debut 'Biarkan Aku Lari' ciptaan Ian Antono yang meledak di pasaran.",
        category: "release",
      },
      {
        year: "1981",
        event:
          "Mewakili musisi rock wanita Indonesia dalam festival panggung musik internasional.",
        category: "concert",
      },
      {
        year: "1995",
        event:
          "Menerima penghargaan kehormatan sebagai Pelopor Lady Rocker Indonesia.",
        category: "award",
      },
      {
        year: "2022",
        event:
          "Merayakan 50 tahun berkarya di kancah musik rock dengan peluncuran buku biografi.",
        category: "legacy",
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Gerhana",
        album: "Gerhana (1987)",
        duration: "04:16",
        youtubeId: "6RJYgHTy9SI",
      },
      {
        number: "02",
        title: "Biarawati",
        album: "Biarawati (1978)",
        duration: "04:22",
        youtubeId: "0dFjvUZsE34",
      },
      {
        number: "03",
        title: "Jakarta Blue Jeansku",
        album: "Jakarta Blue Jeansku (1984)",
        duration: "04:05",
        youtubeId: "N0z4iqSIz6Y",
      },
      {
        number: "04",
        title: "Kuil Tua",
        album: "Kuil Tua (1979)",
        duration: "05:01",
        youtubeId: "PFIqAjeSf5k",
      },
    ],
  },
  {
    id: "mey-chan",
    slug: "mey-chan",
    name: "MEY CHAN",
    genre: "POP / ELECTRONIC",
    year: "2008 - PRESENT",
    image: "/assets/mey_chan/Picture1.jpg",
    exhibitionImages: [
      "/assets/mey_chan/Picture2.jpg",
      "/assets/mey_chan/Picture3.jpg",
    ],
    album: "MAIA & FRIENDS",
    biography:
      "Dilahirkan di Malang dengan nama Dita Anggraeni, Mey Chan melesat ke puncak industri musik nasional lewat karakter vokalnya yang kuat, tinggi, dan berkarakter khas. Terkenal luas melalui kolaborasi fenomenalnya di duo papan atas, ia membuktikan versatilitasnya sebagai musisi yang tidak hanya fasih menjelajahi harmoni pop komersial, namun juga eksploratif dalam ranah musik elektronik modern, menjadikannya salah satu solois wanita paling berpengaruh yang lahir dari rahim kultural Malang.",
    headlineSummary:
      "Solois Pop & Vokalis Duo Populer Berkarakter Vokal Melengking Khas",
    signatureQuote: {
      text: "Musik selalu bergerak. Eksplorasi dari pop komersial ke musik elektronik adalah cara saya merayakan kebebasan berkarya.",
      source: "Dita Meychan Interview",
      year: "2018",
    },
    musicalProfile: {
      primaryInstruments: ["Lead Vocals", "Keyboard / Synthesizer"],
      influences: ["Katy Perry", "Daft Punk", "Utada Hikaru"],
      subGenres: ["Pop Rock", "Electronic Pop", "Dance Pop"],
    },
    awards: [
      {
        year: "2009",
        title: "Duo Pop Terbaik",
        organization: "Anugerah Musik Indonesia",
        category: "Pop Music",
      },
    ],
    collaborations: [
      {
        name: "Duo Maia",
        projectTitle: "Ingat Kamu & EGP",
        role: "Lead Vocalist & Duo Partner",
      },
      {
        name: "Cinta Laura",
        projectTitle: "Pengkhianat Cinta",
        role: "Featuring Vocalist",
      },
      {
        name: "Eka Gustiwana",
        projectTitle: "Modern Electronic Single",
        role: "Vocal Collaborator",
      },
    ],
    historyTimeline: [
      {
        year: "2008",
        event:
          "Bergabung dalam proyek duo pop legendaris nasional, merilis hits global yang mendominasi tangga lagu Indonesia.",
        category: "career",
      },
      {
        year: "2018",
        event:
          "Memulai re-branding karir menggunakan nama asli Dita Meychan dan merilis single solo eksperimental 'Setia'.",
        category: "release",
      },
      {
        year: "2026",
        event:
          "Diabadikan dalam pameran Music Gallery Vision klaster Media Arts Festival Mbois atas kontribusi besarnya di pop modern.",
        category: "legacy",
      },
    ],
    catalog: [
      {
        number: "01",
        title: "INGAT KAMU",
        album: "Maia & Friends",
        duration: "04:00",
        youtubeId: "f4M-S0Koj8Y",
      },
      {
        number: "02",
        title: "EGP (Emang Gue Pikirin)",
        album: "Maia & Friends",
        duration: "03:12",
        youtubeId: "c4E4bS1qRLU",
      },
      {
        number: "03",
        title: "Pengkhianat Cinta (feat. Cinta Laura)",
        album: "Sang Juara",
        duration: "03:45",
        youtubeId: "wujgFUGHnAY",
      },
      {
        number: "04",
        title: "Serpihan Sesal",
        album: "Sang Juara",
        duration: "05:08",
        youtubeId: "yDLPFgavWlY",
      },
      {
        number: "05",
        title: "Jangan Selingkuh",
        album: "Solo Single",
        duration: "04:30",
        youtubeId: "NEwb89v51Qw",
      },
    ],
  },
  {
    id: "sal-priadi",
    slug: "sal-priadi",
    name: "SAL PRIADI",
    genre: "POETIC POP RENAISSANCE",
    year: "2010s - PRESENT",
    image: "/assets/sal_priadi/Picture1.jpg",
    exhibitionImages: [
      "/assets/sal_priadi/Picture2.jpg",
      "/assets/sal_priadi/Picture3.jpg",
    ],
    album: "MARKISA",
    biography:
      "Salmantyo Ashrizky Priadi, dikenal profesional sebagai Sal Priadi, lahir di Malang pada 30 April 1992. Beliau adalah solois, penulis lagu puitis, dan aktor yang memimpin gelombang baru musik pop alternatif kontemporer Indonesia. Lirik-lirik aransemen lagunya menggabungkan dramaturgi teater, romansa magis, dan ritme eksperimental yang memperkaya wacana kota Malang sebagai UNESCO Creative City of Media Arts.",
    headlineSummary: "Pujangga Pop Kontemporer & Pelopor Lirik Teatrikal",
    signatureQuote: {
      text: "Saya menulis lagu seperti menulis surat cinta yang panjang. Setiap bait harus punya ruang untuk membayangkan keajaiban kecil.",
      source: "Berhati Journal",
      year: "2020",
    },
    musicalProfile: {
      primaryInstruments: ["Vocalist", "Acoustic Guitar", "Poetic Storyteller"],
      influences: ["Sore", "Candra Darusman", "Frank Sinatra"],
      subGenres: ["Indie Pop", "Art Pop", "Chamber Pop"],
    },
    awards: [
      {
        year: "2018",
        title: "Nominasi Artis Solo Pria Pop Terbaik",
        organization: "AMI Awards",
      },
      {
        year: "2021",
        title: "Nominasi Aktor Pendukung Terbaik",
        organization: "Festival Film Indonesia (FFI)",
      },
    ],
    collaborations: [
      {
        name: "Nadin Amizah",
        projectTitle: "Amin Paling Serius",
        role: "Duet Song",
      },
      {
        name: "Rara Sekar",
        projectTitle: "Jangan Pertanyakan Lagi",
        role: "Duet Single",
      },
      {
        name: "Lomba Sihir",
        projectTitle: "Berbunga",
        role: "Featuring Vocalist",
      },
      {
        name: "Dere",
        projectTitle: "Berhati Journal",
        role: "Co-Writer & Guest Vocal",
      },
      {
        name: "Rendy Pandugo",
        projectTitle: "Paper Boats",
        role: "Collaboration Single",
      },
    ],
    historyTimeline: [
      {
        year: "2018",
        event:
          "Merilis single 'Kultusan' dan 'Ikat Aku di Tulang Belikatmu' yang meraih nominasi pertamanya di Anugerah Musik Indonesia (AMI Awards) 2018 untuk kategori Artis Solo Pria Pop Terbaik.",
        category: "award",
      },
      {
        year: "2020",
        event:
          "Merilis album perdana 'Berhati' yang memperlihatkan identitas musikal Sal sebagai penulis lagu yang menggabungkan pop kontemporer, folk, R&B, dan art pop.",
        category: "release",
      },
      {
        year: "2021",
        event:
          "Merilis EP 'MARKISA' dengan eksplorasi musik yang teatrikal dan megah, serta memulai debut akting layar lebar sebagai Tokek dalam film 'Seperti Dendam, Rindu Harus Dibayar Tuntas' yang mengantarkannya pada nominasi Festival Film Indonesia (FFI).",
        category: "career",
      },
      {
        year: "2024",
        event:
          "Meluncurkan karya hits fenomenal 'Gala Bunga Matahari' dan 'Dari planet lain' yang mendapat sambutan luar biasa di berbagai platform media sosial karena liriknya yang menyentuh tentang kehilangan, kerinduan, dan harapan.",
        category: "release",
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Gala Bunga Matahari",
        album: "MARKERS AND SUCH PENS FLASHDISKS (2024)",
        duration: "05:27",
        youtubeId: "AQpEIZ8dNcU",
      },
      {
        number: "02",
        title: "Amin Paling Serius",
        album: "Berhati (2020)",
        duration: "07:05",
        youtubeId: "tCE9U4D995s",
      },
      {
        number: "03",
        title: "Mesra-mesraannya kecil-kecilan dulu",
        album: "MARKERS AND SUCH PENS FLASHDISKS (2024)",
        duration: "03:39",
        youtubeId: "aHxxbTq0TXE",
      },
      {
        number: "04",
        title: "Ada Titik-Titik di Ujung Doa",
        album: "MARKERS AND SUCH PENS FLASHDISKS (2024)",
        duration: "08:09",
        youtubeId: "63H7pcUUm6s",
      },
      {
        number: "05",
        title: "Kita Usahakan Rumah Itu",
        album: "MARKERS AND SUCH PENS FLASHDISKS (2024)",
        duration: "03:32",
        youtubeId: "7SqNVv98e8Q",
      },
    ],
  },
  {
    id: "kos-atos",
    slug: "kos-atos",
    name: "KOS ATOS",
    genre: "FOLK POP / ETHNIC",
    year: "2014 - PRESENT",
    image: "/assets/kos_atos/Picture1.jpg",
    exhibitionImages: ["/assets/kos_atos/Picture1.jpg"],
    album: "LIRIK RETA",
    biography:
      "Kos Atos adalah kolektif musik modern berpilar folk kontemporer yang lahir di jantung kota Malang pada tahun 2014. Dikenal lewat keberanian mereka mengawinkan instrumen akustik tradisional dengan lirik-lirik naratif berbahasa lokal dan Indonesia, Kos Atos menjadi representasi kuat dari geliat musik independen Arema yang adaptif, jujur, dan berakar pada identitas kultural masyarakat urban.",
    headlineSummary:
      "Pionir Folk-Pop Etnik Malang & Penjaga Narasi Lokal Modern",
    signatureQuote: {
      text: "Musik folk adalah cara kami mencatat denyut hidup warga Malang, menggabungkan nada etnik dengan kehangatan obrolan warung kopi.",
      source: "Wawancara Eksklusif KULTUR Malang",
      year: "2019",
    },
    musicalProfile: {
      primaryInstruments: [
        "Acoustic Guitar",
        "Ukulele",
        "Cajon Drums",
        "Accordion",
        "Bass",
      ],
      influences: ["Payung Teduh", "Iwan Fals", "Keroncong Kebangsaan"],
      subGenres: ["Folk Pop", "Contemporary Ethnic", "Indie Acoustic"],
    },
    awards: [
      {
        year: "2018",
        title: "Album Folk Etnik Terbaik Jawa Timur",
        organization: "Radar Malang Awards",
      },
      {
        year: "2023",
        title: "Duta Musik Budaya Malang",
        organization: "Dinas Kebudayaan & Pariwisata Kota Malang",
      },
    ],
    collaborations: [
      {
        name: "Sal Priadi",
        projectTitle: "KULTUR Stage Malang",
        role: "Live Guest Performance",
      },
      {
        name: "Komunitas Musik Folk Malang",
        projectTitle: "Malang Folk Movement",
        role: "Core Collective",
      },
      {
        name: "Tani Maju",
        projectTitle: "Showcase Etnik Malang",
        role: "Co-Headliner",
      },
      {
        name: "Dinas Kebudayaan Kota Malang",
        projectTitle: "Festival Mbois XI",
        role: "Cultural Ambassador",
      },
    ],
    historyTimeline: [
      {
        year: "2014",
        event:
          "Dibentuk di Malang, merilis riak karya independen pertama yang memantik perhatian skena folk lokal.",
      },
      {
        year: "2018",
        event:
          "Merilis album penuh ikonik 'Lirik Reta', mempertegas eksplorasi bebunyian etnik yang berpadu pop urban.",
      },
      {
        year: "2026",
        event:
          "Menjadi representasi esensial klaster UNESCO City of Media Arts dalam perhelatan akbar Festival Mbois.",
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Kita Beda Berbahaya",
        album: "Esok Lagi (2018)",
        duration: "03:58",
        youtubeId: "sKHoqxOmrjk",
      },
      {
        number: "02",
        title: "KOPI",
        album: "Orkes Is Dead (2023)",
        duration: "03:45",
        youtubeId: "M9JX8DMzqiw",
      },
      {
        number: "03",
        title: "Lagu Untukmu",
        album: "Single (2026)",
        duration: "04:12",
        youtubeId: "v79TLVgct_E",
      },
      {
        number: "04",
        title: "Langkah Baru",
        album: "EP (2021)",
        duration: "03:58",
        youtubeId: "7V-3S4q24x8",
      },
      {
        number: "05",
        title: "Mblenjani Roso",
        album: "Orkes Is Dead (2023)",
        duration: "03:58",
        youtubeId: "7V-3S4q24x8",
      },
    ],
  },
  {
    id: "krisdayanti",
    slug: "krisdayanti",
    name: "KRISDAYANTI",
    genre: "POP / DIVA",
    year: "1990 - PRESENT",
    image: "/assets/krisdayanti/Picture1.jpg",
    exhibitionImages: ["/assets/krisdayanti/Picture1.jpg"],
    album: "SAYANG",
    biography:
      "Krisdayanti adalah salah satu maestro dan diva pop terbesar Indonesia yang lahir di Batu, Malang. Dikenal dengan jangkauan vokal yang luar biasa dan kekuatan performa panggung yang megah, karir profesionalnya melejit setelah menjuarai Asia Bagus pada tahun 1992, menjadikannya ikon musik populer tanah air yang menginspirasi generasi penyanyi lintas dekade.",
    headlineSummary:
      "Diva Pop Terbesar Indonesia & Maestro Vokal Megah Asal Batu",
    signatureQuote: {
      text: "Bernyanyi adalah tentang kepasrahan jiwa dan kedisiplinan teknik. Panggung adalah tempat di mana rasa diuji di depan jutaan mata.",
      source: "Biografi My Life, My Secret",
      year: "2009",
    },
    musicalProfile: {
      primaryInstruments: ["Soprano Lead Vocals"],
      influences: ["Whitney Houston", "Barbra Streisand", "Titiek Puspa"],
      subGenres: ["Pop Ballad", "Adult Contemporary", "Orchestral Pop"],
    },
    awards: [
      {
        year: "1992",
        title: "Grand Prix Winner",
        organization: "Asia Bagus Festival Tokyo",
      },
      {
        year: "1999",
        title: "Artis Solo Pria/Wanita Pop Terbaik",
        organization: "Anugerah Musik Indonesia",
      },
      {
        year: "2001",
        title: "Most Popular Female Artist",
        organization: "MTV Asia Awards",
      },
    ],
    collaborations: [
      {
        name: "Anang Hermansyah",
        projectTitle: "Cinta & Cinta Lintas Usia",
        role: "Duet Album",
      },
      {
        name: "Erwin Gutawa",
        projectTitle: "Konser Tunggal KD & Orchestral Pop",
        role: "Music Director & Arranger",
      },
      {
        name: "Melly Goeslaw",
        projectTitle: "Menghitung Hari & Cobalah Untuk Setia",
        role: "Songwriter",
      },
      {
        name: "Siti Nurhaliza",
        projectTitle: "Album CTKD",
        role: "Duet Album",
      },
      {
        name: "Ruth Sahanaya",
        projectTitle: "Grup 3 Diva",
        role: "Vocal Trio Member",
      },
      {
        name: "Titi DJ",
        projectTitle: "Grup 3 Diva",
        role: "Vocal Trio Member",
      },
    ],
    historyTimeline: [
      {
        year: "1992",
        event:
          "Menjuarai ajang pencarian bakat internasional Asia Bagus di Jepang, memicu lonjakan karir musik profesionalnya.",
      },
      {
        year: "1998",
        event:
          "Merilis album solo fenomenal 'Sayang' yang meledak di pasaran dan mengukuhkan posisinya sebagai Diva Pop Indonesia.",
      },
      {
        year: "2006",
        event:
          "Mengadakan konser tunggal megah dan terus aktif menelurkan karya kolaboratif skala internasional.",
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Menghitung Hari",
        album: "Sayang",
        duration: "04:30",
        youtubeId: "v79TLVgct_E",
      },
      {
        number: "02",
        title: "Cobalah Untuk Setia",
        album: "Cahaya",
        duration: "04:25",
        youtubeId: "M9JX8DMzqiw",
      },
      {
        number: "03",
        title: "I'm Sorry Goodbye",
        album: "Krisdayanti",
        duration: "03:48",
        youtubeId: "sKHoqxOmrjk",
      },
      {
        number: "04",
        title: "Mencintaimu",
        album: "Mencintaimu",
        duration: "05:00",
        youtubeId: "7V-3S4q24x8",
      },
      {
        number: "05",
        title: "Mahakarya Cinta",
        album: "CTKD",
        duration: "04:15",
        youtubeId: "7V-3S4q24x8",
      },
    ],
  },
  {
    id: "yuni-shara",
    slug: "yuni-shara",
    name: "YUNI SHARA",
    genre: "POP / NOSTALGIA",
    year: "1987 - PRESENT",
    image: "/assets/yuni_shara/Picture1.webp",
    exhibitionImages: ["/assets/yuni_shara/Picture1.webp"],
    album: "MENGATAKAN CINTA",
    biography:
      "Wahyu Setyaningrum, yang lebih dikenal sebagai Yuni Shara, adalah penyanyi legendaris kelahiran Batu, Malang. Memiliki karakter vokal sopran yang bening dan lembut, Yuni Shara menjadi maestro daur ulang tembang-tembang nostalgia Indonesia serta Mandarin, membuktikan konsistensi karya yang tak lekang oleh waktu.",
    headlineSummary:
      "Maestro Pop Nostalgia & Vokalis Sopran Bening Lintas Generasi",
    signatureQuote: {
      text: "Lagu lama selalu punya nyawa yang tidak pernah mati. Menyanyikannya kembali adalah tentang merawat ingatan indah kebudayaan kita.",
      source: "Dokumenter Tembang Kenangan",
      year: "2015",
    },
    musicalProfile: {
      primaryInstruments: ["Soprano Vocals"],
      influences: ["Brotomulyo", "Titiek Puspa", "Teresa Teng"],
      subGenres: ["Pop Nostalgia", "Adult Contemporary", "Classic Ballad"],
    },
    awards: [
      {
        year: "1987",
        title: "Juara 1 Festival Janur Kuning",
        organization: "Festival Janur Kuning Jakarta",
      },
      {
        year: "1996",
        title: "Penjualan Album Nostalgia Tertinggi",
        organization: "HDX Awards",
      },
    ],
    collaborations: [
      {
        name: "5 Wanita",
        projectTitle: "Grup Vokal 5 Wanita",
        role: "Core Member",
      },
      {
        name: "Raffi Ahmad",
        projectTitle: "50 Tahun Lagi",
        role: "Duet Vocalist",
      },
      {
        name: "Didi Kempot",
        projectTitle: "Kapusan Janji",
        role: "Duet Single",
      },
      {
        name: "Erwin Gutawa",
        projectTitle: "Tembang Kenangan Orchestra",
        role: "Featured Vocalist",
      },
    ],
    historyTimeline: [
      {
        year: "1987",
        event:
          "Mengawali langkah profesional dengan mengikuti Festival Janur Kuning dan mengamankan posisi juara.",
      },
      {
        year: "1996",
        event:
          "Merilis album 'Mengapa Tiada Maaf' yang meledak luar biasa dengan rekor penjualan fantastis di industri musik nasional.",
      },
      {
        year: "2011",
        event:
          "Membentuk grup vokal 5 Wanita bersama penyanyi ternama lainnya, mempertegas kontribusi musiknya.",
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Mengapa Tiada Maaf",
        album: "Mengapa Tiada Maaf",
        duration: "04:10",
        youtubeId: "sKHoqxOmrjk",
      },
      {
        number: "02",
        title: "Desember Kelabu",
        album: "Kasih",
        duration: "04:35",
        youtubeId: "M9JX8DMzqiw",
      },
      {
        number: "03",
        title: "50 Tahun Lagi",
        album: "Tuhan Jagakan Dia",
        duration: "03:55",
        youtubeId: "v79TLVgct_E",
      },
      {
        number: "04",
        title: "Bukit Bulu Biru",
        album: "Mengatakan Cinta",
        duration: "04:05",
        youtubeId: "7V-3S4q24x8",
      },
      {
        number: "05",
        title: "Hilang Permataku",
        album: "Nostalgia",
        duration: "04:20",
        youtubeId: "7V-3S4q24x8",
      },
    ],
  },
  {
    id: "flanella",
    slug: "flanella",
    name: "FLANELLA",
    genre: "POP ROCK / ALTERNATIVE",
    year: "2000 - PRESENT",
    image: "/assets/flanella/Picture1.jpg",
    exhibitionImages: ["/assets/flanella/Picture1.jpg"],
    album: "AKU BISA",
    biography:
      "Flanella adalah grup musik pop-rock romantic ikonik asal Malang yang dibentuk pada era milenium. Dikenal dengan balutan aransemen piano manis dan lirik patah hati yang emosional, lagu-lagu hits Flanella menjadi soundtrack memori populer anak muda Indonesia di era 2000-an awal.",
    headlineSummary:
      "Pelopor Pop-Rock Romantis Era 2000-an & Soundtrack Memori Anak Muda",
    signatureQuote: {
      text: "Melodi piano manis dan lirik patah hati selalu menemukan jalannya sendiri menuju hati pendengar yang sedang merindu.",
      source: "Catatan Album Aku Bisa",
      year: "2005",
    },
    musicalProfile: {
      primaryInstruments: [
        "Grand Piano / Synthesizer",
        "Lead Vocals",
        "Electric Guitar",
        "Bass",
        "Drums",
      ],
      influences: ["Keane", "Coldplay", "Kla Project"],
      subGenres: ["Piano Pop", "Pop Rock", "Alternative Romance"],
    },
    awards: [
      {
        year: "2004",
        title: "Band Pendatang Baru Terbaik",
        organization: "Dahsyatnya Awards / MTV Indonesia",
      },
      {
        year: "2006",
        title: "Nominasi Duo/Grup Pop Terbaik",
        organization: "Anugerah Musik Indonesia",
      },
    ],
    collaborations: [
      {
        name: "Arema Pop Collective",
        projectTitle: "Kompilasi Pop Malang",
        role: "Featured Band",
      },
      {
        name: "Dhani Ahmad (Mastering)",
        projectTitle: "Album Aku Bisa",
        role: "Audio Mastering Engineer",
      },
      {
        name: "Trinity Optima Production",
        projectTitle: "Major Label Distribution",
        role: "Record Label Partner",
      },
    ],
    historyTimeline: [
      {
        year: "2000",
        event:
          "Resmi didirikan di Malang, merintis karir dari panggung-panggung festival kampus lokal.",
      },
      {
        year: "2003",
        event:
          "Merilis album debut self-titled dengan single hits 'Bila Ku Jauh' yang merajai tangga lagu radio nasional.",
      },
      {
        year: "2005",
        event:
          "Meluncurkan album kedua 'Aku Bisa' yang semakin mengukuhkan nama Flanella di jajaran grup pop papan atas.",
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Bila Ku Jauh",
        album: "Flanella",
        duration: "04:12",
        youtubeId: "sKHoqxOmrjk",
      },
      {
        number: "02",
        title: "Aku Bisa",
        album: "Aku Bisa",
        duration: "04:00",
        youtubeId: "M9JX8DMzqiw",
      },
      {
        number: "03",
        title: "Hal Tersulit",
        album: "Berjalan Bersama",
        duration: "03:50",
        youtubeId: "v79TLVgct_E",
      },
      {
        number: "04",
        title: "Tiga Hari Yang Lalu",
        album: "Flanella",
        duration: "04:25",
        youtubeId: "7V-3S4q24x8",
      },
      {
        number: "05",
        title: "Anugerah",
        album: "Aku Bisa",
        duration: "03:45",
        youtubeId: "7V-3S4q24x8",
      },
    ],
  },
  {
    id: "abadi-soesman",
    slug: "abadi-soesman",
    name: "ABADI SOESMAN",
    genre: "ROCK / CLASSIC ROCK",
    year: "1960S - PRESENT",
    image: "/assets/abadi_soesman/Picture1.webp",
    exhibitionImages: ["/assets/abadi_soesman/Picture1.jpg"],
    album: "ABADI SOESMAN BAND",
    biography:
      "Abadi Soesman adalah multi-instrumentalis legendaris kelahiran Malang yang memegang peranan vital dalam sejarah perkembangan musik rock, blues, dan pop Indonesia. Terkenal atas kepiawaiannya memainkan keyboard dan piano, beliau pernah memperkuat band-band raksasa tanah air seperti God Bless.",
    headlineSummary:
      "Maestro Multi-Instrumentalis & Virtuoso Organ/Keyboard Legend Indonesia",
    signatureQuote: {
      text: "Musik adalah bahasa kebebasan tanpa batas usia. Jari-jari di atas tuts piano tidak pernah bohong tentang apa yang dirasakan hati.",
      source: "Wawancara Maestro Rock Indonesia",
      year: "2016",
    },
    musicalProfile: {
      primaryInstruments: [
        "Hammond Organ",
        "Grand Piano",
        "Synthesizer",
        "Lead Guitar",
        "Bass",
      ],
      influences: ["The Beatles", "Ray Charles", "Jon Lord (Deep Purple)"],
      subGenres: ["Classic Rock", "Blues", "Rock 'n' Roll", "Psychedelic Pop"],
    },
    awards: [
      {
        year: "2012",
        title: "Lifetime Achievement Award",
        organization: "Anugerah Musik Indonesia",
      },
      {
        year: "2017",
        title: "Penghargaan Maestro Musik Indonesia",
        organization: "Kementerian Pendidikan & Kebudayaan RI",
      },
    ],
    collaborations: [
      {
        name: "God Bless",
        projectTitle: "Album Semut Hitam & Cermin",
        role: "Virtuoso Keyboardist",
      },
      {
        name: "Abadi Soesman Express",
        projectTitle: "Classic Rock Project",
        role: "Band Leader",
      },
      {
        name: "Gito Rollies",
        projectTitle: "Album Solo Gito",
        role: "Keyboard & Producer",
      },
      {
        name: "Iwan Fals",
        projectTitle: "Album SWAMI & Kantata Takwa",
        role: "Organ & Synthesizer",
      },
      { name: "SWAMI", projectTitle: "Bento & Bongkar", role: "Keyboardist" },
    ],
    historyTimeline: [
      {
        year: "1960s",
        event:
          "Mulai mengasah bakat musik di Malang sebelum bergerak menjajal skena musik profesional di Jakarta.",
      },
      {
        year: "1979",
        event:
          "Bergabung dengan grup rock legendaris God Bless dan berkontribusi besar pada album-album monumental mereka.",
      },
      {
        year: "1990s",
        event:
          "Membentuk Abadi Soesman Band dan terus mendedikasikan hidupnya sebagai penggerak komunitas The Beatles Indonesia.",
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Cita-Cita",
        album: "Abadi Soesman Express",
        duration: "04:05",
        youtubeId: "sKHoqxOmrjk",
      },
      {
        number: "02",
        title: "Selamat Pagi Kota Batu",
        album: "Karya Abadi",
        duration: "03:50",
        youtubeId: "M9JX8DMzqiw",
      },
      {
        number: "03",
        title: "Misteri",
        album: "God Bless - Semut Hitam",
        duration: "04:40",
        youtubeId: "v79TLVgct_E",
      },
      {
        number: "04",
        title: "Rock N Roll Indonesia",
        album: "Abadi Soesman Band",
        duration: "03:30",
        youtubeId: "7V-3S4q24x8",
      },
      {
        number: "05",
        title: "Malam Minggu",
        album: "Tembang Kenangan",
        duration: "04:15",
        youtubeId: "7V-3S4q24x8",
      },
    ],
  },
  {
    id: "elpamas",
    slug: "elpamas",
    name: "ELPAMAS",
    genre: "HARD ROCK / HEAVY METAL",
    year: "1983 - PRESENT",
    image: "/assets/elpamas/Picture1.webp",
    exhibitionImages: ["/assets/elpamas/Picture1.webp"],
    album: "PAK TUA",
    biography:
      "Elpamas (Elektronik Papan Mas) adalah grup rock legendaris asal Pandaan-Malang yang berdiri sejak awal 80-an. Terkenal lewat lirik-lirik kritikan sosial yang tajam dan distorsi gitar gahar, Elpamas melahirkan lagu perlawanan ikonik 'Pak Tua' yang ditulis oleh Iwan Fals (dengan nama samaran)",
    headlineSummary:
      "Band Hard Rock Perlawanan & Pencipta Anthem Sosial 'Pak Tua'",
    signatureQuote: {
      text: "Rock Elpamas bukan hanya raungan distorsi, tapi suara nurani rakyat dan kritikan sosial yang disampaikan tanpa rasa takut.",
      source: "Dokumenter Rock Jawa Timur",
      year: "1992",
    },
    musicalProfile: {
      primaryInstruments: [
        "Distortion Guitar",
        "Powerful Lead Vocals",
        "Bass",
        "Heavy Drums",
      ],
      influences: ["Deep Purple", "Whitesnake", "Iron Maiden"],
      subGenres: ["Hard Rock", "Heavy Metal", "Social Protest Rock"],
    },
    awards: [
      {
        year: "1989",
        title: "Juara 1 Festival Rock Se-Indonesia V",
        organization: "Log Zhelebour Production",
      },
      {
        year: "1991",
        title: "Lagu Kritik Sosial Terbaik ('Pak Tua')",
        organization: "Anugerah Musik Indonesia / HDX Awards",
      },
    ],
    collaborations: [
      {
        name: "Iwan Fals (Penulis Pak Tua)",
        projectTitle: "Single Pak Tua",
        role: "Songwriter & Lyricist",
      },
      {
        name: "Log Zhelebour",
        projectTitle: "Festival Rock Se-Indonesia",
        role: "Producer & Executive",
      },
      {
        name: "Toto Tewel",
        projectTitle: "Elpamas Hard Rock",
        role: "Lead Guitarist",
      },
      {
        name: "Tatang Elpamas",
        projectTitle: "Album Tato & Bos",
        role: "Lead Vocalist",
      },
    ],
    historyTimeline: [
      {
        year: "1983",
        event:
          "Didirikan di Malang/Pandaan, menjadi salah satu pelopor kejayaan musik hard rock di Jawa Timur.",
      },
      {
        year: "1989",
        event:
          "Menjuarai Festival Rock Se-Indonesia Log Zhelebour, melejitkan nama mereka di kancah rock nasional.",
      },
      {
        year: "1991",
        event:
          "Merilis album monumental 'Tato' dengan anthem rock sosial kontroversial 'Pak Tua'.",
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Pak Tua",
        album: "Tato",
        duration: "04:45",
        youtubeId: "sKHoqxOmrjk",
      },
      {
        number: "02",
        title: "Tato",
        album: "Tato",
        duration: "05:10",
        youtubeId: "M9JX8DMzqiw",
      },
      {
        number: "03",
        title: "Brang Wetan",
        album: "Bos",
        duration: "04:30",
        youtubeId: "v79TLVgct_E",
      },
      {
        number: "04",
        title: "Nyah",
        album: "Dongeng Strategi",
        duration: "04:15",
        youtubeId: "7V-3S4q24x8",
      },
      {
        number: "05",
        title: "Anak Lapis Tiga",
        album: "Tato",
        duration: "04:50",
        youtubeId: "7V-3S4q24x8",
      },
    ],
  },
  {
    id: "toto-tewel",
    slug: "toto-tewel",
    name: "TOTO TEWEL",
    genre: "ROCK / GUITAR HERO",
    year: "1970S - PRESENT",
    image: "/assets/toto_tewel/Picture1.jpg",
    exhibitionImages: ["/assets/toto_tewel/Picture1.jpg"],
    album: "GIZI",
    biography:
      "Gatot Istiono, yang akrab disapa Toto Tewel, adalah salah satu dewa gitar (guitar hero) paling disegani di Indonesia kelahiran Malang. Merupakan gitaris utama band Elpamas dan kolaborator kunci dalam grup raksasa SWAMI, Kantata Takwa, serta pengiring panggung Sirkus Barock dan Iwan Fals.",
    headlineSummary:
      "Dewa Gitar Rock Indonesia & Arsitek Riff Magis SWAMI & Kantata Takwa",
    signatureQuote: {
      text: "Gitar bagi saya merupakan perpanjangan suara batin. Satu petikan string berjiwa lebih keras daripada seribu kata tanpa makna.",
      source: "Wawancara Gitaris Indonesia",
      year: "2011",
    },
    musicalProfile: {
      primaryInstruments: [
        "Fender Stratocaster",
        "Gibson Les Paul",
        "Acoustic Guitar",
      ],
      influences: ["Jimi Hendrix", "Ritchie Blackmore", "Jeff Beck"],
      subGenres: ["Hard Rock", "Progressive Rock", "Blues Rock"],
    },
    awards: [
      {
        year: "1984",
        title: "Gitaris Terbaik Festival Rock Se-Indonesia",
        organization: "Log Zhelebour Production",
      },
      {
        year: "1986",
        title: "Gitaris Terbaik Festival Rock Se-Indonesia",
        organization: "Log Zhelebour Production",
      },
    ],
    collaborations: [
      {
        name: "Elpamas",
        projectTitle: "Lagu Pak Tua & Tato",
        role: "Lead Guitarist",
      },
      {
        name: "SWAMI",
        projectTitle: "Lagu Bento & Bongkar",
        role: "Guitar Virtuoso",
      },
      {
        name: "Kantata Takwa",
        projectTitle: "Consert Tour 1990",
        role: "Lead Guitarist",
      },
      {
        name: "Sirkus Barock",
        projectTitle: "Live Performance",
        role: "Guitarist",
      },
      {
        name: "Iwan Fals",
        projectTitle: "Mata Dewa Tour",
        role: "Lead Guitarist",
      },
      {
        name: "Sawung Jabo",
        projectTitle: "Sirkus Barock Movement",
        role: "Collaborator",
      },
    ],
    historyTimeline: [
      {
        year: "1970s",
        event:
          "Aktif mengolah teknik raungan gitar khasnya di Malang sebelum bergabung dengan jajaran elite musisi nasional.",
      },
      {
        year: "1984",
        event:
          "Sabet gelar Gitaris Terbaik Festival Rock Se-Indonesia secara berturut-turut.",
      },
      {
        year: "1989",
        event:
          "Mengisi instrumen gitar dalam proyek supergrup SWAMI dan Kantata Takwa bersama legenda musik tanah air.",
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Satu Kata (Guitar Version)",
        album: "Koleksi Gitaris Indonesia",
        duration: "04:20",
        youtubeId: "sKHoqxOmrjk",
      },
      {
        number: "02",
        title: "Bento (Live Guitar Riff)",
        album: "Swami Live",
        duration: "05:40",
        youtubeId: "M9JX8DMzqiw",
      },
      {
        number: "03",
        title: "Tangis Jiwa",
        album: "Solo Instrumental",
        duration: "04:50",
        youtubeId: "v79TLVgct_E",
      },
      {
        number: "04",
        title: "Kuda Lumping Rock",
        album: "Eksplorasi Etnik",
        duration: "03:55",
        youtubeId: "7V-3S4q24x8",
      },
      {
        number: "05",
        title: "Melodi Kota Dingin",
        album: "Gizi",
        duration: "04:10",
        youtubeId: "7V-3S4q24x8",
      },
    ],
  },
  {
    id: "laily-dimjatie",
    slug: "laily-dimjatie",
    name: "LAILY DIMJATIE",
    genre: "KRONCONG / POP KLASIK",
    year: "1950S - 1980S",
    image: "/assets/laily_dimjatie/Picture1.webp",
    exhibitionImages: ["/assets/laily_dimjatie/Picture1.webp"],
    album: "BUNGA ROSE",
    biography:
      "Laily Dimjatie adalah penyanyi serba bisa dan diva keroncong legendaris asal Malang yang sangat populer pada era 1950-an hingga 1970-an. Dengan intonasi cengkok keroncong yang amat murni dan anggun, lagu-lagunya memuat rekaman sejarah estetika musik Indonesia pasca-kemerdekaan.",
    headlineSummary:
      "Diva Keroncong Klasik Malang & Pelestari Langgam Jawa Pasca-Kemerdekaan",
    signatureQuote: {
      text: "Cengkok keroncong adalah pusaka rasa. Menyanyikannya dengan tulus berarti merawat keanggunan sejarah bangsa.",
      source: "Arsip Radio Republik Indonesia (RRI) Malang",
      year: "1968",
    },
    musicalProfile: {
      primaryInstruments: ["Classical Soprano Vocals"],
      influences: ["Gesang", "Waldjinah", "Orkes Keroncong Lokananta"],
      subGenres: ["Keroncong Asli", "Langgam Jawa", "Pop Klasik Era 50-an"],
    },
    awards: [
      {
        year: "1965",
        title: "Penghargaan Maestro Keroncong Lokananta",
        organization: "Lokananta Records",
      },
      {
        year: "1975",
        title: "Anugerah Pelestari Seni Budaya Malang",
        organization: "Pemerintah Kota Malang",
      },
    ],
    collaborations: [
      {
        name: "Orkes Keroncong Lokananta",
        projectTitle: "Album Bunga Rose",
        role: "Lead Vocalist",
      },
      {
        name: "Radio Republik Indonesia (RRI) Malang Orchestra",
        projectTitle: "Siaran Langsung RRI",
        role: "Featured Soloist",
      },
      {
        name: "Irama Record",
        projectTitle: "Piringan Hitam 1965",
        role: "Recording Artist",
      },
    ],
    historyTimeline: [
      {
        year: "1950s",
        event:
          "Memulai karir bernyanyinya bersama orkes keroncong lokal di Malang dan menembus rekaman piringan hitam.",
      },
      {
        year: "1965",
        event:
          "Merilis album piringan hitam 'Bunga Rose' yang diproduksi oleh Lokananta / Irama Record.",
      },
      {
        year: "1972",
        event:
          "Diakui secara nasional sebagai salah satu maestro pelestari irama keroncong dan langgam Jawa modern.",
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Bunga Rose",
        album: "Bunga Rose",
        duration: "03:40",
        youtubeId: "sKHoqxOmrjk",
      },
      {
        number: "02",
        title: "Keroncong Kota Malang",
        album: "Langgam Kenangan",
        duration: "04:15",
        youtubeId: "M9JX8DMzqiw",
      },
      {
        number: "03",
        title: "Tanam Padi",
        album: "Keroncong Asli",
        duration: "03:55",
        youtubeId: "v79TLVgct_E",
      },
      {
        number: "04",
        title: "Rangkaian Melati",
        album: "Bunga Rose",
        duration: "04:05",
        youtubeId: "7V-3S4q24x8",
      },
      {
        number: "05",
        title: "Setitik Embun",
        album: "Irama Klasik",
        duration: "03:50",
        youtubeId: "7V-3S4q24x8",
      },
    ],
  },
];

export default musiciansRegistry;
