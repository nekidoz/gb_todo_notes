#!/bin/sh
# wait-for-postgres.sh
# Проблема одновременного запуска базы данных postgres и выполнения миграций описана в
# официальной документации Docker (https://docs.docker.com/compose/startup-order/).
# Хотя контейнер backend стартует после контейнера db, для полного запуска базы требуется время.
# При попытке выполнить миграции может возникнуть ситуация, когда база данных ещё не готова, и возникнет ошибка.
# Данный скрипт осуществляет проверку готовности базы данных.

# Использование: wait-for-poshgres.sh <db_hostname> <db_database> <db_username> <db_password> [<command>]

set -e

host="$1"
shift
database="$1"
shift
username="$1"
shift
password="$1"
shift
cmd="$@"

until PGPASSWORD="$password" psql -h "$host" -d "$database" -U "$username" -c '\q'
do
  >&2 echo "Postgres is unavailable - sleeping";
  sleep 1;
done

>&2 echo "Postgres is up - executing command"
echo $cmd
