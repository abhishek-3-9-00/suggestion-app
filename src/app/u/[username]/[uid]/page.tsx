"use client";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, MessageCircleCodeIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const Page = () => {
  const router = useRouter();
  const { username, uid } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUserGenuine, setIsUserGenuine] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      let payload = {
        content: data.content,
        username: username,
        uid: uid,
      };
      const response = await axios.post<ApiResponse>(
        "/api/send-message",
        payload
      );
      toast({
        title: "Success",
        description: response?.data.message,
      });
      if (response?.data.success) {
        form.reset();
      }
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Send Messaged Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const checkUsername = async () => {
      try {
        setIsSubmitting(true);

        if (username) {
          const { data } = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${username}`
          );
          if (data.message === "Username is already taken") {
            setIsUserGenuine(true);
          }
        }
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    };
    checkUsername();
  }, [username]);

  if (!isUserGenuine)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>URL is not correct</>
          )}
        </h1>
      </div>
    );
  return (
    <>
      <Navbar />
      <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
        <div className="flex justify-center">
          <h1 className="text-5xl font-bold mb-4">Public Profile Link</h1>
        </div>
        <div className="my-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {" "}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Send anonymous message to @{username}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="message"
                        {...field}
                        autoFocus
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Page;
