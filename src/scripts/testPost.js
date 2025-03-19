export async function getImageUrlById2(id, Wordpresslink) {
  const response = await fetch(
    `${Wordpresslink}/wp-json/wp/v2/posts/${id}?_embed`
  );
  const postJson = await response.json();
  const featuredmedia = postJson._embedded?.["wp:featuredmedia"]?.[0];
  return featuredmedia.source_url;
}
console.log(
  await getImageUrlById2(
    33,
    "http://igor.z0fil5dsgi-xlm41ok1r6dy.p.temp-site.link/"
  )
);
