#!/bin/bash

#-----------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation.  All rights reserved.
#-----------------------------------------------------------------------------

if [ -f "/etc/os-release" ]; then
    . /etc/os-release
elif [ -f "/usr/lib/os-release" ]; then
    . /usr/lib/os-release
else
    exit 10
fi

printf '{ "ID": "%s", "PRETTY_NAME": "%s", "VERSION_ID": "%s" }\n' "$ID" "$PRETTY_NAME" "$VERSION_ID"