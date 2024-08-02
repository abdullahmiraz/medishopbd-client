// src/app/unauthorized/page.tsx
const UnauthorizedPage = () => {
  return (
    <div className="text-xl space-y-6 min-h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold">Unauthorized Access</h1>
      <p className="text-red-600">
        You do not have permission to view this page.
      </p>
    </div>
  );
};

export default UnauthorizedPage;
