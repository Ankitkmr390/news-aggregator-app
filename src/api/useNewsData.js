import useFetch from "../hooks/usefetch";

const useNewsAPI = () => {
  const { data, loading, error } = useFetch(
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=89c72d1fa307450ab352d823587ef4af'
  );

  return { data: data?.articles || [], loading, error };
};

export default useNewsAPI;

