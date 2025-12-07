#!/usr/bin/env bash

# Cronjob to run sql2csv every midnight
# 11/18/2025
# Rudra / cosmoid / Veerabhadrareddy / Andy Freeman
#

# Set defaults
# 
GROOT="/opt/mlepysak/tests"
GWDIR="$GROOT/datasets"
GDIR="$GWDIR/.git"
REPO="https://github.com"
RUSER="SprocketBot"
RLOC="datasets.git"

# First, clone the datasets repo. Create if it does not exist.
#
mkdir -p $GROOT || exit 1

if [ ! -e "$GDIR" ]; then
	echo "Cloning $REPO/$RUSER/$RLOC"
	git clone "$REPO/$RUSER/$RLOC" $GWDIR || exit 1
else
	echo "Pulling updates"
	git --git-dir "$GDIR" --work-tree "$GWDIR" pull || exit 1

fi

source /opt/mlepysak/.mlepysak-venv/bin/activate

sql2csv \
	--input-sql-dir /opt/mlepysak/tests/datasets \
	--output-dir /opt/mlepysak/tests/csv \
	--aws-creds-file /opt/mlepysak/tests/.mle-aws-creds \
	--pgsql-creds-file /opt/mlepysak/tests/.mle.pgpass

deactivate
