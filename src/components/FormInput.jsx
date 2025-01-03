function FormInput({ label, name, type, defaultValue }) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label ">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        name={name}
        type={type}
        placeholder="Type here"
        className="input input-bordered"
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default FormInput;
