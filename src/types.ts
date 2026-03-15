export interface FlagClassification {
	isoCode: string;
	name: string;
	goodFlag: boolean;
}

export interface FlagData extends FlagClassification {
	svgUrl: string;
	alt: string;
}
