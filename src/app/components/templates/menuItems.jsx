import * as Uil from "@iconscout/react-unicons";

const menuItems = [
  {
    name: "Exploit Tools",
    icon: Uil.UilWrench,
    key: "exploit",
    links: [
      { href: "/exploit/csrf", label: "CSRF Online" },
      { href: "/exploit/masscsrf", label: "Mass CSRF" },
      { href: "/exploit/adfin", label: "Admin Finder" },
      { href: "/exploit/perlalfa", label: "Perl.alfa RCE" },
      { href: "/exploit/pyalfa", label: "Py.alfa RCE" },
      { href: "/exploit/cve202444000", label: "CVE-2024-44000" },
    ],
  },
  {
    name: "Programmer Tools",
    icon: Uil.UilBracketsCurly,
    key: "programmer",
    links: [
      { href: "/programmer/phobfus", label: "PHP Obfuscator" },
      { href: "/programmer/htmlesc", label: "HTML Escaper" },
      { href: "/programmer/bladeformat", label: "Blade Formatter" },
    ],
  },
  {
    name: "Lookup Tools",
    icon: Uil.UilSearch,
    key: "lookup",
    links: [{ href: "/lookup/httphit", label: "HTTP Hit" }],
  },
  {
    name: "Image Tools",
    icon: Uil.UilCamera,
    key: "image",
    links: [{ href: "/image/waifu", label: "Gacha Waifu" }],
  },
  {
    name: "Random Tools",
    icon: Uil.UilPuzzlePiece,
    key: "random",
    links: [
      { href: "/random/warandom", label: "Wa Random" },
      { href: "/random/roaster", label: "Roaster" },
      { href: "/random/urlopen", label: "URL Opener" },
      { href: "/random/check-power", label: "Check Power" },
      { href: "/random/love-rate", label: "Love Rate" },
      { href: "/random/dukun", label: "Dukun Zodiak" },
    ],
  },
  {
    name: "Checker Tools",
    icon: Uil.UilCheck,
    key: "checker",
    links: [
      { href: "/checker/webshell", label: "Checker Webshell" },
      { href: "/checker/paket", label: "Resi Tracker" },
      { href: "/checker/mahasiswa", label: "Mahasiswa & Dosen" },
    ],
  },
  {
    name: "Generator Tools",
    icon: Uil.UilProcess,
    key: "generator",
    links: [
      { href: "/generator/jsogen", label: "JSO Generator" },
      { href: "/generator/gdrivegen", label: "GDrive Generator" },
      { href: "/generator/qrcode", label: "QRCode Generator" },
      { href: "/generator/shorturl", label: "URL Shortener" },
      { href: "/generator/lengthurl", label: "URL Lengthener" },
      { href: "/generator/fakebca", label: "Fake Saldo BCA" },
      { href: "/generator/fakedana", label: "Fake Saldo DANA" },
      { href: "/generator/fakebni", label: "Fake Saldo BNI" },
      { href: "/generator/fakemandiri", label: "Fake Saldo Mandiri" },
    ],
  },
  {
    name: "Word Tools",
    icon: Uil.UilPen,
    key: "word",
    links: [
      { href: "/word/caseconverter", label: "Word Case-er" },
      { href: "/word/wordcounter", label: "Word Counter" },
      { href: "/word/parafrase", label: "Parafrase AI" },
    ],
  },
  {
    name: "Download Tools",
    icon: Uil.UilImport,
    key: "download",
    links: [
      { href: "/download/tiktok", label: "TikTok Downloader" },
      { href: "/download/igreel", label: "Instagram Reel" },
    ],
  },
];

export default menuItems;
