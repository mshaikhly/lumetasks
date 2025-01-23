// Helper Component for Error Messages
export const ErrorMessage: React.FC<{ id: string; message: string | null }> = ({
  id,
  message,
}) => {
  if (!message) return null; // Don't render if no error message
  return (
    <p id={id} className="text-sm text-red-500 mt-1">
      {message}
    </p>
  );
};