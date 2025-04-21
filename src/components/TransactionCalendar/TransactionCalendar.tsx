import { useEffect, useState } from "react";
import Calendar from "react-calendar"; // Importa o calendário.
import 'react-calendar/dist/Calendar.css'; // Estilos padrão.
import './TransactionCalendar.css'
import { Value } from "react-calendar/src/shared/types.js";

interface TransactionCalendarProps {
  initialDate: Date; // Data inicial (opcional)
  onDateChange: (date: Date) => void; // Função para enviar a data selecionada
}

const TransactionCalendar = ({ onDateChange, initialDate }:TransactionCalendarProps) => {
    const [selectDate, setSelectDate] = useState<Date>(initialDate || new Date()); // Usa a data inicial, se houver
    const [isCalendarOpen, setCalendarOpen] = useState(false);

    useEffect(() =>{
      setSelectDate(initialDate); // Atualiza quando initiaDate muda
    }, [initialDate])

    const openCalendarModal = () => setCalendarOpen(true);
    const closeCalendarModal = () => setCalendarOpen(false);

  const handleDateChange = (value: Value | null) => {
    if (value instanceof Date) {
      setSelectDate(value); // Atualiza a data selecionada internamente no TransactionCalendar
      onDateChange(value); // Envia a data para o Modal
      closeCalendarModal(); // Fecha o calendário modal após selecionar a data
    } else {
      console.warn('No date selected');
    }
  };

  return (
    <div>
      <button type="button" onClick={openCalendarModal}>
        {selectDate.toLocaleDateString()} {/* Exibe a data diretamente no botão */}
      </button>
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
            <h3>Selecione uma data:</h3>
            <Calendar
              className="react-calendar"
              value={selectDate}
              onChange={handleDateChange} //Captura mudanças na data
              selectRange={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionCalendar;
