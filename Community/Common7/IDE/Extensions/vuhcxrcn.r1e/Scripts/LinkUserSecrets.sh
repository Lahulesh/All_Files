#!/bin/bash

#-----------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation.  All rights reserved.
#-----------------------------------------------------------------------------

# $1 : %APPDATA% : /mnt/c/Users/<user name>/AppData/Roaming
# $2 : UserSecretsId : Typically a GUID

# Make the user folder (if it doesn't exist)
if [ ! -d $HOME/.microsoft/usersecrets ]; then
    mkdir -p $HOME/.microsoft/usersecrets
fi

if [ ! -d "$HOME/.microsoft/usersecrets/$2" ]; then
    if [ -L "$HOME/.microsoft/usersecrets/$2" ]; then
        echo "The link $HOME/.microsoft/usersecrets/$2 already exists, but is not valid. Please delete or rename the existing link."
        exit 05
    fi
    ln -s "$1/Microsoft/UserSecrets/$2" "$HOME/.microsoft/usersecrets/$2"
    if [ $? -ne 0 ]; then
        exit 20
    fi
elif [ ! -L "$HOME/.microsoft/usersecrets/$2" ] && [ ! -L "$HOME/.microsoft/usersecrets" ]; then
    echo "The directory $HOME/.microsoft/usersecrets/$2 already exists, please delete or rename the existing directory."
    exit 25
fi
