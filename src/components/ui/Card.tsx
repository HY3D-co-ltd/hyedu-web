import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  description?: string;
  thumbnail: string;
  href: string;
  tags?: string[];
  price?: string;
}

export default function Card({ title, description, thumbnail, href, tags, price }: CardProps) {
  return (
    <Link href={href} className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        {tags && (
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">{tag}</span>
            ))}
          </div>
        )}
        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
        {description && <p className="text-gray-600 text-sm line-clamp-2">{description}</p>}
        {price && <p className="text-primary font-semibold mt-2">{price}</p>}
      </div>
    </Link>
  );
}
