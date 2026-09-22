import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import CredentialsSignInForm from "./credentials-signin-form";
import { auth } from '@/auth';
import { redirect } from "next/navigation";


// The title will be used by Next.js to set the page’s title in the browser tab and improve SEO.
export const metadata: Metadata = {
  title: "Sign In",
};


// Accepts props, which contains searchParams (a promise)
const SignIn = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {

 // Extract the callback URL from the search parameters (used for redirection after login) (URL encoded)
  const { callbackUrl } = await props.searchParams;

 // Check if the user has an active session
  const session = await auth();
  
// If a session exists, log a message and redirect the user to the callback URL or home page
  if (session) {
    console.log("Redirecting to home page...");
    return redirect(callbackUrl || '/');
  }


  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              priority={true}
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
            />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
