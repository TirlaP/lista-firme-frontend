// src/hooks/useLocationSearch.ts
interface Location {
	name: string;
	code: string;
}

export function useLocationSearch(selectedCounty?: string) {
	const counties: Location[] = [
		{ name: "Bucuresti", code: "B" },
		{ name: "Cluj", code: "CJ" },
		{ name: "Iasi", code: "IS" },
		{ name: "Timis", code: "TM" },
		{ name: "Brasov", code: "BV" },
		{ name: "Constanta", code: "CT" },
		{ name: "Suceava", code: "SV" },
	];

	const citiesMap: Record<string, Location[]> = {
		Bucuresti: [
			{ name: "Sector 1", code: "S1" },
			{ name: "Sector 2", code: "S2" },
			{ name: "Sector 3", code: "S3" },
			{ name: "Sector 4", code: "S4" },
			{ name: "Sector 5", code: "S5" },
			{ name: "Sector 6", code: "S6" },
		],
		Cluj: [
			{ name: "Cluj-Napoca", code: "CJ1" },
			{ name: "Turda", code: "CJ2" },
			{ name: "Dej", code: "CJ3" },
		],
		Suceava: [
			{ name: "Suceava", code: "SV1" },
			{ name: "Radauti", code: "SV2" },
			{ name: "Falticeni", code: "SV3" },
		],
	};

	return {
		counties,
		cities: selectedCounty ? citiesMap[selectedCounty] || [] : [],
		searchCounty: (query: string) => {
			// Mock implementation - in real app would call API
			console.log("Searching counties:", query);
		},
		searchCity: (query: string) => {
			// Mock implementation - in real app would call API
			console.log("Searching cities:", query);
		},
		isLoadingCounties: false,
		isLoadingCities: false,
	};
}
