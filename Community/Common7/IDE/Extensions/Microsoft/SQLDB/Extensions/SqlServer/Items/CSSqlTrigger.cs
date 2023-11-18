using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.SqlServer.Server;

public partial class Triggers
{        
    // $SqlClrTriggerComment$
    public static void $safeitemname$ ()
    {
	    // $ReplaceCodeComment$
	    SqlContext.Pipe.Send("$TriggerFiredString$");
    }
}

