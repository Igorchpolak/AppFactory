export async function getImageUrlById(id, Wordpresslink) {
  const response = await fetch(
    `${Wordpresslink}/wp-json/wp/v2/posts/${id}?_embed`
  );
  const postJson = await response.json();
  const featuredmedia = postJson._embedded?.["wp:featuredmedia"]?.[0].source_url || "/placeholder.webp";
  return featuredmedia;
}

export async function getAllPostsIds(Wordpresslink) {
  var result = [];
  var count = 0;

  while (true) {
    count++;
    var post = await fetch(
      `${Wordpresslink}/wp-json/wp/v2/posts?per_page=1&page=${count}`
    );
    if (post.ok) {
      var postJson = await post.json();
      result.push(postJson[0].id);
    } else {
      break;
    }
  }
  return result;
}

export async function getPostsArray(Wordpresslink) {
  const posts = await fetch(`${Wordpresslink}/wp-json/wp/v2/posts`);
  const postsJson = await posts.json();

  const result = postsJson.map((neededPostData) => {
    return {
      postId: neededPostData.id,
      slug: neededPostData.slug,
      categories: neededPostData.categories,
      photoUrl: getImageUrlById(neededPostData.id, Wordpresslink),
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

  const result = postsJson.map((neededPostData) => {
    return {
      postId: neededPostData.id,
      slug: neededPostData.slug,
      categories: neededPostData.categories,
      photoUrl: getImageUrlById(neededPostData.id, Wordpresslink),
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
  } else if (quantityOfPostsToReturn) {
    var posts = await fetch(
      `${Wordpresslink}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${quantityOfPostsToReturn}`
    );
  } else if (idOfPostToSkip) {
    `${Wordpresslink}/wp-json/wp/v2/posts?categories=${categoryId}&exclude=${idOfPostToSkip}`;
  } else {
    var posts = await fetch(
      `${Wordpresslink}/wp-json/wp/v2/posts?categories=${categoryId}`
    );
  }

  const postsJson = await posts.json();

  const result = postsJson.map((neededPostData) => {
    return {
      postId: neededPostData.id,
      slug: neededPostData.slug,
      categories: neededPostData.categories,
      photoUrl: getImageUrlById(neededPostData.id, Wordpresslink),
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

//----------------------------------------------------------------------------

// async function getStaticPaths(WORDPRESS_REST_API_URL) {
//   var postsIds = await getAllPostsIds(WORDPRESS_REST_API_URL);

//   return Promise.all(
//     postsIds.map(async (id) => {
//       const response = await fetch(
//         `${WORDPRESS_REST_API_URL}wp-json/wp/v2/posts/${id}`
//       );
//       const postJson = await response.json();
//       const post = {
//         // postId: postJson.id,
//         // slug: postJson.slug,
//         categories: postJson.categories,
//         title: postJson.title.rendered,
//         content: postJson.content.rendered,
//       };

//       const slug = postJson.slug;
//       const relatedPosts = await getPostsArrayFromCategory(
//         postJson.categories,
//         WORDPRESS_REST_API_URL,
//         2,
//         id
//       );

//       return {
//         params: { slug },
//         props: { id, post, relatedPosts },
//       };
//     })
//   );
// }

// const paths = await getStaticPaths(
//   "http://igor.z0fil5dsgi-xlm41ok1r6dy.p.temp-site.link/"
// );

// console.log(paths[0]);

// `http://igor.z0fil5dsgi-xlm41ok1r6dy.p.temp-site.link/wp-json/wp/v2/posts?categories=1&per_page=3&exclude=33`;
