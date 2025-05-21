// Form component for creating new tasks or updating new tasks when initial data is not null

"use client";

import { useActionState } from "react";

import { taskFormAction } from "@/app/actions/tasks";
import Card from "@/app/components/ui-elements/general/card";
import { Task } from "@/app/lib/type-definitions";
import { listRemainingHours } from "@/app/lib/util";

interface TaskFormProps {
  initialData: Task | null;
}

const TASK_TYPES = [
  { value: "GENERAL", label: "General" },
  { value: "WORK", label: "Work" },
  { value: "PERSONAL", label: "Personal" },
  { value: "ERRAND", label: "Errand" },
  { value: "SHOPPING", label: "Shopping" },
  { value: "OTHER", label: "Other" },
];

const URGENCY_TYPES = [
  { value: "URGENT", label: "Urgent" },
  { value: "NOT_URGENT", label: "Not Urgent" },
];

const IMPORTANCE_TYPES = [
  { value: "IMPORTANT", label: "Important" },
  { value: "NOT_IMPORTANT", label: "Not Important" },
];

const remainingHours = listRemainingHours();

const TaskForm = ({ initialData }: TaskFormProps) => {
  let httpMethod: string;
  let taskId: string | null;

  if (initialData) {
    httpMethod = "PATCH";
    taskId = initialData.id;
  } else {
    httpMethod = "POST";
    taskId = null;
  }

  // Supply form data with extra arguments through bind method
  // To access the arguments in the function signature make sure the props are listed in the same order as below
  // formData prop will come last
  const extendedTaskFormAction = taskFormAction.bind(null, httpMethod, taskId);

  const [state, action, pending] = useActionState(
    extendedTaskFormAction,
    undefined
  );

  return (
    <Card>
      <div className="w-full text-white text-lg py-2">
        {initialData ? (
          <h2>Update the selected task below</h2>
        ) : (
          <h2>Create a task below</h2>
        )}
      </div>
      <form action={action} className="w-full space-y-4 md:space-y-6">
        <div className="w-full flex flex-col gap-y-2">
          <label htmlFor="title" className="text-warm-yellow">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Task Title"
            required
            defaultValue={initialData ? initialData.title : undefined}
            className="p-2 rounded-md focus:outline-none bg-text-field-bg"
          />
        </div>
        {state?.errors?.title && (
          <p className="text-red-500 text-xs">{state.errors.title}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6">
          <div className="w-full flex flex-col gap-y-2">
            <label htmlFor="type" className="text-warm-yellow">
              Type
            </label>
            <select
              name="type"
              id="type"
              required
              defaultValue={initialData ? initialData.type : undefined}
              className="p-2 rounded-md focus:outline-none bg-text-field-bg"
            >
              {TASK_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          {state?.errors?.type && (
            <p className="text-red-500 text-xs">{state.errors.type}</p>
          )}
          <div className="w-full flex flex-col gap-y-2">
            <label htmlFor="urgency" className="text-warm-yellow">
              Urgency
            </label>
            <select
              name="urgency"
              id="urgency"
              required
              defaultValue={initialData ? initialData.urgency : undefined}
              className="p-2 rounded-md focus:outline-none bg-text-field-bg"
            >
              {URGENCY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          {state?.errors?.urgency && (
            <p className="text-red-500 text-xs">{state.errors.urgency}</p>
          )}
          <div className="w-full flex flex-col gap-y-2">
            <label htmlFor="importance" className="text-warm-yellow">
              Importance
            </label>
            <select
              name="importance"
              id="importance"
              required
              defaultValue={initialData ? initialData.importance : undefined}
              className="p-2 rounded-md focus:outline-none bg-text-field-bg"
            >
              {IMPORTANCE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          {state?.errors?.importance && (
            <p className="text-red-500 text-xs">{state.errors.importance}</p>
          )}
          <div className="w-full flex flex-col gap-y-2">
            <label htmlFor="dueDate" className="text-warm-yellow">
              Deadline (optional)
            </label>
            <select
              name="dueDate"
              id="dueDate"
              defaultValue={initialData ? initialData.dueDate : undefined}
              className="p-2 rounded-md focus:outline-none bg-text-field-bg"
            >
              <option>Select Deadline</option>
              {remainingHours.map((hour) => (
                <option key={hour.id} value={hour.value}>
                  {hour.value}
                </option>
              ))}
            </select>
          </div>
          {state?.errors?.dueDate && (
            <p className="text-red-500 text-xs">{state.errors.dueDate}</p>
          )}
        </div>
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
        {state?.serverErrors && (
          <p className="text-red-500 text-sm">{state.serverErrors}</p>
        )}
      </form>
    </Card>
  );
};

export default TaskForm;
