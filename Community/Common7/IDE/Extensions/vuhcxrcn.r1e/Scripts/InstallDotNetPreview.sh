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
    echo "$PRETTY_NAME is not currently supported, for install instructions please see: https://aka.ms/WslDotNetPreview"
    exit 10
fi

# ensure curl is installed
dpkg -s curl &> /dev/null;
if [[ $? -ne 0 ]]
then
    echo "Installing curl"
    sudo apt-get update -y
    sudo apt-get install -y curl
fi

echo "Installing the .NET Preview"
mkdir $HOME/dotnet_install
pushd $HOME/dotnet_install
curl -H 'Cache-Control: no-cache' -L https://aka.ms/install-dotnet-preview -o install-dotnet-preview.sh
sudo bash install-dotnet-preview.sh
popd
