export const TRANSACTION_CATEGORIES_LABELS : Record<string, string> = {
  EDUCATION :"Educação",
  ENTERTAINMENT: "Entretenimento",
  FOOD: "Alimentação",
  HEALTH: "Saúde",
  HOUSING: "Moradia",
  OTHER: "Outro",
  SALARY: "Salário",
  TRANSPORTATION: "Transporte",
  UTILITY: "Utilidades",
}

export const TRANSACTION_PAYMENT_METHOD_LABELS : Record<string, string> = {
  BANK_TRANSFER: "Transferência Bancária",
  BANK_SLIP: "Boleto Bancário",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  OTHER: "Outro",
  PIX: "PIX",
}

export const TRANSACTION_CATEGORIES = [
  { key: 'EDUCATION', label: 'Educação' },
  { key: 'ENTERTAINMENT', label: 'Entretenimento' },
  { key: 'FOOD', label: 'Alimentação' },
  { key: 'HEALTH', label: 'Saúde' },
  { key: 'HOUSING', label: 'Moradia' },
  { key: 'OTHER', label: 'Outro' },
  { key: 'SALARY', label: 'Salário' },
  { key: 'TRANSPORTATION', label: 'Transporte' },
  { key: 'UTILITY', label: 'Utilidades' },
];

export const TRANSACTION_PAYMENT_METHODS = [
  { key: 'BANK_TRANSFER', label: 'Transferência Bancária' },
  { key: 'BANK_SLIP', label: 'Boleto Bancário' },
  { key: 'CASH', label: 'Dinheiro' },
  { key: 'CREDIT_CARD', label: 'Cartão de Crédito' },
  { key: 'DEBIT_CARD', label: 'Cartão de Débito' },
  { key: 'PIX', label: 'PIX' },
  { key: 'OTHER', label: 'Outro' },
];

export const TRANSACTION_TYPES = [
  { key: 'credit', label: 'Crédito' },
  { key: 'debit', label: 'Débito' },
]