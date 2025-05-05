import { useState } from "react";
import Calendar from "react-calendar"; // Importa o calendário.
import 'react-calendar/dist/Calendar.css'; // Estilos padrão.
import './TransactionCalendar.css'
import { Value } from "react-calendar/src/shared/types.js";
import { useTransactions } from "../../contexts/TransactionContext";
import { useFilter } from "../../contexts/FilterContext";

interface TransactionCalendarProps {
  initialRange?: {startDate: Date; endDate: Date} // Intervalo inicial para modo "range"
  initialDate: Date; // Data inicial
  onDateChange?: (date: Date) => void; // Função para enviar a data selecionada
  onRangeChange?: (range : DateRange) => void; // Função para enviar as datas selecionadas, para o modo 'range'.
}

interface DateRange {
  startDate: Date;
  endDate: Date;
}

const TransactionCalendar = ({ onRangeChange}:TransactionCalendarProps) => {

    const { refreshTransactions , refreshSummary } = useTransactions()
    const { dateRange, setDateRange,  } = useFilter() // Consome o filtro global

    const [isCalendarOpen, setCalendarOpen] = useState(false);

    const openCalendarModal = () => setCalendarOpen(true);
    const closeCalendarModal = () => setCalendarOpen(false);


    const handleFilterDateChange = (value: Value | null) => {
        if(Array.isArray(value)){
            const [startDate, endDate] = value;
        if(startDate instanceof Date && endDate instanceof Date){
            const range: DateRange = { startDate, endDate };
            setDateRange(range) // Atualiza o contexto global
            onRangeChange?.(range); // Retorna o intervalo para o callback
            // Atualiza dados no contexto
            try {
            refreshTransactions();
            refreshSummary();
            } catch (error){
            console.error('Error updating data:', error)
            }
        } else {
            console.warn("Invalid selection for 'filter'.")
        }
        }
        closeCalendarModal();
    }

  return (
    <div>
        <div>
          {/* Botão para filtrar por período e pelo dia selecionado */}
          <button type="button" onClick={() => openCalendarModal()} className="button">
            Data
          </button>
        </div>

      {isCalendarOpen && (
        <div className="modal-overlay-calendar">
          <div className="modal-calendar">
            <button
              type="button"
              className="modal-close-calendar"
              onClick={closeCalendarModal}
            >
              &times;
            </button>
            <h3>
              Selecione um intervalo de datas
            </h3>
            <Calendar
              className="react-calendar"
              value={[dateRange.startDate, dateRange.endDate]}
              onChange={ handleFilterDateChange}
              selectRange // Habilita intervalo para filtros
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionCalendar;
