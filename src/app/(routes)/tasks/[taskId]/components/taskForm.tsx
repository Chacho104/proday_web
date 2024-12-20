"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import CustomInput from "@/app/components/ui/customInput";
import { GoPlusCircle } from "react-icons/go";
import { colors } from "@/lib/colors";
import { FaCheck } from "react-icons/fa6";
import { Task } from "@/models/task";

// Form to create/edit tasks
// Uses Formik for easier form handling, axios for API requests, and React Hot Toast for notifications
interface TaskFormProps {
  initialData: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

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
            title: initialData?.title || "", // Pre-populate with initialData.title if available
            color: initialData?.color || "", // Pre-populate with initialData.color if available
          }}
          onSubmit={async ({ title, color }, { setSubmitting }) => {
            try {
              // Check if we're editing or creating
              const endpoint = initialData
                ? `${process.env.NEXT_PUBLIC_TASK_API_URL}/${initialData.id}` // Edit endpoint
                : `${process.env.NEXT_PUBLIC_TASK_API_URL}`; // Create endpoint
              const method = initialData ? "put" : "post"; // PUT for editing, POST for creating

              await axios[method](endpoint, {
                title,
                color,
              });

              toast.success(
                initialData
                  ? "Task updated successfully!"
                  : "Task created successfully!"
              );
              router.push("/");
            } catch (apiError) {
              toast.error(
                initialData
                  ? "Could not update the task. Please try again later!"
                  : "Could not create your task. Please try again later!"
              );
            } finally {
              setSubmitting(false);
            }
          }}
          validationSchema={Yup.object({
            title: Yup.string().required(
              "Please provide a title for your task."
            ),
            color: Yup.string().required(
              "Please select a color for your task."
            ),
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
              <div>
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
                <div className="text-red-500 pt-2">
                  <ErrorMessage className="mt-0" name="color" />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-dark-blue hover:bg-light-blue p-4 rounded-lg text-button-text text-sm font-bold flex items-center justify-center gap-x-2 w-full disabled:cursor-not-allowed"
              >
                {initialData || (values.title && values.color && dirty) ? (
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
