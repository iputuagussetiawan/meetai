"use client"

import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"


const HomeView = () => {
  const trpc=useTRPC()
  const {data}=useQuery(trpc.hello.queryOptions({text:"Agus From TRPC Client"}))

  return (
    <div className="flex flex-col gap-y-10">
      {data?.greeting}
    </div>
  )
}

export default HomeView