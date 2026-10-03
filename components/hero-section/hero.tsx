'use client';

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/DotPattern";
import { Button } from "../ui/button";
import { Code, Heart, MapPin, MoveRight } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";

export function HeroSection() {

  function handleScroll() {
    document
      .getElementById("my-work-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background">
      <DotPattern
        className={cn(
          "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="flex flex-row z-10 xl:justify-between justify-center items-center w-full lg:px-48 px-8">
        <div className="flex flex-col gap-4 lg:max-w-xl max-w-xl min-w-sm">
          <div className="text-xl text-muted-foreground font-medium">Hi, I&apos;m <span className="text-primary">Sepehr Azizi</span> 👋</div>
          <div className="text-5xl font-bold text-foreground">Senior Full Stack Software Engineer</div>
          <div className="text-lg text-muted-foreground">
            I build scalable web and mobile applications, work with modern technologies, and enjoy solving complex problems. I&apos;m passionate about clean code, great user experiences, and continuous learning.
          </div>
          <div className="flex flex-row gap-6">
            <Button size="lg" className="px-8 py-6" onClick={handleScroll}>
              View My Work <MoveRight />
            </Button>
            <Button variant="outline" size="lg" className="p-6">
              Contact Me
            </Button>
          </div>
          <div className="flex flex-row gap-4 text-muted-foreground text-sm mt-6">
            <div className="flex flex-row items-center gap-2">
              <MapPin size={16} />
              Remote / International
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-row items-center gap-2">
              <Code size={16} />
              10+ Years of Experience
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-row items-center gap-2">
              <Heart size={16} />
              Always learning
            </div>
          </div>
        </div>
        <div>
          <Image
          src="/photo.jpeg"
          alt="Profile Picture"
          width={400}
          height={400}
          className="rounded-xl object-cover shadow-2xl hidden xl:block"
        />
        </div>
      </div>
    </div>
  );
}
