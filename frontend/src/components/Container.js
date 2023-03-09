function Container({ children }) {
  return (
    <div className="max-w-[90rem] mx-auto">
      <div className="mx-4 lg:mx-0 lg:px-8 flex">{children}</div>
    </div>
  );
}

export default Container;
