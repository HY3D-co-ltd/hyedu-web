const stats = [
  { number: '17,150+', label: '참여인원', labelEn: 'Participants' },
  { number: '245+', label: '참여 학교/기관', labelEn: 'Schools & Institutions' },
];

export default function StatsSection() {
  return (
    <section className="bg-primary text-white py-16" aria-label="주요 통계">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</p>
              <p className="text-lg md:text-xl font-medium text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
