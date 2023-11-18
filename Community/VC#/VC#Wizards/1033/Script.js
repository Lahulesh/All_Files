// (c) 2001 Microsoft Corporation
var bValidating = false;

//SET DIRECTION FUNCTION*************************************
//***********************************************************
function setDirection()
{
	if (document.dir == "rtl")
	{
		
		//SET CONTENT FRAME FLOW FOR RTL*********************
		//***************************************************
		var CatcHERa = document.all.tags("LI");
		var CatcHERb = document.all.tags("DIV");
		var CatcHERc = document.all.tags("SPAN");
		var CatcHERd = document.all.tags("INPUT");
		var CatcHERe = document.all.tags("TABLE");
		var CatcHERf = document.all.tags("BUTTON");
		var CatcHERg = document.all.tags("SELECT");
		var CatcHERg = document.all.tags("OBJECT");
		
		if (CatcHERa != null)
		{
		  for (var i = 0; i < CatcHERa.length; i++)
		  {
            if (CatcHERa[i].className.toLowerCase() == "list")
			{
			  CatcHERa[i].style.left = "0px";
			  CatcHERa[i].style.right = "-15px";
			}
		  }
		}
		
		if (CatcHERb != null)
		{
		  for (var i = 0; i < CatcHERb.length; i++)
		  {
            if (CatcHERb[i].className.toLowerCase() == "vertline")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "0px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextradiob")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "25px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextradioindenta")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "30px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextradioindentb")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "42px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextcheckboxa")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "15px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextcheckboxb")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "25px";
			}
            if (CatcHERb[i].className.toLowerCase() == "itemtextcheckboxindentb")
			{
			  CatcHERb[i].style.left = "0px";
			  CatcHERb[i].style.right = "42px";
			}
		  }
		}
		
		if (CatcHERc != null)
		{
		  for (var i = 0; i < CatcHERc.length; i++)
		  {
            if (CatcHERc[i].className.toLowerCase() == "vertline1")
			{
			  CatcHERc[i].style.left = "0px";
			  CatcHERc[i].style.right = "-1px";
			}
            if (CatcHERc[i].className.toLowerCase() == "itemtextindent")
			{
			  CatcHERc[i].style.left = "0px";
			  CatcHERc[i].style.right = "17px";
			}
		  }
		}
		
		if (CatcHERd != null)
		{
		  for (var i = 0; i < CatcHERd.length; i++)
		  {
            if (CatcHERd[i].className.toLowerCase() == "radio")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "6px";
			}
            if (CatcHERd[i].className.toLowerCase() == "checkbox")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "-4px";
			}
            if (CatcHERd[i].className.toLowerCase() == "checkboxa")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "10px";
			}
            if (CatcHERd[i].className.toLowerCase() == "sidebtn")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "9px";
			}
            if (CatcHERd[i].className.toLowerCase() == "sidebtn2")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "9px";
			}
            if (CatcHERd[i].className.toLowerCase() == "sidebtnb")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "9px";
			}
            if (CatcHERd[i].className.toLowerCase() == "checkboxindent")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "23px";
			}
            if (CatcHERd[i].className.toLowerCase() == "radioindent")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "23px";
			}
            if (CatcHERd[i].className.toLowerCase() == "radioindenta")
			{
			  CatcHERd[i].style.marginLeft = "0px";
			  CatcHERd[i].style.marginRight = "9px";
			}
            if (CatcHERd[i].className.toLowerCase() == "comment")
			{
			  CatcHERd[i].style.left = "0px";
			  CatcHERd[i].style.right = "8px";
			}
		  }
		}
		
		if (CatcHERe != null)
		{
		  for (var i = 0; i < CatcHERe.length; i++)
		  {
            if (CatcHERe[i].className.toLowerCase() == "linktextselected")
			{
			  CatcHERe[i].style.left = "0px";
			  CatcHERe[i].style.right = "10px";
			}
            if (CatcHERe[i].className.toLowerCase() == "linktextselectedindent")
			{
			  CatcHERe[i].style.left = "0px";
			  CatcHERe[i].style.right = "16px";
			}
            if (CatcHERe[i].className.toLowerCase() == "linktext")
			{
			  CatcHERe[i].style.left = "0px";
			  CatcHERe[i].style.right = "10px";
			}
            if (CatcHERe[i].className.toLowerCase() == "linktextindent")
			{
			  CatcHERe[i].style.left = "0px";
			  CatcHERe[i].style.right = "16px";
			}
		  }
		}
		
		if (CatcHERf != null)
		{
		  for (var i = 0; i < CatcHERf.length; i++)
		  {
            if (CatcHERf[i].className.toLowerCase() == "buttonclass")
			{
			  CatcHERf[i].style.marginLeft = "0px";
			  CatcHERf[i].style.marginRight = "8px";
			}
		  }
		}
		
		if (CatcHERg != null)
		{
		  for (var i = 0; i < CatcHERg.length; i++)
		  {
            if (CatcHERg[i].className.toLowerCase() == "sidebtn")
			{
			  CatcHERg[i].style.left = "0px";
			  CatcHERg[i].style.right = "9px";
			}
            if (CatcHERg[i].className.toLowerCase() == "sidebtn2")
			{
			  CatcHERg[i].style.left = "0px";
			  CatcHERg[i].style.right = "17px";
			}
            if (CatcHERg[i].className.toLowerCase() == "sidebtn2a")
			{
			  CatcHERg[i].style.left = "0px";
			  CatcHERg[i].style.right = "25px";
			}
            if (CatcHERg[i].className.toLowerCase() == "sidebtn2b")
			{
			  CatcHERg[i].style.left = "0px";
			  CatcHERg[i].style.right = "8px";
			}
		  }
		}
		
		if (CatcHERh != null)
		{
		  for (var i = 0; i < CatcHERh.length; i++)
		  {
            if (CatcHERh[i].className.toLowerCase() == "itemtext")
			{
			  CatcHERh[i].style.left = "0px";
			  CatcHERh[i].style.right = "8px";
			}
		  }
		}
		
		//SET INTRODUCTION FRAME FLOW FOR RTL****************
		//***************************************************
		
		//SET INTRODUCTION SUBHEADING TEXT ALIGNMENT*********
		document.all("SUBHEAD").style.marginLeft = "0px";
		document.all("SUBHEAD").style.marginRight = "10px";
		
		//SET INTRODUCTION IMAGE ALIGNMENT*******************
		document.all("IMAGE_TABLE").style.textAlign = "left";
	}
}

