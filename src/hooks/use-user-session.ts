import { supabase } from "@/lib/supabase"
import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

export function useUserSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await supabase.auth.getSession()
      setSession(data.data.session)
      setLoading(false)
    }
    fetchData()
  }, [])
  return { userSession: session, loading }
}
