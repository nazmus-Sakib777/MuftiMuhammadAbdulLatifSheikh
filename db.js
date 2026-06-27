// ============================================================
//  db.js  —  Shared localStorage "database" layer
//  All pages import this. Admin writes, frontend reads.
// ============================================================

const DB_KEY = 'muftiSiteDB';

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
    { id:1, exam:"এম.ফিল",      board:"জগন্নাথ বিশ্ববিদ্যালয়",                year:"২০২২", result:"এওয়ার্ডপ্রাপ্ত" },
    { id:2, exam:"মাস্টার্স (ইসলামিক স্টাডিজ)", board:"এশিয়ান ইউনিভার্সিটি অব বাংলাদেশ", year:"২০০৮", result:"১ম শ্রেণিতে ১ম" },
    { id:3, exam:"বি.এ অনার্স (ইসলামিক স্টাডিজ)", board:"এশিয়ান ইউনিভার্সিটি অব বাংলাদেশ", year:"২০০৭", result:"১ম শ্রেণিতে ১ম" },
    { id:4, exam:"কামিল (হাদিস)",  board:"বিএমইবি",  year:"২০০৫", result:"১ম শ্রেণিতে ৫ম" },
    { id:5, exam:"কামিল (ফিকহ)",   board:"বিএমইবি",  year:"২০০৩", result:"১ম শ্রেণিতে ১ম" },
    { id:6, exam:"ফাযিল",          board:"বিএমইবি",  year:"২০০১", result:"১ম বিভাগ (৬ষ্ঠ স্থান)" },
    { id:7, exam:"আলিম",           board:"বিএমইবি",  year:"১৯৯৯", result:"১ম বিভাগ (১১শ স্থান)" },
    { id:8, exam:"দাখিল",          board:"বিএমইবি",  year:"১৯৯৭", result:"১ম বিভাগ (৭ম স্থান)" }
  ],

  career: [
    { id:1, title:"প্রধান মুহাদ্দিস ও বিভাগীয় প্রধান (আল-হাদিস বিভাগ)", org:"দারুননাজাত সিদ্দিকীয়া কামিল মাদরাসা", period:"২০০৬ – বর্তমান" },
    { id:2, title:"পরিচালক (অতিরিক্ত দায়িত্ব)",                            org:"দারুননাজাত তাখসিসি মাদরাসা",          period:"চলমান" },
    { id:3, title:"খতিব",                                                    org:"উলন মাদবর বাড়ি জামে মসজিদ, রামপুরা, ঢাকা", period:"চলমান" },
    { id:4, title:"পাঠ্যপুস্তক লেখক ও প্রশ্নপত্র মডারেটর",                 org:"বাংলাদেশ মাদরাসা শিক্ষা বোর্ড",         period:"চলমান" },
    { id:5, title:"বিষয় বিশেষজ্ঞ (মাদরাসা)",                               org:"জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড",  period:"চলমান" },
    { id:6, title:"বিভাগীয় সম্পাদক",                                        org:"মাসিক নতুন বিকাশ",                       period:"চলমান" },
    { id:7, title:"সম্পাদকের উপদেষ্টা",                                      org:"ত্রৈমাসিক সওতুন নাজাত (আরবি পত্রিকা)",   period:"চলমান" }
  ],

  stats: { fatwas:4800, articles:320, books:28, videos:650, experience:40 },

  site: {
    name:    "মুফতি মুহাম্মদ আব্দুল লতিফ শেখ",
    tagline: "Research • Fatwa • Education • Guidance",
    email:   "info@latif-shaikh.com",
    phone:   "+880 1914-387913",
    address: "৮/জি, টাস টাওয়ার, পূর্ব-বক্সনগর, সারুলিয়া, ডেমরা, ঢাকা-১৩৬১",
    office_hours: "শনি–বুধ: সকাল ৯টা – বিকাল ৫টা"
  },

  fatwas: [
    { id:1, question:"মোবাইল ব্যাংকিংয়ে সুদের হার থেকে আয় কি হালাল?",      category:"মুআমালাত",    date:"১৫ অক্টো ২০২৪", views:3240, status:"published",
      answer:"মোবাইল ব্যাংকিং সেবায় প্রদত্ত সুদ গ্রহণ করা হারাম। কারণ ইসলামে সুদ (রিবা) সম্পূর্ণ নিষিদ্ধ।",
      evidence:"সূরা বাকারা: ২৭৫, সহিহ বুখারি: ২০৮৬" },
    { id:2, question:"সেহরির শেষ সময় কখন? আজানের আগে নাকি পরে?",           category:"সিয়াম",       date:"২৮ সেপ ২০২৪",   views:8900, status:"published",
      answer:"সেহরির শেষ সময় হলো সুবহে সাদিক পর্যন্ত। আজানের কিছু আগেই সুবহে সাদিক হয়।",
      evidence:"সূরা বাকারা: ১৮৭, তিরমিযি: ৭০৩" },
    { id:3, question:"ইন্স্যুরেন্স করা কি জায়েয?",                            category:"মুআমালাত",    date:"১০ সেপ ২০২৪",   views:5670, status:"published",
      answer:"প্রচলিত বীমায় সুদ ও জুয়ার উপাদান থাকায় জায়েয নয়। তবে তাকাফুল গ্রহণযোগ্য।",
      evidence:"সূরা মায়েদা: ৯০" },
    { id:4, question:"তালাকের পর ইদ্দতের মেয়াদ কতদিন?",                      category:"পারিবারিক",   date:"৫ সেপ ২০২৪",    views:4120, status:"published",
      answer:"তালাকপ্রাপ্তা নারীর ইদ্দত তিন হায়েয বা তিন মাস।",
      evidence:"সূরা বাকারা: ২২৮" },
    { id:5, question:"শেয়ার বাজারে বিনিয়োগ কি হালাল?",                       category:"ব্যবসা",       date:"১ সেপ ২০২৪",    views:2980, status:"pending",
      answer:"", evidence:"" },
    { id:6, question:"ক্রিপ্টোকারেন্সির ইসলামি বিধান কী?",                    category:"সমসাময়িক",   date:"২৫ আগ ২০২৪",    views:7650, status:"draft",
      answer:"", evidence:"" }
  ],

  questions: [
    { id:1, name:"আমেনা বেগম",      email:"amena@mail.com",  subject:"সেহরির সময় নিয়ে প্রশ্ন",      category:"সিয়াম",     date:"৩০ মি. আগে",  status:"new",      detail:"সেহরির শেষ সময় নিয়ে বিস্তারিত জানতে চাই।" },
    { id:2, name:"মোহাম্মদ হাসান",  email:"hasan@mail.com",  subject:"ইন্স্যুরেন্স সম্পর্কে জিজ্ঞাসা", category:"মুআমালাত",  date:"২ ঘণ্টা আগে", status:"new",      detail:"স্বাস্থ্য বীমা করা যাবে কিনা জানতে চাই।" },
    { id:3, name:"গোপনীয়",          email:"",                subject:"তালাকের বিষয়ে জিজ্ঞাসা",        category:"পারিবারিক", date:"গতকাল",       status:"pending",  detail:"তিন তালাক একসাথে দিলে কি হয়?" },
    { id:4, name:"রফিকুল ইসলাম",    email:"rafiq@mail.com",  subject:"যাকাতের নিসাব",                  category:"যাকাত",     date:"২ দিন আগে",  status:"answered", detail:"স্বর্ণে যাকাতের নিসাব কত?" },
    { id:5, name:"নাসরিন আক্তার",   email:"nasrin@mail.com", subject:"নামাযের ওয়াক্ত",                 category:"তাহারাহ",   date:"৩ দিন আগে",  status:"answered", detail:"আসরের নামাযের শেষ ওয়াক্ত কখন?" }
  ],

  articles: [
    { id:1, title:"আধুনিক ব্যাংকিং ব্যবস্থায় সুদ এবং ইসলামি বিকল্প",   category:"সমসাময়িক", date:"১৫ অক্টো ২০২৪", views:2340, status:"published",
      excerpt:"বর্তমান বিশ্বে ইসলামি অর্থনীতির প্রাসঙ্গিকতা এবং সুদমুক্ত ব্যাংকিং ব্যবস্থার দিকনির্দেশনা।" },
    { id:2, title:"ডিজিটাল যুগে যাকাত প্রদানের শরঈ পদ্ধতি",            category:"ফিকহ",       date:"৮ সেপ ২০২৪",    views:1870, status:"published",
      excerpt:"অনলাইনে যাকাত প্রদান এবং ক্রিপ্টোকারেন্সিতে যাকাতের বিধান নিয়ে আলোচনা।" },
    { id:3, title:"তাওহিদের আলোকে মুসলিম সমাজের চ্যালেঞ্জ",            category:"আকিদাহ",    date:"২ সেপ ২০২৪",    views:3100, status:"published",
      excerpt:"আধুনিকতার চ্যালেঞ্জ মোকাবেলায় ইসলামি আকিদার দৃষ্টিভঙ্গি।" },
    { id:4, title:"ইসলামি পোশাক বিধি ও আধুনিক ফ্যাশন",                 category:"সমসাময়িক", date:"খসড়া",           views:0,    status:"draft",
      excerpt:"" }
  ],

  books: [
    { id:1, title_bn:"সমসাময়িক ফতোয়া সংকলন", title_ar:"فتاوى العصرية",     edition:"৩য়", pages:480, year:"২০২০", status:"published",
      desc:"আধুনিক যুগের বিভিন্ন মাসায়েলের বিস্তারিত সমাধান সংবলিত গ্রন্থ।" },
    { id:2, title_bn:"যাকাতের বিধানাবলী",       title_ar:"أحكام الزكاة",       edition:"২য়", pages:320, year:"২০১৮", status:"published",
      desc:"কুরআন, হাদিস ও ফিকহের আলোকে যাকাতের সকল মাসায়েল।" },
    { id:3, title_bn:"ইসলামি পারিবারিক আইন",    title_ar:"أحكام الأسرة",       edition:"১ম", pages:560, year:"২০২২", status:"published",
      desc:"বিবাহ, তালাক, মিরাস সহ পারিবারিক বিষয়াদির সমগ্র আলোচনা।" },
    { id:4, title_bn:"ইসলামি অর্থনীতি ও ব্যবসা বিধি", title_ar:"الفقه المعاملات", edition:"২য়", pages:410, year:"২০২১", status:"published",
      desc:"হালাল উপার্জন, বিনিয়োগ ও ব্যবসার শরঈ নিয়মকানুন।" }
  ],

  videos: [
    { id:1, title:"রমজানের ফজিলত ও করণীয় — বিস্তারিত বয়ান", type:"YouTube", duration:"৪৫:২২", views:12450, date:"১০ মার্চ ২০২৪", yt_id:"" },
    { id:2, title:"পারিবারিক জীবনে ইসলামের শিক্ষা",            type:"YouTube", duration:"১:১২:০৮", views:8730,  date:"১৫ ফেব ২০২৪",  yt_id:"" },
    { id:3, title:"হজ ও উমরাহর মাসায়েল — প্রশ্নোত্তর পর্ব",   type:"YouTube", duration:"৩২:১৫", views:23120, date:"৫ জান ২০২৪",   yt_id:"" }
  ],

  users: [
    { id:1, name:"System Admin",                          email:"admin@latif-shaikh.com",  role:"super_admin", role_label:"সুপার অ্যাডমিন", joined:"১ জান ২০২৩", status:"active" },
    { id:2, name:"মুফতি মুহাম্মদ আব্দুল লতিফ শেখ",      email:"mufti@latif-shaikh.com",  role:"mufti",       role_label:"মুফতি",          joined:"১ জান ২০২৩", status:"active" },
    { id:3, name:"এডিটর ১",                              email:"editor1@latif-shaikh.com", role:"editor",     role_label:"এডিটর",          joined:"১৫ মার্চ ২০২৩", status:"active" },
    { id:4, name:"এডিটর ২",                              email:"editor2@latif-shaikh.com", role:"editor",     role_label:"এডিটর",          joined:"১ জুন ২০২৩",  status:"inactive" }
  ]
};

// ── Public API ──────────────────────────────────────────────
const SiteDB = {
  _load() {
    try {
      const raw = localStorage.getItem(DB_KEY);
      return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_DB));
    } catch { return JSON.parse(JSON.stringify(DEFAULT_DB)); }
  },
  _save(db) { localStorage.setItem(DB_KEY, JSON.stringify(db)); },

  get()            { return this._load(); },
  set(db)          { this._save(db); },
  reset()          { this._save(JSON.parse(JSON.stringify(DEFAULT_DB))); return this._load(); },

  // Generic collection helpers
  list(col)        { return (this._load()[col] || []); },
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

  updateScalar(key, val) {
    const db = this._load();
    db[key] = val;
    this._save(db);
  }
};

// Expose globally
window.SiteDB = SiteDB;
