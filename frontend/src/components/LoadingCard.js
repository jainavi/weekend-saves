function LoadingCard() {
  return (
    <div className="card card-compact w-96 h-80 mb-4 justify-self-center border border-grayL border-opacity-50">
      <div className="h-40 bg-grayL/50 rounded-t-2xl animate-pulse" />
      <div className="card-body bg-neutral text-gray rounded-b-2xl animate-pulse">
        <div className="h-4 bg-grayL/50 rounded-full" />
        <div>
          <div className="inline-block h-4 w-[50%] bg-grayL/50 rounded-full" />
          <div className="inline-block ml-2 h-4 w-[25%] bg-grayL/50 rounded-full" />
        </div>
        <div className="card-actions self-end mt-12">
          <div className="badge bg-grayL/50 w-24 mr-28" />
          <div className="badge bg-grayL/50 w-14 ml-3" />
          <div className="badge bg-grayL/50 w-14" />
        </div>
      </div>
    </div>
  );
}

export default LoadingCard;
