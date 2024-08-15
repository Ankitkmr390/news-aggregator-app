import useFetch from "../hooks/usefetch";

function convertNYTimesFormat(data) {
  return data?.map(item => ({
      source: {
          id: null, // Assuming no specific ID for the source
          name: item.source || "Unknown Source"
      },
      author: null, // Author is not provided in the original data
      title: item.snippet || item.abstract, // Using snippet or abstract as title
      description: item.lead_paragraph || null, // Using lead_paragraph as description
      url: item.web_url,
      urlToImage: null, // No image URL provided
      publishedAt: null, // No published date provided
      content: null // No content provided
  }));
}

const useNewYorkTimesAPI = () => {
  const { data, loading, error } = useFetch(
    'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=wl7ZY1EoRd0ABNCLOMhNQo4N6jRLdQg1'
  );

  return { data: convertNYTimesFormat(data?.response?.docs) || [], loading, error };
};

export default useNewYorkTimesAPI;
