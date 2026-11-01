"use client";

import { useState, useMemo } from "react";
import { Project } from "@/types/project";
import Image from "next/image";

interface ProjectListProps {
  initialProjects: Project[];
}

export default function ProjectList({ initialProjects }: ProjectListProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesTab = activeTab === "all" || project.category === activeTab;
      const matchesSearch =
        project.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [initialProjects, activeTab, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-wrap gap-2 text-xs font-mono uppercase tracking-wider">
          {[
            { id: "all", label: "Semua Karya" },
            { id: "web", label: "Web Platform" },
            { id: "mobile", label: "Mobile Apps" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium"
                  : "bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Cari teknologi / kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-xs font-mono bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-16 text-center text-sm font-mono text-neutral-500 border border-dashed border-neutral-200 dark:border-neutral-800">
          Tidak ada repositori yang cocok dengan kata kunci pencarian.
        </div>
      ) : (
        <div className="space-y-12">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="group flex flex-col md:flex-row gap-6 pb-12 border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
            >
              {/* Project Visual / Thumbnail */}
              <div className="md:w-5/12 shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-900 relative aspect-16/9 rounded-sm border border-neutral-200 dark:border-neutral-800">
                <Image
                  src={project.coverImage}
                  alt={project.displayName}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-102"
                  unoptimized
                />
              </div>

              {/* Project Metadata & Story */}
              <div className="md:w-7/12 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span className="uppercase tracking-wider">#{String(idx + 1).padStart(2, "0")} / {project.category}</span>
                    <span>Diperbarui {project.updatedAt}</span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 group-hover:underline underline-offset-4 decoration-1">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      {project.displayName}
                    </a>
                  </h3>

                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {project.topics.slice(0, 5).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-800/60"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-4 text-xs font-mono font-medium pt-1">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:underline underline-offset-4"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      Lihat Source
                    </a>

                    {project.homepageUrl && (
                      <a
                        href={project.homepageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:underline underline-offset-4 text-neutral-900 dark:text-neutral-100"
                      >
                        Buka Demo / Rilis &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
