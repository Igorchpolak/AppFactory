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
        categories: neededPostData.categories,
        photoUrl: getImageUrlById(neededPostData.id, mediaJson),
        title: neededPostData.title.rendered,
        content: neededPostData.content.rendered,
      };
    });
  
    return result;
  }
  
  export async function getPagePostsArray(perPage, pageNumber, Wordpresslink) {
    const posts = await fetch(
      `${Wordpresslink}/wp-json/wp/v2/posts?per_page=${perPage}&page=${pageNumber}`
    );
    const postsJson = await posts.json();
  
    const media = await fetch(`${Wordpresslink}/wp-json/wp/v2/media`);
    const mediaJson = await media.json();
  
    const result = postsJson.map((neededPostData) => {
      return {
        slug: neededPostData.slug,
        categories: neededPostData.categories,
        photoUrl: getImageUrlById(neededPostData.id, mediaJson),
        title: neededPostData.title.rendered,
        content: neededPostData.content.rendered,
      };
    });
  
    return result;
  }
  
  export async function makePageNumbersArray(
    Wordpresslink,
    postsPerPage,
    categoryId = 0
  ) {
    if (categoryId) {
      var allpost = await getPostsArrayFromCategory(categoryId, Wordpresslink);
      var postsQuantity = allpost.length;
    } else {
      var allpost = await getPostsArray(Wordpresslink);
      var postsQuantity = allpost.length;
    }
    let result = [];
    for (let i = 0; postsQuantity / postsPerPage > i; i++) {
      result.push({ page: i + 1 });
    }
    // console.log(result);
    return result;
  }
  
  export async function getPostsArrayFromCategory(categoryId, Wordpresslink) {
    const posts = await fetch(
      `${Wordpresslink}/wp-json/wp/v2/posts?categories=${categoryId}`
    );
    const postsJson = await posts.json();
  
    const media = await fetch(`${Wordpresslink}/wp-json/wp/v2/media`);
    const mediaJson = await media.json();
  
    const result = postsJson.map((neededPostData) => {
      return {
        slug: neededPostData.slug,
        categories: neededPostData.categories,
        photoUrl: getImageUrlById(neededPostData.id, mediaJson),
        title: neededPostData.title.rendered,
        content: neededPostData.content.rendered,
      };
    });
  
    return result;
  }
  
  export async function getCategoriesArray(Wordpresslink) {
    const posts = await fetch(`${Wordpresslink}/wp-json/wp/v2/categories`);
    const postsJson = await posts.json();
  
    const result = postsJson.map((neededCategoryData) => {
      return {
        category: neededCategoryData.slug,
        count: neededCategoryData.count,
        name: neededCategoryData.name,
        id: neededCategoryData.id,
      };
    });
  
    return result;
  }
  
  // const media = await fetch(`http://whellworks.local/wp-json/wp/v2/media`);
  // const mediaJson = await media.json();
  
  // console.log(getImageUrlById(14,mediaJson));
  
  // console.log(await getPostsArray('http://whellworks.local'));
  
  // makePageNumbersArray("http://whellworks.local");
  
  console.log(await getCategoriesArray("http://whellworks.local"));