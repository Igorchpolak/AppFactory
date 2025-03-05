async function getPostArray(Wordpresslink) {
  const posts = await fetch(`${Wordpresslink}/wp-json/wp/v2/posts`);
  const postsJson = await posts.json();

  const media = await fetch(`${Wordpresslink}/wp-json/wp/v2/media`);
  const mediaJson = await image.json();

  const getImageUrlById = function (id, wpMediaJson) {
    return wpMediaJson.find((inputMedia) => {
      if (id === wpMediaJson.post) {
            return inputMedia.source_url;
      }
    });
  };

  return postsJson.map((neededPostData) => {
    return{
        slug: neededPostData.slug,
        photoUrl: neededPostData.getImageUrlById(neededPostData.id, mediaJson),
        title: neededPostData.title,
        content: neededPostData.content,
    }
  });
};
