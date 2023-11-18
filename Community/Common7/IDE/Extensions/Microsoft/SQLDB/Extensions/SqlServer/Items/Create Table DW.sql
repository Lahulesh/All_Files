CREATE TABLE $SchemaQualifiedObjectName$
(
    col1 int NOT NULL
)
WITH
(
    DISTRIBUTION = HASH (col1),
    CLUSTERED COLUMNSTORE INDEX
)
GO
