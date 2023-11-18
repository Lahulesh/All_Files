/*
$DatabaseMustHaveMemOptFilegroupComment$
*/

CREATE FUNCTION $SchemaQualifiedObjectName$
(
	@param1 int,
	@param2 int
)
RETURNS INT
WITH NATIVE_COMPILATION, SCHEMABINDING
AS BEGIN ATOMIC WITH (
	TRANSACTION ISOLATION LEVEL = SNAPSHOT,
	LANGUAGE = N'English')
RETURN @param1 + @param2
END
