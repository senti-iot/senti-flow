const express = require("express");
const app = express();
const router = express.Router();
const port = 3001;
const cors = require("cors");
const { Expo } = require("expo-server-sdk");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(cors());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.post("/send", function(req, res) {
  let expo = new Expo();
  // Create the messages that you want to send to clents
  let messages = [];
  for (let pushToken of req.body.tokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      body: req.body.message,
      channelId: "senti-flow-messages",
      vibrate: [0, 250, 250, 250]
    });
  }

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();

  let receiptIds = [];
  for (let ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        let result = false;
        for (let receipt of receipts) {
          if (receipt.status === "ok") {
            continue;
          } else if (receipt.status === "error") {
            console.error(
              `There was an error sending a notification: ${receipt.message}`
            );
            if (receipt.details && receipt.details.error) {
              console.error(`The error code is ${receipt.details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();

  res.json({ message: "Push sent" });
});
