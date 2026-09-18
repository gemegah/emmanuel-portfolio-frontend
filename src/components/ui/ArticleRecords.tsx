import Link from "next/link";
import { articles } from "@/data/articles";
import { RecordCard, Tags, type Tone } from "@/components/ui/Portfolio";

const articleTones: readonly Tone[] = ["ochre", "olive", "clay"];

interface ArticleRecordsProps {
  limit?: number;
}

export function ArticleRecords({ limit }: ArticleRecordsProps) {
  const visibleArticles = typeof limit === "number" ? articles.slice(0, limit) : articles;

  return (
    <div className="card-grid">
      {visibleArticles.map((article, index) => (
          <RecordCard
            key={article.slug}
            code={article.code}
            title={article.title}
            subtitle="Article"
            tone={articleTones[index % articleTones.length]}
          >
            {article.publishedAt ? <p className="record-period">{article.publishedAt}</p> : null}
            {article.projectStatus ? <p className="record-period">Project · {article.projectStatus}</p> : null}
            <p>{article.excerpt}</p>
            <Tags items={article.tags} />
            <Link className="inline-action" href={article.href}>
              read article <span aria-hidden="true">↗</span>
            </Link>
          </RecordCard>
      ))}
    </div>
  );
}
