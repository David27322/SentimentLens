import Link from "next/link";

const features = [
  {
    title: "3 ML Models",
    desc: "Logistic Regression, Naive Bayes, and ANN — each with confidence scores.",
  },
  {
    title: "Side-by-side Compare",
    desc: "Run all models on the same input and see where they agree or differ.",
  },
  {
    title: "Clean & Fast",
    desc: "Text is preprocessed the same way the models were trained — no surprises.",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-violet-50 text-violet-600 text-xs font-medium tracking-wide uppercase">
          ML-Powered
        </span>
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4 leading-tight">
          Understand the sentiment <br /> behind any text
        </h1>
        <p className="text-slate-500 text-lg mb-8">
          Analyze social media posts, tweets, and reviews using multiple
          machine learning models — instantly.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/analyze"
            className="px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors"
          >
            Try it now
          </Link>
          <Link
            href="/compare"
            className="px-5 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Compare models
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map(({ title, desc }) => (
          <div
            key={title}
            className="bg-white rounded-xl border border-slate-200 p-6"
          >
            <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}