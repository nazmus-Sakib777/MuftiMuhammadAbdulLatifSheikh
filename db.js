// ============================================================
//  db.js  —  Shared localStorage "database" layer
//  All pages import this. Admin writes, frontend reads live.
// ============================================================

const DB_KEY = 'muftiSiteDB';
const SESSION_KEY = 'muftiAdminSession';

const DEFAULT_DB = {
  scholar: {
    name_bn:       "মুফতি মুহাম্মদ আব্দুল লতিফ শেখ",
    name_ar:       "مفتي محمد عبد اللطيف شيخ",
    name_en:       "Mufti Muhammad Abdul Latif Shaikh",
    father:        "শেখ মুহাম্মদ হাবিবুর রহমান",
    mother:        "আখলিমা বেগম",
    dob:           "০১ মার্চ ১৯৮৩",
    nid:           "9565493948",
    mobile:        "+8801914387913",
    present_addr:  "৮/জি, টাস টাওয়ার, পূর্ব-বক্সনগর, সারুলিয়া, ডেমরা, ঢাকা-১৩৬১",
    permanent_addr:"গ্রাম: পাংখারচর, পো: তারাইল বাজার, থানা: কাশিয়ানী, জেলা: গোপালগঞ্জ",
    nationality:   "বাংলাদেশী",
    religion:      "ইসলাম",
    bio_short:     "বিশিষ্ট ইসলামি গবেষক, মুহাদ্দিস, শিক্ষক, লেখক ও বিভাগীয় সম্পাদক",
    tagline:       "Research • Fatwa • Education • Guidance"
  },

  education: [
    { id:1, exam:"এম.ফিল", board:"জগন্নাথ বিশ্ববিদ্যালয়", year:"২০২২", result:"এওয়ার্ডপ্রাপ্ত" },
    { id:2, exam:"মাস্টার্স (ইসলামিক স্টাডিজ)", board:"এশিয়ান ইউনিভার্সিটি অব বাংলাদেশ", year:"২০০৮", result:"১ম শ্রেণিতে ১ম" },
    { id:3, exam:"বি.এ অনার্স (ইসলামিক স্টাডিজ)", board:"এশিয়ান ইউনিভার্সিটি অব বাংলাদেশ", year:"২০০৭", result:"১ম শ্রেণিতে ১ম" },
    { id:4, exam:"কামিল (হাদিস)", board:"বিএমইবি", year:"২০০৫", result:"১ম শ্রেণিতে ৫ম" },
    { id:5, exam:"কামিল (ফিকহ)", board:"বিএমইবি", year:"২০০৩", result:"১ম শ্রেণিতে ১ম" },
    { id:6, exam:"ফাযিল", board:"বিএমইবি", year:"২০০১", result:"১ম বিভাগ (৬ষ্ঠ স্থান)" },
    { id:7, exam:"আলিম", board:"বিএমইবি", year:"১৯৯৯", result:"১ম বিভাগ (১১শ স্থান)" },
    { id:8, exam:"দাখিল", board:"বিএমইবি", year:"১৯৯৭", result:"১ম বিভাগ (৭ম স্থান)" }
  ],

  career: [
    { id:1, title:"প্রধান মুহাদ্দিস ও বিভাগীয় প্রধান (আল-হাদিস বিভাগ)", org:"দারুননাজাত সিদ্দিকীয়া কামিল মাদরাসা", period:"২০০৬ – বর্তমান" },
    { id:2, title:"পরিচালক (অতিরিক্ত দায়িত্ব)", org:"দারুননাজাত তাখসিসি মাদরাসা", period:"চলমান" },
    { id:3, title:"খতিব", org:"উলন মাদবর বাড়ি জামে মসজিদ, রামপুরা, ঢাকা", period:"চলমান" },
    { id:4, title:"পাঠ্যপুস্তক লেখক ও প্রশ্নপত্র মডারেটর", org:"বাংলাদেশ মাদরাসা শিক্ষা বোর্ড", period:"চলমান" },
    { id:5, title:"বিষয় বিশেষজ্ঞ (মাদরাসা)", org:"জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড", period:"চলমান" },
    { id:6, title:"বিভাগীয় সম্পাদক", org:"মাসিক নতুন বিকাশ", period:"চলমান" },
    { id:7, title:"সম্পাদকের উপদেষ্টা", org:"ত্রৈমাসিক সওতুন নাজাত (আরবি পত্রিকা)", period:"চলমান" }
  ],

  stats: { fatwas:10, articles:4, books:4, videos:3, experience:40 },

  site: {
    name:    "মুফতি মুহাম্মদ আব্দুল লতিফ শেখ",
    tagline: "Research • Fatwa • Education • Guidance",
    email:   "info@latif-shaikh.com",
    phone:   "+880 1914-387913",
    address: "৮/জি, টাস টাওয়ার, পূর্ব-বক্সনগর, সারুলিয়া, ডেমরা, ঢাকা-১৩৬১",
    office_hours: "শনি–বুধ: সকাল ৯টা – বিকাল ৫টা"
  },

  categories: [
    {slug:'আকিদাহ',     name:'আকিদাহ',            icon:'🕌', desc:'বিশ্বাস ও মতাদর্শ বিষয়ক ফতোয়া'},
    {slug:'তাহারাহ',    name:'তাহারাহ ও নামায',   icon:'💧', desc:'পবিত্রতা ও নামায বিষয়ক ফতোয়া'},
    {slug:'যাকাত',      name:'যাকাত ও সদকা',      icon:'🌙', desc:'যাকাত ও দান সদকা বিষয়ক ফতোয়া'},
    {slug:'সিয়াম',     name:'সিয়াম ও হজ',        icon:'⭐', desc:'রোজা ও হজ বিষয়ক ফতোয়া'},
    {slug:'মুআমালাত',   name:'মুআমালাত',           icon:'🤝', desc:'লেনদেন ও চুক্তি বিষয়ক ফতোয়া'},
    {slug:'পারিবারিক',  name:'পারিবারিক বিষয়',    icon:'👨‍👩‍👧', desc:'বিবাহ, তালাক, মিরাস বিষয়ক ফতোয়া'},
    {slug:'ব্যবসা',     name:'ব্যবসা ও ব্যাংকিং', icon:'💼', desc:'ব্যবসা ও অর্থনীতি বিষয়ক ফতোয়া'},
    {slug:'সমসাময়িক',  name:'সমসাময়িক মাসায়েল', icon:'🌐', desc:'আধুনিক সমস্যার ইসলামি সমাধান'}
  ],

  fatwas: [
    { id:1, question:"মোবাইল ব্যাংকিংয়ে সুদের হার থেকে আয় কি হালাল?", category:"মুআমালাত", date:"১৫ অক্টো ২০২৪", views:3240, status:"published",
      answer:"মোবাইল ব্যাংকিং সেবায় প্রদত্ত সুদ গ্রহণ করা হারাম। কারণ ইসলামে সুদ (রিবা) সম্পূর্ণ নিষিদ্ধ। আল্লাহ তাআলা কুরআনে সুদকে স্পষ্টভাবে হারাম ঘোষণা করেছেন।",
      evidence:"সূরা বাকারা: ২৭৫, সহিহ বুখারি: ২০৮৬, মুসলিম: ১৫৯৮" },
    { id:2, question:"সেহরির শেষ সময় কখন? আজানের আগে নাকি পরে?", category:"সিয়াম", date:"২৮ সেপ ২০২৪", views:8900, status:"published",
      answer:"সেহরির শেষ সময় হলো সুবহে সাদিক পর্যন্ত। সুবহে সাদিক এবং আজানের মধ্যে সাধারণত ১০-১৫ মিনিটের পার্থক্য থাকে। তাই আজানের কমপক্ষে ১০ মিনিট আগে সেহরি খাওয়া বন্ধ করা উচিত।",
      evidence:"সূরা বাকারা: ১৮৭, তিরমিযি: ৭০৩" },
    { id:3, question:"ইন্স্যুরেন্স করা কি জায়েয?", category:"মুআমালাত", date:"১০ সেপ ২০২৪", views:5670, status:"published",
      answer:"প্রচলিত বীমায় সুদ ও জুয়ার উপাদান থাকায় তা জায়েয নয়। তবে তাকাফুল (ইসলামি বীমা) গ্রহণযোগ্য।",
      evidence:"সূরা মায়েদা: ৯০, বাদায়িউস সানায়ে: ৫/১২৮" },
    { id:4, question:"তালাকের পর ইদ্দতের মেয়াদ কতদিন?", category:"পারিবারিক", date:"৫ সেপ ২০২৪", views:4120, status:"published",
      answer:"তালাকপ্রাপ্তা নারীর ইদ্দত তিন হায়েয। যদি সে হায়েয না দেখে, তাহলে তিন মাস। গর্ভবতী হলে সন্তান প্রসব পর্যন্ত।",
      evidence:"সূরা বাকারা: ২২৮, সূরা তালাক: ৪" },
    { id:5, question:"যাকাতের নিসাব কত?", category:"যাকাত", date:"২০ আগ ২০২৪", views:6200, status:"published",
      answer:"স্বর্ণের ক্ষেত্রে ৭.৫ তোলা এবং রুপার ক্ষেত্রে ৫২.৫ তোলা নিসাব। নগদ টাকার ক্ষেত্রে রুপার নিসাব হিসেবে বাজার মূল্য গণনা করতে হবে।",
      evidence:"সহিহ বুখারি: ১৪৪৭, মুসলিম: ৯৭৯" },
    { id:6, question:"নামাযে মোবাইল বাজলে নামায কি ভাঙে?", category:"তাহারাহ", date:"১৫ আগ ২০২৪", views:3890, status:"published",
      answer:"শুধু মোবাইল বাজলে নামায ভাঙে না। কিন্তু যদি উত্তর দেন বা কথা বলেন তাহলে নামায ভেঙে যাবে।",
      evidence:"সহিহ বুখারি: ১২১১, মুসলিম: ৫৩৮" },
    { id:7, question:"অনলাইনে কেনাবেচা কি জায়েয?", category:"ব্যবসা", date:"১০ আগ ২০২৪", views:5100, status:"published",
      answer:"অনলাইনে কেনাবেচা মূলত জায়েয, তবে শর্ত হলো পণ্যের বিবরণ সঠিক হতে হবে, প্রতারণামূলক বিজ্ঞাপন দেওয়া যাবে না।",
      evidence:"সহিহ বুখারি: ২০৭৯, সূরা নিসা: ২৯" },
    { id:8, question:"ক্রিপ্টোকারেন্সিতে বিনিয়োগ কি হালাল?", category:"সমসাময়িক", date:"৫ আগ ২০২৪", views:9800, status:"published",
      answer:"ক্রিপ্টোকারেন্সির বিষয়ে আলেমদের মধ্যে মতভেদ রয়েছে। অতিরিক্ত ঝুঁকিপূর্ণ ক্রিপ্টো এড়ানো উচিত।",
      evidence:"সূরা বাকারা: ২৭৫" },
    { id:9, question:"কুরবানীর পশু কেনার সময় কী দেখতে হবে?", category:"সিয়াম", date:"১ আগ ২০২৪", views:7200, status:"published",
      answer:"কুরবানীর পশু নিম্নোক্ত শর্ত পূরণ করতে হবে: ছাগল/ভেড়া ১ বছর, গরু/মহিষ ২ বছর, উট ৫ বছর বয়স হতে হবে।",
      evidence:"সহিহ মুসলিম: ১৯৬৩" },
    { id:10, question:"বাবা-মায়ের অবাধ্যতা কি কবিরা গুনাহ?", category:"আকিদাহ", date:"২৫ জুলাই ২০২৪", views:4500, status:"published",
      answer:"হ্যাঁ, বাবা-মায়ের অবাধ্যতা কবিরা গুনাহ। এটি শিরকের পরেই বড় গুনাহ।",
      evidence:"সূরা বনী ইসরাঈল: ২৩, সহিহ বুখারি: ৫৬২৬" }
  ],

  questions: [
    { id:1, name:"আমেনা বেগম", email:"amena@mail.com", subject:"সেহরির সময় নিয়ে প্রশ্ন", category:"সিয়াম", date:"৩০ মি. আগে", status:"new", detail:"সেহরির শেষ সময় নিয়ে বিস্তারিত জানতে চাই।" },
    { id:2, name:"মোহাম্মদ হাসান", email:"hasan@mail.com", subject:"ইন্স্যুরেন্স সম্পর্কে জিজ্ঞাসা", category:"মুআমালাত", date:"২ ঘণ্টা আগে", status:"new", detail:"স্বাস্থ্য বীমা করা যাবে কিনা জানতে চাই।" },
    { id:3, name:"গোপনীয়", email:"", subject:"তালাকের বিষয়ে জিজ্ঞাসা", category:"পারিবারিক", date:"গতকাল", status:"pending", detail:"তিন তালাক একসাথে দিলে কি হয়?" },
    { id:4, name:"রফিকুল ইসলাম", email:"rafiq@mail.com", subject:"যাকাতের নিসাব", category:"যাকাত", date:"২ দিন আগে", status:"answered", detail:"স্বর্ণে যাকাতের নিসাব কত?" },
    { id:5, name:"নাসরিন আক্তার", email:"nasrin@mail.com", subject:"নামাযের ওয়াক্ত", category:"তাহারাহ", date:"৩ দিন আগে", status:"answered", detail:"আসরের নামাযের শেষ ওয়াক্ত কখন?" }
  ],

  articles: [
    { id:1, title:"আধুনিক ব্যাংকিং ব্যবস্থায় সুদ এবং ইসলামি বিকল্প", category:"সমসাময়িক", date:"১৫ অক্টো ২০২৪", views:2340, status:"published",
      excerpt:"বর্তমান বিশ্বে ইসলামি অর্থনীতির প্রাসঙ্গিকতা এবং সুদমুক্ত ব্যাংকিং ব্যবস্থার দিকনির্দেশনা।",
      content:"বর্তমান বিশ্বে ইসলামি অর্থনীতির প্রাসঙ্গিকতা দিন দিন বৃদ্ধি পাচ্ছে। সুদভিত্তিক প্রচলিত ব্যাংকিং ব্যবস্থার পরিবর্তে ইসলামি শরীয়াহ মোতাবেক পরিচালিত ব্যাংকিং ব্যবস্থা এখন বিশ্বব্যাপী জনপ্রিয়তা অর্জন করছে। মুদারাবা, মুশারাকা, ইজারা ইত্যাদি পদ্ধতিতে গ্রাহকদের অর্থায়ন প্রদান করা হয়, যেখানে সুদের পরিবর্তে লাভ-ক্ষতির অংশীদারিত্ব থাকে।",
      pdf_url:"", file_name:"" },
    { id:2, title:"ডিজিটাল যুগে যাকাত প্রদানের শরঈ পদ্ধতি", category:"ফিকহ", date:"৮ সেপ ২০২৪", views:1870, status:"published",
      excerpt:"অনলাইনে যাকাত প্রদান এবং ক্রিপ্টোকারেন্সিতে যাকাতের বিধান নিয়ে আলোচনা।",
      content:"আধুনিক ডিজিটাল প্রযুক্তির যুগে যাকাত প্রদানের পদ্ধতিও পরিবর্তিত হয়েছে। অনলাইন পেমেন্ট গেটওয়ে, মোবাইল ব্যাংকিং এবং বিভিন্ন ডিজিটাল মাধ্যমে যাকাত প্রদান এখন সহজ হয়েছে।",
      pdf_url:"", file_name:"" },
    { id:3, title:"তাওহিদের আলোকে মুসলিম সমাজের চ্যালেঞ্জ", category:"আকিদাহ", date:"২ সেপ ২০২৪", views:3100, status:"published",
      excerpt:"আধুনিকতার চ্যালেঞ্জ মোকাবেলায় ইসলামি আকিদার দৃষ্টিভঙ্গি।",
      content:"বর্তমান যুগে মুসলিম সমাজ নানাবিধ চ্যালেঞ্জের সম্মুখীন। বস্তুবাদী চিন্তাধারা থেকে নিজেদের ঈমান-আকিদা রক্ষা করা একজন মুসলিমের জন্য অত্যন্ত গুরুত্বপূর্ণ দায়িত্ব।",
      pdf_url:"", file_name:"" },
    { id:4, title:"ইসলামি পোশাক বিধি ও আধুনিক ফ্যাশন", category:"সমসাময়িক", date:"২০ জুলাই ২০২৪", views:1450, status:"published",
      excerpt:"পর্দা ও শালীনতার ইসলামি নীতিমালা আধুনিক প্রেক্ষাপটে।",
      content:"ইসলামে পোশাক পরিধানের ক্ষেত্রে কিছু নির্দিষ্ট নীতিমালা রয়েছে যা শালীনতা ও পর্দা রক্ষা করে। আধুনিক ফ্যাশন ট্রেন্ডের সাথে তাল মিলিয়ে এই নীতিমালাগুলো মেনে চলা সম্ভব।",
      pdf_url:"", file_name:"" }
  ],

  books: [
    { id:1, title_bn:"সমসাময়িক ফতোয়া সংকলন", title_ar:"فتاوى العصرية", edition:"৩য়", pages:480, year:"২০২০", status:"published",
      desc:"আধুনিক যুগের বিভিন্ন মাসায়েলের বিস্তারিত সমাধান সংবলিত এই গ্রন্থটি বাংলাদেশের ইসলামি শিক্ষার্থীদের জন্য অপরিহার্য।",
      toc:["সুদ ও ব্যাংকিং","বীমার বিধান","ডিজিটাল লেনদেন","পারিবারিক মাসায়েল","সমসাময়িক চ্যালেঞ্জ"],
      pdf_url:"", file_name:"", read_url:"", cover_color:0 },
    { id:2, title_bn:"যাকাতের বিধানাবলী", title_ar:"أحكام الزكاة", edition:"২য়", pages:320, year:"২০১৮", status:"published",
      desc:"কুরআন, হাদিস ও ফিকহের আলোকে যাকাতের সকল মাসায়েলের সমন্বিত ও বিস্তারিত আলোচনা।",
      toc:["যাকাতের ফরযিয়ত","নিসাবের বিবরণ","যাকাতের খাত","আধুনিক সম্পদে যাকাত","ফিতরা"],
      pdf_url:"", file_name:"", read_url:"", cover_color:1 },
    { id:3, title_bn:"ইসলামি পারিবারিক আইন", title_ar:"أحكام الأسرة", edition:"১ম", pages:560, year:"২০২২", status:"published",
      desc:"বিবাহ, তালাক, খোলা, মিরাস সহ পারিবারিক বিষয়াদির সমগ্র আলোচনা কুরআন ও সুন্নাহর দলিলসহ।",
      toc:["বিবাহের বিধান","তালাকের প্রকারভেদ","ইদ্দত","মিরাস বণ্টন","শিশু অভিভাবকত্ব"],
      pdf_url:"", file_name:"", read_url:"", cover_color:2 },
    { id:4, title_bn:"ইসলামি অর্থনীতি ও ব্যবসা বিধি", title_ar:"الفقه المعاملات", edition:"২য়", pages:410, year:"২০২১", status:"published",
      desc:"হালাল উপার্জন, বিনিয়োগ ও ব্যবসার শরঈ নিয়মকানুনের বিস্তারিত বিবরণ আধুনিক দৃষ্টিকোণে।",
      toc:["হালাল উপার্জন","ইসলামি ব্যাংকিং","শেয়ার বাজার","অংশীদারিত্ব","ই-কমার্স"],
      pdf_url:"", file_name:"", read_url:"", cover_color:3 }
  ],

  videos: [
    { id:1, title:"রমজানের ফজিলত ও করণীয় — বিস্তারিত বয়ান", type:"YouTube", duration:"৪৫:২২", views:12450, date:"১০ মার্চ ২০২৪", category:"সিয়াম", yt_url:"" },
    { id:2, title:"পারিবারিক জীবনে ইসলামের শিক্ষা", type:"YouTube", duration:"১:১২:০৮", views:8730, date:"১৫ ফেব ২০২৪", category:"পারিবারিক", yt_url:"" },
    { id:3, title:"হজ ও উমরাহর মাসায়েল — প্রশ্নোত্তর পর্ব", type:"YouTube", duration:"৩২:১৫", views:23120, date:"৫ জান ২০২৪", category:"হজ", yt_url:"" }
  ],

  users: [
    { id:1, name:"System Admin", email:"admin@latif-shaikh.com", password:"admin123", role:"super_admin", role_label:"সুপার অ্যাডমিন", joined:"১ জান ২০২৩", status:"active" },
    { id:2, name:"মুফতি মুহাম্মদ আব্দুল লতিফ শেখ", email:"mufti@latif-shaikh.com", password:"mufti123", role:"mufti", role_label:"মুফতি", joined:"১ জান ২০২৩", status:"active" },
    { id:3, name:"এডিটর ১", email:"editor@latif-shaikh.com", password:"editor123", role:"editor", role_label:"এডিটর", joined:"১৫ মার্চ ২০২৩", status:"active" }
  ]
};

