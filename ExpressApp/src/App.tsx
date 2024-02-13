import { useState } from "react";

function App() {

  const [frequency, setFrequency] = useState(88);
  const [isConnected, setConnected] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
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
    setConnected(false);
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen flex flex-col min-w-screen">
      <header className="w-full flex justify-center py-4 px-4">
        <p className="font-mono text-2xl">IOT BASED FM RADIO</p>
      </header>
      <main className="flex-1">
        <section className="py-6 px-6">
          <div className="flex flex-col w-full gap-2">
            <input
              type="text"
              placeholder="Enter IP address here..."
              className="input w-full text-center"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <div className="flex w-full gap-2">
              <button
                className="btn btn-outline w-1/2"
                disabled={isLoading || isConnected}
                onClick={connectToSocket}
              >
                {isLoading
                  ? <span className="loading loading-spinner loading-xs"></span>
                  : isConnected
                    ? "Connected"
                    : "Connect"}
              </button>
              <button
                className="btn btn-outline w-1/2"
                disabled={ipAddress.length === 0}
                onClick={clearHandler}
              >
                Reset
              </button>
            </div>
          </div>
        </section>
        {isConnected ? (
          <>
            <section className="py-6 px-6">
              <div className="flex justify-center items-center w-full py-6 my-12">
                <div className="flex flex-col w-full items-center justify-center">
                  <p className="font-mono text-9xl">
                    {frequency}
                    <span className="mx-2">MHz</span>
                  </p>
                  <p className="font-mono text-sm">Frequency</p>
                </div>
              </div>
            </section>
            <section className="py-6 px-6">
              <div className="flex flex-col py-6 px-6">
                <div className="my-12">
                  <p className="font-mono text-base my-2">Set Frequency</p>
                  <input
                    type="range"
                    min={88}
                    max={108}
                    className="range"
                    step="0.01"
                    value={frequency}
                    onChange={(e) => {
                      setFrequency(parseFloat(e.target.value));
                      setRadioFrequency();
                    }}
                  />
                </div>
              </div>
            </section>
          </>
        ) : errorMsg.length > 0 ? (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMsg}</span>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
