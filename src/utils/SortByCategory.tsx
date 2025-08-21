import { Wine } from '../types/Wine';

type Props = {
  sortBy: string;
  activeData: Wine[];
};

const sortByCategory = ({ sortBy, activeData }: Props) => {
  const data = [...activeData];

  switch (sortBy) {
    case 'Alphabetically':
      return data.sort((a, b) => a.title.localeCompare(b.title));
    case 'Cheapest':
      return data.sort((a, b) => a.price - b.price);
    case 'Most expensive':
      return data.sort((a, b) => b.price - a.price);
    case 'Less ABV':
      return data.sort((a, b) => a.abv - b.abv);
    case 'More ABV':
      return data.sort((a, b) => b.abv - a.abv);
  }

  return activeData;
};

export default sortByCategory;
