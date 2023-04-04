function InputFeild({ invalid, onChange, type, name, placeholder, extra }) {
  const styling = invalid
    ? "placeholder:text-error/50 hover:placeholder:text-error !border-b-error focus:outline-error text-error"
    : "placeholder:text-gray hover:placeholder:text-grayL focus:outline-grayL";
  return (
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      className={`transition-all font-form text-base tracking-wide border-solid border-b-2 focus:rounded-sm ${extra} ${styling}`}
      onChange={onChange}
    ></input>
  );
}

export default InputFeild;
