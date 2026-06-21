import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'setup-script',
  brokers: ['localhost:9092'],
})

const admin = kafka.admin()

const run = async (): Promise<void> => {
  console.log('Connecting to Kafka..')

  await admin.connect()

  await admin.createTopics({
    topics: [
      {
        topic: 'orders',
        numPartitions: 3,
        replicationFactor: 1,
      },
      {
        topic: 'order-notifications',
        numPartitions: 3,
        replicationFactor: 1,
      },
    ],
  })

  console.log('Topics created successfully')
  await admin.disconnect()
}

run().catch(console.error)
