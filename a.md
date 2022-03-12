To set up a PostgreSQL Media Server database on Windows

1- Download and install a PostgreSQL server. For instructions, refer to the PostgreSQL documentation on www.postgresql.org.

2- Add the PostgreSQL bin directory path to the PATH environmental variable.

3- Open the psql command-line too : 
    a- In the Windows Command Prompt, run the command:
    {psql -U userName}

    b- Enter your password when prompted.

4- Run a CREATE DATABASE command to create a new database. Specify the following database settings.
    Database name	Any name.
    Encoding	Must be Unicode–either UTF8 or UCS2.
    Collation	Any that is compatible with the encoding.
    Locale	Any that is compatible with the encoding.
    For example:

    CREATE DATABASE myDatabase WITH ENCODING 'UTF8' LC_COLLATE='English_United Kingdom' LC_CTYPE='English_United Kingdom';

5- Connect to the new database using the command:

    \c databaseName

6-