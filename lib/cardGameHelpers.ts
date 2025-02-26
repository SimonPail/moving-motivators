export async function fetchCardsGame(pathname: string) {
 const [, locale, theme] = pathname.split("/");
 const res = await fetch(`/api/cards-game?locale=${locale}&theme=${theme}`, {
  cache: "no-store",
 });
 const result: GameItem[] = await res.json();
 return result;
}
