import { useEffect, useRef, useState } from 'react';

interface IWebsocketOptions<T> {
  onMessage?: (data: T) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: () => void;
  reconnect?: boolean;
}

export const useWebsocket = <T = any>(
  url: string,
  options: IWebsocketOptions<T> = {},
) => {
  const { onMessage, onOpen, onClose, onError, reconnect = true } = options;

  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = () => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setConnected(true);
      onOpen?.();
    };

    wsRef.current.onmessage = (event: any) => {
      try {
        console.log(event);
        const data = JSON.parse(event.data);
        onMessage?.(data);
      } catch (e) {
        console.error('Invalid JSON:', e);
      }
    };

    wsRef.current.onerror = () => {
      onError?.();
    };

    wsRef.current.onclose = () => {
      setConnected(false);
      onClose?.();
      if (reconnect) {
        connect();
      }
    };
  };

  useEffect(() => {
    if (!connected) {
      connect();
    }
    return () => {
      wsRef.current?.close();
    };
  }, [url]);

  const send = (data: any) => {
    if (connected && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  };

  return { send, connected };
};
