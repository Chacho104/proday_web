import { Field, FieldHookConfig, useField } from "formik";

interface ICustomFieldProps {
  label?: string | React.JSX.Element;
}

const CustomInput: React.FC<FieldHookConfig<string> & ICustomFieldProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div>
      {label && (
        <div className="pb-2 text-light-blue font-bold text-sm">
          <label htmlFor={props.id || props.name}>{label}</label>
        </div>
      )}
      <Field
        className={`${meta.touched && meta.error ? "text-brand-500" : ""} ${
          meta.touched && meta.error ? "outline-0" : ""
        } ${
          meta.touched && meta.error ? "border-brand-400" : ""
        } disabled:opcity-70 w-full border-[1px] border-badge-gray rounded-lg bg-task-card-bg p-4 text-button-text font-normal text-sm outline-0 transition disabled:cursor-not-allowed`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="mt-1 text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default CustomInput;
