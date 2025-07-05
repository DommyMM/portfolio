import AboutHero from "@/components/AboutHero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      {/* Existing Sections */}
      <div className="max-w-4xl mx-auto px-4 space-y-32 pb-24">
        <section id="projects" className="py-24">
          <h2 className="text-3xl font-semibold text-white mb-8">Projects</h2>
          <div className="h-32 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-white/40">
            Coming soon...
          </div>
        </section>

        <section id="work" className="py-24">
          <h2 className="text-3xl font-semibold text-white mb-8">Work Experience</h2>
          <div className="h-32 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-white/40">
            Coming soon...
          </div>
        </section>

        <section id="skills" className="py-24">
          <h2 className="text-3xl font-semibold text-white mb-8">Skills & Tech</h2>
          <div className="h-32 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-white/40">
            Coming soon...
          </div>
        </section>

        <section id="contact" className="py-24">
          <h2 className="text-3xl font-semibold text-white mb-8">Contact</h2>
          <div className="h-32 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-white/40">
            Coming soon...
          </div>
        </section>
      </div>
    </div>
  );
}