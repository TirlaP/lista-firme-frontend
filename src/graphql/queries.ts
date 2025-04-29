import { gql } from "@apollo/client";
import { COMPANY_FRAGMENT } from "./fragments";

// Get companies with filtering
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
            administrators
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

// Get company statistics by status
export const GET_COMPANY_STATS_BY_STATUS = gql`
  query GetCompanyStatsByStatus {
    companyStatsByStatus {
      stare
      count
      label
      lastUpdated
    }
  }
`;

// Get latest companies by time range
export const GET_LATEST_COMPANIES = gql`
  query GetLatestCompanies($input: LatestCompaniesInput!) {
    latestCompanies(input: $input) {
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
            data_inregistrare
            administrators
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

// Get latest companies statistics
export const GET_LATEST_COMPANIES_STATS = gql`
  query GetLatestCompaniesStats($input: LatestCompaniesStatsInput!) {
    latestCompaniesStats(input: $input) {
      totalNew
      topCAEN {
        code
        count
      }
      topLocations {
        location
        count
      }
      dailyTrend {
        date
        count
      }
      timeRange
      dateRange {
        from
        to
      }
    }
  }
`;

// Get company details by CUI
export const GET_COMPANY = gql`
  query GetCompany($cui: Int!) {
    company(cui: $cui) {
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
        mobil
      }
      cod_CAEN
      inregistrare {
        numar
        stare
        data
        organ_fiscal
        data_actualizare
        sursa
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
        description
      }
      date_generale {
        adresa
        telefon
        email
        website
        stare_inregistrare
        data_inregistrare
        statusRO_e_Factura
        organFiscalCompetent
        forma_juridica
        forma_organizare
        forma_de_proprietate
        TVA
        capital_social
        cifra_afaceri
        profit
        pierdere
        numar_angajati
        active
        numar_puncte_lucru
        numar_sucursale
        data_bilant
        data_actualizare
        observatii
        cifra_afaceri_precedenta
        profit_precedent
        pierdere_precedenta
        active_precedente
        numar_angajati_precedent
        administrators
      }
      adresa_anaf {
        sediu_social {
          sdenumire_Strada
          snumar_Strada
          sdenumire_Localitate
          scod_Localitate
          sdenumire_Judet
          scod_Judet
          scod_JudetAuto
          stara
          sdetalii_Adresa
          scod_Postal
        }
        domiciliu_fiscal {
          ddenumire_Strada
          dnumar_Strada
          ddenumire_Localitate
          dcod_Localitate
          ddenumire_Judet
          dcod_Judet
          dcod_JudetAuto
          dtara
          ddetalii_Adresa
          dcod_Postal
        }
      }
    }
  }
`;

// Get overall company statistics
export const GET_COMPANY_STATS = gql`
  query GetCompanyStats {
    companyStats {
      totalCompanies
      activeCompanies
      withWebsite
      withContact
    }
  }
`;

// Export companies mutation
export const EXPORT_COMPANIES = gql`
  mutation ExportCompanies($input: ExportCompaniesInput!) {
    exportCompanies(input: $input) {
      fileName
      content
      mimeType
    }
  }
`;

// Export latest companies mutation
export const EXPORT_LATEST_COMPANIES = gql`
  mutation ExportLatestCompanies($input: ExportLatestCompaniesInput!) {
    exportLatestCompanies(input: $input) {
      fileName
      content
      mimeType
    }
  }
`;

// Autocomplete search
export const AUTOCOMPLETE_QUERY = gql`
  query Autocomplete($text: String!) {
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
