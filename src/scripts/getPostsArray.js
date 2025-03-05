export async function getPostsArray(Wordpresslink) {
  const posts = await fetch(`${Wordpresslink}/wp-json/wp/v2/posts`);
  const postsJson = await posts.json();

  const media = await fetch(`${Wordpresslink}/wp-json/wp/v2/media`);
  const mediaJson = await media.json();

  function getImageUrlById(id, wpMediaJson) {
    return wpMediaJson.find((inputMedia) => {
      if (id === inputMedia.post) {
        return inputMedia.source_url;
      }
    });
  }

  const result =  postsJson.map((neededPostData) => {
    return {
      slug: neededPostData.slug,
      photoUrl: getImageUrlById(neededPostData.id, mediaJson),
      title: neededPostData.title.rendered,
      content: neededPostData.content.rendered,
    };
  });

  return result;
}

console.log('test');

console.log(await getPostsArray('http://whellworks.local'));
