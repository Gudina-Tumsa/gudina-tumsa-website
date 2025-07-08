const createOtpEmail = async (email : string) => {
    console.log("asdf")
    try {
        const response = await fetch('/otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: email,
                addressType: 'EMAIL',
            }),
        });

        if (response.status === 201) {
            console.log('OTP created successfully');
        } else {
            const data = await response.json();
            console.error('Failed to create OTP:', data.message);
        }
    } catch (error) {
        console.error('Error creating OTP:', error);
    }
};

