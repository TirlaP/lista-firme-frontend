import { gql } from "@apollo/client";

export const GET_COMPANIES = gql`
  query GetCompanies($input: CompanyFilterInput!) {
    companies(input: $input) {
      edges {
        node {
          cui
          nume
          denumire
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
          date_generale {
            telefon
            email
            website
            stare_inregistrare
            forma_juridica
            organFiscalCompetent
            adresa
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

export const AUTOCOMPLETE_QUERY = gql`
  query autocomplete($text: String!) {
    autocomplete(text: $text) {
      companyId
      companyName
      locality
      county
      streetName
      streetNr
      block
      VAT
      staircase
      apartment
      taxId
      status
    }
  }
`;
