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
_`cd` to db-master_
> sqlite3 test.db
> sqlite> .read ./data/full.sql

### Step 4
_`cd` to root (ERM387)_
> npm start


### For login, use:
user_id: joeblo@gmail.com
user_password: root
