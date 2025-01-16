// Form for creating or updating sub-tasks

"use client";

import { useActionState } from "react";

import { subTaskFormAction } from "@/app/actions/sub-tasks";
import Card from "@/app/components/ui-elements/general/card";
import { SubTask } from "@/app/lib/type-definitions";

interface SubTaskFormProps {
  userId: string;
  token: any;
  initialData?: SubTask | null;
  taskId: string;
}

const SubTaskForm = ({
  userId,
  token,
  initialData,
  taskId,
}: SubTaskFormProps) => {
  let httpMethod: string;
  let subTaskId: string | null;

  if (initialData) {
    httpMethod = "PATCH";
    subTaskId = initialData.id;
  } else {
    httpMethod = "POST";
    subTaskId = null;
  }

  // Supply form data with extra arguments through bind method
  // To access the arguments in the function signature make sure the props are listed in the same order as below
  // formData prop will come last, after token
  const extendedSubTaskFormAction = subTaskFormAction.bind(
    null,
    httpMethod,
    taskId,
    subTaskId,
    userId,
    token
  );

  const [state, action, pending] = useActionState(
    extendedSubTaskFormAction,
    undefined
  );

  return (
    <Card>
      {initialData ? (
        <h2 className="text-white text-lg py-2">
          Update the selected sub-task below
        </h2>
      ) : (
        <h2 className="text-white text-lg py-2">Create a sub-task below</h2>
      )}
      <form action={action} className="w-full space-y-4 md:space-y-6">
        <div className="w-full flex flex-col gap-y-2">
          <label htmlFor="title" className="text-warm-yellow">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Sub-task Title"
            defaultValue={initialData ? initialData.title : undefined}
            required
            className="p-2 rounded-md focus:outline-none bg-text-field-bg"
          />
        </div>
        {state?.errors?.title && (
          <p className="text-red-500 text-xs">{state.errors.title}</p>
        )}
        {initialData ? (
          <button
            type="submit"
            className="border-1 bg-warm-yellow py-2 px-4 rounded-md"
          >
            {pending ? "Updating..." : "Update"}
          </button>
        ) : (
          <button
            type="submit"
            className="border-1 bg-warm-yellow py-2 px-4 rounded-md"
          >
            {pending ? "Creating..." : "Create"}
          </button>
        )}
      </form>
    </Card>
  );
};

export default SubTaskForm;