//SET POTENTIALLY DISABLED TABS FOR MOUSEOVER****************
//***********************************************************

function MouseOver(obj)
{

	if ((obj == null) || (typeof(obj) == "undefined"))
		return;
	
	else if ((obj.id != "DatSupBtn") || (obj.id != "BrowseBtn"))
	{
		obj.className = "activelink";
	}
	
	else if (obj.id == "DBSupport")
	{
		if (window.external.FindSymbol("APP_TYPE_DLG"))
		{ 
			obj.className = "inactivelink"; 
		}
	}
	
	else if ((obj.id == "CompoundDoc") || (obj.id == "DocTemp"))
	{
		if ((!window.external.FindSymbol("DOCVIEW")) || (window.external.IsSymbolDisabled("DOCVIEW")))
		{ 
			obj.className = "inactivelink";
		}
	} 
	else if (obj.id == "Notifications")
	{
		if (!GENERATE_FILTER.checked) 
		{ 
			obj.className = "inactivelink"; 
		}
	}
	else if (obj.id == "DatSupBtn")
	{
		if ((DB_VIEW_WITH_FILE.checked) || (DB_VIEW_NO_FILE.checked))
		{
			DatSupBtn.disabled = false;
			sdstitle.disabled = false;
		}
		
		else if ((!DB_VIEW_WITH_FILE.checked) && (!DB_VIEW_NO_FILE.checked))
		{
			DatSupBtn.disabled = true;
			sdstitle.disabled = true;
		}
	}
}

//SET POTENTIALLY DISABLED TABS FOR MOUSEOUT*****************
//***********************************************************
function MouseOut(obj)
{

	if ((obj == null) || (typeof(obj) == "undefined"))
		return;
	
	else if (obj.id == "DBSupport")
	{
	
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if (window.external.FindSymbol("APP_TYPE_DLG")) 
		{ 
			obj.className = "inactivelink"; 
		}
	}
	
	else if ((obj.id == "CompoundDoc") || (obj.id == "DocTemp"))
	{
	
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if ((!window.external.FindSymbol("DOCVIEW")) || (window.external.IsSymbolDisabled("DOCVIEW")))
		{ 
			obj.className = "inactivelink";
		}
	} 
	
	else if (obj.id == "Notifications")
	{
	
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if (!window.external.FindSymbol("GENERATE_FILTER")) 
		{
			obj.className = "inactivelink";
		}
	}
	
	else if (obj.id == "DatSupBtn")
	{
	
		if ((DB_VIEW_WITH_FILE.checked) || (DB_VIEW_NO_FILE.checked))
		{
			DatSupBtn.disabled = false;
			sdstitle.disabled = false;
		}
		
		else if ((!DB_VIEW_WITH_FILE.checked) && (!DB_VIEW_NO_FILE.checked))
		{
			DatSupBtn.disabled = true;
			sdstitle.disabled = true;
		}
	}	
	
	else if (obj.id == "ServerOptions")
	{
	
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if ((!window.external.FindSymbol("GENERATE_ISAPI")) && (!window.external.FindSymbol("COMBINE_PROJECTS")))
		{ 
			obj.className = "inactivelink"; 
		}
	}
	
	else if (obj.id == "AppOptions")
	{
		if (obj.className == "")
		{
			obj.className = ""
		}
		
		else
		{
			obj.className = "activelink"; 
		}
		
		if ((!window.external.FindSymbol("GENERATE_APP")) && (!window.external.FindSymbol("COMBINE_PROJECTS")))
		{
			obj.className = "inactivelink";
		}
	}
	
	else if (obj.id == "BrowseBtn")
	{
		obj.disabled = true;
		
		if ((GENERATE_ISAPI.checked) && (GENERATE_ISAPI.disabled == false))
		{
			obj.disabled = false;
		}
	}	
}

