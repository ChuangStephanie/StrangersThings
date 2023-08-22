import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const COHORT_NAME = "2305-FTB-ET-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Authenticate({token}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState ("")
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleClick() {
        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user: {
                        username: '',
                        password: ''
                    }
                })
            });
            const result = await response.json();
            setSuccessMessage(result.message, result.data.username);
        } catch(error) {
            setError(error.message);
        }
    }
    return (
    <>
    <h2>Login</h2>
    {successMessage && <p>{successMessage}</p>}
    {error && <p>{error}</p>}
    <form onSubmit={handleClick}>
            <label>
                Username: {" "} <input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>
                Password: {" "} <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <button onClick={(handleClick) => navigate('./AllPosts')}>Login</button>
        </form>
    </>
    )
}