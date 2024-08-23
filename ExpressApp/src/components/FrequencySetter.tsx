interface FrequencySetterProps {
  frequency: number;
  setFrequency: React.Dispatch<React.SetStateAction<number>>;
  setRadioFrequency: () => void;
}

function FrequencySetter({
  frequency,
  setFrequency,
  setRadioFrequency,
}: FrequencySetterProps) {
  return (
    <section className="p-6 w-1/2">
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
    </section>
  );
}

export default FrequencySetter;
