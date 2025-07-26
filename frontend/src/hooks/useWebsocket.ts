import { useEffect, useRef, useState, useCallback } from 'react';

interface IWebsocketOptions<T> {
  onMessage?: (data: T) => void;
  onOpen?: () => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  reconnect?: boolean;
  maxReconnectAttempts?: number;
  reconnectIntervalMs?: number; // initial reconnect delay
  reconnectDecay?: number; // exponential backoff factor
  manualStart?: boolean; // if true, connect() must be called manually
}

export function useWebsocket<T>(
  url: string,
  options: IWebsocketOptions<T> = {},
) {
  const {
    onMessage,
    onOpen,
    onClose,
    onError,
    reconnect = true,
    maxReconnectAttempts = 10,
    reconnectIntervalMs = 1000,
    reconnectDecay = 1.5,
    manualStart = false,
  } = options;
  const wsRef = useRef<WebSocket | null>(null);
  // Track number of reconnect attempts
  const reconnectAttemptsRef = useRef(0);
  // Timeout handle for reconnect
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Track if manually closed to prevent reconnect
  const manuallyClosedRef = useRef(false);

  // Stable refs to event handlers to avoid stale closure issues
  const onMessageRef = useRef(onMessage);
  const onOpenRef = useRef(onOpen);
  const onCloseRef = useRef(onClose);
  const onErrorRef = useRef(onError);

  // Update handler refs on every render
  useEffect(() => {
    onMessageRef.current = onMessage;
    onOpenRef.current = onOpen;
    onCloseRef.current = onClose;
    onErrorRef.current = onError;
  }, [onMessage, onOpen, onClose, onError]);

  // Connected state for consumers
  const [connected, setConnected] = useState(false);

  // Internal function to clear reconnect timer safely
  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  // Connect function to (re)establish WS connection
  const connect = useCallback(() => {
    if (wsRef.current) {
      // Prevent double connections
      return;
    }

    manuallyClosedRef.current = false;

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        reconnectAttemptsRef.current = 0;
        setConnected(true);
        onOpenRef.current?.();
      };

      ws.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          onMessageRef.current?.(data);
        } catch {
          // If not JSON, still pass raw data (string or binary)
          onMessageRef.current?.(event.data);
        }
      };

      ws.onerror = (event) => {
        onErrorRef.current?.(event);
      };

      ws.onclose = (event: CloseEvent) => {
        setConnected(false);
        wsRef.current = null;
        onCloseRef.current?.(event);

        // Reconnect logic
        if (
          reconnect &&
          !manuallyClosedRef.current &&
          reconnectAttemptsRef.current < maxReconnectAttempts
        ) {
          const timeout =
            reconnectIntervalMs *
            Math.pow(reconnectDecay, reconnectAttemptsRef.current);
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current += 1;
            connect();
          }, timeout);
        }
      };
    } catch (error) {
      // Very rare, likely browser rejects URL
      console.error('WebSocket connection failed:', error);
    }
  }, [
    url,
    reconnect,
    maxReconnectAttempts,
    reconnectIntervalMs,
    reconnectDecay,
  ]);

  // Disconnect function to close WS and disable reconnect
  const disconnect = useCallback(() => {
    manuallyClosedRef.current = true;
    clearReconnectTimeout();
    if (wsRef.current) {
      wsRef.current.close(1000, 'Manual disconnect');
      wsRef.current = null;
    }
    setConnected(false);
  }, []);

  // Auto connect on mount unless manualStart=true
  useEffect(() => {
    if (!manualStart) {
      connect();
    }
    return () => {
      manuallyClosedRef.current = true;
      clearReconnectTimeout();
      if (wsRef.current) {
        wsRef.current.close(1000, 'Component unmount');
        wsRef.current = null;
      }
    };
  }, [connect, manualStart]);

  // Send function supporting string or binary data
  const send = useCallback((data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const toSend =
        typeof data === 'string' ||
        data instanceof Blob ||
        data instanceof ArrayBuffer
          ? data
          : JSON.stringify(data);
      wsRef.current.send(toSend);
    } else {
      console.warn('WebSocket not open. Unable to send message.');
    }
  }, []);

  return { connected, send, connect, disconnect };
}
