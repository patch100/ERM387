#!/bin/sh

OLD_PATH="$(pwd)"

cd "$OLD_PATH/db-master" || exit

sqlite3 test.db ""

cd "$OLD_PATH" || exit

echo "Created sqlite3 'test.db' database at $OLD_PATH/db-master"
unset OLD_PATH
