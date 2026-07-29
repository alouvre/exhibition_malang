export interface HistoryEvent {
  year: string;
  event: string;
}

export interface TrackCatalogItem {
  number: string;
  title: string;
  album: string;
  duration: string;
  youtubeId?: string;
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
  historyTimeline: HistoryEvent[];
  catalog: TrackCatalogItem[];
  exhibitionImages?: string[];
  youtubeId?: string;
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
    historyTimeline: [
      {
        year: "1974",
        event:
          "Bergabung dengan God Bless sebagai gitaris utama dan penata musik komposer utama.",
      },
      {
        year: "1988",
        event:
          "Merilis album 'Semut Hitam' yang mencetak rekor penjualan musik rock terbesar di Indonesia.",
      },
      {
        year: "1991",
        event:
          "Mendirikan Gong 2000 dan menggelar konser kolosal di Stadion Senayan Jakarta.",
      },
      {
        year: "2014",
        event:
          "Menerima Penghargaan Anugerah Musik Indonesia (AMI) Legend Award atas kontribusi seumur hidup.",
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Rumah Kita",
        album: "Semut Hitam",
        duration: "05:19",
        youtubeId: "u5yYGshuQRM", // God Bless - Rumah Kita Official
      },
      {
        number: "02",
        title: "Panggung Sandiwara",
        album: "Cermin",
        duration: "05:23",
        youtubeId: "3P9LzwaVtLo", // God Bless - Panggung Sandiwara Live
      },
      {
        number: "03",
        title: "Kehidupan",
        album: "Semut Hitam",
        duration: "05:43",
        youtubeId: "ByO7Y6sv908", // God Bless - Kehidupan
      },
      {
        number: "04",
        title: "Bis Kota",
        album: "Semut Hitam",
        duration: "04:04",
        youtubeId: "kKEXFLMhOEs", // God Bless - Bis Kota
      },
      {
        number: "05",
        title: "Gersang",
        album: "Song Book I",
        duration: "04:34",
        youtubeId: "8wGAwePGxaI", // Gong 2000 - Bahtera Cinta
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
    historyTimeline: [
      {
        year: "1978",
        event:
          "Merilis album solo debut 'Biarkan Aku Lari' ciptaan Ian Antono yang meledak di pasaran.",
      },
      {
        year: "1981",
        event:
          "Mewakili musisi rock wanita Indonesia dalam festival panggung musik internasional.",
      },
      {
        year: "1995",
        event:
          "Menerima penghargaan kehormatan sebagai Pelopor Lady Rocker Indonesia.",
      },
      {
        year: "2022",
        event:
          "Merayakan 50 tahun berkarya di kancah musik rock dengan peluncuran buku biografi.",
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
    historyTimeline: [
      {
        year: "2008",
        event:
          "Bergabung dalam proyek duo pop legendaris nasional, merilis hits global yang mendominasi tangga lagu Indonesia.",
      },
      {
        year: "2018",
        event:
          "Memulai re-branding karir menggunakan nama asli Dita Meychan dan merilis single solo eksperimental 'Setia'.",
      },
      {
        year: "2026",
        event:
          "Diabadikan dalam pameran Music Gallery Vision klaster Media Arts Festival Mbois atas kontribusi besarnya di pop modern.",
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
    historyTimeline: [
      {
        year: "2018",
        event:
          "Merilis single 'Kultusan' dan 'Ikat Aku di Tulang Belikatmu' yang meraih nominasi pertamanya di Anugerah Musik Indonesia (AMI Awards) 2018 untuk kategori Artis Solo Pria Pop Terbaik.",
      },
      {
        year: "2020",
        event:
          "Merilis album perdana 'Berhati' yang memperlihatkan identitas musikal Sal sebagai penulis lagu yang menggabungkan pop kontemporer, folk, R&B, dan art pop.",
      },
      {
        year: "2021",
        event:
          "Merilis EP 'MARKISA' dengan eksplorasi musik yang teatrikal dan megah, serta memulai debut akting layar lebar sebagai Tokek dalam film 'Seperti Dendam, Rindu Harus Dibayar Tuntas' yang mengantarkannya pada nominasi Festival Film Indonesia (FFI).",
      },
      {
        year: "2024",
        event:
          "Meluncurkan karya hits fenomenal 'Gala Bunga Matahari' dan 'Dari planet lain' yang mendapat sambutan luar biasa di berbagai platform media sosial karena liriknya yang menyentuh tentang kehilangan, kerinduan, dan harapan.",
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Gala Bunga Matahari",
        album: "MARKISA",
        duration: "05:27",
        youtubeId: "AQpEIZ8dNcU",
      },
      {
        number: "02",
        title: "Amin Paling Serius",
        album: "Single",
        duration: "07:05",
        youtubeId: "tCE9U4D995s",
      },
      {
        number: "03",
        title: "Mesra-mesraannya kecil-kecilan dulu",
        album: "Berhati",
        duration: "03:39",
        youtubeId: "aHxxbTq0TXE",
      },
      {
        number: "04",
        title: "Ada Titik-Titik di Ujung Doa",
        album: "MARKISA",
        duration: "08:09",
        youtubeId: "63H7pcUUm6s",
      },
      {
        number: "05",
        title: "Kita Usahakan Rumah Itu",
        album: "Single",
        duration: "03:32",
        youtubeId: "7SqNVv98e8Q",
      },
      {
        number: "06",
        title: "Belum Tidur",
        album: "Berhati",
        duration: "03:40",
        youtubeId: "nQEQ51WYj3I",
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
    exhibitionImages: [
      "/assets/kos_atos/Picture1.jpg",
      "/assets/vinyl_record.jpg",
    ],
    album: "LIRIK RETA",
    biography:
      "Kos Atos adalah kolektif musik modern berpilar folk kontemporer yang lahir di jantung kota Malang pada tahun 2014. Dikenal lewat keberanian mereka mengawinkan instrumen akustik tradisional dengan lirik-lirik naratif berbahasa lokal dan Indonesia, Kos Atos menjadi representasi kuat dari geliat musik independen Arema yang adaptif, jujur, dan berakar pada identitas kultural masyarakat urban.",
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
        album: "Esok Lagi",
        duration: "03:58",
        youtubeId: "sKHoqxOmrjk",
      },
      {
        number: "02",
        title: "KOPI",
        album: "Lirik Reta",
        duration: "03:45",
        youtubeId: "M9JX8DMzqiw",
      },
      {
        number: "03",
        title: "Lagu Untukmu",
        album: "Lirik Reta",
        duration: "04:12",
        youtubeId: "v79TLVgct_E",
      },
      {
        number: "04",
        title: "Langkah Baru",
        album: "Esok Lagi",
        duration: "03:58",
        youtubeId: "7V-3S4q24x8",
      },
      {
        number: "05",
        title: "Mblenjani Roso",
        album: "Esok Lagi",
        duration: "03:58",
        youtubeId: "7V-3S4q24x8",
      },
    ],
  },
];

export default musiciansRegistry;
