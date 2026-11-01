import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = 'allam1768';
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/projects.json');

const MARKED_REPOS = new Set([
  'solat',
  'E-Report',
  'izin_app',
  'Nongkrong.id',
  'Hamatech',
  'Web-portoup',
  'movapp',
  'MyIDN_app',
  'Laravel-13-E-Commerce-Project',
  'Space-and-Plane-Calculator',
  'Web-porto',
]);

const MARKED_TOPICS = new Set([
  'portfolio-project',
  'agency',
  'putraalabs',
  'showcase',
  'featured'
]);

const IGNORED_NAME_PATTERNS = [
  /^tugas/i,
  /^latian/i,
  /^pas1/i,
  /^bmi$/i,
  /^client$/i,
  /^admin$/i,
  /^worker$/i,
  /^inherited$/i,
  /^project-yt$/i,
  /^allam1768$/i,
];

const PROJECT_IMAGES = {
  'solat': '/projects/solat.png',
  'E-Report': '/projects/ereport.png',
  'izin_app': '/projects/izinapp.png',
  'Nongkrong.id': '/projects/nongkrong.png',
  'Web-portoup': '/projects/webportoup.png',
  'Hamatech': '/projects/hamatech.webp',
  'movapp': '/projects/movapp.webp',
  'MyIDN_app': '/projects/myidn.png',
  'Laravel-13-E-Commerce-Project': '/projects/ecommerce.png',
  'Space-and-Plane-Calculator': '/projects/calculator.webp',
  'Web-porto': '/projects/webporto.png',
};

const DISPLAY_NAME_MAP = {
  'solat': {
    title: 'Solat App — Prayer Guardian',
    category: 'mobile',
    desc: 'Aplikasi pengingat waktu salat presisi berbasis Flutter dengan integrasi API Aladhan, alarm native Android, dan fitur smart overlay.'
  },
  'E-Report': {
    title: 'E-Report — Community Complaint System',
    category: 'web',
    desc: 'Sistem pelaporan aspirasi dan keluhan warga terintegrasi berbasis Laravel 12 dan Livewire 4 dengan verifikasi multi-role.'
  },
  'izin_app': {
    title: 'Surat Izin Mahasiswa IDN',
    category: 'mobile',
    desc: 'Platform otomasi perizinan santri/mahasiswa berbasis Flutter dengan kanvas tanda tangan digital interaktif dan dokumen PDF resmi.'
  },
  'Nongkrong.id': {
    title: 'NONGKRONG.id — Smart Cafe OS',
    category: 'web',
    desc: 'Platform point-of-sale dan manajemen operasional kafe terpadu dengan sinkronisasi inventaris waktu nyata.'
  },
  'Web-portoup': {
    title: 'a-lamp — Interactive Showcase',
    category: 'web',
    desc: 'Platform portofolio interaktif mutakhir berbasis Next.js 16, React 19, Tailwind CSS, dan integrasi GitHub API.'
  },
  'Hamatech': {
    title: 'Hamatech — Pest Control Monitor',
    category: 'mobile',
    desc: 'Aplikasi inspeksi dan pemantauan kendali hama terstruktur untuk perusahaan jasa pengendalian hama komersial.'
  },
  'movapp': {
    title: 'MovApp — Cinema Discovery & Catalog',
    category: 'mobile',
    desc: 'Aplikasi katalog dan penemuan film interaktif berbasis mobile dengan kurasi sinema terstruktur.'
  },
  'MyIDN_app': {
    title: 'MyIDN Mobile Companion',
    category: 'mobile',
    desc: 'Aplikasi portal akademik mahasiswa terintegrasi untuk kampus Politeknik IDN.'
  },
  'Laravel-13-E-Commerce-Project': {
    title: 'PulseCommerce — Modern E-Commerce',
    category: 'web',
    desc: 'Arsitektur toko daring skala penuh berbasis Laravel dengan integrasi gateway pembayaran dan manajemen stok.'
  },
  'Space-and-Plane-Calculator': {
    title: 'Space & Plane Calculator',
    category: 'other',
    desc: 'Utilitas komputasi geometri ruang dan bidang 2D/3D interaktif.'
  },
  'Web-porto': {
    title: 'Allam Personal Portfolio v1',
    category: 'web',
    desc: 'Edisi awal portofolio digital personal dengan showcase karya kreatif dan desain.'
  }
};

function isMarkedProject(repo) {
  if (repo.fork) return false;
  if (IGNORED_NAME_PATTERNS.some(p => p.test(repo.name))) return false;
  if (MARKED_REPOS.has(repo.name)) return true;
  if (repo.topics && repo.topics.some(t => MARKED_TOPICS.has(t.toLowerCase()))) return true;
  return false;
}

async function syncGithub() {
  console.log(`Mengambil repositori pilihan untuk @${GITHUB_USERNAME}...`);
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers: {
        'User-Agent': 'PutraaLabs-Sync',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    const repos = await res.json();
    const validRepos = repos.filter(isMarkedProject);

    const projects = validRepos.map(repo => {
      const customMeta = DISPLAY_NAME_MAP[repo.name];
      const category = customMeta?.category || 
        (repo.language === 'Dart' ? 'mobile' : repo.language === 'PHP' || repo.language === 'TypeScript' || repo.language === 'JavaScript' ? 'web' : 'other');

      const displayName = customMeta?.title || repo.name.replace(/[-_]/g, ' ');
      const description = customMeta?.desc || repo.description || 'Proyek rekayasa perangkat lunak terverifikasi.';
      const coverImage = PROJECT_IMAGES[repo.name] || `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`;

      return {
        id: repo.name,
        name: repo.name,
        displayName,
        description,
        category,
        topics: repo.topics && repo.topics.length > 0 ? repo.topics : [repo.language?.toLowerCase() || 'code'].filter(Boolean),
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        language: repo.language || 'Code',
        githubUrl: repo.html_url,
        homepageUrl: repo.homepage || null,
        coverImage,
        updatedAt: repo.updated_at ? repo.updated_at.split('T')[0] : '2026-10-01'
      };
    });

    const priority = ['solat', 'E-Report', 'izin_app', 'Nongkrong.id', 'Web-portoup', 'Hamatech', 'movapp', 'MyIDN_app'];
    projects.sort((a, b) => {
      const idxA = priority.indexOf(a.name);
      const idxB = priority.indexOf(b.name);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(projects, null, 2), 'utf-8');
    console.log(`Sukses menyaring & menyinkronkan ${projects.length} repositori pilihan ke ${OUTPUT_PATH}`);
  } catch (err) {
    console.error('Gagal sinkronisasi:', err.message);
  }
}

syncGithub();
