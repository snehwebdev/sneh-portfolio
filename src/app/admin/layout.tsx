import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  const allowedEmail =
    "snehwebdev@gmail.com";

  const email =
    user?.emailAddresses?.[0]?.emailAddress;

  if (email !== allowedEmail) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}