import { useRouter } from "../hooks/useRouter";

export function useHome() {
  const { navigateTo } = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchTerm = formData.get("search");

    const url = searchTerm
      ? `/search?text=${encodeURIComponent(searchTerm)}`
      : "/search";

    navigateTo(url);
  };

  return { handleSearch };
}
