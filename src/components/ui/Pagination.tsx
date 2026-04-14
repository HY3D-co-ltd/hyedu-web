import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center gap-2 mt-8" aria-label="Pagination">
      {currentPage > 1 && (
        <Link href={`${basePath}?page=${currentPage - 1}`} className="px-3 py-2 rounded-lg border hover:bg-gray-100">이전</Link>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`px-3 py-2 rounded-lg border ${page === currentPage ? 'bg-primary text-white border-primary' : 'hover:bg-gray-100'}`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={`${basePath}?page=${currentPage + 1}`} className="px-3 py-2 rounded-lg border hover:bg-gray-100">다음</Link>
      )}
    </nav>
  );
}
