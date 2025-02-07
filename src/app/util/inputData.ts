import { TOKEN } from "./constant";

export async function fetchdata(params: string) {
  const data = await fetch(`https://api.themoviedb.org/3${params}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const dataJson = data.json();
  return dataJson;
}
