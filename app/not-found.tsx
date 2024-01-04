import PageLayout from "components/PageLayout/PageLayout";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageLayout sideMenu={true}>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </PageLayout>
  );
}
