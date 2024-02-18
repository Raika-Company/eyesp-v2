import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

/**
 * Custom hook for fetching and pinging servers to determine the best server.
 * The hook provides information about available servers, their status, and the best server.
 *
 * @returns An object containing servers, fetching status, a function to select the best server, and the URL of the best server.
 */
const useFetchServers = () => {
  const [servers, setServers] = useState<any[]>([]);
  const [isFetchingServers, setIsFetchingServers] = useState(false);
  const [bestServerUrl, setBestServerUrl] = useState(null);

  const isBestServerFound = useRef(false);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        setIsFetchingServers(true);
        const response = await axios.get("https://server1.eyesp.live/servers");
        // console.log(response);

        setServers(response.data);
        setIsFetchingServers(false);
      } catch (error) {
        // console.error('Error fetching servers:', error);
        setIsFetchingServers(false);
        toast.error(
          "مشکلی در ارتباط با سرور ایجاد شده است. لطفا دقایقی دیگر تلاش کنید."
        );
      }
    };

    fetchServers();
  }, []);

  /**
 * Number of ping attempts.
 */
  const PING_TIMES = 10;

  /**
 * Function to ping a server and measure latency.
 *
 * @param url - The URL of the server to ping.
 * @returns A promise that resolves to the minimum latency measured in milliseconds.
 */
  const pingServer = async (url: string) => {
    return new Promise((resolve) => {
      const socket = io(url, { transports: ["websocket"] });

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

      socket.on("connect_error", () => {
        // console.error('Error connecting to server:', err);
        resolve(Infinity);
        socket.disconnect();
      });

      sendPing();
    });
  };

  /**
 * Function to select the best server based on ping latencies.
 *
 * @returns The URL of the best server.
 */
  const selectBestServer = async () => {
    if (isBestServerFound.current) {
      return bestServerUrl;
    }

    if (servers.length === 0) {
      // console.error('No servers available to ping.');
      return;
    }

    const latencies: any[] = await Promise.all(
      servers.map((server) => pingServer(server.url))
    );
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
