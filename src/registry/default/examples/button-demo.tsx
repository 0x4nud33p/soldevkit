import { CopyButton } from "../ui/button";

export default function CopyButtonDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <CopyButton content="Content to copy" size="md" />
    </div>
  );
}
