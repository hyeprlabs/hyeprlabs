import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function LegalDisclaimer() {
  return (
    <Alert className="border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50 mb-6">
      <AlertTriangle />
      <AlertTitle>Legal Disclaimer: Under Construction</AlertTitle>
      <AlertDescription>
        This page is currently under construction and the information provided
        is not yet legally binding. The contents herein are for demonstration
        purposes only. We assume no liability for the accuracy, completeness, or
        timeliness of this information at this stage. Please consult a legal
        professional for official guidance.
      </AlertDescription>
    </Alert>
  );
}
