import { redirect } from "next/navigation";

import { COMPONENT_LIST } from "@/resources/components-registry";

type ComponentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return COMPONENT_LIST.map((component) => ({
    slug: component.slug,
  }));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  redirect(`/docs/${slug}`);
}
