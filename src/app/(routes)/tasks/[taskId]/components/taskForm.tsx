"use client";
import axios from "axios";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import CustomInput from "@/app/components/ui/customInput";
import { GoPlusCircle } from "react-icons/go";
import { colors } from "@/lib/colors";
import { FaCheck } from "react-icons/fa6";

// Form to create/edit tasks
// Uses Formik for easier form handling, axios for API requests, and React Hot Toast for notifications
const TaskForm = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-[90%] lg:w-[736px] gap-y-4 pt-8 lg:pt-16">
        <FaArrowLeft
          size={24}
          className="text-white cursor-pointer hover:text-text-gray"
          onClick={() => router.push("/")}
        />
        <Formik
          initialValues={{
            title: "",
            color: "",
          }}
          onSubmit={async ({ title, color }, { setSubmitting }) => {
            try {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
                {
                  title,
                  color,
                }
              );

              // If API call is successful, toast success message
              toast.success("You have successfully crreated a task!");
              router.push("/");
            } catch (apiError) {
              // If API call fails, toast error message
              toast.error(
                "Could not create your task. Please try again later!"
              );
            } finally {
              // Set submitting state to false regardless of success or failure
              setSubmitting(false);
            }
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Task title is required."),
            color: Yup.string().required("Task color is required."),
          })}
        >
          {({ values, errors, isValid, dirty, isSubmitting }) => (
            <Form className="space-y-8">
              <CustomInput
                label="Title"
                name="title"
                type="text"
                id="title"
                required
                placeholder="Ex. Brush your teeth"
                autoComplete="title"
              />
              <div className="pb-2 text-light-blue font-bold text-sm">
                <span>Color</span>
              </div>
              {colors.map((color) => (
                <label
                  key={color.value}
                  style={{
                    display: "inline-block",
                    backgroundColor: color.value,
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    marginTop: "8px",
                    marginRight: "12px",
                    cursor: "pointer",
                    border:
                      values.color === color.value
                        ? "2px solid white"
                        : "2px solid #000", // Apply white border if selected
                  }}
                >
                  <Field
                    type="radio"
                    name="color"
                    value={color.value}
                    style={{
                      opacity: 0,
                      position: "absolute",
                      width: 0,
                      height: 0,
                    }}
                    autoComplete="off"
                  />
                </label>
              ))}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-dark-blue hover:bg-light-blue p-4 rounded-lg text-button-text text-sm font-bold flex items-center justify-center gap-x-2 w-full disabled:cursor-not-allowed"
              >
                {values.title && values.color && dirty ? (
                  <>
                    Save <FaCheck size={16} />
                  </>
                ) : (
                  <>
                    Add Task <GoPlusCircle size={16} />
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskForm;
