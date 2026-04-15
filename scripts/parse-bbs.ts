import fs from 'fs';

type Post = {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
};

function parse(html: string): Post[] {
  const posts: Post[] = [];
  // Split by the block marker and discard the pre-list part
  const chunks = html.split('col-xs-12 col-sm-3 dhb-txt-box-type-b').slice(1);
  for (const chunk of chunks) {
    const idMatch = chunk.match(/class='btnRead'\s+value='(\d+)'/);
    const titleMatch = chunk.match(/<strong>\s*<a[^>]*class='btnRead'[^>]*>([\s\S]*?)<\/a>\s*<\/strong>/);
    const thumbMatch = chunk.match(/<img[^>]+src='([^']+)'/);
    const dateMatch = chunk.match(/<span class='regdate'>([^<]+)<\/span>/);
    if (!idMatch || !titleMatch) continue;
    posts.push({
      id: idMatch[1],
      title: titleMatch[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim(),
      thumbnail: thumbMatch ? thumbMatch[1] : '',
      date: dateMatch ? dateMatch[1].split(' ')[0] : '',
    });
  }
  return posts;
}

const files = {
  events: ['.cache/bbs_events.html', '.cache/bbs_events_p2.html'],
  reviews: ['.cache/bbs_reviews.html', '.cache/bbs_reviews_p2.html'],
};

const result: Record<string, Post[]> = {};
for (const [k, fs_list] of Object.entries(files)) {
  const all: Post[] = [];
  for (const f of fs_list) {
    const html = fs.readFileSync(f, 'utf-8');
    all.push(...parse(html));
  }
  // dedupe by id
  const seen = new Set<string>();
  result[k] = all.filter((p) => (seen.has(p.id) ? false : (seen.add(p.id), true)));
}

console.log(JSON.stringify(result, null, 2));
console.error(`events: ${result.events.length}, reviews: ${result.reviews.length}`);
