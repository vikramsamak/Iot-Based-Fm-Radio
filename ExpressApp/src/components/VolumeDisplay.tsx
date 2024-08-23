interface VolumeDisplayProps {
  volume: number;
}
function VolumeDisplay({ volume }: VolumeDisplayProps) {
  return (
    <section className="p-6 w-1/2">
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col w-full items-center justify-center">
          <p className="font-mono text-9xl">
            {volume}
            <span className="mx-2">%</span>
          </p>
          <p className="font-mono text-sm">Volume</p>
        </div>
      </div>
    </section>
  );
}

export default VolumeDisplay;
