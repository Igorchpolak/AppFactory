function getImageUrlById(id, wpMediaJson) {
  const result = wpMediaJson.find((inputMedia) => {
    if (id === inputMedia.post) {
      return true;
    }
  });
  return result ? result.source_url : "https://placehold.co/600x400";
}

export async function getPostsArray(Wordpresslink) {
  const posts = await fetch(`${Wordpresslink}/wp-json/wp/v2/posts`);
  const postsJson = await posts.json();

  const media = await fetch(`${Wordpresslink}/wp-json/wp/v2/media`);
  const mediaJson = await media.json();

  const result = postsJson.map((neededPostData) => {
    return {
      postId: neededPostData.id,
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
      postId: neededPostData.id,
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
  return result;
}

export async function getPostsArrayFromCategory(
  categoryId,
  Wordpresslink,
  quantityOfPostsToReturn = 0,
  idOfPostToSkip = 0
) {
  if (idOfPostToSkip && quantityOfPostsToReturn) {
    var posts = await fetch(
      `${Wordpresslink}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${quantityOfPostsToReturn}&exclude=${idOfPostToSkip}`
    );
  }
  else if (quantityOfPostsToReturn) {
    var posts = await fetch(
      `${Wordpresslink}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${quantityOfPostsToReturn}`
    );
  }else if (idOfPostToSkip) {
    `${Wordpresslink}/wp-json/wp/v2/posts?categories=${categoryId}&exclude=${idOfPostToSkip}`;
  } else {
    var posts = await fetch(
      `${Wordpresslink}/wp-json/wp/v2/posts?categories=${categoryId}`
    );
  }

  const postsJson = await posts.json();

  const media = await fetch(`${Wordpresslink}/wp-json/wp/v2/media`);
  const mediaJson = await media.json();

  const result = postsJson.map((neededPostData) => {
    return {
      postId: neededPostData.id,
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
  const categories = await fetch(`${Wordpresslink}/wp-json/wp/v2/categories`);
  const categoriesJson = await categories.json();

  const result = categoriesJson.map((neededCategoryData) => {
    return {
      category: neededCategoryData.slug,
      description: neededCategoryData.description,
      count: neededCategoryData.count,
      name: neededCategoryData.name,
      id: neededCategoryData.id,
    };
  });

  return result;
}

// console.log(
//   await getPostsArrayFromCategory(
//     1,
//     "http://igor.z0fil5dsgi-xlm41ok1r6dy.p.temp-site.link/",
//     2,
//     33
//   )
// );

// `http://igor.z0fil5dsgi-xlm41ok1r6dy.p.temp-site.link/wp-json/wp/v2/posts?categories=1&per_page=3&exclude=33`;
