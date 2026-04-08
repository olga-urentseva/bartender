import React, { Component, ErrorInfo, ReactNode, Suspense, use } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  authorId: number;
}

interface Author {
  id: number;
  name: string;
  avatarUrl: string;
}

interface Props {
  postId: number;
}

async function request<T = unknown>(url: string, options: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Server responded with ${response.status} code`);
  }
  const responseBody = await response.text();
  return (responseBody && JSON.parse(responseBody)) as T;
}

export function get<T = unknown>(
  url: string,
  options: Partial<RequestInit> = {},
) {
  return request<T>(url, { ...options, method: "GET" });
}

function getPoststById(id: number) {
  return get<Post>(`/api/posts/${id}`);
}

function getAuthorsById(id: number) {
  return get<Author>(`/api/authors/${id}`);
}

const PostViewer: React.FC<Props> = ({ postId }) => {
  // const [post, setPost] = React.useState<Post | null>(null);
  // const [author, setAuthor] = React.useState<Author | null>(null);
  //   const [loading, setLoading] = React.useState(false);
  const [likes, setLikes] = React.useState(0);

  // must be optimised with useRef
  const post = use(getPoststById(postId));
  const author = use(getAuthorsById(post.authorId));

  const handleLike = React.useCallback(() => {
    setLikes(likes + 1);
  }, []);

  // why do we store likes on a client? this information is useless because it is only for 1 person (user) and every user will get different quantity of likes, because it is rendered on a user/s browser. it is not stored in db.
  // i would ask product manager why do we need this feature because it seems useless for me.
  // from a business perspective im not sure if i should spend time on it, because it is not benefitial.
  const formattedLikes = React.useMemo(() => {
    return likes >= 1000 ? `${likes / 1000}k` : likes;
  }, [likes]);

  return (
    <div>
      <img src={author?.avatarUrl} alt={author?.name} />
      <span>{author?.name}</span>
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
      <button onClick={handleLike}>Like ({formattedLikes})</button>
    </div>
  );
};

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

function PostViewerWrapper(props: Props) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <PostViewer {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default PostViewer;
