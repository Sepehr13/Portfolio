import { Skill } from "@/lib/models/skill";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import ScrollReveal from "../ui/ScrollReveal";

export default async function MySkills() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('my-skills')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching skill data:', error);
  }

  const skills = data?.map((skill) => new Skill(skill)) || [];

  return (
    <div id="my-skills" className="relative flex flex-col xl:items-start items-center justify-start w-full bg-background xl:px-48 px-8 my-16">
      <div className="flex flex-col">
        <ScrollReveal delay={0}><div className="text-md text-muted-foreground uppercase">Tech Stack</div></ScrollReveal>
        <ScrollReveal delay={0.15}><div className="text-3xl font-bold text-foreground">Technologies I Work With</div></ScrollReveal>
        <ScrollReveal delay={0.3}><div className="text-lg text-muted-foreground max-w-xl mt-2">
          I work with a range of modern technologies across frontend, backend, mobile, blockchain, DevOps and more.
        </div></ScrollReveal>
      </div>
      <div className="flex flex-row flex-wrap xl:justify-start justify-center gap-4 mt-8">
        {skills.map((skill, i) => (
          <ScrollReveal key={skill.id} delay={0.45 + (i * 0.08)} className="max-w-62.5 w-full max-h-43">
          <div className="flex flex-col justify-between items-center py-6 border border-border rounded-lg overflow-hidden h-full">
            <Image src={`https://sexisalvpzgjpbjqyuah.supabase.co/storage/v1/object/public/portfolio-bucket/icons/${skill.image}`} 
              alt={skill.title} 
              width={skill.image == "solidity.png" ? 34 : 52} 
              height={skill.image == "solidity.png" ? 34 : 52} 
            />
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold text-foreground mt-4">{skill.title}</h3>
              <p className="text-sm text-muted-foreground">{skill.description}</p>
            </div>
          </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}