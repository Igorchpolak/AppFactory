async function sendPost() {
  const response = await fetch(
    `https://igor.rstest.online/wp-json/wp/v2/posts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa("AI-Posts-Generator:MJ9L qiNT BZju T5J3 3qaJ s1xs")
      },
      body: JSON.stringify({
        slug: "testpost32",
        title: "testpost32",
        status: "publish",
      }),
    }
  );
  const responseJson = await response.json();
  console.log(responseJson);
}

sendPost();
