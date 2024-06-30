"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div
      className="flex flex-col w-full bg-gray-100"
      style={{ height: "calc(100vh - 110px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <h1 className="text-5xl font-bold text-gray-900 typewriter-text">
            Welcome to Message Center
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your go-to app for anonymous messaging. Connect with friends and
            share your thoughts.
          </p>
          <Button
            className="mt-8   px-6 py-3 rounded-md text-lg"
            onClick={() => router.push("/sign-up")}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Features</h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover the powerful features that make Message Center unique.
          </p>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900">
                Anonymous Messaging
              </h3>
              <p className="mt-2 text-gray-600">
                Send messages anonymously to anyone. Your identity is always
                protected.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900">
                User-Friendly Interface
              </h3>
              <p className="mt-2 text-gray-600">
                Our app is designed to be intuitive and easy to navigate for
                users of all ages.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900">Easy to Use</h3>
              <p className="mt-2 text-gray-600">
                Our user-friendly interface makes messaging easy and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 px-10 w-full py-4  text-gray-700 text-sm">
        © 2024 Message Center. All rights reserved. Contact:
        abhishekv3900@gmail.com
      </div>
    </div>
  );
}
