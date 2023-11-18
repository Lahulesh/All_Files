CREATE TABLE $SchemaQualifiedObjectName$
(
      [Id] INT NOT NULL,
      [ledger_start_transaction_id] bigint GENERATED ALWAYS AS TRANSACTION_ID START HIDDEN NOT NULL,
      [ledger_start_sequence_number]    bigint GENERATED ALWAYS AS SEQUENCE_NUMBER START
)
WITH
(
  LEDGER = ON
  (
    APPEND_ONLY = ON,
    LEDGER_VIEW = [$SchemaName$].[$rawname$_Ledger]
    (
      transaction_id_column_name = [ledger_transaction_id],
      sequence_number_column_name = [ledger_sequence_number],
      operation_type_column_name = [ledger_operation_type],
      operation_type_desc_column_name = [ledger_operation_type_desc]
    )
  )
)