import fetch from "node-fetch";

const commentData = {
  post: 33,
  author_name: "Igor",
  author_email: "example@gmail.com",
  content: "testPost",
};

const response = await fetch(
  `http://igor.z0fil5dsgi-xlm41ok1r6dy.p.temp-site.link/wp-json/wp/v2/comments`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  }
);

const data = await response.json();
console.log(data);