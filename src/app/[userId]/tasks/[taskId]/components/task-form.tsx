// Form component for creating new tasks or updating new tasks

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
  return (
    <Card className="">
      {initialData ? (
        <h2 className="text-white text-lg py-2">
          Update the selected task below
        </h2>
      ) : (
        <h2 className="text-white text-lg py-2">Create a task below</h2>
      )}
      <form className="w-full space-y-4 md:space-y-6">
        <div className="w-full flex flex-col gap-y-2">
          <label htmlFor="title" className="text-warm-yellow">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Task Title"
            defaultValue={initialData ? initialData.title : undefined}
            required
            className="p-2 rounded-md focus:outline-none bg-text-field-bg"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6">
          <div className="w-full flex flex-col gap-y-2">
            <label htmlFor="type" className="text-warm-yellow">
              Type
            </label>
            <select
              name="type"
              id="type"
              className="p-2 rounded-md focus:outline-none bg-text-field-bg"
              required
            >
              {TASK_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <label htmlFor="urgency" className="text-warm-yellow">
              Urgency
            </label>
            <select
              name="urgency"
              id="urgency"
              className="p-2 rounded-md focus:outline-none bg-text-field-bg"
              required
            >
              {URGENCY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <label htmlFor="importance" className="text-warm-yellow">
              Importance
            </label>
            <select
              name="importance"
              id="importance"
              className="p-2 rounded-md focus:outline-none bg-text-field-bg"
              required
            >
              {IMPORTANCE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <label htmlFor="deadline" className="text-warm-yellow">
              Deadline (optional)
            </label>
            <select
              name="deadline"
              id="deadline"
              className="p-2 rounded-md focus:outline-none bg-text-field-bg"
            >
              {remainingHours.map((hour) => (
                <option key={hour.id} value={hour.value}>
                  {hour.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="border-1 bg-warm-yellow py-2 px-4 rounded-md"
        >
          {initialData ? "Update Task" : "Create Task"}
        </button>
      </form>
    </Card>
  );
};

export default TaskForm;
