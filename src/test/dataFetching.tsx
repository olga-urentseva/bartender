import React, { Component, ReactNode, Suspense, use, useRef } from "react";
import { ErrorInfo } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserCardProps {
  userId: string;
}

async function fetchUserData(id: string): Promise<User> {
  try {
    const result = await fetch(`/api/users/${id}`);
    if (!result.ok) {
      throw new Error(`Server responded with ${result.status}`);
    }
    const data = await result.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch user data for ID: ${id}`);
  }
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Something went wrong: {this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const UserCard = ({ userId }: UserCardProps) => {
  const promiseRef = useRef<Promise<User> | null>(null);
  if (!promiseRef.current) {
    promiseRef.current = fetchUserData(userId);
  }

  const data = use<User>(promiseRef.current);

  return (
    <div>
      <h2>{data?.name}</h2>
      <p>{data?.email}</p>
    </div>
  );
};

const Wrapper = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <UserCard userId="123" />
      </Suspense>
    </ErrorBoundary>
  );
};
