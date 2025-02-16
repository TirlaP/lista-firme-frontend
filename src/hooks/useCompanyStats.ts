// src/hooks/useCompanyStats.ts
import { useQuery } from '@apollo/client';
import { GET_COMPANY_STATS } from '../graphql/queries';
import { GetCompanyStatsQueryResult } from '../graphql/types';

export const useCompanyStats = () => {
  const { data, loading, error } = useQuery<GetCompanyStatsQueryResult>(
    GET_COMPANY_STATS
  );

  return {
    stats: data?.companyStats,
    isLoading: loading,
    error,
  };
};