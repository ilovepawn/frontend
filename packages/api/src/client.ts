export interface ApiClientOptions {
  baseUrl: string;
  getAuthToken?: () => string | null | undefined;
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  searchParams?: Record<string, string | number | boolean | undefined>;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: unknown,
  ) {
    super(`[${status}] ${statusText}`);
    this.name = "ApiError";
  }
}

export class ApiClient {
  constructor(private readonly options: ApiClientOptions) {}

  async request<T>(path: string, init: RequestOptions = {}): Promise<T> {
    const { body, searchParams, headers, ...rest } = init;
    const url = this.buildUrl(path, searchParams);

    const finalHeaders = new Headers(headers);
    if (body !== undefined && !finalHeaders.has("Content-Type")) {
      finalHeaders.set("Content-Type", "application/json");
    }
    const token = this.options.getAuthToken?.();
    if (token && !finalHeaders.has("Authorization")) {
      finalHeaders.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(url, {
      ...rest,
      headers: finalHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await this.safeParse(response);
      throw new ApiError(response.status, response.statusText, errorBody);
    }

    if (response.status === 204) {
      return undefined as T;
    }
    return (await response.json()) as T;
  }

  get<T>(path: string, init?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...init, method: "GET" });
  }

  post<T>(path: string, init?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...init, method: "POST" });
  }

  put<T>(path: string, init?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...init, method: "PUT" });
  }

  patch<T>(path: string, init?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...init, method: "PATCH" });
  }

  delete<T>(path: string, init?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...init, method: "DELETE" });
  }

  private buildUrl(path: string, searchParams?: RequestOptions["searchParams"]): string {
    const url = new URL(path, this.options.baseUrl);
    if (searchParams) {
      for (const [key, value] of Object.entries(searchParams)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }
    return url.toString();
  }

  private async safeParse(response: Response): Promise<unknown> {
    try {
      return await response.json();
    } catch {
      return await response.text().catch(() => null);
    }
  }
}
