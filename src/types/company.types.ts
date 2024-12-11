// src/types/company.types.ts
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

export interface Company {
	cui: number;
	nume: string;
	adresa: {
		strada: string;
		numar: string;
		localitate: string;
		judet: string;
		cod_postal: string;
		detalii: string;
		tara: string;
		cod_judet: string;
		cod_judet_auto: string;
	};
	adresa_completa: string;
	contact: {
		email: string;
		telefon: string;
		fax: string;
		website: string;
	};
	cod_CAEN: string;
	inregistrare?: {
		numar: string;
		stare: string;
		data: string;
		organ_fiscal: string;
	};
	tip_firma?: {
		forma_juridica: string;
		forma_organizare: string;
		forma_proprietate: string;
	};
	caen?: {
		code: string;
		name: string;
		section: string;
		division: string;
	};
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
