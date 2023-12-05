import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const useFetchServers = () => {
  const [servers, setServers] = useState([]);
  const [isFetchingServers, setIsFetchingServers] = useState(false);
  const [bestServerUrl, setBestServerUrl] = useState(null);

  const isBestServerFound = useRef(false);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        setIsFetchingServers(true);
        const response = await axios.get('https://server1.eyesp.live/servers');
        setServers(response.data);
        setIsFetchingServers(false);
      } catch (error) {
        // console.error('Error fetching servers:', error);
        setIsFetchingServers(false);
      }
    };

    fetchServers();
  }, []);

  const PING_TIMES = 10;

  const pingServer = async (url: string) => {
    return new Promise((resolve) => {
      const socket = io(url, { transports: ['websocket'] });

      let pingCount = 0;
      let minLatency = Infinity;

      const sendPing = () => {
        socket.emit("ping_event", performance.now());
      };

      socket.on("pong_event", (timestamp) => {
        const currentLatency = performance.now() - timestamp;
        minLatency = Math.min(minLatency, currentLatency);
        pingCount++;
        if (pingCount === PING_TIMES) {
          resolve(minLatency);
          socket.disconnect();
        } else {
          sendPing();
        }
      });

      socket.on('connect_error', () => {
        // console.error('Error connecting to server:', err);
        resolve(Infinity);
        socket.disconnect();
      });

      sendPing();
    });
  };

  const selectBestServer = async () => {
    if (isBestServerFound.current) {
      return bestServerUrl;
    }

    if (servers.length === 0) {
      // console.error('No servers available to ping.');
      return;
    }

    const latencies = await Promise.all(servers.map(server => pingServer(server.url)));
    const minLatency = Math.min(...latencies);
    const bestServer = servers[latencies.indexOf(minLatency)];
    console.log(`Best server: ${bestServer.url} with latency: ${minLatency}ms`);

    setBestServerUrl(bestServer.url);
    isBestServerFound.current = true;

    return bestServer.url;
  };

  return { servers, isFetchingServers, selectBestServer, bestServerUrl };
};

export default useFetchServers;