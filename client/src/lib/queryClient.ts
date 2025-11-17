import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { api } from "./api";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Use frontend API instead of fetch
    const [endpoint, ...params] = queryKey as [string, ...any[]];
    
    try {
      // Route to appropriate API method based on endpoint
      if (endpoint === "/api/properties") {
        const filters = params[0];
        return await api.properties.getAll(filters);
      } else if (endpoint.startsWith("/api/properties/")) {
        const id = endpoint.split("/").pop();
        return await api.properties.getById(id!);
      } else if (endpoint === "/api/agents") {
        const filters = params[0];
        return await api.agents.getAll(filters);
      } else if (endpoint.startsWith("/api/agents/")) {
        const id = endpoint.split("/").pop();
        return await api.agents.getById(id!);
      }
      
      // Fallback to fetch for unhandled endpoints
      const res = await fetch(queryKey.join("/") as string, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    } catch (error) {
      if (unauthorizedBehavior === "returnNull" && error instanceof Error && error.message.includes("401")) {
        return null;
      }
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
