// src/hooks/useCompany.ts
import { useQuery } from '@apollo/client';
import { GET_COMPANY } from '../graphql/queries';
import { GetCompanyQueryResult } from '../graphql/types';

export const useCompany = (cui: number) => {
  const { data, loading, error } = useQuery<GetCompanyQueryResult>(
    GET_COMPANY,
    {
      variables: { cui },
      skip: !cui,
    }
  );

  return {
    company: data?.company,
    isLoading: loading,
    error,
  };
};

