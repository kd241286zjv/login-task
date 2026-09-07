import amqp, { Channel, ChannelModel } from 'amqplib';
import { env } from '../config/env.js';

let connection: ChannelModel;
export let channel: Channel;

export const connectRabbitMQ = async () => {
  connection = await amqp.connect(env.RABBITMQ.URL);
  channel = await connection.createChannel();

  await channel.assertExchange('events', 'topic', { durable: true });

  await channel.assertQueue('users', { durable: true });

  await channel.bindQueue('users', 'events', 'user.created');

  console.log('Connected to RabbitMQ');
};
