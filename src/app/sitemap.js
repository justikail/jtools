export default async function sitemap() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PRIMARY_URL}/api/tools`);
  const data = await response.json();
  const tools = data.data;

  const mainUrl = [
    {
      url: process.env.NEXT_PUBLIC_PRIMARY_URL,
      lastModified: new Date("2024-08-25"),
      changeFrequency: "always",
      priority: 1.0,
    },
  ];

  const toolsUrl = tools.map((tool) => ({
    url: `${process.env.NEXT_PUBLIC_PRIMARY_URL}${tool.link}`,
    lastModified: new Date(`${tool.createdAt}`),
    changeFrequency: "hourly",
    priority: 0.8,
  }));

  return [...mainUrl, ...toolsUrl];
}
