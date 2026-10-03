import { Work } from "@/lib/models/work";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";

export default async function MyWorkSection() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('my-work')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching work data:', error);
  }

  const works = data?.map((work) => new Work(work)) || [];

  return (
    <div className="relative flex flex-col items-start justify-start h-full w-full overflow-hidden bg-background xl:px-48 px-8">
      <div className="flex flex-col gap-2">
        <div className="text-md text-muted-foreground uppercase">My Work</div>
        <div className="text-3xl font-bold text-foreground uppercase">Featured Projects</div>
        <div className="text-lg text-muted-foreground max-w-xl">
          Here are some of the projects I&apos;ve worked on. Each one reflects a different challenge, technology, and learning experience.
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 mt-8">
        {works.map((work) => (
          <div key={work.id} className="flex flex-row gap-6 max-w-xl border border-border rounded-md p-6">
            <Image src={work.image} width={200} height={80} alt={work.title} className="h-40 object-cover rounded-md" />
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold text-foreground">{work.title}</div>
              <div className="text-sm text-muted-foreground">{work.description}</div>
              <div className="flex flex-wrap gap-1">
                {work.tags.map((tag, index) => (
                  <span key={index} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <a href={work.link} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground">
                <Button variant="ghost" size="lg">View Project <MoveRight /></Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}