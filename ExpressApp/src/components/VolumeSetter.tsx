interface VolumeSetterProps {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

function VolumeSetter({ volume, setVolume }: VolumeSetterProps) {
  return (
    <section className="p-6 w-1/2">
      <div className="my-12">
        <p className="font-mono text-base my-2">Set Volume</p>
        <input
          type="range"
          min={10}
          max={100}
          className="range"
          step="10"
          value={volume}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value));
          }}
        />
      </div>
    </section>
  );
}

export default VolumeSetter;
