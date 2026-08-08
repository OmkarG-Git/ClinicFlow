"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button/Button";

type Props = {
  hasChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
  onReset?: () => void;
};

export function SettingsSaveBar({
  hasChanges,
  isSaving,
  onSave,
  onReset,
}: Props) {
  if (!hasChanges) return null;

  return (
    <div className="sticky -bottom-3 lg:bottom-6 z-50 mt-8 flex justify-end">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3 shadow-xl">

        <span className="text-sm text-muted-foreground">
          You have unsaved changes.
        </span>

        {onReset && (
          <Button
            variant="outline"
            onClick={onReset}
            disabled={isSaving}
          >
            Cancel
          </Button>
        )}

        <Button
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>

      </div>
    </div>
  );
}