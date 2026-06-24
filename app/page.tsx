import Link from 'next/link';

const CATEGORIES = [
  { name: '치킨', emoji: '🍗', color: 'from-orange-400 to-red-400' },
  { name: '피자', emoji: '🍕', color: 'from-red-400 to-pink-400' },
  { name: '햄버거', emoji: '🍔', color: 'from-yellow-400 to-orange-400' },
  { name: '한식', emoji: '🍚', color: 'from-green-400 to-emerald-400' },
  { name: '중식', emoji: '🥡', color: 'from-red-500 to-orange-400' },
  { name: '일식', emoji: '🍣', color: 'from-pink-400 to-rose-400' },
  { name: '분식', emoji: '🌶️', color: 'from-red-400 to-yellow-400' },
  { name: '양식', emoji: '🥩', color: 'from-amber-400 to-yellow-300' },
  { name: '디저트', emoji: '🍰', color: 'from-pink-300 to-purple-400' },
];

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">지금 뭐 먹을까요? 🔔</h1>
        <p className="text-gray-400 text-lg">카테고리를 선택해주세요</p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => (
          <Link href={`/category/${cat.name}`} key={cat.name}>
            <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer">
              <div className={`bg-gradient-to-br ${cat.color} h-36 flex flex-col items-center justify-center gap-2`}>
                <span className="text-6xl">{cat.emoji}</span>
                <span className="text-white font-extrabold text-xl">{cat.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}