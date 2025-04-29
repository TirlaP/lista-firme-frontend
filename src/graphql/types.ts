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
  TVA?: boolean;
  capital_social?: number;
  cifra_afaceri?: number;
  profit?: number;
  pierdere?: number;
  numar_angajati?: number;
  active?: number;
  numar_puncte_lucru?: number;
  numar_sucursale?: number;
  data_bilant?: string;
  data_actualizare?: string;
  observatii?: string;
  cifra_afaceri_precedenta?: number;
  profit_precedent?: number;
  pierdere_precedenta?: number;
  active_precedente?: number;
  numar_angajati_precedent?: number;
  administrators?: string[];
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
  mobil?: string;
}

export interface Registration {
  numar?: string;
  stare?: string;
  data?: string;
  organ_fiscal?: string;
  data_actualizare?: string;
  sursa?: string;
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
  description?: string;
}

export interface SediuSocial {
  sdenumire_Strada?: string;
  snumar_Strada?: string;
  sdenumire_Localitate?: string;
  scod_Localitate?: string;
  sdenumire_Judet?: string;
  scod_Judet?: string;
  scod_JudetAuto?: string;
  stara?: string;
  sdetalii_Adresa?: string;
  scod_Postal?: string;
}

export interface DomiciliuFiscal {
  ddenumire_Strada?: string;
  dnumar_Strada?: string;
  ddenumire_Localitate?: string;
  dcod_Localitate?: string;
  ddenumire_Judet?: string;
  dcod_Judet?: string;
  dcod_JudetAuto?: string;
  dtara?: string;
  ddetalii_Adresa?: string;
  dcod_Postal?: string;
}

export interface AdresaAnaf {
  sediu_social?: SediuSocial;
  domiciliu_fiscal?: DomiciliuFiscal;
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
  adresa_anaf?: AdresaAnaf;
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

export interface CAENStat {
  code: string;
  count: number;
}

export interface LocationStat {
  location: string;
  count: number;
}

export interface DailyTrend {
  date: string;
  count: number;
}

export interface DateRange {
  from: string;
  to: string;
}

export interface LatestCompaniesStats {
  totalNew: number;
  topCAEN: CAENStat[];
  topLocations: LocationStat[];
  dailyTrend: DailyTrend[];
  timeRange: string;
  dateRange: DateRange;
}

export interface CompanyStats {
  totalCompanies: number;
  activeCompanies: number;
  withWebsite: number;
  withContact: number;
}

export interface CompanyFilterInput {
  first?: number;
  after?: string;
  caen_codes?: string[];
  cod_CAEN?: string;
  judet?: string;
  oras?: string;
  hasWebsite?: boolean;
  hasEmail?: boolean;
  hasPhone?: boolean;
  hasAdmin?: boolean;
  stare?: string;
  cifraAfaceriMin?: number;
  cifraAfaceriMax?: number;
  profitMin?: number;
  profitMax?: number;
  angajatiMin?: number;
  angajatiMax?: number;
  anInfiintareMin?: number;
  anInfiintareMax?: number;
  sortBy?: CompanySortInput;
}

export interface CompanySortInput {
  field: CompanySortField;
  direction: SortDirection;
}

export enum CompanySortField {
  REGISTRATION_DATE = "REGISTRATION_DATE",
  CUI = "CUI",
  NUME = "NUME",
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export enum TimeRange {
  TODAY = "TODAY",
  YESTERDAY = "YESTERDAY",
  LAST7DAYS = "LAST7DAYS",
  LAST30DAYS = "LAST30DAYS",
  THISMONTH = "THISMONTH",
  LASTMONTH = "LASTMONTH",
}

export interface LatestCompaniesInput {
  first?: number;
  after?: string;
  timeRange?: TimeRange;
  customStartDate?: string;
  customEndDate?: string;
  sortBy?: CompanySortInput;
}

export interface LatestCompaniesStatsInput {
  timeRange?: TimeRange;
  customStartDate?: string;
  customEndDate?: string;
}

export interface ExportCompaniesInput {
  cod_CAEN?: string;
  caen_codes?: string[];
  judet?: string;
  oras?: string;
  hasWebsite?: boolean;
  hasContact?: boolean;
  hasEmail?: boolean;
  hasPhone?: boolean;
  hasAdmin?: boolean;
  format: string;
}

export interface ExportLatestCompaniesInput {
  timeRange?: TimeRange;
  customStartDate?: string;
  customEndDate?: string;
  format: string;
}

export interface ExportResult {
  fileName: string;
  content: string;
  mimeType: string;
}

export interface AutocompleteResult {
  companyId: string;
  companyName?: string;
  locality?: string;
  county?: string;
  streetName?: string;
  streetNr?: string;
  block?: string;
  VAT?: boolean;
  staircase?: string;
  apartment?: string;
  taxId: string;
  status?: string;
}

// Query result types
export type GetCompaniesQueryResult = {
  companies: CompanyConnection;
};

export type GetLatestCompaniesQueryResult = {
  latestCompanies: CompanyConnection;
};

export type GetLatestCompaniesStatsQueryResult = {
  latestCompaniesStats: LatestCompaniesStats;
};

export type GetCompanyQueryResult = {
  company: Company;
};

export type GetCompanyStatsQueryResult = {
  companyStats: CompanyStats;
};

export type AutocompleteQueryResult = {
  autocomplete: AutocompleteResult[];
};

// Mutation result types
export type ExportCompaniesResult = {
  exportCompanies: ExportResult;
};

export type ExportLatestCompaniesResult = {
  exportLatestCompanies: ExportResult;
};

export type CAENInfo = {
  code: string;
  name: string;
  section: string;
  division: string;
  section_name?: string;
  division_name?: string;
  description?: string;
};