import React from 'react';
import {useState} from 'react';

const COHORT_NAME = "2305-FTB-ET-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Authenticate({token}) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    async function handleClick() {
        try {
            const response = await fetch(`${BASE_URL}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            const result = await response.json();
            setSuccessMessage(result.message, result.data.username);
        } catch(error) {
            setError(error.message);
        }
    }
    return (
    <>
    <h2>Authenticate!</h2>
    {successMessage && <p>{successMessage}</p>}
    {error && <p>{error}</p>}
    <button onClick={handleClick}>Authentication Magic</button>
    </>
    )
}