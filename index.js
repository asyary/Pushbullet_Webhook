const axios = require("axios");

const pushbulletApiKey = "pushbulletkey";

// Send push notification
const sendPushNotification = async (title, body) => {
	try {
		const response = await axios.post(
			"https://api.pushbullet.com/v2/pushes",
			{
				type: "note",
				title: title,
				body: body,
			},
			{
				headers: {
					"Access-Token": pushbulletApiKey,
					"Content-Type": "application/json",
				},
			}
		);

		console.log("Push notification sent:", response.data);
	} catch (error) {
		console.error("Error sending push notification:", error.response.data);
	}
};

let previousContent = "";

// Webhook call
const makeGetRequest = async () => {
	try {
		const cacheBuster = Math.random().toString(36).substring(2);
		const response = await axios.get("https://example.com/data/yourdata.json?"+cacheBuster);
		const currentContent = JSON.stringify(response.data);

		// Check if content has changed
		if (previousContent === "") {
			previousContent = currentContent;
			console.log("Initiated!");
		}
		if (currentContent !== previousContent) {
			console.log("Content changed. Sending push notification...");
			sendPushNotification("Something changed!", "Check it out!");
			previousContent = currentContent;
		} else {
			console.log("Content unchanged.");
		}
	} catch (error) {
		console.error("Error making GET request:", error);
	}
};

// Make GET request every 30 seconds
setInterval(makeGetRequest, 15000);