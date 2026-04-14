export default function MapSection() {
  return (
    <section className="py-16 px-6 bg-white" aria-label="오시는 길">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
          오시는 길
        </h2>
        <p className="text-center text-gray-600 mb-8">
          경기도 안산시 상록구 한양대학로 55 5공학관 창업실
        </p>
        <div className="w-full aspect-[16/7] rounded-xl overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.8!2d126.9326!3d37.2974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6f3e0e1c7e1d%3A0x1e1e1e1e1e1e1e1e!2z7ZWc7JaR64yA7ZWZ6rWQIEVSSUNBIOy6oO2NvOyKpCDslYjsgrA!5e0!3m2!1sko!2skr!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="한양미래연구소 위치"
          />
        </div>
      </div>
    </section>
  );
}
