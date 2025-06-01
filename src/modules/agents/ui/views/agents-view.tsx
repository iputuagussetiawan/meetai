"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc=useTRPC();
  const {data}=useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      {JSON.stringify(data,null,2)}
    </div>
  )
}

export const AgentViewLoading=()=>{
  return (
    <LoadingState 
      title="Loading agents" 
      description="Please wait..." 
    />  
  )
}

export const AgentViewError=()=>{
  return (
    <ErrorState 
      title="Error loading agents" 
      description="Please try again later." 
    />  
  )
} 