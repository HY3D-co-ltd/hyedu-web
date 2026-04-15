// 실제 <html>/<body>는 [locale]/layout.tsx에서 렌더링합니다.
// 루트 레이아웃은 children만 통과시켜 <html> 중첩으로 인한 hydration mismatch를 방지합니다.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
