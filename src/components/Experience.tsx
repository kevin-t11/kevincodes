import { jobs } from "@/staticdata/works";
import React from "react";

export default function Experience() {
  return (
    <section className="">
      <div className="">
        <ul className="space-y-3">
          {jobs.slice(0, 3).map((job) => (
            <li key={job.id} className="">
              <h3 className="font-semibold flex items-center gap-2">
                {job.title} <span className="text-blue-400"> | </span>
                <span className="text-sm text-muted-foreground italic">
                  {job.location}
                </span>
              </h3>
              <p className="mb-2 font-semibold">
                <a
                  href={job.link}
                  target="_blank"
                  className="text-blue-700 underline underline-offset-4 dark:text-blue-400"
                >
                  {job.company}
                </a>{" "}
                <span className="text-blue-400"> | </span>{" "}
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
