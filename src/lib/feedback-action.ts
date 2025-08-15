"use server";

import type { Feedback, ActionResponse } from "@/components/docs/feedback";

export async function submitFeedback(
  url: string,
  feedback: Feedback,
): Promise<ActionResponse> {
  // Here you would typically:
  // 1. Save feedback to your database
  // 2. Create a GitHub issue
  // 3. Send to analytics service
  // 4. Email notifications, etc.

  // For now, we'll create a mock GitHub URL
  // In a real implementation, you might use GitHub's API to create an issue
  const githubUrl = `https://github.com/satyawaniaman/soldevkit-UI/issues/new?title=${encodeURIComponent(
    `Feedback for ${url}`,
  )}&body=${encodeURIComponent(
    `**Page:** ${url}\n**Opinion:** ${feedback.opinion}\n**Message:** ${feedback.message}`,
  )}&labels=feedback,${feedback.opinion === "good" ? "enhancement" : "bug"}`;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Feedback received:", {
    url,
    feedback,
    timestamp: new Date().toISOString(),
  });

  return {
    githubUrl,
  };
}