/******************************************************************************
 Description: OnKeyPress event handler for HTML pages
******************************************************************************/
function OnPress()
{
	// get outermost window for new UI with frames
	var oDefault = window;
	while (oDefault != oDefault.parent)
		oDefault = oDefault.parent;

	var bPreviousTab = false;

	if (event.keyCode != 0)
	{
		if (!event.repeat)
		{
			switch(event.keyCode)
			{
				// Enter
				case 13:
					if (event.srcElement.className && (event.srcElement.className.toLowerCase() == "activelink" || event.srcElement.className.toLowerCase() == "inactivelink"))
					{
						event.cancelBubble = true;
						event.srcElement.click();
						break;
					}
					if (event.srcElement.type == null ||
						(event.srcElement.type && event.srcElement.type != "button"))
						oDefault.FinishBtn.click();
					break;

				// Backspace		
				case 8:
					if (event.srcElement.type == null ||
						(event.srcElement.type && event.srcElement.type != "text"))
						event.returnValue = false;
					break;
					
				// Escape
				case 27:
					oDefault.CancelBtn.click();
					break;
			}
		}
	}
}

/*****************************************************************************
 Description: OnKeyDown event handler for HTML pages.
******************************************************************************/
function OnKey()
{
	//Get outermost window
	var oDefault = window;
	while (oDefault != oDefault.parent)
		oDefault = oDefault.parent;

	var bPreviousTab = false;

	if (event.keyCode != 0)
	{
		if (!event.repeat)
		{
			switch(event.keyCode)
			{
				// Enter key for <SELECT>, other controls handled in OnPress()
				case 13:
					if (event.srcElement.type && event.srcElement.type.substr(0,6) == "select")
						oDefault.FinishBtn.click();
					break;
					
				// Escape key for <SELECT>, other controls handled in OnPress()
				case 27:
					if (event.srcElement.type && event.srcElement.type.substr(0,6) == "select")
						oDefault.CancelBtn.click();
					break;

				//F1
				case 112:
					oDefault.HelpBtn.click();
					break;
					
				case 65:
				case 70:
				case 78:
					{
						if (event.ctrlKey)
							event.returnValue = false;
					}
					
					break;
					
				//Case for 33,9,34 have to be in this order
				//Page Up
				case 33:
					bPreviousTab = true;
					
				//Tab
				case 9:
					if (event.shiftKey)
						bPreviousTab = true;
						
				//Page Down
				case 34:
					if (event.ctrlKey && oDefault.tab_array != null && oDefault.tab_array.length > 1)
					{
						for (i = 0; i < oDefault.tab_array.length; i++)
						{
							if ((oDefault.tab_array[i].className.toLowerCase() == "activelink") || (oDefault.tab_array[i].className.toLowerCase() == "inactivelink"))
							{
								var j = 0;
								
								if (bPreviousTab)
								{
									j = i - 1;
									while (j != i)
									{
										if (j < 0)
										{
											j = oDefault.tab_array.length - 1;
										}
										if ((oDefault.tab_array[j].className.toLowerCase() == "activelink") || (oDefault.tab_array[j].className.toLowerCase() == "inactivelink"))
										{
											j--;
										}
										else
										{
											break;
										}
									}
									while ((oDefault.tab_array[j].className.toLowerCase() == "") || (oDefault.tab_array[j].className.toLowerCase() == "inactivelink"))
									{
										if (j == 0)
										{
											break;
										}
										if (oDefault.tab_array[j - 1].className.toLowerCase() == "inactivelink")
										{
											j--;
										}
										else
										{
											break;
										}
									}
									if (j == 0)
									{
										j = oDefault.tab_array.length - 1;
									}
									else
									{
										j = j - 1;
									}
								}
								else
								{
									j = i + 1;
									while (j != i)
									{
										if (j >= oDefault.tab_array.length)
										{
											j = 0;
										}
										if ((oDefault.tab_array[j].className.toLowerCase() == "activelink") || (oDefault.tab_array[j].className.toLowerCase() == "inactivelink"))
										{
											j++;
										}
										else
										{
											break;
										}
									}
									while ((oDefault.tab_array[j].className.toLowerCase() == "") || (oDefault.tab_array[j].className.toLowerCase() == "inactivelink"))
									{
										if (j == oDefault.tab_array.length - 1)
										{
											break;
										}
										if (oDefault.tab_array[j + 1].className.toLowerCase() == "inactivelink")
										{
											j++;
										}
										else
										{
											break;
										}
									}
									if (j == oDefault.tab_array.length - 1)
									{
										j = 0;
									}
									else
									{
										j = j + 1;
									}
								}
								//Prevent double notification when we pop up an error
								event.cancelBubble = true;
								oDefault.tab_array[j].click();
								break;
							}
						}
					}
					break;
							
				//Alt-Left arrow
				case 37:
					if (event.altKey)
						event.returnValue = false;
					break;
					
				//Alt-Right arrow
				case 39:					
					if (event.altKey)
						event.returnValue = false;
					break;

				default:
					break;				
			}
		}
	}
}

