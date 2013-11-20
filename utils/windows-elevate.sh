#!/usr/bin

# Execute a command with elevated privileges (run as administrator)

# check for permissions
output=$(cacls "$SYSTEMROOT\system32\config\systemprofile" >/dev/null 2>/dev/null)
# if error, we do not have admin.
if ! [ $? == 0 ];
then
    echo "requesting admin privileges"

    echo "Set UAC = CreateObject(\"Shell.Application\")" > "$TEMP\getadmin.vbs"

    arguments="$BASH_SOURCE $*"
    echo "UAC.ShellExecute \"sh\", \"$arguments\", \"\", \"runas\", 1" >> "$TEMP\getadmin.vbs"

    wscript "$TEMP\getadmin.vbs"
    exit $?
else
    if [ -e "%temp%\getadmin.vbs" ];
    then
        rm "%temp%\getadmin.vbs"
    fi
fi

# elevated!

command="$*"
eval "${command//\\/\\/}"
