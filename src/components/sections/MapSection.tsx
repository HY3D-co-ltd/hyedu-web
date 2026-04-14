export default function MapSection() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-center text-gray-900 mb-2">오시는 길</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          경기도 안산시 상록구 한양대학로 55 5공학관 창업실
        </p>
        <div className="w-full aspect-[16/9] md:aspect-[16/7] rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.5!2d126.8328!3d37.2959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6e2c7e5d7e9d%3A0x3d2443c82b0f7c8f!2z7ZWc7JaR64yA7ZWZ6rWQIEVSSUNBIOy6oO2NvOyKpA!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="한양미래연구소 위치 - 한양대 ERICA 캠퍼스"
          />
        </div>
      </div>
    </section>
  );
}
