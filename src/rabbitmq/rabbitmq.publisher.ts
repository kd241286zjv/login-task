import { channel } from './rabbitmq.js';

export const publish = (routingKey: string, message: unknown) => {
  channel.publish('events', routingKey, Buffer.from(JSON.stringify(message)));
};
