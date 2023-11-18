#!/bin/bash

#-----------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation.  All rights reserved.
#-----------------------------------------------------------------------------

set -e

curl -sSL https://aka.ms/getvsdbgsh -o /tmp/getvsdbgsh.sh
cat /tmp/getvsdbgsh.sh | /bin/sh /dev/stdin -v latest -l $HOME/vsdbg;
