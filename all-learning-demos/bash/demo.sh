#!/bin/bash

# SCRIPT_NAME="Delbury"
# # CONTENT=$(ls)
# SERVER_NAME=$(hostname)

# read -p "input your message: " MSG
# echo "Hello World, ${SERVER_NAME}, ${SCRIPT_NAME}"

# if [ -e "${MSG}.txt" ]; then
#   echo "${MSG}"
# else
#   echo "nothing~"
# fi

# case "${MSG}" in
#   *.t?t | t)
#     echo "Matched"
#     ;;
#   *)
#     echo "Unmatched"
#     ;;
#   esac

# LIST=$(ls *.txt)
# for ITEM in $LIST
# do
#   echo "Renaming $ITEM to new-$ITEM"
#   mv $ITEM "new-$ITEM"
# done

# for ((INDEX=1;INDEX<=3;INDEX++))
# do
#   echo $LIST[$INDEX]
# done

# echo "$@"
# echo $$ 
# echo $# 
# echo "$*"
# echo $? 
# echo $0

# function fn {
#   echo $1 $2 $3
# }
# fn "asd" "123123"

# VAL="8"
# case $VAL in
#   [^a-z])
#     echo $VAL
#     ;;
#   *)
#     echo "nothing"
#     ;;
# esac
if test 8 -eq 8
then
  echo "equal"
else
  echo "not"
fi
