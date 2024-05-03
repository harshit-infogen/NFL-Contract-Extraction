const Awards = ({ awards }) => {
  return (
    awards && (
      <div className="flex flex-col items-start justify-start mt-8">
        <div>
          <h1 className="text-xl">{awards?.Title}</h1>
          <p className="uppercase text-xs">{awards?.Sub_title}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-gray-400">
            <h2 className="text-xl my-4">Reception Markers</h2>
            <ul>
              {awards?.Reception_Markers.map((marker, index) => (
                <li key={index}>{marker}</li>
              ))}
            </ul>
          </div>
          <div className="text-gray-400">
            <h2 className="text-xl my-4">Receiving Markers</h2>
            <ul>
              {awards?.Receiving_Markers.map((marker, index) => (
                <li key={index}>{marker}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default Awards;