const SiteDB = {
  _load() {
    try {
      const raw = localStorage.getItem(DB_KEY);
      return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_DB));
    } catch { return JSON.parse(JSON.stringify(DEFAULT_DB)); }
  },
  _save(db) {
    try { localStorage.setItem(DB_KEY, JSON.stringify(db)); return true; }
    catch(e) { console.error('Storage error:', e); return false; }
  },
  get() { return this._load(); },
  set(db) { return this._save(db); },
  reset() { this._save(JSON.parse(JSON.stringify(DEFAULT_DB))); return this._load(); },
  list(col) { return (this._load()[col] || []); },
  findById(col,id) { return this.list(col).find(r => r.id === id) || null; },
  save(col, record) {
    const db = this._load();
    const arr = db[col] || [];
    const idx = arr.findIndex(r => r.id === record.id);
    if (idx >= 0) arr[idx] = record;
    else { record.id = arr.length ? Math.max(...arr.map(r=>r.id))+1 : 1; arr.push(record); }
    db[col] = arr;
    this._save(db);
    return record;
  },
  delete(col, id) {
    const db = this._load();
    db[col] = (db[col]||[]).filter(r => r.id !== id);
    this._save(db);
  },
  incrementView(col, id) {
    const db = this._load();
    const idx = (db[col]||[]).findIndex(r => r.id === id);
    if (idx >= 0) { db[col][idx].views = (db[col][idx].views||0) + 1; this._save(db); }
  },
  updateScalar(key, val) {
    const db = this._load();
    db[key] = val;
    this._save(db);
  },
  login(email, password) {
    const db = this._load();
    const user = (db.users||[]).find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.status === 'active');
    if (!user) return null;
    return { loggedIn:true, id:user.id, name:user.name, email:user.email, role:user.role, roleLabel:user.role_label, loginTime:Date.now() };
  },
  setSession(session, remember) {
    const str = JSON.stringify(session);
    if (remember) localStorage.setItem(SESSION_KEY, str);
    else sessionStorage.setItem(SESSION_KEY, str);
  },
  getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      return s.loggedIn ? s : null;
    } catch { return null; }
  },
  logout() {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  }
};

window.SiteDB = SiteDB;

// Best-effort client hardening (not a real security boundary, but deters casual snooping)
(function(){
  document.addEventListener('contextmenu', function(e){
    if (window.__allowContextMenu) return;
    e.preventDefault();
  });
  document.addEventListener('keydown', function(e){
    const k = e.key;
    if (k === 'F12') e.preventDefault();
    if (e.ctrlKey && e.shiftKey && (k === 'I' || k === 'J' || k === 'C')) e.preventDefault();
    if (e.ctrlKey && k === 'U') e.preventDefault();
  });
})();
