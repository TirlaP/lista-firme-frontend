export interface DateGenerale {
  cui?: number;
  denumire?: string;
  adresa?: string;
  nrRegCom?: string;
  telefon?: string;
  fax?: string;
  codPostal?: string;
  stare_inregistrare?: string;
  data_inregistrare?: string;
  statusRO_e_Factura?: boolean;
  organFiscalCompetent?: string;
  forma_de_proprietate?: string;
  forma_organizare?: string;
  forma_juridica?: string;
  website?: string;
  email?: string;
}

export interface Address {
  strada?: string;
  numar?: string;
  localitate?: string;
  judet?: string;
  cod_postal?: string;
  detalii?: string;
  tara?: string;
  cod_judet?: string;
  cod_judet_auto?: string;
  cod_localitate?: string;
}

export interface Contact {
  email?: string;
  telefon?: string;
  fax?: string;
  website?: string;
}

export interface Registration {
  numar?: string;
  stare?: string;
  data?: string;
  organ_fiscal?: string;
}

export interface CompanyType {
  forma_juridica?: string;
  forma_organizare?: string;
  forma_proprietate?: string;
}

export interface CAEN {
  code: string;
  name: string;
  section: string;
  division: string;
}

export interface Company {
  cui: number;
  nume: string;
  denumire: string;
  adresa?: Address;
  adresa_completa?: string;
  contact?: Contact;
  cod_CAEN: string;
  inregistrare?: Registration;
  tip_firma?: CompanyType;
  caen?: CAEN;
  date_generale?: DateGenerale;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface CompanyEdge {
  node: Company;
  cursor: string;
}

export interface CompanyConnection {
  edges: CompanyEdge[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface CompanyFilterInput {
  first?: number;
  after?: string;
  cod_CAEN?: string;
  judet?: string;
  oras?: string;
  hasWebsite?: boolean;
  hasContact?: boolean;
  sortBy?: CompanySortInput;
}

export interface CompanySortInput {
  field: CompanySortField;
  direction: SortDirection;
}

export enum CompanySortField {
  REGISTRATION_DATE = 'REGISTRATION_DATE',
  CUI = 'CUI',
  NUME = 'NUME'
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type GetCompaniesQueryResult = {
  companies: CompanyConnection;
};