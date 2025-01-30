export interface CompanyFilters {
	cod_CAEN?: string;
	judet?: string;
	oras?: string;
	hasWebsite?: string;
	hasContact?: string;
	page?: number;
	limit?: number;
	sortBy?: string;
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
}

export interface Contact {
	email?: string;
	telefon?: string;
	fax?: string;
	website?: string;
}

export interface CAEN {
	code: string;
	name: string;
	section: string;
	division: string;
}

export interface Company {
	_id?: string;
	cui: number;
	nume: string;
	denumire: string;
	adresa?: Address;
	adresa_completa?: string;
	contact: Contact;
	cod_CAEN: string;
	adresa_anaf?: {
		sediu_social?: {
			sdenumire_Strada?: string;
			snumar_Strada?: string;
			sdenumire_Localitate?: string;
			scod_Localitate?: string;
			sdenumire_Judet?: string;
			scod_Judet?: string;
			scod_JudetAuto?: string;
		};
	};
	date_generale?: {
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
	};
	inregistrare?: {
		numar?: string;
		stare?: string;
		data?: string;
		organ_fiscal?: string;
	};
	tip_firma?: {
		forma_juridica?: string;
		forma_organizare?: string;
		forma_proprietate?: string;
	};
	caen?: CAEN;
}

export interface CompanyResponse {
	results: Company[];
	page: number;
	limit: number;
	totalPages: number;
	totalResults: number;
	isPartial?: boolean;
}

export interface CAENInfo {
	code: string;
	name: string;
	division_code: string;
	division_name: string;
	section_code: string;
	section_name: string;
}

