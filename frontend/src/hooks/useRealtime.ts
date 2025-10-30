import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { toast } from 'sonner'

export type RealtimeEvent = {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  new?: any
  old?: any
}

export const useRealtime = (table: string, callback?: (event: RealtimeEvent) => void) => {
  const [events, setEvents] = useState<RealtimeEvent[]>([])

  useEffect(() => {
    const channel = supabase
      .channel(`${table}-changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
        },
        (payload) => {
          const event: RealtimeEvent = {
            type: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
            table: table,
            new: payload.new,
            old: payload.old,
          }

          setEvents((prev) => [...prev, event])

          // Show notification
          if (event.type === 'INSERT') {
            toast.success(`New ${table} added!`, {
              description: `A new ${table} has been created.`,
            })
          } else if (event.type === 'UPDATE') {
            toast.info(`${table} updated!`, {
              description: `A ${table} has been modified.`,
            })
          } else if (event.type === 'DELETE') {
            toast.warning(`${table} deleted!`, {
              description: `A ${table} has been removed.`,
            })
          }

          // Call custom callback
          if (callback) {
            callback(event)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [table, callback])

  return { events }
}
