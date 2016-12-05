# ERM387
soen387

## Instructions to Test the Server

### Prerequisite
Install sqlite3 for your computer
(with MacOs Sierra):
> brew install sqlite

### Step 1
> npm install

### Step 2
_from base directory (server root, i.e. ERM387)_ 
> sh ./dbsetup.sh

### Step 3
used to create tables in the sqlite db (cd to root)
> npm start

### Step 4
_`cd` to db-master_
- `sqlite3 test.db`
- sqlite> `.read ./data/full.sql`

### Step 5
_`cd` to root (ERM387)_
> npm start

### For login, use:
user_id: joeblo@gmail.com
user_password: root

## Quick CheatSheet
- `.help` in the sqlite console
- `.tables` to see tables
- Just do normal SQL queries in the console to see the results (ex: SELECT * FROM tablename;)
- `.quit` to exit the console (sqlite)
