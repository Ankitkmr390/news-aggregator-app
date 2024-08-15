import useFetch from "../hooks/usefetch";


function convertFormat(data) {
  return data?.map(item => ({
      source: {
          id: null, // Assuming you don't have an id for the source
          name: item.sectionName || "Unknown Source"
      },
      author: item.sectionName, // Author is not provided in the original data
      title: item.webTitle,
      description: null, // No description provided
      url: item.webUrl,
      urlToImage: null, // No image URL provided
      publishedAt: item.webPublicationDate,
      content: null // No content provided
  }));
}

const useGuardianNewsAPI = () => {
  const { data, loading, error } = useFetch(
    'https://content.guardianapis.com/search?api-key=7c3845fe-99c5-48ba-a261-3668d850f2b3'
  );



  return { data: convertFormat(data?.response?.results) || [], loading, error };
};

export default useGuardianNewsAPI;
