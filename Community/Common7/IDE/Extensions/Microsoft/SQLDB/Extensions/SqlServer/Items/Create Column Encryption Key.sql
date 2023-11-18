CREATE COLUMN ENCRYPTION KEY [$rawname$]
WITH VALUES
(
     COLUMN_MASTER_KEY = [$SomeCMKName$],
     ALGORITHM = N'RSA_OAEP',
     ENCRYPTED_VALUE = $SomeEncryptedValue$
);

GO

$MasterKeySyntax$