import { gql } from "@apollo/client";

/**
 * Fragment for company data to avoid repetition in queries
 */
export const COMPANY_FRAGMENT = gql`
  fragment CompanyFields on Company {
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
      cui
      denumire
      adresa
      telefon
      email
      website
      nrRegCom
      codPostal
      stare_inregistrare
      data_inregistrare
      statusRO_e_Factura
      organFiscalCompetent
      forma_de_proprietate
      forma_organizare
      forma_juridica
      TVA
      capital_social
      cifra_afaceri
      profit
      pierdere
      numar_angajati
      active
      data_bilant
      data_actualizare
      observatii
    }
  }
`;

/**
 * Fragment for address data
 */
export const ADDRESS_FRAGMENT = gql`
  fragment AddressFields on Address {
    strada
    numar
    localitate
    judet
    cod_postal
    tara
    cod_judet
    cod_judet_auto
    cod_localitate
    detalii
  }
`;

/**
 * Fragment for contact data
 */
export const CONTACT_FRAGMENT = gql`
  fragment ContactFields on Contact {
    email
    telefon
    fax
    website
    mobil
  }
`;
