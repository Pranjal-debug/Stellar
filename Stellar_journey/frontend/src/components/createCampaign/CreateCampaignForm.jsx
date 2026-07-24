import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import Button from "../ui/Button";

export default function CreateCampaignForm({
  title,
  setTitle,
  description,
  setDescription,
  goal,
  setGoal,
  deadline,
  setDeadline,
  loading,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <InputField
        label="Campaign Title"
        value={title}
        onChange={setTitle}
        placeholder="Community Library"
      />

      <TextAreaField
        label="Description"
        value={description}
        onChange={setDescription}
        placeholder="Describe your campaign..."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <InputField
          label="Funding Goal (XLM)"
          type="number"
          value={goal}
          onChange={setGoal}
          placeholder="1000"
        />

        <InputField
          label="Deadline"
          type="date"
          value={deadline}
          onChange={setDeadline}
        />
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        Launch Campaign
      </Button>
    </form>
  );
}