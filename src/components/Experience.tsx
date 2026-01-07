import { jobs } from "@/staticdata/works";
import React from "react";

export default function Experience() {
  return (
    <section className="">
      <div className="">
        <ul className="space-y-3">
          {jobs.slice(0, 3).map((job, index) => (
            <li key={job.id} className="">
              <h3 className="font-semibold flex items-center gap-2">
                {index === 0 && (
                  <span className="relative flex size-3 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full dark:bg-pink-500 bg-pink-500 opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full dark:bg-pink-500 bg-pink-500"></span>
                  </span>
                )}
                {job.title} <span className="text-blue-400"> | </span>
                <span className="text-sm text-muted-foreground italic">
                  {job.location}
                </span>
              </h3>
              <p className="mb-2 font-semibold">
                <a href={job.link} target="_blank" className="hover:underline">{job.company}</a> <span className="text-blue-400"> | </span>{" "}
                {job.period}
              </p>
              <ul className="list-disc list-inside space-y-1 ">
                {job.description.map((point, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
