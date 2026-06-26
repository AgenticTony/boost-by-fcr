import { useParams } from 'react-router-dom';

export const HandbookReader = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Method Handbook</h1>
      <div className="prose max-w-none">
        <p>Handbook content for item <strong>{id}</strong> will be loaded here.</p>
        <p>This page would fetch the handbook content from Hygraph using the ID from the URL.</p>
      </div>
    </div>
  );
};