/******************************************************************************
 Description: KeyDown event handler for WizCombo control
    nKeyCode: Ascii code for key
******************************************************************************/
function OnWizComboKeyDown(nKeyCode)
{
	// Get outermost window
	var oDefault = window;
	while (oDefault != oDefault.parent)
		oDefault = oDefault.parent;

	switch(nKeyCode)
	{
		// Enter
		case 13:
			oDefault.FinishBtn.click();
			break;
			
		// Escape
		case 27:
			oDefault.CancelBtn.click();
			break;

		// F1
		case 112:
			oDefault.HelpBtn.click();
			break;
	}
}

//DO MOUSEOVER***********************************************
//***********************************************************
function MouseOverActiveText()
{
  	var e = window.event.srcElement;
	
	if (e && e.className.toLowerCase() == "activelink")
		{
		  e.className = "activelink2";
		}
}

//DO MOUSEOUT************************************************
//***********************************************************
function MouseOutActiveText()
{
  	var e = window.event.srcElement;
	
	if (e && e.className.toLowerCase() == "activelink2")
		{
		  e.className = "activelink";
		}
}


//SET MOUSEOVERS AND MOUSOUTS********************************
//***********************************************************
document.onmouseover = MouseOverActiveText;
document.onmouseout = MouseOutActiveText;
// SIG // Begin signature block
// SIG // MIIoKAYJKoZIhvcNAQcCoIIoGTCCKBUCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // GaS1/sPy4pJLgh6v9hgEgwMJnBviNIQmirRfwck7icig
// SIG // gg12MIIF9DCCA9ygAwIBAgITMwAAA061PHrBhG/rKwAA
// SIG // AAADTjANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIzMDMxNjE4NDMyOVoX
// SIG // DTI0MDMxNDE4NDMyOVowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // 3QiojSOiARVrryVJn+lnTiamZiMGLORuwCQ+VG3C+rbA
// SIG // vhATw269+qRRqNW7FKed50chWJ53KDIPBStHfIy5cNJY
// SIG // HsQw6+4InH9szgRVqn7/50i8MyRTT+VtNwxf9daGddq0
// SIG // hahpZvjuOnEY0wxQaTEQmWRnXWZUQY4r28tHiNVYEw9U
// SIG // 7wHXwWEHvNn4ZlkJGEf5VpgCvr1v9fmzu4x2sV0zQsSy
// SIG // AVtOxfDwY1HMBcccn23tphweIdS+FNDn2vh1/2kREO0q
// SIG // mGc+fbFzNskjn72MiI56kjvNDRgWs+Q78yBvPCdPgTYT
// SIG // rto5eg33Ko2ELNR/zzEkCCuhO5Vw10qV8wIDAQABo4IB
// SIG // czCCAW8wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFJzHO2Z/7pCgbAYlpMHTX7De
// SIG // aXcAMEUGA1UdEQQ+MDykOjA4MR4wHAYDVQQLExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xFjAUBgNVBAUTDTIzMDAx
// SIG // Mis1MDA1MTYwHwYDVR0jBBgwFoAUSG5k5VAF04KqFzc3
// SIG // IrVtqMp1ApUwVAYDVR0fBE0wSzBJoEegRYZDaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jcmwvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNybDBhBggr
// SIG // BgEFBQcBAQRVMFMwUQYIKwYBBQUHMAKGRWh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNydDAMBgNV
// SIG // HRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4ICAQA9tb/a
// SIG // R6C3QUjZRQI5pJseF8TmQD7FccV2w8kL9fpBg3vV6YAZ
// SIG // 09ZV58eyQ6RTCgcAMiMHSJ5r4SvaRgWt9U8ni96e0drN
// SIG // C/EgATz0SRwBJODR6QV8R45uEyo3swG0qqm4LMtdGOyg
// SIG // KcvvVKymtpBprLgErJPeT1Zub3puzpk7ONr5tASVFPiT
// SIG // 0C4PGP7HY907Uny2GGQGicEwCIIu3Yc5+YWrS6Ow4c/u
// SIG // E/jKxXfui1GtlN86/e0MMw7YcfkT/f0WZ7q+Ip80kLBu
// SIG // QwlSDKQNZdjVhANygHGtLSNpeoUDWLGii9ZHn3Xxwqz8
// SIG // RK8vKJyY8hhr/WCqC7+gDjuzoSRJm0Jc/8ZLGBtjfyUj
// SIG // ifkKmKRkxLmBWFVmop+x3uo4G+NSW6Thig3RP2/ldqv4
// SIG // F1IBXtoHcE6Qg7L4fEjEaKtfwTV3K+4kwFN/FYK/N4lb
// SIG // T2JhYWTlTNFC6f5Ck1aIqyKT9igsU+DnpDnLbfIK2J4S
// SIG // dekDI5jL+aOd4YzRVzsYoJEFmM1DvusOdINBQHhWvObo
// SIG // AggepVxJNtRRQdRXSB6Y0kH/iz/1tjlfx34Qt7kz4Cm0
// SIG // bV6PN02WBLnaKMmfwFbtPLIm2dzJBjiTkSxETcCpthu6
// SIG // KnTr+EI/GdCaxoDM4+OjRSgMZC0qROaB0GD9R7T8dZT3
// SIG // w+4jUmybD+i4lB1x9TCCB3owggVioAMCAQICCmEOkNIA
// SIG // AAAAAAMwDQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290
// SIG // IENlcnRpZmljYXRlIEF1dGhvcml0eSAyMDExMB4XDTEx
// SIG // MDcwODIwNTkwOVoXDTI2MDcwODIxMDkwOVowfjELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEoMCYGA1UEAxMfTWljcm9zb2Z0
// SIG // IENvZGUgU2lnbmluZyBQQ0EgMjAxMTCCAiIwDQYJKoZI
// SIG // hvcNAQEBBQADggIPADCCAgoCggIBAKvw+nIQHC6t2G6q
// SIG // ghBNNLrytlghn0IbKmvpWlCquAY4GgRJun/DDB7dN2vG
// SIG // EtgL8DjCmQawyDnVARQxQtOJDXlkh36UYCRsr55JnOlo
// SIG // XtLfm1OyCizDr9mpK656Ca/XllnKYBoF6WZ26DJSJhIv
// SIG // 56sIUM+zRLdd2MQuA3WraPPLbfM6XKEW9Ea64DhkrG5k
// SIG // NXimoGMPLdNAk/jj3gcN1Vx5pUkp5w2+oBN3vpQ97/vj
// SIG // K1oQH01WKKJ6cuASOrdJXtjt7UORg9l7snuGG9k+sYxd
// SIG // 6IlPhBryoS9Z5JA7La4zWMW3Pv4y07MDPbGyr5I4ftKd
// SIG // gCz1TlaRITUlwzluZH9TupwPrRkjhMv0ugOGjfdf8NBS
// SIG // v4yUh7zAIXQlXxgotswnKDglmDlKNs98sZKuHCOnqWbs
// SIG // YR9q4ShJnV+I4iVd0yFLPlLEtVc/JAPw0XpbL9Uj43Bd
// SIG // D1FGd7P4AOG8rAKCX9vAFbO9G9RVS+c5oQ/pI0m8GLhE
// SIG // fEXkwcNyeuBy5yTfv0aZxe/CHFfbg43sTUkwp6uO3+xb
// SIG // n6/83bBm4sGXgXvt1u1L50kppxMopqd9Z4DmimJ4X7Iv
// SIG // hNdXnFy/dygo8e1twyiPLI9AN0/B4YVEicQJTMXUpUMv
// SIG // dJX3bvh4IFgsE11glZo+TzOE2rCIF96eTvSWsLxGoGyY
// SIG // 0uDWiIwLAgMBAAGjggHtMIIB6TAQBgkrBgEEAYI3FQEE
// SIG // AwIBADAdBgNVHQ4EFgQUSG5k5VAF04KqFzc3IrVtqMp1
// SIG // ApUwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAUci06AjGQQ7kUBU7h6qfHMdEjiTQwWgYDVR0f
// SIG // BFMwUTBPoE2gS4ZJaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // MjAxMV8yMDExXzAzXzIyLmNybDBeBggrBgEFBQcBAQRS
// SIG // MFAwTgYIKwYBBQUHMAKGQmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY2VydHMvTWljUm9vQ2VyQXV0MjAx
// SIG // MV8yMDExXzAzXzIyLmNydDCBnwYDVR0gBIGXMIGUMIGR
// SIG // BgkrBgEEAYI3LgMwgYMwPwYIKwYBBQUHAgEWM2h0dHA6
// SIG // Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvZG9jcy9w
// SIG // cmltYXJ5Y3BzLmh0bTBABggrBgEFBQcCAjA0HjIgHQBM
// SIG // AGUAZwBhAGwAXwBwAG8AbABpAGMAeQBfAHMAdABhAHQA
// SIG // ZQBtAGUAbgB0AC4gHTANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // Z/KGpZjgVHkaLtPYdGcimwuWEeFjkplCln3SeQyQwWVf
// SIG // Liw++MNy0W2D/r4/6ArKO79HqaPzadtjvyI1pZddZYSQ
// SIG // fYtGUFXYDJJ80hpLHPM8QotS0LD9a+M+By4pm+Y9G6XU
// SIG // tR13lDni6WTJRD14eiPzE32mkHSDjfTLJgJGKsKKELuk
// SIG // qQUMm+1o+mgulaAqPyprWEljHwlpblqYluSD9MCP80Yr
// SIG // 3vw70L01724lruWvJ+3Q3fMOr5kol5hNDj0L8giJ1h/D
// SIG // Mhji8MUtzluetEk5CsYKwsatruWy2dsViFFFWDgycSca
// SIG // f7H0J/jeLDogaZiyWYlobm+nt3TDQAUGpgEqKD6CPxNN
// SIG // ZgvAs0314Y9/HG8VfUWnduVAKmWjw11SYobDHWM2l4bf
// SIG // 2vP48hahmifhzaWX0O5dY0HjWwechz4GdwbRBrF1HxS+
// SIG // YWG18NzGGwS+30HHDiju3mUv7Jf2oVyW2ADWoUa9WfOX
// SIG // pQlLSBCZgB/QACnFsZulP0V3HjXG0qKin3p6IvpIlR+r
// SIG // +0cjgPWe+L9rt0uX4ut1eBrs6jeZeRhL/9azI2h15q/6
// SIG // /IvrC4DqaTuv/DDtBEyO3991bWORPdGdVk5Pv4BXIqF4
// SIG // ETIheu9BCrE/+6jMpF3BoYibV3FWTkhFwELJm3ZbCoBI
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoKMIIaBgIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // TrU8esGEb+srAAAAAANOMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCAoWhE3VDCC1r/57btTn439Vp2rmVOcywNt
// SIG // IFHL9NkAHzBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAI/HgQp+
// SIG // D/FdxHFQFA7umhgpAmryeRWrdPCgMTxlXD4GpqxmLLss
// SIG // r+3HYaeyL2tHW1rYh+olOt6Gqfz8cNqVMv/wdQc85sI3
// SIG // B5DrVBYQZdULLM1wZEFSsUFx/PYEWo5hwKil9vn0hjLp
// SIG // 3wdPAvqU2Zgge58xz0RfYxLDZ9eb4Ky8GEQd6bdo+RBi
// SIG // WxxJURHtnSbRUzD/Ar2Uu6fygirTTgDp2cAQyXLnbMCV
// SIG // VELUUGMrbfpwYaUiiXKaLKOYPjTsFfZnHAX2QERZNCCR
// SIG // k1w+nypl72U/kUaz5BDOL1OXZ051ZePfWylT7bXl2Dw/
// SIG // Ahy8e9SlVC28IfUH+q8WM/0ohPKhgheUMIIXkAYKKwYB
// SIG // BAGCNwMDATGCF4Awghd8BgkqhkiG9w0BBwKgghdtMIIX
// SIG // aQIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgtW+kusmUdnd9JLmyQqxV
// SIG // hBSRA25dzHXnFDdBLrTZN0ACBmUD12s2XRgTMjAyMzEw
// SIG // MDUxODAyMDguNjU3WjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOkE0MDAtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR6jCCByAwggUIoAMCAQICEzMAAAHWJ2n/ci1WyK4A
// SIG // AQAAAdYwDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjM0WhcN
// SIG // MjQwMjAxMTkxMjM0WjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OkE0MDAtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAzyzNjpvK+bt33Gwx
// SIG // Dl8nSbW5FuVN+ChWn7QvvEMjaqZTCM0kwtU6BNM3MHkA
// SIG // rzyH6WLcjwd47enz0aa74cApLFMPadDn5mc1jw75LeNA
// SIG // VErbvNd0Ja5aEXaZS89saZNvYyDmePqwWymmZAT2eEeC
// SIG // 10IZJB53tGP2IfOWajDEWjFpATOp1MFeWg4sF6nRPScp
// SIG // dItWlmGwqs8AUXTewk5QCcayeO6L97n/5RYPYZ1UHKkG
// SIG // IEa0RaQzRTDj9IMM+TY+mtuBmZ3BRBkZisCJi/uSlj51
// SIG // YL2nSUkaemaq2FdxZmwZmbbBdIUpVYy0DvJ8XpRle076
// SIG // iCEiLL9m0DIFAVRM/MBxclN/Ot4B4/AQmxKSc5u+Xyyb
// SIG // C9z+upSVDUTewkbHzRGx3V/3eo6KVThcBe6Jpk0I6VN+
// SIG // wP+2EdMCQ07embF1Po/8GJaPW9trdalLYao0bN9qBn9k
// SIG // 0UwqEFi4SXt3ACGEZZWv4BCpW7gw7Bt/dusuBDBxcU47
// SIG // I63GRGw1sIwd8K6ddQ8oNUCnA8i1LNmpwaJb0MCUzdJj
// SIG // DrlzvLQc9tJ4P/l8PuMPlvTzJL1tX2mIuN+VYykWbB38
// SIG // SD4yM2dMH+BYm5lTyR2fmk8RrFST8cnQob7xgn+H3vF3
// SIG // 2GPT+ZW5/UnCnOGnU3eOBgqwZSfyTrKAODrzR2Olvl3C
// SIG // lXCCBlsCAwEAAaOCAUkwggFFMB0GA1UdDgQWBBRhmlQ2
// SIG // O00AYjAioNvo/80U3GLGTjAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // 1L/kYzYncCcUmzJNSL0vC38TTPFWlYacUdUpFvhUWOgC
// SIG // pJ9rNzp9vZxhFZWrW5SL9alUypK1MS2DGdM/kQOppn17
// SIG // ntmO/2AW8zOZFHlIFNstTJm4p+sWnU/Q8xAnhOxOPt5N
// SIG // g5mcblfhixWELKpA23vKMu/twUolNvasmQGE/b0QwCz1
// SIG // AuWcMqD5DXym6o5d1YBU6iLmxEK+ejNGHTFpagqqtMlZ
// SIG // Z/Zj24Rx81xzo2kLLq6IRwn+1U/HLe/aaN+BXfF3LKps
// SIG // oXSgctY3cpJ64pPhd7xJf/dKmqJ+TfCk2aBrThZWiRT5
// SIG // 2dg6kLW9llpH7gKBlqxkgONzMpe/j2G1LK4vzazLwHfW
// SIG // fifRZarDMF0BcQAe7oyYuIT/AR/I+qpJsuLrpVOUkkGu
// SIG // l5BJXGikGEqSXEo5I8kwyDqX+i2QU2hcennqKg2dJVEY
// SIG // YkajvtcqPLlzvPXupIAXgvLdVjeSE6l546HGIA78haab
// SIG // bFA4J0VIiNTP0JfztvfVZLTJCC+9oukHeAQbK492foix
// SIG // Jyj/XqVMKLD9Ztzdr/coV0NR4rrCZetyH1yMnwSWlr0A
// SIG // 4FNyZOHiGUq/9iiI+KbV7ePegkYh04tNdZHMA6XY0CwE
// SIG // Igr6I9absoX8FX9huWcAabSF4rzUW2t+CpA+aKphKBdc
// SIG // kRUPOIg7H/4Isp/1yE+2GP8wggdxMIIFWaADAgECAhMz
// SIG // AAAAFcXna54Cm0mZAAAAAAAVMA0GCSqGSIb3DQEBCwUA
// SIG // MIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQDEylN
// SIG // aWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3Jp
// SIG // dHkgMjAxMDAeFw0yMTA5MzAxODIyMjVaFw0zMDA5MzAx
// SIG // ODMyMjVaMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNV
// SIG // BAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEw
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // 5OGmTOe0ciELeaLL1yR5vQ7VgtP97pwHB9KpbE51yMo1
// SIG // V/YBf2xK4OK9uT4XYDP/XE/HZveVU3Fa4n5KWv64NmeF
// SIG // RiMMtY0Tz3cywBAY6GB9alKDRLemjkZrBxTzxXb1hlDc
// SIG // wUTIcVxRMTegCjhuje3XD9gmU3w5YQJ6xKr9cmmvHaus
// SIG // 9ja+NSZk2pg7uhp7M62AW36MEBydUv626GIl3GoPz130
// SIG // /o5Tz9bshVZN7928jaTjkY+yOSxRnOlwaQ3KNi1wjjHI
// SIG // NSi947SHJMPgyY9+tVSP3PoFVZhtaDuaRr3tpK56KTes
// SIG // y+uDRedGbsoy1cCGMFxPLOJiss254o2I5JasAUq7vnGp
// SIG // F1tnYN74kpEeHT39IM9zfUGaRnXNxF803RKJ1v2lIH1+
// SIG // /NmeRd+2ci/bfV+AutuqfjbsNkz2K26oElHovwUDo9Fz
// SIG // pk03dJQcNIIP8BDyt0cY7afomXw/TNuvXsLz1dhzPUNO
// SIG // wTM5TI4CvEJoLhDqhFFG4tG9ahhaYQFzymeiXtcodgLi
// SIG // Mxhy16cg8ML6EgrXY28MyTZki1ugpoMhXV8wdJGUlNi5
// SIG // UPkLiWHzNgY1GIRH29wb0f2y1BzFa/ZcUlFdEtsluq9Q
// SIG // BXpsxREdcu+N+VLEhReTwDwV2xo3xwgVGD94q0W29R6H
// SIG // XtqPnhZyacaue7e3PmriLq0CAwEAAaOCAd0wggHZMBIG
// SIG // CSsGAQQBgjcVAQQFAgMBAAEwIwYJKwYBBAGCNxUCBBYE
// SIG // FCqnUv5kxJq+gpE8RjUpzxD/LwTuMB0GA1UdDgQWBBSf
// SIG // pxVdAF5iXYP05dJlpxtTNRnpcjBcBgNVHSAEVTBTMFEG
// SIG // DCsGAQQBgjdMg30BATBBMD8GCCsGAQUFBwIBFjNodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL0RvY3Mv
// SIG // UmVwb3NpdG9yeS5odG0wEwYDVR0lBAwwCgYIKwYBBQUH
// SIG // AwgwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAU1fZWy4/oolxiaNE9lJBb186aGMQwVgYDVR0f
// SIG // BE8wTTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // XzIwMTAtMDYtMjMuY3JsMFoGCCsGAQUFBwEBBE4wTDBK
// SIG // BggrBgEFBQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jZXJ0cy9NaWNSb29DZXJBdXRfMjAxMC0w
// SIG // Ni0yMy5jcnQwDQYJKoZIhvcNAQELBQADggIBAJ1Vffwq
// SIG // reEsH2cBMSRb4Z5yS/ypb+pcFLY+TkdkeLEGk5c9MTO1
// SIG // OdfCcTY/2mRsfNB1OW27DzHkwo/7bNGhlBgi7ulmZzpT
// SIG // Td2YurYeeNg2LpypglYAA7AFvonoaeC6Ce5732pvvinL
// SIG // btg/SHUB2RjebYIM9W0jVOR4U3UkV7ndn/OOPcbzaN9l
// SIG // 9qRWqveVtihVJ9AkvUCgvxm2EhIRXT0n4ECWOKz3+SmJ
// SIG // w7wXsFSFQrP8DJ6LGYnn8AtqgcKBGUIZUnWKNsIdw2Fz
// SIG // Lixre24/LAl4FOmRsqlb30mjdAy87JGA0j3mSj5mO0+7
// SIG // hvoyGtmW9I/2kQH2zsZ0/fZMcm8Qq3UwxTSwethQ/gpY
// SIG // 3UA8x1RtnWN0SCyxTkctwRQEcb9k+SS+c23Kjgm9swFX
// SIG // SVRk2XPXfx5bRAGOWhmRaw2fpCjcZxkoJLo4S5pu+yFU
// SIG // a2pFEUep8beuyOiJXk+d0tBMdrVXVAmxaQFEfnyhYWxz
// SIG // /gq77EFmPWn9y8FBSX5+k77L+DvktxW/tM4+pTFRhLy/
// SIG // AsGConsXHRWJjXD+57XQKBqJC4822rpM+Zv/Cuk0+CQ1
// SIG // ZyvgDbjmjJnW4SLq8CdCPSWU5nR0W2rRnj7tfqAxM328
// SIG // y+l7vzhwRNGQ8cirOoo6CGJ/2XBjU02N7oJtpQUQwXEG
// SIG // ahC0HVUzWLOhcGbyoYIDTTCCAjUCAQEwgfmhgdGkgc4w
// SIG // gcsxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJTAjBgNVBAsTHE1p
// SIG // Y3Jvc29mdCBBbWVyaWNhIE9wZXJhdGlvbnMxJzAlBgNV
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjpBNDAwLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUA+a9w1UaQBkKP
// SIG // bEy1B3gQvOzaSvqggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOjJ
// SIG // WqswIhgPMjAyMzEwMDUxNTU0MTlaGA8yMDIzMTAwNjE1
// SIG // NTQxOVowdDA6BgorBgEEAYRZCgQBMSwwKjAKAgUA6Mla
// SIG // qwIBADAHAgEAAgIigTAHAgEAAgITizAKAgUA6MqsKwIB
// SIG // ADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZCgMC
// SIG // oAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqGSIb3
// SIG // DQEBCwUAA4IBAQAgN7Sy4hgEKLBgvUCi1Ua/ZHr19e7T
// SIG // Gc1OFlGrhxD4rJ0vMzHW+gD9HvpHJFOTpCf8Uo4OSwa2
// SIG // cSxobw0n+z+TjTmZ6+3jmojl5py1mzB18WHTD3ti6rMs
// SIG // ZijK0/j4o0rpStY2IqrBauMrwtzqqotmWn9iwvMb/f+Z
// SIG // Xl+6DwMh1bPupzkmQbxWhMuteYbCpmVNfhXb95EBLmok
// SIG // EIZIt0P+fUHsMfe89QP4NyWIF2/y8GP93Xn+mQm8ki9f
// SIG // qV6T4a2ViXvKpAPZjHUf5T7gvcUXijU//C/qoTFIU3of
// SIG // 7VFI5joC4DcqPp1o1FPMzFrXkVngqVprN0zYxujzrwXm
// SIG // 1I+vMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTACEzMAAAHWJ2n/ci1WyK4AAQAAAdYw
// SIG // DQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJAzEN
// SIG // BgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQgaeYb
// SIG // MroRXshrmH22K5s+o6jvnKTHghHXJBOYxsIowhIwgfoG
// SIG // CyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCDWy00NV3jT
// SIG // PhAYpzhCTI2XdIzDQ7q/gCvjvD9do+Uk/DCBmDCBgKR+
// SIG // MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAB
// SIG // 1idp/3ItVsiuAAEAAAHWMCIEIOQV+sm/t1lVnwIn+ud5
// SIG // Kx5Vab9Z7DLark/GNITFDWk3MA0GCSqGSIb3DQEBCwUA
// SIG // BIICAI5y8fsewMUKT/0kzKIhWO/OVA8pxIk0mWalM2sO
// SIG // ZPja64QhX8WEeRjyBhdWMTSvt3yiiyAFDpGlRBSiN6iK
// SIG // 25rL6WTx/FTQcJkaJ5kUx+lJBkwtiPO3gAt3ZSh2HSKJ
// SIG // cw/Vr7k/1P328L9aad623cY4ZMS5ueBRg9ZnuXbVBbVM
// SIG // 9hQRLA5Bd1mwZe5KKv+t9cqd41IhJ6An3iP1cpCymTS4
// SIG // sXsPYUQ6AcYu309C8s8n131H66czgobSIqNE+gGdFp8l
// SIG // wH1OYHXU6AxiXkL/HilbmhzDo0o8Lw9Fl2WaekCX24Xo
// SIG // WyjQTpP5vWV6SqlotpU4HjiMknQ2TEDxNQY8tNzjOoT2
// SIG // dimok7jDENFaWeEUMEWDJDko9q4Rq9VXW8iBeSNkJgAS
// SIG // Yt1Pr572zcCXQ9qKAf71Zgejh+9kWFh5LeATe34nb8uy
// SIG // K5xKF5PPawPFMThphDu8SXn+uKarE9zQpMl32yJMVSkh
// SIG // AH7a++bC6THhsnTKT6OpvGc63UYs3kGihY5gEbKmeVgd
// SIG // Xys/4gQRe8prGSfQYohEiYECeTmF0irOaDDv333MBD4F
// SIG // 1MSLFfhF7UUTy5Z0xCVHtiLpT3IoGBeKN3BKTIGjQvDE
// SIG // /AAn3vu12EhzH3qtvGLvhSKV9Te6lAnEtgxdFIHNMx9w
// SIG // Al4yCMD8/9RN+IJOuYJO8olucY/q
// SIG // End signature block
