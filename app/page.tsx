"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { paragraph } from "@/types";

import { generateEssay } from "@/app/actions";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  const [thesis, setThesis] = useState<string>("");

  const [essay, setEssay] = useState<string | null>(null);

  const [paragraphs, setParagraphs] = useState<paragraph[]>([
    {
      topicSentence: "",
      evidence: "",
    },
  ]);

  const [skillLevel, setSkillLevel] = useState<string>("High Schooler");
  const [length, setLength] = useState<string>("Normal");
  const [analysis, setAnalysis] = useState<string>("Thinker");

  const [generateReady, setGenerateReady] = useState<boolean>(true);

  function addParagraph() {
    const newList = paragraphs.concat({
      topicSentence: "",
      evidence: "",
    });
    setParagraphs(newList);
  }
  function removeParagraph(index: number) {
    const newList = [...paragraphs];
    newList.splice(index, 1);
    setParagraphs(newList);
  }

  return (
    <main className="md:w-3/4 w-11/12 min-h-screen mx-auto pb-24">
      <div className="text-center m-10">
        <p className="text-6xl font-sans font-medium">Synthesiser</p>
        <p className="text-lg">Your personal essay helper</p>
      </div>

      <div>
        <div className={"flex flex-col my-4 gap-2"}>
          <Label>Skill Level</Label>
          <Tabs defaultValue={"High Schooler"}>
            <TabsList className="w-full h-fit grid grid-cols-2 md:flex bg-gray-100">
              <TabsTrigger
                className={"w-full"}
                value={"Elementary Schooler"}
                onClick={() => {
                  setSkillLevel("Elementary Schooler");
                }}
              >
                Elementary School
              </TabsTrigger>
              <TabsTrigger
                value={"High Schooler"}
                className={"w-full"}
                onClick={() => {
                  setSkillLevel("High Schooler");
                }}
              >
                High School
              </TabsTrigger>
              <TabsTrigger
                value={"College Student"}
                className={"w-full"}
                onClick={() => {
                  setSkillLevel("College Student");
                }}
              >
                College Student
              </TabsTrigger>
              <TabsTrigger
                value={"Philosophiser"}
                className={"w-full"}
                onClick={() => {
                  setSkillLevel("Philosophiser");
                }}
              >
                Philosophiser
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className={"flex flex-col my-4 gap-2"}>
          <Label>Length</Label>
          <Tabs defaultValue={"Casual"}>
            <TabsList className="w-full h-fit grid grid-cols-2 md:flex bg-gray-100">
              <TabsTrigger
                className={"w-full"}
                value={"Brief"}
                onClick={() => {
                  setLength("Brief");
                }}
              >
                Brief
              </TabsTrigger>
              <TabsTrigger
                value={"Casual"}
                className={"w-full"}
                onClick={() => {
                  setLength("Casual");
                }}
              >
                Casual
              </TabsTrigger>
              <TabsTrigger
                value={"Normal"}
                className={"w-full"}
                onClick={() => {
                  setLength("Essay");
                }}
              >
                Essay
              </TabsTrigger>
              <TabsTrigger
                value={"Thesis Paper"}
                className={"w-full"}
                onClick={() => {
                  setLength("Thesis Paper");
                }}
              >
                Thesis Paper
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className={"flex flex-col my-4 gap-2"}>
          <Label>Analysis Depth</Label>
          <Tabs defaultValue={"Thinker"}>
            <TabsList className="w-full h-fit grid grid-cols-2 md:flex bg-gray-100">
              <TabsTrigger
                className={"w-full"}
                value={"Obvious"}
                onClick={() => {
                  setAnalysis("Obvious");
                }}
              >
                Obvious
              </TabsTrigger>
              <TabsTrigger
                value={"Thinker"}
                className={"w-full"}
                onClick={() => {
                  setAnalysis("Thinker");
                }}
              >
                Thinker
              </TabsTrigger>
              <TabsTrigger
                value={"Pro Analyzer"}
                className={"w-full"}
                onClick={() => {
                  setAnalysis("Pro Analyzer");
                }}
              >
                Pro Analyzer
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className={"flex flex-col gap-4"}>
        <div className={"border p-2 rounded-lg"}>
          <Label className={"flex gap-1 mt-1"}>
            Thesis Statement
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>(?)</TooltipTrigger>
                <TooltipContent>
                  <p>
                    Topic sentence of this paragraph, what you want to focus on
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Textarea
            className={"mt-2"}
            onChange={(e) => {
              setThesis(e.target.value);
            }}
          ></Textarea>
        </div>
        {paragraphs.map((paragraph, index) => (
          <div key={index} className={"border p-2 rounded-lg"}>
            <div className={"flex justify-between w-full flex-row"}>
              <p className={"text-xl font-medium"}>Paragraph {index + 1}</p>
              <Button variant={"ghost"} onClick={() => removeParagraph(index)}>
                Remove
              </Button>
            </div>
            <div className={"flex flex-col gap-4"}>
              <div className={"flex flex-col gap-1"}>
                <Label className="flex gap-1">
                  Topic Sentence
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>(?)</TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Topic sentence of this paragraph, what you want to
                          focus on
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Textarea
                  onChange={(event) => {
                    paragraphs[index].topicSentence = event.target.value;
                  }}
                />
              </div>
              <div className={"flex flex-col gap-2"}>
                <Label className="flex gap-1">
                  Evidence
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>(?)</TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Paste the direct quote from the text you want to
                          source in the paragraph
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Textarea
                  onChange={(event) => {
                    paragraphs[index].evidence = event.target.value;
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        <Button
          className="w-full"
          variant={"outline"}
          onClick={() => {
            addParagraph();
          }}
        >
          Add Paragraph
        </Button>
        <Button
          disabled={!generateReady}
          onClick={async () => {
            console.log(thesis, skillLevel, length, analysis, paragraphs);
            setEssay(
              await generateEssay(
                thesis,
                skillLevel,
                length,
                analysis,
                paragraphs,
              ),
            );
          }}
        >
          Synthesise
        </Button>
      </div>
      {essay && (
        <div className={"border mt-8 rounded-lg p-2 text-md"}>
          <p>{essay}</p>
        </div>
      )}
    </main>
  );
}
