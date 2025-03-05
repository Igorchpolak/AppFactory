function getImageUrlById(id, wpMediaJson) {

  const result = wpMediaJson.find((inputMedia) => {
    if (id === inputMedia.post) {
        return true;
    }
});
return result ? result.source_url : null;
}

export async function getPostsArray(Wordpresslink) {
  const posts = await fetch(`${Wordpresslink}/wp-json/wp/v2/posts`);
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



// const media = await fetch(`http://whellworks.local/wp-json/wp/v2/media`);
// const mediaJson = await media.json();

// console.log(getImageUrlById(14,mediaJson)); 

// console.log(await getPostsArray('http://whellworks.local'));
