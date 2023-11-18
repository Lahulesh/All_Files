#!/bin/bash

#-----------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation.  All rights reserved.
#-----------------------------------------------------------------------------

if [ -f "/etc/os-release" ]; then
    . /etc/os-release
elif [ -f "/usr/lib/os-release" ]; then
    . /usr/lib/os-release
fi

if [[ $ID != "ubuntu" && $ID != "debian" ]]
then
    echo "$PRETTY_NAME is not currently supported, for install instructions please see: https://aka.ms/WslDotNet"
    exit -10
fi

# ensure wget is installed
dpkg -s wget &> /dev/null;
if [[ $? -ne 0 ]]
then
    echo "Installing wget"
    sudo apt-get update -y
    sudo apt-get install -y wget
fi

if [[ $ID == "debian" && $VERSION_ID == "9" ]]
then
    # debian 9 needs special handling: https://docs.microsoft.com/en-us/dotnet/core/install/linux-debian#debian-9-

    dpkg -s gpg &> /dev/null;
    if [[ $? -ne 0 ]]
    then
        echo "Installing gpg"
        sudo apt-get update -y
        sudo apt-get install -y gpg
    fi

    echo "Adding Microsoft repository key"
    wget -O - https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /tmp/microsoft.asc.gpg
    sudo mv /tmp/microsoft.asc.gpg /etc/apt/trusted.gpg.d/
    sudo chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpg

    echo "Adding Microsoft repository feed"
    wget https://packages.microsoft.com/config/debian/9/prod.list -O /tmp/prod.list
    sudo mv /tmp/prod.list /etc/apt/sources.list.d/microsoft-prod.list
    sudo chown root:root /etc/apt/sources.list.d/microsoft-prod.list

    dpkg -s apt-transport-https &> /dev/null;
    if [[ $? -ne 0 ]]
    then
        echo "Installing apt-transport-https"
        sudo apt-get update -y
        sudo apt-get install -y apt-transport-https
    fi
else
    echo "Adding Microsoft repository feed"
    # See: https://docs.microsoft.com/en-us/dotnet/core/install/linux-package-manager-ubuntu-1910#add-microsoft-repository-key-and-feed
    wget "https://packages.microsoft.com/config/$ID/$VERSION_ID/packages-microsoft-prod.deb" -O /tmp/packages-microsoft-prod.deb
    sudo dpkg -i /tmp/packages-microsoft-prod.deb

    if [ ! -f /etc/apt/preferences.d/dotnet ]
    then
        echo "Prioritizing Microsoft repository feed for .NET"

        sudo /bin/bash -c 'echo "Package: dotnet* aspnet* netstandard*
Pin: origin \"packages.microsoft.com\"
Pin-Priority: 999" > /etc/apt/preferences.d/dotnet'
    fi
fi

echo "Installing $1-runtime-$2"
sudo apt-get update -y
sudo apt-get install -y $1-runtime-$2
