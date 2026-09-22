'use server';

import { signInFormSchema, signUpFormSchema } from '../validator'; // Imports the Zod validation schemas for sign-in and sign-up forms
import { signIn, signOut } from '@/auth'; //Imports signIn and signOut methods for managing user authentication
import { isRedirectError } from 'next/dist/client/components/redirect-error'; // Imports isRedirectError to check if an error requires a redirect
import { hashSync } from 'bcrypt-ts-edge'; // Imports hashSync to hash passwords for security
import { prisma } from '@/db/prisma';  // Imports Prisma ORM for interacting with the database


// Sign in the user with credentials
export async function signInWithCredentials(prevState: unknown,
  formData: FormData) {
  try {
    // Set user from form and validate it with Zod schema
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    // Signs in the user with the validated credentials
    await signIn('credentials', user);


    // Returns a success message if the sign-in is successful
    return { success: true, message: 'Signed in successfully' };

  } catch (error) { // Catches any error that occurs during the sign-in process
    if (isRedirectError(error)) {
      throw error;
    }
  // If the error is a redirect error, it throws the error
    return { success: false, message: 'Invalid email or password' };
  }
}




// Defines an asynchronous function to sign out the user
export async function SignOutUser() {
  await signOut({
    redirect: true, // Ensures that the user is redirected after signing out
    redirectTo: '/sign-in', // Redirects to the sign-in page after sign-out
  });
}
export default SignOutUser;




// Defines an asynchronous function to sign up a new user.
export async function signUp(prevState: unknown, formData: FormData) {
  try {

 // Validates the name, email, confirmPassword, and password from the form data using signUpFormSchema
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      confirmPassword: formData.get('confirmPassword'),
      password: formData.get('password'),
    });

    // Stores the plain password before hashing it
    const plainPassword = user.password;


    // Hashes the password using bcrypt with a salt rounds value of 10
    user.password = hashSync(user.password, 10);

    // Creates a new user record in the database using Prisma with the hashed password
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    // Signs in the user automatically with the provided credentials after registration
    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    });


    // Returns a success message if the user is registered successfully
    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error; // If the error is a redirect error, it throws the error
    }

   // Returns a failure message if the registration fails
    return {
      success: false,
      message: 'User was not registered',
    };
  }
}