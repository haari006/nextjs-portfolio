"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /menu/homepage
    router.replace('/universe');
  }, [router]);

  // While redirecting, you can show a loader or any other placeholder content
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
    </div>
  );
}