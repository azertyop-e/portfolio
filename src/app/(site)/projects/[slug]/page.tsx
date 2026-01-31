import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getNextProject } from "@/lib/data/projects";
import { ProjectHero } from "@/components/ProjectDetail/ProjectHero";
import { ProjectGallery } from "@/components/ProjectDetail/ProjectGallery";
import { ProjectWriteup } from "@/components/ProjectDetail/ProjectWriteup";
import { ProjectNav } from "@/components/ProjectDetail/ProjectNav";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);

  return (
    <>
      <ProjectHero project={project} />
      <ProjectWriteup project={project} />
      <ProjectGallery project={project} />
      <ProjectNav nextProject={nextProject} />
    </>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — ${project.clientLine}`,
    description: project.writeup.tagline,
  };
}
