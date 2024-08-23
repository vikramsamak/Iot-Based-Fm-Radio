interface FrequencyDisplayProps {
  frequency: number;
}

function FrequencyDisplay({ frequency }: FrequencyDisplayProps) {
  return (
    <section className="p-6 w-1/2">
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col w-full items-center justify-center">
          <p className="font-mono text-9xl">
            {frequency}
            <span className="mx-2">MHz</span>
          </p>
          <p className="font-mono text-sm">Frequency</p>
        </div>
      </div>
    </section>
  );
}

export default FrequencyDisplay;
