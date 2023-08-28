const COHORT_NAME = "2305-FTB-ET-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export async function fetchAllPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("No posts retrieved", error);
  }
}

export async function fetchSinglePost(postId) {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const posts = await response.json();
    const post = posts.data.posts.filter(p => {
        return p._id === postId;
    });
    return post;
  } catch (error) {
    console.error("No post retrieved", error);
  }
}

export async function deletePost(postId) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting post", error);
  }
}

export async function makePost(postData) {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: postData }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating post", error);
  }
}
