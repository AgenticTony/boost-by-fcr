export const KnowledgeSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Article 1</h2>
          <p className="text-gray-600">Short description of educational mini-article.</p>
        </div>
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Article 2</h2>
          <p className="text-gray-600">Another knowledge piece.</p>
        </div>
      </div>
    </div>
  );
};