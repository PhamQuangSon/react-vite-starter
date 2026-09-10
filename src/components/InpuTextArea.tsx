import type { IInputProps } from "@/utils/interfaces";

const InputTextArea = (props: IInputProps) => {
  const { title, required, options, register, name } = props;
  const errors = options?.errors;
  const rg = register ? register(name, { required: required }) : {};
  const hasError = errors && errors[name];

  return (
    <div className="form-control w-full">
      <label className="label">
        <h4 className="text-md label-text">
          {title}
          {required ? <b className="">*</b> : null}
        </h4>
      </label>
      <textarea
        {...rg}
        className={`bg-gray-50 border border-gray-300 
            text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
            focus:border-primary-600 block w-full p-2.5 h-60 
           ${hasError ? "textarea-error" : ""}`}
        placeholder={"Description"}
      ></textarea>
    </div>
  );
};

export default InputTextArea;
