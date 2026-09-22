"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValues } from "@/lib/constants";
import Link from "next/link";

import { useActionState } from "react";  // Manages form submission state
import { useFormStatus } from "react-dom"; // Tracks form status (pending)
import { signInWithCredentials } from "@/lib/actions/user.actions"; // Function to handle sign-in

import { useSearchParams } from "next/navigation"; // Retrieves query parameters from the URL


const CredentialsSignInForm = () => {  // Defines the sign-in form component

  // useActionState stores sign-in result (success & message)
  // useActionState stores sign-in result (success & message)
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  // Extracts callbackUrl from URL params or (fallback is /)
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";


  const SignInButton = () => {
    // Checks if the form is pending (useFormStatus)
    const { pending } = useFormStatus();
    return (

      // Disables the button while signing in
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Signing In..." : "Sign In"}
      </Button>
    );
  };

  return (
    // Submits form using action (calls signInWithCredentials)
    <form action={action}>
    
    <input type='hidden' name='callbackUrl' value={callbackUrl} />

      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            required
            type="email"
            defaultValue={signInDefaultValues.email}
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
            defaultValue={signInDefaultValues.password}
            autoComplete="current-password"
          />
        </div>
        <div>
          <SignInButton />
        </div>

        {/* Displays error message if sign-in fails  */}
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link target="_self" className="link" href="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
