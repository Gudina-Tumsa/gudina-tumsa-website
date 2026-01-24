let baseUrl = "https://api.gudinatumsa.com"

export const RateBook = async (bookId : string, rating : number) => {

    try {
        const response = await fetch(`${baseUrl}/api/book/rating/${bookId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "value":  rating }),
        });

        if (!response.ok) {
            throw new Error(`Failed to rate book: ${response.status}`);
        }

        const data = await response.json();
        console.log("Book rated successfully:", data);
        return data;
    } catch (e) {
        console.error("Error rating book:", e);
    }
};

