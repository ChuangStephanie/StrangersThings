const COHORT_NAME = "2305-FTB-ET-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function sendMessage(token) {
    //fancy function stuff
    const [error, setError] = useState(null);

    async function handleSend(event) {
        event.preventDefault();

        try {
            const APIresponse = await fetch(BASE_URL/posts/POST_ID/messages, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: {
                        content: "",
                    }
                }),
            });

            const result = await APIresponse.json();
            console.log(result);
            alert("Message sent successfully!");
        } catch (error) {
            setError(error);
        }
    }

    return (
        <>
          <h2>Send a Message</h2>
          <div className="message">
            <form onSubmit={handleSend}>
              <label>Message: </label>
              <input
                type="text"
                value={this.state.name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </>
      );
}