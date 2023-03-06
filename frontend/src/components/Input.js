function InputFeild({ name }) {
  return (
    <input
      type="text"
      id={name}
      name={name}
      placeholder={name}
      className="transition-all font-form text-base tracking-wide w-full pb-2 placeholder:text-gray hover:placeholder:text-grayL focus:placeholder:text-grayL bg-secondary border-solid border-b-2 border-b-gray focus:border-none focus:outline focus:outline-offset-8 focus:outline-grayL focus:outline-2 focus:rounded-sm focus:pb-0"
    ></input>
  );
}

export default InputFeild;
