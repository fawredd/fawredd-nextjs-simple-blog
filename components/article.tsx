interface ArticleProp {
  title: string
  subtitle: string
  text: string
}
export default async function MainArticle(article: ArticleProp) {
  return (
    <>
      {/* Main Article */}
      <article className="prose prose-lg max-w-none">
        <h2 className="text-3xl font-bold text-green-600 mb-6">
          {article.title}
        </h2>
        <p className="text-gray-700 mb-6">{article.subtitle}</p>
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <p className="text-gray-600 leading-relaxed">{article.text}</p>
        </div>
      </article>
    </>
  );
}
