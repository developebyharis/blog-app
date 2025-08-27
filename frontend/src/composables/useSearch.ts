import { ref, computed } from 'vue';

export default function useSearch(items: any, searchKeys: string[], itemsPerPage = 5) {
  const searchQuery = ref(''); // we use ref for premitive data types
  const currentPage = ref(1);

  const filteredItems = computed(() => {
    if (!searchQuery.value) {
      return items.value;
    }
    const query = searchQuery.value.toLowerCase();
    return items.value.filter((item: Record<string, any>) =>
      searchKeys.some((key: string) => item[key]?.toLowerCase().includes(query))
    );
  });

  const paginatedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.value.slice(startIndex, endIndex);
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredItems.value.length / itemsPerPage);
  });

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  return {
    searchQuery,
    currentPage,
    filteredItems,
    paginatedItems,
    totalPages,
    nextPage,
    prevPage,
  };
}