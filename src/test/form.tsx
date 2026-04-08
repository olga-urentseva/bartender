import React, {
  use,
  useTransition,
  Suspense,
  Component,
  ReactNode,
  ErrorInfo,
} from "react";

// ---- API layer ----

async function request<T = unknown>(
  url: string,
  options: RequestInit,
): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Server responded with ${response.status} code`);
  }
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

function get<T = unknown>(url: string, options: Partial<RequestInit> = {}) {
  return request<T>(url, { ...options, method: "GET" });
}

function post<T = unknown>(
  url: string,
  body: unknown,
  options: Partial<RequestInit> = {},
) {
  return request<T>(url, {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options.headers },
    body: JSON.stringify(body),
  });
}

// ---- Types ----

interface LoginForm extends Record<string, unknown> {
  email: string;
  password: string;
}

// ---- Business logic ----

function validateLoginForm(
  values: LoginForm,
): Partial<Record<keyof LoginForm, string>> {
  const errors: Partial<Record<keyof LoginForm, string>> = {};
  if (!values.email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(values.email))
    errors.email = "Email is invalid";
  if (!values.password) errors.password = "Password is required";
  else if (values.password.length < 8)
    errors.password = "Password must be at least 8 characters";
  return errors;
}

async function submitLoginForm(values: LoginForm): Promise<void> {
  await post("/api/login", values);
}

// ---- useForm hook ----

function useForm<T extends Record<string, unknown>>(
  onSubmit: (values: T) => Promise<void>,
  validate?: (values: T) => Partial<Record<keyof T, string>>,
) {
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>(
    {},
  );
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as T;
    const validationErrors = validate?.(data) ?? {};
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      startTransition(async () => {
        await onSubmit(data);
      });
    }
  };

  const resetForm = (e: React.RefObject<HTMLFormElement>) => {
    e.current?.reset();
    setErrors({});
  };

  return { errors, isPending, handleSubmit, resetForm };
}

// ---- Error Boundary ----

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Caught by ErrorBoundary:", error, info);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return this.props.fallback ? (
        this.props.fallback(this.state.error, this.reset)
      ) : (
        <div>
          <p>Something went wrong: {this.state.error.message}</p>
          <button onClick={this.reset}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ---- LoginPage ----

const LoginPage: React.FC = () => {
  const { errors, isPending, handleSubmit } = useForm<LoginForm>(
    submitLoginForm,
    validateLoginForm,
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          disabled={isPending}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          disabled={isPending}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

// ---- Wrapper ----

export default function LoginPageWrapper() {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div>
          <p>Failed to load: {error.message}</p>
          <button onClick={reset}>Retry</button>
        </div>
      )}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    </ErrorBoundary>
  );
}
