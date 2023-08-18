const COHORT_NAME = "2305-FTB-ET-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;


export async function fetchAllPosts() {
    try{
        const response = await fetch(`${BASE_URL}/posts`);
        const result = await response.json();
        return result;
    } catch(error) {
        console.error("No posts retrieved", error);
    }
}

export async function fetchSinglePost(postId) {
    try{
        const response = await fetch(`${BASE_URL}/posts/${postId}`);
        const post = await response.json();
        return post;
    } catch(error) {
        console.error("No post retrieved", error);
    }
}

export async function deletePostById(playerId) {
    try{
        const response = await fetch(`${BASE_URL}/posts/${playerId}`);
        const data = await response.json();
        return data;
    } catch(error) {
        console.error("No post retrieved", error);
    }
}

