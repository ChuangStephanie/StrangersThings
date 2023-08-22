import {useState, useEffect} from 'react';

const COHORT_NAME = "2305-FTB-ET-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Register({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/users/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: '',
                        password: ''
                    }
                })
            });
            const result = await response.json();
            setToken(result.token);
            console.log(result);
        } catch (error) {
            setError(error.message);
        }
    };
        return (
        <>
        <h2>Sign Up!</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Username: {" "} <input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>
                Password: {" "} <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <button>Submit</button>
        </form>
        </>
        )
}