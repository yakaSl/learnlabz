'use client';

import { useState } from 'react';

/**
 * API Test Page
 * Simple page to test API connectivity and CORS configuration
 */
export default function TestApiPage() {
  const [status, setStatus] = useState<string>('Ready to test');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testDirectAPI = async () => {
    setStatus('Testing direct API call...');
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('https://api.learnlabz.com/api/user/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          data: {
            username: 'johndoe5',
            password: 'securePassword123',
          },
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('✅ Success!');
        setResponse(data);
      } else {
        setStatus('❌ Failed');
        setError(`HTTP ${res.status}: ${res.statusText}`);
        setResponse(data);
      }
    } catch (err: any) {
      setStatus('❌ Error');
      setError(err.message);
      console.error('API Test Error:', err);
    }
  };

  const testProxyAPI = async () => {
    setStatus('Testing proxy API call...');
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/proxy/user/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            username: 'johndoe5',
            password: 'securePassword123',
          },
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('✅ Success via Proxy!');
        setResponse(data);
      } else {
        setStatus('❌ Failed');
        setError(`HTTP ${res.status}: ${res.statusText}`);
        setResponse(data);
      }
    } catch (err: any) {
      setStatus('❌ Error');
      setError(err.message);
      console.error('Proxy Test Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">API & CORS Test</h1>
          <p className="text-gray-600 mb-8">
            Test backend API connectivity and CORS configuration
          </p>

          {/* Test Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={testDirectAPI}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Test Direct API Call
            </button>

            <button
              onClick={testProxyAPI}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
            >
              Test Proxy API Call
            </button>
          </div>

          {/* Status */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Status</h2>
            <div className="bg-gray-100 p-4 rounded">
              <code className="text-sm">{status}</code>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-red-600">Error</h2>
              <div className="bg-red-50 border border-red-200 p-4 rounded">
                <code className="text-sm text-red-800">{error}</code>
              </div>
            </div>
          )}

          {/* Response */}
          {response && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Response</h2>
              <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
                <pre className="text-xs">{JSON.stringify(response, null, 2)}</pre>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Open browser DevTools (F12)</li>
              <li>Go to Console tab to see detailed logs</li>
              <li>Go to Network tab to see HTTP requests</li>
              <li>Click "Test Direct API Call" to test CORS-enabled API</li>
              <li>If CORS error, click "Test Proxy API Call" as workaround</li>
              <li>Check console for any CORS-related errors</li>
            </ol>
          </div>

          {/* Environment Info */}
          <div className="mt-6 border-t pt-6">
            <h3 className="font-semibold mb-2">Environment:</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>API URL:</strong>{' '}
                {process.env.NEXT_PUBLIC_API_URL || 'Not configured'}
              </p>
              <p>
                <strong>Mode:</strong> {process.env.NODE_ENV}
              </p>
              <p>
                <strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.origin : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
