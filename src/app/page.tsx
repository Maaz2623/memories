"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetYears } from "@/features/years/api/use-get-years";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Fetching years
  const { data: years, isLoading: yearsLoading } = useGetYears();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Use NEXT_PUBLIC for environment variables in client-side code
    const correctUsername = "RuMaaz";
    const correctPassword = "2509";

    if (username === correctUsername && password === correctPassword) {
      setLoading(true);

      // Redirect to first year's page after fetching years
      const firstYear = years?.[0]?._id;

      if (firstYear) {
        router.replace(`/year/${firstYear}`);
      } else {
        toast.error("No year data available.");
        setLoading(false);
      }
    } else {
      toast.error("Incorrect credentials");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border space-y-4 px-6 w-[30%] h-[fit-content] pb-10 pt-4 rounded-lg shadow-xl"
      >
        <div className="mb-8">
          <h1 className="text-3xl antialised font-semibold text-start">
            Sign in to Memories
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter the credentials to get access to the app
          </p>
        </div>
        <div className="gap-y-1">
          <p className="font-medium mb-1">Username</p>
          <Input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            autoFocus
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="gap-y-1 mb-1">
          <p className="font-medium">Password</p>
          <Input
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <div className="">
          <Button
            type="submit"
            size="sm"
            className="w-full mt-4 bg-emerald-500 text-black hover:bg-emerald-500/80"
            disabled={loading || yearsLoading}
          >
            {loading ? (
              <>
                <Loader2Icon className="animate-spin mr-2 h-4 w-4" />{" "}
                Redirecting to app
              </>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
