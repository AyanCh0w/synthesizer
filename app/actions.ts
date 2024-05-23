"use server";
import OpenAI from "openai";
import { paragraph } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEssay(
  thesis: string,
  skillLevel: string,
  length: string,
  analysis: string,
  paragraphs: paragraph[],
): Promise<string> {
  let prompt =
    `Write an essay of ${skillLevel} level skill, the length of it should be ${length}, and your analysis depth should be ${analysis}.` +
    "\n" +
    `Thesis sentence: ${thesis}\n`;

  paragraphs.map((paragraph, index) => {
    prompt = prompt.concat(
      `Paragraph: ${index + 1}\n Topic sentence: ${paragraph.topicSentence}\n Evidence: ${paragraph.evidence}\n`,
    );
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "You are an essay writer, you will be given information to create an essay. You will get the skill level to write as, length of the total essay, and how in-depth you should write.\nYou will be given a rough thesis to start off and for each paragraph, a topic and the source to directly quote/use from, it has to be exactly what is in the quote. Include a conclusion at the end. Do not explicity output the essay parts, write as a final draft. This essay needs to include an intro paragraph, a body paragraph for each topic sentence, and a conclusion paragraph. Do not make up your own evidence, only use what is provided.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
        ],
      },
    ],
    temperature: 1,
    max_tokens: 1028,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content;
}
