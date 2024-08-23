import { useState } from "react";
import ErrorAlert from "./components/ErrorAlert";
import FrequencyDisplay from "./components/FrequencyDisplay";
import SocketConnection from "./components/SocketConnection";
import FrequencySetter from "./components/FrequencySetter";
import VolumeDisplay from "./components/VolumeDisplay";
import VolumeSetter from "./components/VolumeSetter";

function App() {
  const [frequency, setFrequency] = useState<number>(88);
  const [volume, setVolume] = useState<number>(10);
  const [isConnected, setConnected] = useState<boolean>(false);
  const [ipAddress, setIpAddress] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket>();

  const connectToSocket = async () => {
    if (!ipAddress || ipAddress.trim().length === 0) {
      setErrorMsg("Please enter a valid IP address.");
      return;
    }
    try {
      setLoading(true);
      setErrorMsg("");
      await new Promise((resolve, reject) => {
        const socket = new WebSocket(`ws://${ipAddress.trim()}:81`);
        socket.onopen = () => {
          setConnected(true);
          setErrorMsg("");
          setSocket(socket);
          resolve("Connected");
        };
        socket.onerror = (error) => {
          setErrorMsg("Failed to connect to the server.");
          console.error("WebSocket error:", error);
          setConnected(false);
          reject(error);
        };
      });
    } catch (error) {
      console.error("WebSocket creation error:", error);
      setErrorMsg("Failed to create WebSocket.");
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const setRadioFrequency = () => {
    if (!socket) {
      console.error("WebSocket is not initialized");
      setErrorMsg("WebSocket is not initialized");
      return;
    }
    if (socket.readyState === WebSocket.OPEN) {
      socket.send("SET_FREQUENCY:" + frequency);
      setErrorMsg("");
    } else {
      console.error("WebSocket is not open");
      setErrorMsg("WebSocket is not open");
    }
  };

  const clearHandler = () => {
    socket?.send("SET_FREQUENCY:" + 88.0);
    setIpAddress("");
    setFrequency(88);
    setVolume(10);
    setConnected(false);
    setErrorMsg("");
  };

  return (
    <div className="h-screen flex flex-col min-w-screen">
      <header className="w-full flex justify-center py-4 px-4">
        <p className="font-mono text-2xl">IOT BASED FM RADIO</p>
      </header>
      <main className="grow flex flex-col">
        <SocketConnection
          clearHandler={clearHandler}
          connectToSocket={connectToSocket}
          ipAddress={ipAddress}
          isConnected={isConnected}
          isLoading={isLoading}
          setIpAddress={setIpAddress}
        />
        {isConnected ? (
          <>
            <div className="flex w-full gap-2 p-6 grow items-center">
              <FrequencyDisplay frequency={frequency} />
              <VolumeDisplay volume={volume} />
            </div>
            <div className="flex w-full gap-2 p-6">
              <FrequencySetter
                frequency={frequency}
                setFrequency={setFrequency}
                setRadioFrequency={setRadioFrequency}
              />
              <VolumeSetter volume={volume} setVolume={setVolume} />
            </div>
          </>
        ) : errorMsg.length > 0 ? (
          <ErrorAlert errorMsg={errorMsg} />
        ) : null}
      </main>
    </div>
  );
}

export default App;
