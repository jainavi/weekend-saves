function InputFeild({ invalid, onChange, type, name, placeholder, extra }) {
  const styling = invalid
    ? "placeholder:text-error/50 hover:placeholder:text-error border-b-error focus:outline-error text-error"
    : "placeholder:text-gray hover:placeholder:text-grayL border-b-gray focus:outline-grayL";
  return (
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      className={`transition-all font-form text-base tracking-wide w-full pb-2 ${styling} bg-secondary border-solid border-b-2 focus:border-none focus:outline focus:outline-offset-8 focus:outline-2 focus:rounded-sm focus:pb-0 ${extra}`}
      onChange={onChange}
    ></input>
  );
}

export default InputFeild;
