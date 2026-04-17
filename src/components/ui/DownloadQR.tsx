'use client';

import { QRCodeSVG } from 'qrcode.react';

export default function DownloadQR({
  url,
  label,
  sublabel,
  size = 160,
}: {
  url: string;
  label: string;
  sublabel?: string;
  size?: number;
}) {
  return (
    <div className="inline-flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <QRCodeSVG value={url} size={size} level="M" marginSize={2} />
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        {sublabel && <p className="mt-1 text-xs text-gray-500">{sublabel}</p>}
      </div>
    </div>
  );
}
