import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { toast } from 'sonner'

export const useRealtime = (table, callback) => {
  const [events, setEvents] = useState([])

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
          const event = {
            type: payload.eventType,
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
