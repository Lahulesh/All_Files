CREATE EXTERNAL DATA SOURCE [$rawname$] WITH
(  
	TYPE = RDBMS,
	LOCATION = 'myserver.database.windows.net',
	DATABASE_NAME = 'mydb',
	CREDENTIAL = [mycredential]
)