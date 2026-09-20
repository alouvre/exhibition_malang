import {
  MilestoneCategory,
  HistoryEvent,
  TrackCatalogItem,
  MusicianQuote,
  AwardItem,
  MusicalProfile,
  CollaborationItem,
  MusicianData,
} from "@/domain/models";

export type {
  MilestoneCategory,
  HistoryEvent,
  TrackCatalogItem,
  MusicianQuote,
  AwardItem,
  MusicalProfile,
  CollaborationItem,
  MusicianData,
};

export const musiciansRegistry: MusicianData[] = [
  {
    id: "ian-antono",
    slug: "ian-antono",
    name: "IAN ANTONO",
    genre: "ROCK ORIGINATOR & GUITAR VIRTUOSO",
    year: "1965 - PRESENT",
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
    // signatureQuote: {
    //   text: "Musik rock bukan sekadar distorsi keras, melainkan kejujuran ekspresi dan energi jiwa yang tidak bisa dibeli.",
    //   source: "Ian Antono - Biografi Panggung Sandiwara",
    //   year: "2014",
    // },
    musicalProfile: {
      primaryInstruments: [
        "Gibson Les Paul Custom",
        "Fender Stratocaster",
        "Acoustic 12-String",
      ],
      // influences: ["Deep Purple", "Led Zeppelin", "Jimi Hendrix"],
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
        album: "God Bless - Semut Hitam (1989)",
        duration: "05:19",
        youtubeId: "u5yYGshuQRM",
      },
      {
        number: "02",
        title: "Panggung Sandiwara",
        album: "Nicky Astria - Restrospective (2012)",
        duration: "05:23",
        youtubeId: "3P9LzwaVtLo",
      },
      {
        number: "03",
        title: "Kehidupan",
        album: "God Bless - Semut Hitam (1989)",
        duration: "05:43",
        youtubeId: "ByO7Y6sv908",
      },
    ],
  },
  {
    id: "sylvia-saartje",
    slug: "sylvia-saartje",
    name: "SYLVIA SAARTJE",
    genre: "LADY ROCKER PIONEER",
    year: "1968 - PRESENT",
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
    // signatureQuote: {
    //   text: "Di atas panggung rock, tidak ada perbedaan gender. Yang ada hanyalah keberanian dan karakter vokal yang jujur.",
    //   source: "Sylvia Saartje - 50 Tahun Berkarya",
    //   year: "2022",
    // },
    musicalProfile: {
      primaryInstruments: ["Lead Vocals", "Acoustic Guitar"],
      // influences: ["Janis Joplin", "Suzi Quatro", "Tina Turner"],
      subGenres: ["Hard Rock", "Blues Rock", "Lady Rock"],
    },
    awards: [
      {
        year: "Era 60-an",
        title: "Juara Pertama Lomba Menyanyi Anak-anak",
        organization: "RRI Malang",
      },
      {
        year: "1970-an",
        title: "Gelar 'Lady Rocker' Pertama Indonesia",
        organization: "Majalah Musik Aktual",
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
        year: "1968 - 1971",
        event:
          "Memulai perjalanan profesional pertamanya sejak duduk di bangku Sekolah Dasar dengan meraih juara pertama lomba menyanyi anak-anak dan menjadi penyanyi cilik di RRI Malang[cite: 11].",
        category: ["career", "award"],
      },
      {
        year: "1972 - 1977",
        event:
          "Mengawali formasi grup dengan bergabung bersama band Tornado (1972-1975) yang aktif tampil di berbagai daerah di Jawa Timur[cite: 11]. Ia juga memulai debut aktingnya di layar lebar lewat film 'Tangan Besi' pada 1972[cite: 11].",
        category: ["career"],
      },
      {
        year: "Akhir 1970-an - 1980-an",
        event:
          "Mencetak sejarah sebagai penyanyi wanita Indonesia pertama yang diberi julukan 'Lady Rocker' oleh majalah musik Aktual[cite: 11]. Merilis deretan mahakarya seperti 'Biarawati' (1978) dan 'Jakarta Blue Jeansku' (1984), serta melangsungkan pertunjukan hingga ke Amerika Serikat[cite: 11].",
        category: ["career", "release"],
      },
      {
        year: "1994 - 1997",
        event:
          "Tetap konsisten di jalur musik rock dengan merilis album 'Take Me with You' (1994) hingga singel duet 'Cinta Negri Serumput' (1997)[cite: 11]. Ia juga kerap berkolaborasi dengan raksasa musik nasional seperti Godbless dan Achmad Albar[cite: 11].",
        category: ["release", "career"],
      },
      {
        year: "2018",
        event:
          "Merayakan 50 tahun dedikasinya di dunia musik dengan menggelar 'Konser Emas' berkonsep orkestra rock pada hari ulang tahunnya, 15 September 2018, di UBTV Malang[cite: 11]. Konser ini didukung penuh oleh 26 musisi perempuan dari Voice of Malang[cite: 11].",
        category: ["career"],
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
    year: "2007 - PRESENT",
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
    // signatureQuote: {
    //   text: "Musik selalu bergerak. Eksplorasi dari pop komersial ke musik elektronik adalah cara saya merayakan kebebasan berkarya.",
    //   source: "Dita Meychan Interview",
    //   year: "2018",
    // },
    musicalProfile: {
      primaryInstruments: ["Lead Vocals", "Keyboard / Synthesizer"],
      // influences: ["Katy Perry", "Daft Punk", "Utada Hikaru"],
      subGenres: ["Pop Rock", "Electronic Pop", "Dance Pop"],
    },
    awards: [
      {
        year: "2008",
        title: "Multi-Platinum Award (Album 'Maia & Friends')",
        organization: "Sony BMG Music Entertainment Indonesia",
      },
      {
        year: "2008",
        title: "Nominasi Karya Produksi Duo Grup Terbaik",
        organization: "Anugerah Musik Indonesia (AMI) Awards",
      },
      {
        year: "2009",
        title: "Nominasi Karya Produksi Duo Grup Pop Terbaik",
        organization: "Anugerah Musik Indonesia (AMI) Awards",
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
        year: "Masa Remaja - 2007",
        event:
          "Memulai perjalanan bermusik sejak usia remaja dengan membentuk grup musik Komet 14, dilanjutkan dengan grup Infinity setelah lulus SMA yang membawanya menjadi musisi kafe profesional. Ia juga sempat bergabung dengan Dimensi Baru dan Punk Romance sebelum mengundurkan diri pada pertengahan 2007.",
        category: ["career"],
      },
      {
        year: "2008 - 2009",
        event:
          "Terpilih melalui audisi ketat untuk mendampingi Maia Estianty dalam grup Duo Maia, lalu merilis album sukses 'Maia & Friends' (2008) dan 'Sang Juara' (2009). Ia juga mencetak debut akting layar lebarnya melalui film 'XXL-Double Extra Large'.",
        category: ["career", "release"],
      },
      {
        year: "2012 - 2017",
        event:
          "Terus produktif bersama Duo Maia merilis berbagai album, serta meluncurkan album mini solo bertajuk 'Mey Chan and Her Pals' pada tahun 2013. Ia juga merambah acara televisi bergengsi seperti 'The Remix' (2015) dan menjadi juri di 'Just Duet' (2016), sebelum akhirnya resmi keluar dari Duo Maia pada tahun 2017.",
        category: ["release", "career"],
      },
      {
        year: "2018 - 2020",
        event:
          "Kembali ke industri musik sebagai solois menggunakan nama aslinya, Dita, dengan merilis singel perdana 'Setia' (2018). Ia kemudian merilis lagu emosional 'Ibu' (2019) untuk mengenang almarhumah ibundanya, serta singel 'Lagu Rindu' pada awal 2020.",
        category: ["release"],
      },
      {
        year: "2022",
        event:
          "Setelah sempat vakum selama dua tahun, ia kembali mewarnai belantika musik dengan merilis singel religi 'Tuhan Tahu', yang tak lama kemudian disusul dengan perilisan singel pop 'Menyesal Mengenalmu'.",
        category: ["release", "career"],
      },
    ],
    catalog: [
      {
        number: "01",
        title: "INGAT KAMU",
        album: "Sang Juara (2009)",
        duration: "04:00",
        youtubeId: "f4M-S0Koj8Y",
      },
      {
        number: "02",
        title: "EGP (Emang Gue Pikirin)",
        album: "Sang Juara (2009)",
        duration: "03:12",
        youtubeId: "c4E4bS1qRLU",
      },
      {
        number: "03",
        title: "Pengkhianat Cinta (feat. Cinta Laura)",
        album: "Sang Juara (2009)",
        duration: "03:45",
        youtubeId: "wujgFUGHnAY",
      },
      {
        number: "04",
        title: "Serpihan Sesal",
        album: "Sang Juara (2009)",
        duration: "05:08",
        youtubeId: "yDLPFgavWlY",
      },
    ],
  },
  {
    id: "sal-priadi",
    slug: "sal-priadi",
    name: "SAL PRIADI",
    genre: "POETIC POP RENAISSANCE",
    year: "2015 - PRESENT",
    image: "/assets/sal_priadi/Picture1.jpg",
    exhibitionImages: [
      "/assets/sal_priadi/Picture2.jpg",
      "/assets/sal_priadi/Picture3.jpg",
    ],
    album: "MARKISA",
    biography:
      "Salmantyo Ashrizky Priadi, dikenal profesional sebagai Sal Priadi, lahir di Malang pada 30 April 1992. Beliau adalah solois, penulis lagu puitis, dan aktor yang memimpin gelombang baru musik pop alternatif kontemporer Indonesia. Lirik-lirik aransemen lagunya menggabungkan dramaturgi teater, romansa magis, dan ritme eksperimental yang memperkaya wacana kota Malang sebagai UNESCO Creative City of Media Arts.",
    headlineSummary: "Pujangga Pop Kontemporer & Pelopor Lirik Teatrikal",
    musicalProfile: {
      primaryInstruments: ["Vocalist", "Acoustic Guitar", "Poetic Storyteller"],
      // influences: ["Sore", "Candra Darusman", "Frank Sinatra"],
      subGenres: [
        "Pop Kontemporer",
        "Art Pop",
        "Pop Alternatif",
        "Folk",
        "R&B",
        "Funk",
        "Sophisti-Pop",
      ],
    },
    awards: [
      {
        year: "2018",
        title: "Nominasi Artis Solo Pria Pop Terbaik",
        organization: "Anugerah Musik Indonesia (AMI) Awards",
      },
      {
        year: "2022",
        title: "Pemenang Aktor Pendatang Baru Terbaik",
        organization: "Indonesian Movie Actors Awards (IMAA)",
      },
      {
        year: "2024",
        title: "Pemenang Artis Solo Pria Pop Terbaik",
        organization: "Anugerah Musik Indonesia (AMI) Awards",
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
        year: "2015 - 2017",
        event:
          "Mengawali karier musik independen di SoundCloud (2015) hingga merilis singel debut resminya, 'Kultusan' (2017).",
        category: ["career", "release"],
      },
      {
        year: "2018 - 2019",
        event:
          "Mencuri perhatian industri lewat 'Ikat Aku di Tulang Belikatmu' yang meraih nominasi pertamanya di AMI Awards 2018 untuk kategori Artis Solo Pria Pop Terbaik.",
        category: ["release", "award"],
      },
      {
        year: "2020",
        event:
          "Merilis album perdana 'Berhati' yang memperlihatkan identitas musikal Sal sebagai penulis lagu yang menggabungkan pop kontemporer, folk, R&B, dan art pop. Sekaligus memulai debut panggung teaternya lewat pementasan 'Anugerah Terindah'",
        category: ["release", "career"],
      },
      {
        year: "2021 - 2022",
        event:
          "Debut akting layar lebar sebagai Tokek dalam film 'Seperti Dendam, Rindu Harus Dibayar Tuntas' (2021) yang mengantarkannya pada nominasi Festival Film Indonesia (FFI). Merilis EP 'Markers and Such Pens Flashdisks' (2022) dengan eksplorasi musik yang teatrikal dan megah.",
        category: ["career", "release"],
      },
      {
        year: "2024",
        event:
          "Meluncurkan album 'Markers and Such Pens Flashdisks' dengan hits fenomenal 'Gala Bunga Matahari' yang mendapat sambutan luar biasa di berbagai platform media sosial karena liriknya yang menyentuh tentang kehilangan, kerinduan, dan harapan. Meraih penghargaan Artis Solo Pria Pop Terbaik di AMI Awards.",
        category: ["release", "award"],
      },
      {
        year: "2025 - 2026",
        event:
          "Berekspansi ke televisi sebagai juri tamu Indonesian Idol (2025), hingga penayangan perdana global film 'Monster Pabrik Rambut' di Festival Film Internasional Berlin 2026.",
        category: ["career"],
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
    // signatureQuote: {
    //   text: "Musik folk adalah cara kami mencatat denyut hidup warga Malang, menggabungkan nada etnik dengan kehangatan obrolan warung kopi.",
    //   source: "Wawancara Eksklusif KULTUR Malang",
    //   year: "2019",
    // },
    musicalProfile: {
      primaryInstruments: [
        "Acoustic Guitar",
        "Ukulele",
        "Cajon Drums",
        "Accordion",
        "Bass",
      ],
      // influences: ["Payung Teduh", "Iwan Fals", "Keroncong Kebangsaan"],
      subGenres: ["Folk Pop", "Contemporary Ethnic", "Indie Acoustic"],
    },
    awards: [
      {
        year: "2018",
        title: "Album Folk Etnik Terbaik Jawa Timur",
        organization: "Radar Malang Awards",
      },
      {
        year: "2021",
        title: "Nominasi Grup Keroncong Kontemporer Terbaik",
        organization: "Anugerah Musik Indonesia (AMI) Awards",
      },
      // {
      //   year: "2022",
      //   title: "Nominasi Grup Keroncong Kontemporer Terbaik",
      //   organization: "Anugerah Musik Indonesia (AMI) Awards",
      // },
      // {
      //   year: "2023",
      //   title: "Nominasi Grup Keroncong Kontemporer Terbaik",
      //   organization: "Anugerah Musik Indonesia (AMI) Awards",
      // },
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
        projectTitle: "Museum Musik Indonesia Exhibition",
        role: "Cultural Ambassador",
      },
    ],
    historyTimeline: [
      {
        year: "2014 - 2016",
        event:
          "Dibentuk di lingkungan kampus Universitas Negeri Malang pada 27 Februari 2014. Merilis album perdana fisik dan digital bertajuk 'LUTA' pada September 2016 dengan visi memperkenalkan musik keroncong kepada anak muda.",
        category: ["career", "release"],
      },
      {
        year: "2017 - 2018",
        event:
          "Membangun label rekaman mandiri bernama Creatorikos Audio Visual (2017). Disusul perilisan mini album 'Esok Lagi' dalam format kaset pita bersama Lokananta yang diluncurkan di kawasan ikonik Kampung Warna-Warni Jodipan (2018).",
        category: ["career", "release"],
      },
      {
        year: "2021",
        event:
          "Merilis album keempat 'Langkah Baru' yang ditandai dengan menggelar konser virtual di stadion tertua di Indonesia, Stadion Gajayana Malang. Mereka juga meraih nominasi Anugerah Musik Indonesia (AMI) perdana mereka lewat single 'Keroncongkan Sekitarmu'.",
        category: ["release", "award", "career"],
      },
      {
        year: "2022 - 2023",
        event:
          "Merilis album penuh 'Orkes Is Dead' yang mendapat ulasan positif dari media nasional karena keberanian aransemen dan produktivitas kuratorial album. Kos Atos juga memperluas jangkauan kuratorial melalui program pameran tematik yang didukung oleh Midden Indonesia sebagai bagian dari Cities of Media Arts oleh UNESCO.",
        category: ["release", "award", "career"],
      },
      {
        year: "2024 - 2025",
        event:
          "Mengukuhkan diri sebagai kelompok keroncong vernakular paling produktif di Indonesia dalam perayaan 10 tahun karier mereka. Memeriahkan pembukaan Solo Keroncong Festival di Pura Mangkunegaran (2024) serta menyiapkan rilisan single 'Si Alan, OTW!' untuk tahun 2025.",
        category: ["career", "release"],
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
    name: "KRIS DAYANTI",
    genre: "POP / DIVA",
    year: "1984 - PRESENT",
    image: "/assets/krisdayanti/Picture1.jpg",
    exhibitionImages: ["/assets/krisdayanti/Picture1.jpg"],
    album: "SAYANG",
    biography:
      "Krisdayanti adalah salah satu maestro dan diva pop terbesar Indonesia yang lahir di Batu, Malang. Dikenal dengan jangkauan vokal yang luar biasa dan kekuatan performa panggung yang megah, karir profesionalnya melejit setelah menjuarai Asia Bagus pada tahun 1992, menjadikannya ikon musik populer tanah air yang menginspirasi generasi penyanyi lintas dekade.",
    headlineSummary:
      "Diva Pop Terbesar Indonesia & Maestro Vokal Megah Asal Batu",
    // signatureQuote: {
    //   text: "Bernyanyi adalah tentang kepasrahan jiwa dan kedisiplinan teknik. Panggung adalah tempat di mana rasa diuji di depan jutaan mata.",
    //   source: "Biografi My Life, My Secret",
    //   year: "2009",
    // },
    musicalProfile: {
      primaryInstruments: ["Soprano Lead Vocals"],
      // influences: ["Whitney Houston", "Barbra Streisand", "Titiek Puspa"],
      subGenres: ["Pop Ballad", "Adult Contemporary", "Orchestral Pop"],
    },
    awards: [
      {
        year: "1992",
        title: "Grand Champion",
        organization: "Festival Asia Bagus (Jepang)",
      },
      {
        year: "1997",
        title: "Album Pop & Lagu Pop Terbaik (Album 'Cinta')",
        organization: "Anugerah Musik Indonesia (AMI) Awards",
      },
      {
        year: "1999",
        title: "Album Indonesia Terbaik & Most Wanted Female Artist",
        organization: "Anugerah Industri Muzik (AIM) & MTV Asia Tenggara",
      },
      {
        year: "2000",
        title: "Penyanyi Wanita Terbaik & Lagu Terbaik (Album 'Mencintaimu')",
        organization: "Anugerah Musik Indonesia (AMI) Awards",
      },
      {
        year: "2005",
        title: "10 Artis Asia Terbesar & Artis Wanita Terbaik",
        organization: "Channel V & Anugerah Planet Muzik (APM)",
      },
      {
        year: "2007",
        title: "Anugerah Khas (Special Achievement Award)",
        organization: "Anugerah Planet Muzik (APM) Singapura",
      },
      {
        year: "2016",
        title: "Original Soundtrack Terbaik ('Surga yang Tak Dirindukan')",
        organization: "Indonesian Box Office Movie Awards (IBOMA)",
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
        year: "1984 - 1992",
        event:
          "Memulai karier kanak-kanak dengan mengisi suara film 'Megaloman' dan merilis album perdana 'Biasa Saja' pada usia 12 tahun[cite: 9]. Namanya melambung pesat di industri musik setelah menjuarai festival Asia Bagus di Jepang pada tahun 1992[cite: 9].",
        category: ["career", "award"],
      },
      {
        year: "1995 - 1997",
        event:
          "Merilis album profesional perdananya, 'Terserah' (1995)[cite: 9]. Ia kemudian menikah dengan Anang Hermansyah dan merilis album duet fenomenal 'Cinta' yang menembus penjualan satu juta kopi, sekaligus membintangi sinetron hit 'Abad 21'[cite: 9].",
        category: ["release", "career"],
      },
      {
        year: "1998 - 1999",
        event:
          "Meluncurkan album 'Sayang' dengan singel andalan 'Menghitung Hari' yang membawanya populer dan memenangkan penghargaan bergengsi di Malaysia[cite: 9]. Ia juga menjadi pelopor kesuksesan sinetron Ramadan di Indonesia lewat 'Doaku Harapanku'[cite: 9].",
        category: ["release", "career", "award"],
      },
      {
        year: "2000 - 2001",
        event:
          "Merilis album hit 'Mencintaimu' yang memborong banyak piala di AMI Awards dan Anugerah Planet Muzik[cite: 9]. Kesuksesan luar biasa dari 'Konser KD' pada tahun 2001 secara resmi mengukuhkan gelarnya sebagai Diva Pop Indonesia[cite: 9].",
        category: ["release", "award", "career"],
      },
      {
        year: "2004 - 2006",
        event:
          "Menggelar 'Konser KD 1530' dan merilis album 'Cahaya' yang sukses diganjar triple platinum[cite: 9]. Ia melebarkan sayap dengan membentuk grup vokal 3 Diva (bersama Titi DJ dan Ruth Sahanaya) serta melakoni debut layar lebar di film 'Jatuh Cinta Lagi'[cite: 9].",
        category: ["career", "release"],
      },
      {
        year: "2009 - 2011",
        event:
          "Merilis album duet kolaborasi internasional 'CTKD' bersama penyanyi Malaysia, Siti Nurhaliza (2009)[cite: 9]. Setelah berpisah dengan Anang, ia meresmikan pernikahan keduanya dengan pengusaha asal Timor Leste, Raul Lemos, pada tahun 2011[cite: 9].",
        category: ["release", "career"],
      },
      {
        year: "2015 - 2023",
        event:
          "Menggelar 'Konser Traya' dan kembali mencetak hit pemenang penghargaan lewat lagu tema film 'Surga yang Tak Dirindukan' (2015)[cite: 9]. Ia juga resmi menjabat sebagai anggota DPR-RI periode 2019-2024 dan sukses menggelar konser tunggal di Singapura pada 2023[cite: 9].",
        category: ["career", "release", "award"],
      },
    ],
    catalog: [
      {
        number: "01",
        title: "i'm sorry goodbye",
        album: "Krisdayanti (2007)",
        duration: "03:31",
        youtubeId: "9aIMaZ9n3oQ",
      },
      {
        number: "02",
        title: "Mencintaimu",
        album: "Mencintaimu (2000)",
        duration: "03:56",
        youtubeId: "z6hP9LpR9KE",
      },
      {
        number: "03",
        title: "Cobalah Untuk Setia",
        album: "Cahaya (2004)",
        duration: "04:02",
        youtubeId: "ySkUk3Az0Q8",
      },
    ],
  },
  {
    id: "keisya-levronka",
    slug: "keisya-levronka",
    name: "KEISYA LEVRONKA",
    genre: "POP",
    year: "2019 - PRESENT",
    image: "/assets/keisya_levronka/Picture1.jpg",
    exhibitionImages: [
      "/assets/keisya_levronka/Picture1.jpg",
      "/assets/keisya_levronka/Picture2.jpg",
    ],
    album: "LEVRONKA",
    biography:
      "Keisya Levronka, lahir di Malang pada 2 Februari 2003, adalah penyanyi dan aktris muda yang memulai karier profesionalnya melalui ajang pencarian bakat Indonesian Idol Musim Kesepuluh. Memiliki warna vokal yang unik dan gaya bernyanyi yang emosional, namanya melesat pesat di industri musik Asia Tenggara berkat hit fenomenal 'Tak Ingin Usai'. Selain bermusik, Keisya juga aktif dalam dunia seni peran layar lebar dan serial web, mengukuhkan dirinya sebagai salah satu talenta muda paling bersinar dari kota Malang.",
    headlineSummary:
      "Bintang Pop Muda & Pencetak Hit Tangga Lagu Asia Tenggara",
    musicalProfile: {
      primaryInstruments: ["Vocalist"],
      // influences: ["Tiara Andini", "Mahalini", "Raisa"],
      subGenres: ["Pop", "Pop Balada", "Teen Pop"],
    },
    awards: [
      {
        year: "2020",
        title: "Silver Creator Award (100.000 Subscribers)",
        organization: "YouTube Creator Awards",
      },
      {
        year: "2022",
        title:
          "Lagu Bahasa Melayu Terbaik Dipersembahkan oleh Artis Luar Negara",
        organization: "Anugerah Industri Muzik (AIM) Malaysia",
      },
      {
        year: "2022",
        title:
          "Nominasi Pemeran Pembantu Wanita Terpuji Serial Web ('Jingga & Senja')",
        organization: "Festival Film Bandung",
      },
      {
        year: "2022",
        title: "Nominasi Breakthrough Artist & Song of the Year",
        organization: "Indonesian Music Awards",
      },
      {
        year: "2023",
        title: "Pendatang Baru Terpopuler",
        organization: "TikTok Indonesia Awards",
      },
      {
        year: "2023",
        title: "Pop Music Video of The Year ('Tak Ingin Usai')",
        organization: "YouTube Music (Indonesia Music Week)",
      },
    ],
    collaborations: [
      {
        name: "Andi Rianto",
        projectTitle: "Mengejar Matahari",
        role: "Duet & Remake Project",
      },
      {
        name: "Bayu Skak",
        projectTitle: "Lara Ati (Film & Series)",
        role: "Co-Star & Soundtrack Contributor",
      },
      {
        name: "Laleilmanino",
        projectTitle: "Tergesa",
        role: "Songwriting Collaboration",
      },
    ],
    historyTimeline: [
      {
        year: "2019 - 2020",
        event:
          "Mengawali langkah profesionalnya melalui ajang Indonesian Idol Musim Kesepuluh, lalu melakukan debut sebagai penyanyi dengan merilis singel pop ceria berjudul 'Jadi Kekasihku Saja'[cite: 10].",
        category: ["career", "release"],
      },
      {
        year: "2021",
        event:
          "Melakukan debut di dunia seni peran dengan membintangi serial web 'Jingga dan Senja', yang sukses mengantarkannya pada nominasi Festival Film Bandung[cite: 10].",
        category: ["career"],
      },
      {
        year: "2022",
        event:
          "Merilis singel fenomenal 'Tak Ingin Usai' yang berhasil memuncaki tangga lagu digital Asia Tenggara dan menganugerahinya piala 'Lagu Bahasa Melayu Terbaik' di ajang Anugerah Industri Muzik (AIM) Malaysia[cite: 10].",
        category: ["release", "award"],
      },
      {
        year: "2023 - 2024",
        event:
          "Meluncurkan album studio perdana 'Levronka' (2023), merilis singel 'Bahagia Tanpaku' (2024), serta aktif membintangi berbagai judul layar lebar seperti 'Lara Ati' dan 'Sekawan Limo'[cite: 10].",
        category: ["release", "career"],
      },
      {
        year: "2025 - 2026",
        event:
          "Merilis album digital kompilasi 'Tersesat Dalam Rasa' dan menjadi pemeran utama dalam film horor 'Pamali: Tumbal' (2025)[cite: 10]. Setahun kemudian, ia meluncurkan album studio kedua bergenre pop-rock bertajuk 'Rombak'[cite: 10].",
        category: ["career", "release"],
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Tak Ingin Usai",
        album: "Levronka (2023)",
        duration: "04:38",
        youtubeId: "V5F2pW1E6eA",
      },
      {
        number: "02",
        title: "Mengejar Matahari",
        album: "Levronka (2023)",
        duration: "04:12",
        youtubeId: "XnK5yOEqo8o",
      },
      {
        number: "03",
        title: "Jadi Kekasihku Saja",
        album: "Levronka (2023)",
        duration: "03:19",
        youtubeId: "L9a8tQ5l2Y0",
      },
      {
        number: "04",
        title: "Tergesa",
        album: "Levronka (2023)",
        duration: "03:22",
        youtubeId: "P_zK3y8u5qE",
      },
      {
        number: "05",
        title: "Lagu Untuk Hari Ini",
        album: "Levronka (2023)",
        duration: "03:40",
        youtubeId: "g4oV-H2A5wY",
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
    // signatureQuote: {
    //   text: "Lagu lama selalu punya nyawa yang tidak pernah mati. Menyanyikannya kembali adalah tentang merawat ingatan indah kebudayaan kita.",
    //   source: "Dokumenter Tembang Kenangan",
    //   year: "2015",
    // },
    musicalProfile: {
      primaryInstruments: ["Soprano Vocals"],
      // influences: ["Brotomulyo", "Titiek Puspa", "Teresa Teng"],
      subGenres: ["Pop Nostalgia", "Adult Contemporary", "Classic Ballad"],
    },
    awards: [
      {
        year: "1987",
        title: "Juara II Tingkat Remaja",
        organization: "Festival Bintang Radio dan Televisi",
      },
      {
        year: "1989",
        title: "Juara I",
        organization: "Festival Bintang Radio dan Televisi",
      },
      {
        year: "1996",
        title: "4x Platinum Award (Album 'Mengapa Tiada Maaf')",
        organization: "BASF Awards",
      },
      {
        year: "1996",
        title:
          "3x Platinum Award (OST. 'Kembalinya Pendekar Pemanah Rajawali')",
        organization: "BASF Awards",
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
        year: "1987 - 1989",
        event:
          "Memulai langkah di industri musik melalui Festival Bintang Radio dan Televisi dengan meraih juara kedua (1987) dan juara pertama (1989), yang kemudian membawanya pada tawaran rekaman bersama Billboard All Stars[cite: 10].",
        category: ["career", "award"],
      },
      {
        year: "1990 - 1994",
        event:
          "Merilis album perdana 'Kasmaran' (1990) dan tampil sebagai vokalis latar di North Sea Jazz Festival, Belanda[cite: 10]. Ia kemudian mencetak kesuksesan besar lewat album daur ulang 'Hilang Permataku' pada tahun berikutnya[cite: 10].",
        category: ["career", "release"],
      },
      {
        year: "1995 - 1997",
        event:
          "Mencapai puncak karier komersial melalui album 'Mengapa Tiada Maaf' dan 'OST Return of the Condor Heroes' (1996) yang terjual ratusan ribu kopi, memberikannya total tujuh penghargaan Platinum dari BASF di tahun tersebut[cite: 10].",
        category: ["release", "award"],
      },
      {
        year: "1999 - 2008",
        event:
          "Sempat membentuk grup 3 Bidadari (1999) dan mendulang sukses lewat album adaptasi 'OST. Meteor Garden' (2001)[cite: 10]. Ia meluncurkan buku biografi dan album '35' (2007), serta bergabung dalam kelompok vokal 5 Wanita[cite: 10].",
        category: ["career", "release"],
      },
      {
        year: "2011 - 2014",
        event:
          "Berekspansi ke dunia bisnis multisektor serta mendirikan PAUD 'Cahaya Permata Abadi' di Kota Batu untuk anak kurang mampu[cite: 10]. Di bidang musik, ia merilis singel 'Nurlela' (2011) bersama Krisdayanti dan Iis Dahlia, serta merilis album 'Tuhan Jagakan Dia' (2014)[cite: 10].",
        category: ["career", "release"],
      },
      {
        year: "2020 - 2026",
        event:
          "Aktif memandu acara televisi 'ReYunian' (2020-sekarang) dan merilis ragam singel kolaborasi, termasuk 'Kapusan Janji' bersama Didi Kempot (2020) hingga singel 'Terlalu Lama Sendiri' (2026)[cite: 10].",
        category: ["career", "release"],
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Sepanjang Jalan Kenangan",
        album: "Yuni Shara (2007)",
        duration: "05:05",
        youtubeId: "b0Hcj9VXbeA",
      },
      {
        number: "02",
        title: "Hilang Permataku",
        album: "Permataku (2016)",
        duration: "04:35",
        youtubeId: "Dh619GFS2sk",
      },
      {
        number: "03",
        title: "December Kelabu",
        album: "Yuni Shara (1997)",
        duration: "05:22",
        youtubeId: "uug8iN9Lx-I",
      },
    ],
  },
  {
    id: "flanella",
    slug: "flanella",
    name: "FLANELLA",
    genre: "POP ROCK / ALTERNATIVE",
    year: "1998 - PRESENT",
    image: "/assets/flanella/Picture1.jpg",
    exhibitionImages: ["/assets/flanella/Picture1.jpg"],
    album: "AKU BISA",
    biography:
      "Flanella adalah grup musik pop-rock romantic ikonik asal Malang yang dibentuk pada era milenium. Dikenal dengan balutan aransemen piano manis dan lirik patah hati yang emosional, lagu-lagu hits Flanella menjadi soundtrack memori populer anak muda Indonesia di era 2000-an awal.",
    headlineSummary:
      "Pelopor Pop-Rock Romantis Era 2000-an & Soundtrack Memori Anak Muda",
    // signatureQuote: {
    //   text: "Melodi piano manis dan lirik patah hati selalu menemukan jalannya sendiri menuju hati pendengar yang sedang merindu.",
    //   source: "Catatan Album Aku Bisa",
    //   year: "2005",
    // },
    musicalProfile: {
      primaryInstruments: [
        "Grand Piano / Synthesizer",
        "Lead Vocals",
        "Electric Guitar",
        "Bass",
        "Drums",
      ],
      // influences: ["Keane", "Coldplay", "Kla Project"],
      subGenres: ["Piano Pop", "Pop Rock", "Alternative Romance"],
    },
    awards: [
      {
        year: "2003",
        title: "Platinum Award (Album Debut 'Flanella')",
        organization: "Harpa Records Indonesia",
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
          "Resmi dibentuk pada 26 November 2000 di Malang dan langsung meluncurkan album indie perdana bertajuk 'Berangkat dari Mimpi', meskipun materi lagu mereka sempat berkali-kali ditolak oleh berbagai label di Jakarta.",
        category: ["career", "release"],
      },
      {
        year: "2003",
        event:
          "Merilis lagu 'Bila Engkau' pada momen Valentine yang meledak di radio lokal dan memikat produser Harpa Records. Mereka akhirnya merilis album penuh pertama dan langsung dianugerahi penghargaan Platinum.",
        category: ["career", "release", "award"],
      },
      {
        year: "2005 - 2009",
        event:
          "Meluncurkan album kedua 'Aku Bisa' (2005), disusul oleh album ketiga 'Berjuta Rasa' di bawah naungan Trinity Optima Production (2009). Era ini juga diwarnai masuknya Onky, Catur, dan Dhana untuk menggantikan personel sebelumnya.",
        category: ["release", "career"],
      },
      {
        year: "2015 - 2016",
        event:
          "Setelah jeda yang cukup panjang, Flanella merilis singel 'Tiada Duanya' pada Oktober 2015. Lagu ini menjadi andalan untuk peluncuran album keempat mereka, 'Surfresh', pada April 2016 dengan formasi teranyar bersama Kunya di posisi bass.",
        category: ["release", "career"],
      },
    ],
    catalog: [
      {
        number: "01",
        title: "Aku Bisa",
        album: "Berjuta Rasa (2009)",
        duration: "04:31",
        youtubeId: "fIAewRBNlTM",
      },
      {
        number: "02",
        title: "Selamat Tinggal Cinta Pertama",
        album: "Berjuta Rasa (2009)",
        duration: "04:21",
        youtubeId: "iPFSwXPhliI",
      },
      {
        number: "03",
        title: "Bila Engkau",
        album: "Berjuta Rasa (2009)",
        duration: "06:12",
        youtubeId: "ZadYYhpWjmw",
      },
    ],
  },
  {
    id: "abadi-soesman",
    slug: "abadi-soesman",
    name: "ABADI SOESMAN",
    genre: "ROCK / CLASSIC ROCK",
    year: "1963 - PRESENT",
    image: "/assets/abadi_soesman/Picture1.webp",
    exhibitionImages: ["/assets/abadi_soesman/Picture1.jpg"],
    album: "ABADI SOESMAN BAND",
    biography:
      "Abadi Soesman adalah multi-instrumentalis legendaris kelahiran Malang yang memegang peranan vital dalam sejarah perkembangan musik rock, blues, dan pop Indonesia. Terkenal atas kepiawaiannya memainkan keyboard dan piano, beliau pernah memperkuat band-band raksasa tanah air seperti God Bless.",
    headlineSummary:
      "Maestro Multi-Instrumentalis & Virtuoso Organ/Keyboard Legend Indonesia",
    // signatureQuote: {
    //   text: "Musik adalah bahasa kebebasan tanpa batas usia. Jari-jari di atas tuts piano tidak pernah bohong tentang apa yang dirasakan hati.",
    //   source: "Wawancara Maestro Rock Indonesia",
    //   year: "2016",
    // },
    musicalProfile: {
      primaryInstruments: [
        "Hammond Organ",
        "Grand Piano",
        "Synthesizer",
        "Lead Guitar",
        "Bass",
      ],
      // influences: ["The Beatles", "Ray Charles", "Jon Lord (Deep Purple)"],
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
        title: "Semua Bisa Bilang",
        album: "Abadi Soesman",
        duration: "04:20",
        youtubeId: "rudJY03doCs",
      },
      {
        number: "02",
        title: "Children Of Fantasy",
        album: "Abadi Soesman",
        duration: "06:00",
        youtubeId: "NPhSF71uOV4",
      },
      {
        number: "03",
        title: "Minggu Pagi",
        album: "Abadi Soesman",
        duration: "03:30",
        youtubeId: "r_5sgh-QFdY",
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
    // signatureQuote: {
    //   text: "Rock Elpamas bukan hanya raungan distorsi, tapi suara nurani rakyat dan kritikan sosial yang disampaikan tanpa rasa takut.",
    //   source: "Dokumenter Rock Jawa Timur",
    //   year: "1992",
    // },
    musicalProfile: {
      primaryInstruments: [
        "Distortion Guitar",
        "Powerful Lead Vocals",
        "Bass",
        "Heavy Drums",
      ],
      // influences: ["Deep Purple", "Whitesnake", "Iron Maiden"],
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
        name: "Totok Tewel",
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
        album: "Tato (1991)",
        duration: "03:36",
        youtubeId: "YVshUBSY3q4",
      },
      {
        number: "02",
        title: "Rumah Sangat Sederhana Sekali (R.S.S.S)",
        album: "Negeriku (1997)",
        duration: "03:58",
        youtubeId: "tSNWLw6xzeI",
      },
      {
        number: "03",
        title: "Angan-Angan",
        album: "Dinding Dinding Kota (1989)",
        duration: "03:42",
        youtubeId: "HaODYm2rLRM",
      },
    ],
  },
  {
    id: "toto-tewel",
    slug: "toto-tewel",
    name: "TOTOK TEWEL",
    genre: "ROCK / GUITAR HERO",
    year: "1984 - PRESENT",
    image: "/assets/toto_tewel/Picture1.jpg",
    exhibitionImages: ["/assets/toto_tewel/Picture1.jpg"],
    album: "GIZI",
    biography:
      "Gatot Istiono, yang akrab disapa Totok Tewel, adalah salah satu dewa gitar (guitar hero) paling disegani di Indonesia kelahiran Malang. Merupakan gitaris utama band Elpamas dan kolaborator kunci dalam grup raksasa SWAMI, Kantata Takwa, serta pengiring panggung Sirkus Barock dan Iwan Fals.",
    headlineSummary:
      "Dewa Gitar Rock Indonesia & Arsitek Riff Magis SWAMI & Kantata Takwa",
    // signatureQuote: {
    //   text: "Gitar bagi saya merupakan perpanjangan suara batin. Satu petikan string berjiwa lebih keras daripada seribu kata tanpa makna.",
    //   source: "Wawancara Gitaris Indonesia",
    //   year: "2011",
    // },
    musicalProfile: {
      primaryInstruments: [
        "Fender Stratocaster",
        "Gibson Les Paul",
        "Acoustic Guitar",
      ],
      // influences: ["Jimi Hendrix", "Ritchie Blackmore", "Jeff Beck"],
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
        title: "Depok 1880",
        album: "Miberbareng (2025)",
        duration: "04:19",
        youtubeId: "wfN3wbKsz1o",
      },
      {
        number: "02",
        title: "rumah ibu",
        album: "Miberbareng (2025)",
        duration: "05:40",
        youtubeId: "twN9UeiwQ",
      },
      {
        number: "03",
        title: "macan wedhok",
        album: "Miberbareng (2025)",
        duration: "06:32",
        youtubeId: "Wmzngfpn-6U",
      },
    ],
  },
  {
    id: "laily-dimjatie",
    slug: "laily-dimjatie",
    name: "LAILY DIMJATIE",
    genre: "KRONCONG / POP KLASIK",
    year: "1960 - 2016",
    image: "/assets/laily_dimjatie/Picture1.webp",
    exhibitionImages: ["/assets/laily_dimjatie/Picture1.webp"],
    album: "BUNGA ROSE",
    biography:
      "Laily Dimjatie adalah penyanyi serba bisa dan diva keroncong legendaris asal Malang yang sangat populer pada era 1950-an hingga 1970-an. Dengan intonasi cengkok keroncong yang amat murni dan anggun, lagu-lagunya memuat rekaman sejarah estetika musik Indonesia pasca-kemerdekaan.",
    headlineSummary:
      "Diva Keroncong Klasik Malang & Pelestari Langgam Jawa Pasca-Kemerdekaan",
    // signatureQuote: {
    //   text: "Cengkok keroncong adalah pusaka rasa. Menyanyikannya dengan tulus berarti merawat keanggunan sejarah bangsa.",
    //   source: "Arsip Radio Republik Indonesia (RRI) Malang",
    //   year: "1968",
    // },
    musicalProfile: {
      primaryInstruments: ["Classical Soprano Vocals"],
      // influences: ["Gesang", "Waldjinah", "Orkes Keroncong Lokananta"],
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
        title: "Bunga Flambojant",
        album: "Laily Dimjatie",
        duration: "03:55",
        youtubeId: "yI38hfxCeeU",
      },
      {
        number: "02",
        title: "Pertemuan",
        album: "Laily Dimjatie",
        duration: "04:39",
        youtubeId: "h0-90V_AH3c",
      },
      {
        number: "03",
        title: "Tiada Seindah Hari Ini",
        album: "Laily Dimjatie",
        duration: "03:08",
        youtubeId: "8G0T0CQ-d98",
      },
    ],
  },
];

export default musiciansRegistry;
