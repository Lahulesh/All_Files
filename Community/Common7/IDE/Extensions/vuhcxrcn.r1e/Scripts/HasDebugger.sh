#!/bin/bash

#-----------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation.  All rights reserved.
#-----------------------------------------------------------------------------

if [ -d $HOME/vsdbg/ ]; then echo "true"; exit 0; fi

echo "false";
exit 1
