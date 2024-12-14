import Pusher from 'pusher-js'

export const usePusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  forceTLS: true,
  enabledTransports: ['ws', 'wss'],
}) 