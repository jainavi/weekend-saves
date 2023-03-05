function Container({ children }) {
  return (
    <main className="max-w-[90rem] mx-auto">
      <div className="mx-4 lg:mx-0 lg:px-8 flex">{children}</div>
    </main>
  );
}

export default Container;
