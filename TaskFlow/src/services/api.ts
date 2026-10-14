export interface RandomQuote {
  id: number;
  quote: string;
  author: string;
}

export async function fetchRandomQuote(): Promise<RandomQuote> {
  const response = await fetch('https://dummyjson.com/quotes/random');

  if (!response.ok) {
    throw new Error('Não foi possível carregar a citação.');
  }

  const data = (await response.json()) as RandomQuote;

  if (!data.quote || !data.author) {
    throw new Error('Resposta inválida da API.');
  }

  return data;
}
