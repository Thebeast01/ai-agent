import { auth } from "@/lib/auth";
import { AgentsListHeader } from "@/modules/agents/components/list-headers";
import { AgentsViewError, AgentsViewLoading, AgentsViews } from "@/modules/agents/ui/views/agents-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) {
    redirect('/sign-in')
  }
  // Fetch the initial data for agents
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())
  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsViews />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
export default Page;
