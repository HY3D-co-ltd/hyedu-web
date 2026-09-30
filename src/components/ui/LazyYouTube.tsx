'use client';

import { useState } from 'react';

type Props = {
  videoId: string;
  poster: string;
  title: string;
  className?: string;
};

/**
 * Click-to-play YouTube embed with a custom poster image.
 * Renders the poster + a play button, and only mounts the actual YouTube
 * iframe on user interaction. Improves initial page load and lets us set
 * a branded thumbnail that overrides YouTube's own.
 */
export default function LazyYouTube({ videoId, poster, title, className = '' }: Props) {
  const [play, setPlay] = useState(false);

  if (play) {
    return (
      <div className={`relative w-full aspect-video ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlay(true)}
      aria-label={`${title} · 재생`}
      className={`group relative block w-full aspect-video overflow-hidden bg-black focus:outline-none focus-visible:ring-4 focus-visible:ring-point/40 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      {/* subtle darken on hover for contrast */}
      <span
        aria-hidden
        className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300"
      />
      {/* play button */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-white/60 animate-ping opacity-40"
          />
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="relative w-7 h-7 md:w-9 md:h-9 text-point translate-x-[2px]"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
