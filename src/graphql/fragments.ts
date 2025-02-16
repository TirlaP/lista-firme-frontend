// src/graphql/fragments.ts
import { gql } from '@apollo/client';

export const COMPANY_FRAGMENT = gql`
  fragment CompanyFields on Company {
    cui
    nume
    adresa {
      strada
      numar
      localitate
      judet
      cod_postal
      tara
      cod_judet
      cod_judet_auto
      cod_localitate
    }
    adresa_completa
    contact {
      email
      telefon
      fax
      website
    }
    cod_CAEN
    inregistrare {
      numar
      stare
      data
      organ_fiscal
    }
    tip_firma {
      forma_juridica
      forma_organizare
      forma_proprietate
    }
    caen {
      code
      name
      section
      division
    }
  }
`;
