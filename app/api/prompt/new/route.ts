import { connectToDB } from "@/utils/database";
import Prompt from "@/model/prompts";

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
