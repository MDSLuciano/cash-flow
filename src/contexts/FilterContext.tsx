import { createContext, useContext, useState } from "react";

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface FilterContextProps {
    dateRange: DateRange;
    setDateRange: (range: DateRange) => void;
    query: string;
    setQuery: (query: string) => void;
    filterType: string | undefined;
    setFilterType: (type: string | undefined) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
    const [query, setQuery] = useState<string>("");
    const [filterType, setFilterType] = useState<string | undefined>(undefined);

    return (
        <FilterContext.Provider
            value={{ dateRange, setDateRange, query, setQuery, filterType, setFilterType }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
};
