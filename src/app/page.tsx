import Image from "next/image";
import { getProjects } from "@/lib/github";
import ProjectList from "@/components/ProjectList";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-[#0C0C0E] text-[#111111] dark:text-[#F0F0F2] transition-colors">
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Sticky Identity & Manifesto) */}
          <aside className="lg:col-span-5 lg:sticky lg:top-20 space-y-12">
            {/* Brand Logo & Studio Identity */}
            <div className="space-y-6">
              <div className="inline-block">
                <Image
                  src="/logo.svg"
                  alt="PutraaLabs Logo"
                  width={150}
                  height={32}
                  className="h-8 w-auto dark:invert transition-all"
                  priority
                />
              </div>

              <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>STUDIO TERBUKA &bull; PROYEK BARU 2026</span>
              </div>
            </div>

            {/* Manifesto / Studio Statement */}
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Rekayasa piranti lunak presisi, transparan, dan terukur.
              </h1>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-normal">
                PutraaLabs adalah studio rekayasa digital independen yang membangun web aplikasi modern, aplikasi mobile tangguh, dan otomatisasi sistem terintegrasi. Seluruh proyek divalidasi langsung melalui basis kode sumber terbuka di GitHub.
              </p>
            </div>

            {/* Core Disciplines */}
            <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Disiplin Rekayasa
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-neutral-400 text-xs mt-0.5">01</span>
                  <div>
                    <strong className="font-semibold block text-neutral-900 dark:text-neutral-100">Fullstack Web Systems</strong>
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">Laravel 12, Next.js 16, Livewire, MariaDB, PostgreSQL.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-neutral-400 text-xs mt-0.5">02</span>
                  <div>
                    <strong className="font-semibold block text-neutral-900 dark:text-neutral-100">Native & Cross-Platform Mobile</strong>
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">Flutter, Riverpod, Kotlin Native Overlay, Background Guardian.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-neutral-400 text-xs mt-0.5">03</span>
                  <div>
                    <strong className="font-semibold block text-neutral-900 dark:text-neutral-100">Automation & Cloud Deploy</strong>
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">CI/CD Pipeline, GitHub Actions, Docker, Edge Functions.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact & Verification Links */}
            <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Koneksi & Verifikasi
              </h2>
              <div className="flex flex-wrap gap-4 text-xs font-mono">
                <a
                  href="https://github.com/allam1768"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 text-neutral-900 dark:text-neutral-100"
                >
                  GitHub @allam1768 &rarr;
                </a>
                <a
                  href="mailto:allambelajar@gmail.com"
                  className="hover:underline underline-offset-4 text-neutral-600 dark:text-neutral-400"
                >
                  Email Studio &rarr;
                </a>
                <a
                  href="https://wa.me/628123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 text-neutral-600 dark:text-neutral-400"
                >
                  WhatsApp Diskusi &rarr;
                </a>
              </div>
            </div>

            {/* Studio Note */}
            <div className="text-[11px] font-mono text-neutral-500 leading-relaxed">
              &copy; 2026 PutraaLabs Studio. Dibuat dengan arsitektur bebas bloatware dan ditenagai data waktu nyata GitHub API.
            </div>
          </aside>

          {/* Right Column (Live Project Feed) */}
          <section className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Repositori Karya Terverifikasi ({projects.length})
              </h2>
              <span className="text-xs font-mono text-neutral-500">
                Live GitHub Sync
              </span>
            </div>

            {/* Project List Component */}
            <ProjectList initialProjects={projects} />
          </section>

        </div>
      </main>
    </div>
  );
}
