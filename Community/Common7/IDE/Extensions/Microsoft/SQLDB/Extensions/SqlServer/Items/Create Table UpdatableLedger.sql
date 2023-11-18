CREATE TABLE $SchemaQualifiedObjectName$
(
    [Id]        int PRIMARY KEY,
    [ledger_start_transaction_id] bigint GENERATED ALWAYS AS TRANSACTION_ID START HIDDEN NOT NULL,
    [ledger_start_sequence_number] bigint GENERATED ALWAYS AS SEQUENCE_NUMBER START HIDDEN NOT NULL,
    [ledger_end_transaction_id] bigint GENERATED ALWAYS AS TRANSACTION_ID END HIDDEN NULL,
    [ledger_end_sequence_number] bigint GENERATED ALWAYS AS SEQUENCE_NUMBER END HIDDEN NULL
)
WITH
(
    SYSTEM_VERSIONING = ON
    (
        HISTORY_TABLE = [$SchemaName$].[$rawname$_HISTORY]
    ),
    LEDGER = ON
    ( 
        LEDGER_VIEW = [$SchemaName$].[$rawname$_Ledger]
        ( 
            transaction_id_column_name = [lvTransactionId],
            sequence_number_column_name = [lvSequenceNumber],
            operation_type_column_name = [lvOperationType],
            operation_type_desc_column_name = [lvOperationTypeDesc]
        )
    )
)