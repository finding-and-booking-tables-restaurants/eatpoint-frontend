interface FilterMenuProps {
	isOpen: boolean;
	setIsOpen: Function;
	handleFilterKitchenClick: Function;
	handleTypeFilterClick: Function;
	handleCheckFilterClick: Function;
	handleServiceFilterClick: Function;
	selectedKitchenFilters?: string[];
	selectedTypeFilters: string[];
	selectedCheckFilters: string | null;
	selectedServiceFilters: string[];
}

export default FilterMenuProps;
