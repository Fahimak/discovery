"use client"; // Error components must be Client Components

import PageLayout from "components/PageLayout/PageLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <PageLayout sideMenu={true}>
      <div className="p-5">
        <h2>Something went wrong!</h2>
        <button
          className="primaryBtn mt-2"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => router.push("/home")
          }
        >
          Go Back
        </button>
      </div>
    </PageLayout>
  );
}
