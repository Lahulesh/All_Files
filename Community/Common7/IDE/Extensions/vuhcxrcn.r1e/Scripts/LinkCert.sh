#!/bin/bash

#-----------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation.  All rights reserved.
#-----------------------------------------------------------------------------

# $1 : %APPDATA% : /mnt/c/Users/<user name>/AppData/Roaming
# $2 : cert name : WebApplication1.pfx

# Make the user folder (if it doesn't exist)
if [ ! -d $HOME/.aspnet/https ]; then
    mkdir -p $HOME/.aspnet/https
fi

if [ ! -f "$HOME/.aspnet/https/$2" ]; then
    if [ -L "$HOME/.aspnet/https/$2" ]; then
        echo "The link $HOME/.aspnet/https/$2 already exists, but is not valid. Please delete or rename the existing link."
        exit 05
    fi
    ln -s "$1/ASP.NET/Https/$2" "$HOME/.aspnet/https/$2"
    if [ $? -ne 0 ]; then
        exit 10
    fi
elif [ ! -L "$HOME/.aspnet/https/$2" ] && [ ! -L "$HOME/.aspnet/https" ]; then
    echo "The file $HOME/.aspnet/https/$2 already exists, please delete or rename the existing file."
    exit 15
fi
