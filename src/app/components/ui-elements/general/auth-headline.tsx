// Reusable component to render an introduction to the app in the auth forms
// Expects a message prop from the parent

interface AuthHeadlineProps {
  message: string;
}

const AuthHeadline = ({ message }: AuthHeadlineProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-warm-yellow text-xl">Welcome to Proday!</h1>
      <p className="text-white">{message}</p>
    </div>
  );
};

export default AuthHeadline;
