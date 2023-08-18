import { useState, useEffect } from "react";
import { getAllPosts } from "../API";
import { useNavigate } from "react-router-dom";

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [searchParam, setSearchParam] = useState("");

    useEffect(() => {
        async function getAllPosts() {
            const APIData =  await getAllPosts();
            if (APIData.success) {
                setPosts(APIData.data.posts);
            } else {
                setError(APIData.error);
            }
        }
        getAllPosts();
    }, []);

}