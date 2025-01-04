function FormInput({ label, name, type, defaultValue, size }) {
  return (
    <div className="form-control">
      <label className="label ">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        name={name}
        type={type}
        placeholder="Type here"
        className={`input input-bordered ${size}`}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default FormInput;
