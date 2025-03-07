export async function getCategoriesArray(Wordpresslink) {
  const posts = await fetch(`${Wordpresslink}/wp-json/wp/v2/categories`);
  const postsJson = await posts.json();

  const result = postsJson.map((neededCategoryData) => {
      return {
        category: neededCategoryData.slug,
        name: neededCategoryData.name,
        id: neededCategoryData.id,
      };
  });

  return result;
}

// console.log(await getCategoriesArray("http://whellworks.local"));
