const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "producer-1",
  brokers: ["localhost:9092"],
});

export const consumer = kafka.consumer({ groupId: "test-group" });

export const run = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "notification", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          console.log({
            value: message.value.toString(),
          });
        } catch (error) {
          console.error("Error processing message:", error);
        }
      },
    });
  } catch (error) {
    console.error("Error connecting to Kafka:", error);
  }
};
