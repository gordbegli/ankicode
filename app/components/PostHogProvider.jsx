"use client"

import posthog from "posthog-js"
import {
  PostHogProvider as PHProvider,
  usePostHog,
} from "posthog-js/react"
import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

function PostHogPageView() {
  const client = usePostHog()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const queryString = searchParams.toString()
    const path = queryString ? `${pathname}?${queryString}` : pathname
    client?.capture('$pageview', { path })
  }, [client, pathname, searchParams])

  return null
}

export function PostHogProvider({ children }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      capture_pageview: 'history_change',
      capture_pageleave: true,
      capture_exceptions: true,
      debug: process.env.NODE_ENV === "development",
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  )
}