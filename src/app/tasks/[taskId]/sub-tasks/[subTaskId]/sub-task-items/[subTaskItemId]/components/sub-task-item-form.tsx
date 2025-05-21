"use client";

import { subTaskItemFormAction } from "@/app/actions/sub-task-items";
import Card from "@/app/components/ui-elements/general/card";
import { SubTaskItem } from "@/app/lib/type-definitions";
import { useActionState } from "react";

interface SubTaskItemFormProps {
  initialData: SubTaskItem | null;
  subTaskId: string;
}

const SubTaskItemForm = ({ initialData, subTaskId }: SubTaskItemFormProps) => {
  let httpMethod: string;
  let subTaskItemId: string | null;

  if (initialData) {
    httpMethod = "PATCH";
    subTaskItemId = initialData.id;
  } else {
    httpMethod = "POST";
    subTaskItemId = null;
  }

  // Supply form data with extra arguments through bind method
  // To access the arguments in the function signature make sure the props are listed in the same order as below
  // formData prop will come last
  const extendedSubTaskItemFormAction = subTaskItemFormAction.bind(
    null,
    httpMethod,
    subTaskId,
    subTaskItemId
  );

  const [state, action, pending] = useActionState(
    extendedSubTaskItemFormAction,
    undefined
  );
  return (
    <Card>
      {initialData ? (
        <h2 className="text-white text-lg py-2">
          Update the selected sub-task item below
        </h2>
      ) : (
        <h2 className="text-white text-lg py-2">
          Create a sub-task item below
        </h2>
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
            placeholder="Sub-task Item Title"
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

export default SubTaskItemForm;
