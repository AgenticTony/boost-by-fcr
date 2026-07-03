import { useQuery } from 'urql';

const GET_EXERCISES = `
  query GetExercises {
    exercises {
      id
      title
      description
      duration
      difficulty
      category
    }
  }
`;

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  category: string;
}

export const useExercises = () => {
  const [result] = useQuery({ query: GET_EXERCISES });
  return {
    data: result.data?.exercises || [],
    isLoading: result.fetching,
    error: result.error,
  };
};
