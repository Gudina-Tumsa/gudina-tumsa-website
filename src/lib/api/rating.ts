export const RateBook = async (bookId : string, rating : number) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/book/rating/${bookId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "value":  rating }),
        });

        if (!response.ok) {
            throw new Error(`Failed to rate book: ${response.status}`);
        }

        return await response.json();
    } catch (e) {
        console.error("Error rating book:", e);
    }
};

