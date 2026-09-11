import { useCallback, useEffect, useMemo, useState } from "react";

import {
  fetchPokemonByType,
  fetchPokemonList,
  fetchPokemonTypes,
  searchPokemon,
} from "@/services/pokemonApi";
import type { PokemonSummary, PokemonTypeName } from "@/types/pokemon";

export interface UsePokemonListOptions {
  pageSize?: number;
}

export function usePokemonList(options: UsePokemonListOptions = {}) {
  const pageSize = options.pageSize || 25;

  const [pokemonList, setPokemonList] = useState<PokemonSummary[]>([]);
  const [types, setTypes] = useState<PokemonTypeName[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState<PokemonSummary | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Debounce search query input (350ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim().toLowerCase());
    }, 350);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Initial load: Types and first page
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [listRes, typesRes] = await Promise.all([
        fetchPokemonList(pageSize, 0),
        fetchPokemonTypes(),
      ]);
      setPokemonList(listRes.items);
      setTotalCount(listRes.total);
      setTypes(typesRes);
      setOffset(0);
    } catch (err) {
      console.error("Failed to load initial pokemon list:", err);
      setError(
        "Không thể kết nối đến máy chủ PokéAPI. Vui lòng kiểm tra lại kết nối mạng của bạn."
      );
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Handle Type filter change
  useEffect(() => {
    if (!selectedType) {
      // If we already loaded initial data, re-fetching only if needed
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchPokemonByType(selectedType, 40)
      .then((items) => {
        if (isMounted) {
          setPokemonList(items);
          setTotalCount(items.length);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to filter by type:", err);
        if (isMounted) {
          setError(
            `Không thể tải danh sách Pokémon thuộc hệ "${selectedType}". Vui lòng thử lại.`
          );
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedType]);

  // Handle Search query
  useEffect(() => {
    if (!debouncedQuery) {
      setSearchedPokemon(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    searchPokemon(debouncedQuery)
      .then((item) => {
        if (isMounted) {
          setSearchedPokemon(item);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Search failed:", err);
        if (isMounted) {
          setSearchedPokemon(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  // Load more pokemon
  const loadMore = async () => {
    if (loadingMore || selectedType || debouncedQuery) return;
    setLoadingMore(true);
    const nextOffset = offset + pageSize;

    try {
      const res = await fetchPokemonList(pageSize, nextOffset);
      setPokemonList((prev) => [...prev, ...res.items]);
      setOffset(nextOffset);
    } catch (err) {
      console.error("Error loading more pokemon:", err);
      setError("Không thể tải thêm Pokémon. Vui lòng kiểm tra lại mạng.");
    } finally {
      setLoadingMore(false);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSearchedPokemon(null);
    setSelectedType(null);
    loadInitialData();
  };

  // Re-fetch function
  const refetch = () => {
    if (selectedType) {
      setLoading(true);
      setError(null);
      fetchPokemonByType(selectedType, 40)
        .then((items) => {
          setPokemonList(items);
          setTotalCount(items.length);
          setLoading(false);
        })
        .catch(() => {
          setError("Không thể kết nối đến máy chủ PokéAPI. Vui lòng thử lại.");
          setLoading(false);
        });
    } else {
      loadInitialData();
    }
  };

  // Determine displayed list
  const displayedPokemon = useMemo(() => {
    if (debouncedQuery) {
      if (searchedPokemon) return [searchedPokemon];
      return pokemonList.filter(
        (p) =>
          p.name.toLowerCase().includes(debouncedQuery) ||
          p.id.toString() === debouncedQuery
      );
    }
    return pokemonList;
  }, [debouncedQuery, searchedPokemon, pokemonList]);

  return {
    pokemonList,
    types,
    selectedType,
    searchQuery,
    displayedPokemon,
    loading,
    loadingMore,
    error,
    totalCount,
    hasActiveFilters: Boolean(selectedType || searchQuery),
    setSearchQuery,
    setSelectedType: (type: string | null) => {
      if (type === null && selectedType !== null) {
        setSelectedType(null);
        loadInitialData();
      } else {
        setSelectedType(type);
      }
    },
    loadMore,
    resetFilters,
    refetch,
  };
}
