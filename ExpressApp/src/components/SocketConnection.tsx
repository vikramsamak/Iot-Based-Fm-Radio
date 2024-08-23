interface HederProps {
  setIpAddress: React.Dispatch<React.SetStateAction<string>>;
  ipAddress: string;
  isLoading: boolean;
  isConnected: boolean;
  connectToSocket: () => void;
  clearHandler: () => void;
}

function Header({
  setIpAddress,
  ipAddress,
  isLoading,
  isConnected,
  connectToSocket,
  clearHandler,
}: HederProps) {
  return (
    <section className="p-6">
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
            {isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : isConnected ? (
              "Connected"
            ) : (
              "Connect"
            )}
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
  );
}

export default Header;
