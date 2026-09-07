import { channel } from './rabbitmq.js';

export const consumeUsers = async () => {
  await channel.consume('users', (message) => {
    if (!message) {
      return;
    }

    try {
      const payload = JSON.parse(message.content.toString());

      console.log('User created event:', payload);

      channel.ack(message);
    } catch (error) {
      console.error('Failed to process message:', error);

      channel.nack(message, false, false);
    }
  });
};
