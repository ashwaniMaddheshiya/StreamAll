import { redirectToSignin } from './redirect';

export const myFetch = async (
  url: string,
  options?: RequestInit
): Promise<{ data?: any; error?: any }> => {
  const token = localStorage.getItem('token');

  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
    mode: 'cors',
  });

  const result = await response.json();
  const { error, data } = result;

  if (result.message === "Incorrect or Expired Token" || (error && error.status === 401 && error.message === "Incorrect or Expired Token")) {
    console.log('Token expired, redirecting to signin');
    redirectToSignin();
  }

  return {
    error: result.error ? error : null,
    data: result.data ? data : null,
  };
};
