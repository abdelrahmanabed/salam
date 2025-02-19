import { Icon } from "@iconify/react";
import { useFileDownload } from "../hooks/useFileDownload";

const DownloadButton = ({ filePath, color, reportType }) => {
  const downloadMutation = useFileDownload();
  
  if (!filePath) return null;
  
  const fileName = filePath.split('/').pop();
  
  // Map of report types to display names
  const reportNames = {
    initialReport: "Initial Report",
    investigationReport: "Investigation Report",
    actionPlan: "Action Plan",
    lessonLearned: "Lesson Learned",
    closeoutReport: "Closeout Report"
  };

  const handleDownload = () => {
    downloadMutation.mutate({ fileName });
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloadMutation.isPending}
      className={`flex items-center gap-1 px-3 py-[8px] rounded-full text-sm ${color} hover:${color}-700  `}
    >
      {downloadMutation.isPending ? (
        <Icon icon="eos-icons:loading" className="animate-spin" />
      ) : downloadMutation.isSuccess ? (
        <Icon icon="clarity:success-standard-line" />
      ) : downloadMutation.isError ? (
        <Icon icon="clarity:error-standard-line" />
      ) : (
        <Icon icon="mage:file-download-fill" />
      )}
      {reportNames[reportType]}
    </button>
  );
};

export default DownloadButton;