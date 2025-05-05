import { useState, useEffect } from "react";
import { useTransactions } from "../../contexts/TransactionContext";
import TransactionCalendarRangeDate from "../TransactionCalendarRangeDate/TransactionCalendarRangeDate";
import { useFilter } from "../../contexts/FilterContext";
import "./SearchBar.css"

const SearchBar = () => {
    const { searchTransactions } = useTransactions()
    const { dateRange, setDateRange, query, setQuery, filterType, setFilterType } = useFilter()
    const [isDropdownOpen, setDropdownOpen] = useState(false)

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            searchTransactions(dateRange);
        }
    }, [dateRange]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };


    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter"){
            searchTransactions({
                query,
                type: filterType,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate
            });
        }
    }

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    }

    const applyFilter = (filterType: string) => {
        setFilterType(filterType === "all" ? undefined : filterType); // Atualiza o filtro no contexto
        setDropdownOpen(false);
        searchTransactions({
            query,
            type: filterType === "all" ? undefined : filterType,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate
        });
    };

    const handleDateRangeChange = (range: { startDate: Date; endDate: Date }) => {
        setDateRange(range);
        searchTransactions({
            query,
            type: filterType,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate
        });
    };

    const getMonthRange = () => {
        const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        return { startDate, endDate };
    };

    return (
        <div className="search-bar">
            {/* Campo de pesquisa */}
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Pesquisar transações..."
                    value={query}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyPress}
                />
            </div>

            {/* Botão de filtros e calendário */}
            <div className="filter-calendar-container">
                {/* Botão de filtros */}
                <div className="filter-container">
                    <button onClick={toggleDropdown} className="filter-button" type="button">
                        Filtros
                    </button>

                    {isDropdownOpen && (
                        <div className="dropdown">
                            <ul className="dropdown-list">
                                <li>
                                    <button className={`filter-option ${filterType === "all" && "active"}`} onClick={() => applyFilter("all")}>
                                        Todos
                                    </button>
                                </li>
                                <li>
                                    <button className={`filter-option ${filterType === "credit" && "active"}`} onClick={() => applyFilter("credit")}>
                                        Crédito
                                    </button>
                                </li>
                                <li>
                                    <button className={`filter-option ${filterType === "debit" && "active"}`} onClick={() => applyFilter("debit")}>
                                        Débito
                                    </button>
                                </li>
                                <li className="calendar-container">
                                    <TransactionCalendarRangeDate
                                        initialDate={getMonthRange().startDate}
                                        initialRange={getMonthRange()}
                                        onRangeChange={handleDateRangeChange}
                                    />
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default SearchBar;
