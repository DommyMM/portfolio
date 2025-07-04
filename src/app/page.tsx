import { Typewriter } from "@/components/ui/typewriter";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Hi, I'm <span className="text-purple-400">Dominic Aung</span>
            </h1>
            
            {/* Typewriter Effect */}
            <div className="h-16 flex items-center justify-center">
              <Typewriter
                phrases={[
                  "Full-Stack Developer",
                  "AI/ML Pipeline Engineer", 
                  "Computer Vision Systems",
                  "Backend Architect"
                ]}
                className="text-2xl md:text-4xl font-semibold text-gray-300"
              />
            </div>
          </div>

          {/* Supporting Text */}
          <div className="space-y-2">
            <p className="text-lg text-gray-400">
              UC Davis Computer Science Student • Available for Internships
            </p>
            <p className="text-xl font-medium text-white">
              Real applications, real users, real impact.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 border border-purple-500 hover:border-purple-400">
              View My Work →
            </button>
          </div>
        </div>
      </section>

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