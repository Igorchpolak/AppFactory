function getImageUrlById(id, wpMediaJson) {

    const result = wpMediaJson.find((inputMedia) => {
      if (id === inputMedia.post) {
          return true;
      }
  });
  return result ? result.source_url : null;
  }

export async function getPostsArrayFromCategory(categoryId, Wordpresslink) {
  const posts = await fetch(`${Wordpresslink}/wp-json/wp/v2/posts?categories=${categoryId}`);
  const postsJson = await posts.json();

  const media = await fetch(`${Wordpresslink}/wp-json/wp/v2/media`);
  const mediaJson = await media.json();

  const result = postsJson.map((neededPostData) => {
    return {
      slug: neededPostData.slug,
      photoUrl: getImageUrlById(neededPostData.id, mediaJson),
      title: neededPostData.title.rendered,
      content: neededPostData.content.rendered,
    };
  });

  return result;
}

// console.log(await getPostsArrayFromCategory(1,'http://whellworks.local'));
