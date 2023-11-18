/*
$DatabaseMustHaveMemOptFilegroupComment$
*/

CREATE PROCEDURE $SchemaQualifiedObjectName$
	@param1 int = 0,
	@param2 int
WITH NATIVE_COMPILATION, SCHEMABINDING, EXECUTE AS OWNER 
AS BEGIN ATOMIC WITH (
      TRANSACTION ISOLATION LEVEL = SNAPSHOT,
      LANGUAGE = N'English')
	SELECT @param1, @param2
RETURN 0
END