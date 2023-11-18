CREATE EXTERNAL TABLE $SchemaQualifiedObjectName$ 
(  
	 [Id] INT NOT NULL 
)
WITH  
(  
	DATA_SOURCE = [ExternalDataSource1],

	-- DISTRIBUTION could be set to one of the following options:
		-- SHARDED([Id])
		-- REPLICATED 
		-- ROUND_ROBIN
	DISTRIBUTION = ROUND_ROBIN
) 
