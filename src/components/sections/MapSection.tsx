export default function MapSection() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="mx-auto max-w-[1170px] 2xl:max-w-[1280px]">
        <h2 className="text-xl font-bold text-center text-gray-900 mb-2">오시는 길</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          경기도 안산시 상록구 한양대학로 55 5공학관 창업실
        </p>
        <div className="w-full overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1586.9707931304235!2d126.83498218891485!3d37.29651822675365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6ffb0d403b47%3A0xd49f7233ee052ff6!2z7KCcNeqzte2Vpeq0gA!5e0!3m2!1sko!2skr!4v1728371847132!5m2!1sko!2skr"
            width="100%"
            height="574"
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
