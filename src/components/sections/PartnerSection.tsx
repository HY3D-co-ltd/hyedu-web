import { partners } from '@/data/partners';

export default function PartnerSection() {
  return (
    <section className="py-16 px-6 bg-white" aria-label="협력 기관">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          협력 기관
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center rounded-lg border border-gray-200 px-2 py-3 text-xs md:text-sm text-gray-600 font-medium text-center hover:border-primary hover:text-primary transition-colors duration-200"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
