import Link from 'next/link';

const CATEGORIES = [
  { name: '치킨', icon: '🍗', desc: '바삭한 치킨' },
  { name: '피자', icon: '🍕', desc: '화덕 & 오븐 피자' },
  { name: '햄버거', icon: '🍔', desc: '수제 버거' },
  { name: '한식', icon: '🍚', desc: '정갈한 한 상' },
  { name: '중식', icon: '🥢', desc: '중화요리' },
  { name: '일식', icon: '🍣', desc: '초밥 & 이자카야' },
  { name: '분식', icon: '🌶️', desc: '떡볶이 & 김밥' },
  { name: '양식', icon: '🥩', desc: '스테이크 & 파스타' },
  { name: '디저트', icon: '🍰', desc: '빙수 & 케이크' },
];

export default function Home() {
  return (
    <main>
      {/* 히어로 배너 */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-12 mb-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-orange-100 text-sm font-medium mb-2">빠른 배달 · 무료 배달</p>
          <h1 className="text-4xl font-extrabold text-white mb-2">지금 뭐 드실래요?</h1>
          <p className="text-orange-100">주문하면 바로 출발, 따끈하게 배달해드려요</p>
        </div>
      </div>

      {/* 카테고리 그리드 */}
      <div className="max-w-4xl mx-auto px-4 pb-10">
        <h2 className="text-lg font-extrabold text-gray-900 mb-4">카테고리</h2>
       <div className="grid grid-cols-3 gap-4">
  {CATEGORIES.map((cat) => (
    <Link href={`/category/${cat.name}`} key={cat.name}>
      <div className="bg-white border border-gray-100 rounded-2xl p-7 cursor-pointer hover:shadow-md hover:border-orange-200 transition-all duration-150 group">
        <div className="text-5xl mb-4">{cat.icon}</div>
        <p className="text-gray-900 text-xl font-extrabold group-hover:text-orange-500 transition">{cat.name}</p>
        <p className="text-gray-400 text-sm mt-1">{cat.desc}</p>
      </div>
    </Link>
  ))}
</div>
      </div>
    </main>
  );
}