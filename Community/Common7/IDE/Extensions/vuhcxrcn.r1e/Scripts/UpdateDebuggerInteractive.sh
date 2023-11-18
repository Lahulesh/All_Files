#!/bin/bash

#-----------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation.  All rights reserved.
#-----------------------------------------------------------------------------

if [ -f "/etc/os-release" ]; then
    . /etc/os-release
elif [ -f "/usr/lib/os-release" ]; then
    . /usr/lib/os-release
fi

if [[ $ID == "ubuntu" || $ID == "debian" ]]
then
    # If we know how, ensure curl is installed
    dpkg -s curl &> /dev/null;
    if [[ $? -ne 0 ]]
    then
        echo "Installing curl"
        sudo apt-get update -y
        sudo apt-get install -y curl
    fi
fi

# download and run the debugger script
curl -sSL https://aka.ms/getvsdbgsh | /bin/sh /dev/stdin -v latest -l $HOME/vsdbg;
