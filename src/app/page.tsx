import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-32 py-24">
      <h1 className="text-6xl font-bold text-white mb-24">Dominic Aung</h1>
      <section id="projects" className="w-full max-w-3xl py-24">
        <h2 className="text-3xl font-semibold text-white mb-8">Projects</h2>
        {/* Project content will go here */}
        <div className="h-32 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-white/40">Coming soon...</div>
      </section>
      <section id="work" className="w-full max-w-3xl py-24">
        <h2 className="text-3xl font-semibold text-white mb-8">Work Experience</h2>
        {/* Work experience content will go here */}
        <div className="h-32 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-white/40">Coming soon...</div>
      </section>
      <section id="skills" className="w-full max-w-3xl py-24">
        <h2 className="text-3xl font-semibold text-white mb-8">Skills & Tech</h2>
        {/* Skills/Tech content will go here */}
        <div className="h-32 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-white/40">Coming soon...</div>
      </section>
      <section id="contact" className="w-full max-w-3xl py-24">
        <h2 className="text-3xl font-semibold text-white mb-8">Contact</h2>
        {/* Contact content will go here */}
        <div className="h-32 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-white/40">Coming soon...</div>
      </section>
    </div>
  );
}
