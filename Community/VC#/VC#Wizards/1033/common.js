// (c) Microsoft Corporation
var vsViewKindPrimary                     = "{00000000-0000-0000-0000-000000000000}";
var vsViewKindDebugging                   = "{7651A700-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindCode                        = "{7651A701-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindDesigner                    = "{7651A702-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindTextView                    = "{7651A703-06E5-11D1-8EBD-00A0C90F26EA}";

var GUID_ItemType_PhysicalFolder          = "{6BB5F8EF-4483-11D3-8BCF-00C04F8EC28C}";
var GUID_ItemType_VirtualFolder           = "{6BB5F8F0-4483-11D3-8BCF-00C04F8EC28C}";
var GUID_ItemType_PhysicalFile            = "{6BB5F8EE-4483-11D3-8BCF-00C04F8EC28C}";

var GUID_Deployment_TemplatePath          = "{54435603-DBB4-11D2-8724-00A0C9A8B90C}";

var gbExceptionThrown = false;

    var vsCMFunctionConstructor = 1;

    var vsCMAddPositionInvalid = -3;
    var vsCMAddPositionDefault = -2;
    var vsCMAddPositionEnd = -1;
    var vsCMAddPositionStart = 0;
//
    var vsCMAccessPublic = 1;
    var vsCMAccessDefault = 32;
//
    var vsCMWhereInvalid = -1;
    var vsCMWhereDefault = 0;
    var vsCMWhereDeclaration = 1;
    var vsCMWhereDefinition = 2;
//
    var vsCMValidateFileExtNone = -1;
    var vsCMValidateFileExtCpp = 0;
    var vsCMValidateFileExtCppSource = 1;
    var vsCMValidateFileExtHtml = 2;
//
    var vsCMElementClass    = 1;
    var vsCMElementFunction = 2;
    var vsCMElementVariable = 3;
    var vsCMElementProperty = 4;
    var vsCMElementNamespace= 5;
    var vsCMElementInterface= 8;
    var vsCMElementStruct   = 11;   
    var vsCMElementUnion    = 12;
    var vsCMElementIDLCoClass=33;
    var vsCMElementVCBase   = 37;


// VS-specific HRESULT failure codes
//
    var OLE_E_PROMPTSAVECANCELLED = -2147221492;
    var VS_E_PROJECTALREADYEXISTS = -2147753952;
    var VS_E_PACKAGENOTLOADED = -2147753953;
    var VS_E_PROJECTNOTLOADED = -2147753954;
    var VS_E_SOLUTIONNOTOPEN = -2147753955;
    var VS_E_SOLUTIONALREADYOPEN = -2147753956;
    var VS_E_INCOMPATIBLEDOCDATA = -2147753962;
    var VS_E_UNSUPPORTEDFORMAT = -2147753963;
    var VS_E_WIZARDBACKBUTTONPRESS = -2147213313;
    var VS_E_WIZCANCEL = VS_E_WIZARDBACKBUTTONPRESS;

////////////////////////////////////////////////////////


/******************************************************************************
 Description: Sets the error info
  nErrNumber: Error code
  strErrDesc: Error description
******************************************************************************/
function SetErrorInfo(oErrorObj)
{
    var oWizard;
    try
    {
        oWizard = wizard;
    }
    catch(e)
    {
        oWizard = window.external;
    }

    try
    {
        var strErrorText = "";

        if(oErrorObj.description.length != 0)
        {
            strErrorText = oErrorObj.description;       
        }
        else
        {
            var strErrorDesc = GetRuntimeErrorDesc(oErrorObj.name);
            if (strErrorDesc.length != 0)
            {
                var L_strScriptRuntimeError_Text = " error occurred while running the script:\r\n\r\n";
                strErrorText = oErrorObj.name + L_strScriptRuntimeError_Text + strErrorDesc;
            }
        }

        oWizard.SetErrorInfo(strErrorText, oErrorObj.number & 0xFFFFFFFF);
    }
    catch(e)
    {
        var L_ErrSettingErrInfo_Text = "An error occurred while setting the error info.";
        oWizard.ReportError(L_ErrSettingErrInfo_Text);
    }
}


/******************************************************************************
         Description: Returns a description for the exception type given
 strRuntimeErrorName: The name of the type of exception occurred
 *****************************************************************************/
function GetRuntimeErrorDesc(strRuntimeErrorName)
{
    var L_strDesc_Text = "";
    switch(strRuntimeErrorName)
    {
        case "ConversionError":
            var L_ConversionError1_Text = "This error occurs whenever there is an attempt to convert";
            var L_ConversionError2_Text = "an object into something to which it cannot be converted.";
            L_strDesc_Text = L_ConversionError1_Text + "\r\n" + L_ConversionError2_Text;
            break;
        case "RangeError":
            var L_RangeError1_Text = "This error occurs when a function is supplied with an argument";
            var L_RangeError2_Text = "that has exceeded its allowable range. For example, this error occurs";
            var L_RangeError3_Text = "if you attempt to construct an Array object with a length that is not";
            var L_RangeError4_Text = "a valid positive integer.";
            L_strDesc_Text = L_RangeError1_Text + "\r\n" + L_RangeError2_Text + "\r\n" + L_RangeError3_Text + "\r\n" + L_RangeError4_Text;
            break;
        case "ReferenceError":
            var L_ReferenceError1_Text = "This error occurs when an invalid reference has been detected.";
            var L_ReferenceError2_Text = "This error will occur, for example, if an expected reference is null.";
            L_strDesc_Text = L_ReferenceError1_Text + "\r\n" + L_ReferenceError2_Text;
            break;
        case "RegExpError":
            var L_RegExpError1_Text = "This error occurs when a compilation error occurs with a regular";
            var L_RegExpError2_Text = "expression. Once the regular expression is compiled, however, this error";
            var L_RegExpError3_Text = "cannot occur. This example will occur, for example, when a regular";
            var L_RegExpError4_Text = "expression is declared with a pattern that has an invalid syntax, or flags";
            var L_RegExpError5_Text = "other than i, g, or m, or if it contains the same flag more than once.";
            L_strDesc_Text = L_RegExpError1_Text + "\r\n" + L_RegExpError2_Text + "\r\n" + L_RegExpError3_Text + "\r\n" + L_RegExpError4_Text + "\r\n" + L_RegExpError5_Text;
            break;
        case "SyntaxError":
            var L_SyntaxError1_Text = "This error occurs when source text is parsed and that source text does not";
            var L_SyntaxError2_Text = "follow correct syntax. This error will occur, for example, if the eval";
            var L_SyntaxError3_Text = "function is called with an argument that is not valid program text.";
            L_strDesc_Text = L_SyntaxError1_Text + "\r\n" + L_SyntaxError2_Text + "\r\n" + L_SyntaxError3_Text;
            break;
        case "TypeError":
            var L_TypeError1_Text = "This error occurs whenever the actual type of an operand does not match the";
            var L_TypeError2_Text = "expected type. An example of when this error occurs is a function call made on";
            var L_TypeError3_Text = "something that is not an object or does not support the call.";
            L_strDesc_Text = L_TypeError1_Text + "\r\n" + L_TypeError2_Text + "\r\n" + L_TypeError3_Text;
            break;
        case "URIError":
            var L_URIError1_Text = "This error occurs when an illegal Uniform Resource Indicator (URI) is detected.";
            var L_URIError2_Text = "For example, this is error occurs when an illegal character is found in a string";
            var L_URIError3_Text = "being encoded or decoded.";
            L_strDesc_Text = L_URIError1_Text + "\r\n" + L_URIError2_Text + "\r\n" + L_URIError3_Text;
            break;
        default:
            break;
    }
    return L_strDesc_Text;
}

/******************************************************************************
 Description: Creates the Templates.inf file.
              Templates.inf is created based on TemplatesInf.txt and contains
              a list of file names to be created by the wizard.
******************************************************************************/
function CreateInfFile()
{
    try
    {
        var oFSO, TemplatesFolder, TemplateFiles, strTemplate;
        oFSO = new ActiveXObject("Scripting.FileSystemObject");

        var TemporaryFolder = 2;
        var oFolder = oFSO.GetSpecialFolder(TemporaryFolder);

        var strTempFolder = oFSO.GetAbsolutePathName(oFolder.Path);
        var strWizTempFile = strTempFolder + "\\" + oFSO.GetTempName();

        var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
        var strInfFile = strTemplatePath + "\\Templates.inf";
        wizard.RenderTemplate(strInfFile, strWizTempFile);

        var oWizTempFile = oFSO.GetFile(strWizTempFile);
        return oWizTempFile;

    }
    catch(e)
    {   
        throw e;
    }
}

/******************************************************************************
 Description: Returns a unique file name
strDirectory: Directory to look for file name in
 strFileName: File name to check.  If unique, same file name is returned.  If 
              not unique, a number from 1-9999999 will be appended.  If not 
              passed in, a unique file name is returned via GetTempName.
******************************************************************************/
function GetUniqueFileName(strDirectory, strFileName)
{
    try
    {
        oFSO = new ActiveXObject("Scripting.FileSystemObject");
        if (!strFileName)
            return oFSO.GetTempName();

        if (strDirectory.length && strDirectory.charAt(strDirectory.length-1) != "\\")
            strDirectory += "\\";

        var strFullPath = strDirectory + strFileName;
        var strName = strFileName.substring(0, strFileName.lastIndexOf("."));
        var strExt = strFileName.substr(strFileName.lastIndexOf("."));

        var nCntr = 0;
        while (oFSO.FileExists(strFullPath))
        {
            nCntr++;
            strFullPath = strDirectory + strName + nCntr + strExt;
        }
        if (nCntr)
            return strName + nCntr + strExt;
        else
            return strFileName;
    }
    catch(e)
    {   
        throw e;
    }
}


/******************************************************************************
 Description: Deletes the file given
        oFSO: File System Object
     strFile: Name of the file to be deleted
******************************************************************************/
function DeleteFile(oFSO, strFile)
{
    try
    {
        if (oFSO.FileExists(strFile))
        {
            var oFile = oFSO.GetFile(strFile);
            oFile.Delete();
        }
    }
    catch(e)
    {   
        throw e;
    }
}

/******************************************************************************
Description: Returns the highest dispid from members of the given interface & 
             all its bases
  oInterface: Interface object
******************************************************************************/
function GetMaxID(oInterface)
{
    var currentMax = 0;
    try
    {
        var funcs = oInterface.Functions;
        if(funcs!=null)
        {
            var nTotal = funcs.Count;
            var nCntr;
            for (nCntr = 1; nCntr <= nTotal; nCntr++)
            {
                var id = funcs(nCntr).Attributes("id");
                if(id!=null)
                {
                    var idval = parseInt(id.Value);
                    if(idval>currentMax)
                        currentMax = idval;
                }
            }
        }
//REMOVE remove this and use Children collection above, if it's implemented
        funcs = oInterface.Variables;
        if(funcs!=null)
        {
            var nTotal = funcs.Count;
            var nCntr;
            for (nCntr = 1; nCntr <= nTotal; nCntr++)
            {
                var id = funcs(nCntr).Attributes("id");
                if(id!=null)
                {
                    var idval = parseInt(id.Value);
                    if(idval>currentMax)
                        currentMax = idval;
                }
            }
        }
        var nextBases = oInterface.Bases;
        var nTotal = nextBases.Count;
        var nCntr;
        for (nCntr = 1; nCntr <= nTotal; nCntr++)
        {
            var nextObject = nextBases(nCntr).Class;
            if(nextObject!=null && nextObject.Name != "IDispatch")
            {
                var idval = GetMaxID(nextObject);
                if(idval>currentMax)
                        currentMax = idval;
            }
        }
        return currentMax;
    }
    catch(e)
    {   
        throw e;
    }
}


/******************************************************************************
 Description: Generates a C++ friendly name
     strName: The old, unfriendly name
******************************************************************************/
function CreateSafeName(strName)
{
    try
    {
        var nLen = strName.length;
        var strSafeName = "";
        
        for (nCntr = 0; nCntr < nLen; nCntr++)
        {
            var cChar = strName.charAt(nCntr);
            if ((cChar >= 'A' && cChar <= 'Z') || (cChar >= 'a' && cChar <= 'z') || 
                    (cChar == '_') || (cChar >= '0' && cChar <= '9'))
            {
                // valid character, so add it
                strSafeName += cChar;
            }
            // otherwize, we skip it
        }
        if (strSafeName=="")
        {
            // if it's empty, we add My
            strSafeName = "My";
        }
        else if (strSafeName.charAt(0) >= '0' && strSafeName.charAt(0) <= '9')
        {
            // if it starts with a digit, we prepend My
            strSafeName = "My" + strSafeName;
        }
        return strSafeName;
    }
    catch(e)
    {   
        throw e;
    }
}


/******************************************************************************
 Description: Called from the wizards html script when 'Finish' is clicked. This
              function in turn calls the wizard control's Finish().
    document: HTML document object
******************************************************************************/
function OnWizFinish(document)
{
    document.body.style.cursor='wait';
    try
    {
        window.external.Finish(document, "ok"); 
    }
    catch(e)
    {
        document.body.style.cursor='default';
        if (e.description.length != 0)
            SetErrorInfo(e.description, e.number);
        return e.number;
    }
}

/******************************************************************************
 Description: Returns a Function object based on the given name
      oClass: Class object
 strFuncName: Name of the function
       oProj: Selected project
******************************************************************************/
function GetMemberFunction(oClass, strFuncName, oProj)
{
    try
    {
        var oFunctions;
        if (oClass)
            oFunctions = oClass.Functions;
        else
        {
            if (!oProj)
                return false;
            oFunctions = oProj.CodeModel.Functions;
        }

        for (var nCntr = 1; nCntr <= oFunctions.Count; nCntr++)
        {
            if (oFunctions(nCntr).Name == strFuncName)
                return oFunctions(nCntr);
        }
        return false;
    }
    catch(e)
    {   
        throw e;
    }
}


/*****************************************************************************
  The following section contains functions that are used by CSharp Projects
  and CSharp Additems. If you like to add a new function that is CSharp
  specific, please add it beyond this point of this file.

                            - CSHARP SECTION -
******************************************************************************/

/******************************************************************************
     Description: Creates a C# project
  strProjectName: Project Name
  strProjectPath: The path that the project will be created in
 strTemplateFile: Project template file e.g. "defualt.csproj"
******************************************************************************/
function CreateCSharpProject(strProjectName, strProjectPath, strTemplateFile)
{
    try
    {
        // Make sure user sees ui.
        dte.SuppressUI = false;
        var strProjTemplatePath = wizard.FindSymbol("PROJECT_TEMPLATE_PATH") + "\\";
        var strProjTemplate = strProjTemplatePath + strTemplateFile; 
        var Solution = dte.Solution;
        var strSolutionName = "";
        if (wizard.FindSymbol("CLOSE_SOLUTION"))
        {
            Solution.Close();
            strSolutionName = wizard.FindSymbol("VS_SOLUTION_NAME");
            if (strSolutionName.length)
            {

                var strSolutionPath = strProjectPath.substr(0, strProjectPath.length - strProjectName.length);
                Solution.Create(strSolutionPath, strSolutionName);
            }
        }

        strProjectNameWithExt = strProjectName + ".csproj";

        var oTarget = wizard.FindSymbol("TARGET");
        var oPrj;
        if (wizard.FindSymbol("WIZARD_TYPE") == vsWizardAddSubProject)  // vsWizardAddSubProject
        {
            var nPos = strProjectPath.search("http://");
            var prjItem
            if(nPos == 0)
                prjItem = oTarget.AddFromTemplate(strProjTemplate, strProjectPath + "/" + strProjectNameWithExt);    
            else
                prjItem = oTarget.AddFromTemplate(strProjTemplate, strProjectPath + "\\" + strProjectNameWithExt);
            oPrj = prjItem.SubProject;
        }
        else
        {
            oPrj = oTarget.AddFromTemplate(strProjTemplate, strProjectPath, strProjectNameWithExt);
        }
        var strNameSpace = "";
        strNameSpace = oPrj.Properties("RootNamespace").Value;
        wizard.AddSymbol("SAFE_NAMESPACE_NAME",  strNameSpace);

        return oPrj;
    }
    catch(e)
    {
        // propagate all errors back to the caller
        throw e;
    }
}

/******************************************************************************
     Description: 
           oProj: Project object
******************************************************************************/
function GetUIReferencesNode(oProj)
{
    var L_strReferencesNode_Text = "References"; // This string needs to be localized
    try
    {
        var UIItemX = GetUIItem(oProj, L_strReferencesNode_Text);
        return UIItemX.UIHierarchyItems;
    }
    catch(e)
    {
    }
}

/******************************************************************************
     Description: Returns the parent of the input hierarchy item. The parent 
                  may be a folder, or a superproject or the solution.
           oProj: Project object
******************************************************************************/
function getParent(obj)
{
    var parent = obj.Collection.parent;
    //
    // is obj a project ?
    //
    if( parent == dte )
    {
        //
        // is obj a sub-project ?
        //
        if( obj.ParentProjectItem )
        {                
            parent = obj.ParentProjectItem.Collection.parent;
        }
        else
        {
            //
            // obj is a top-level project
            //
            parent = null;
        }
    }
    return parent;    
}

/******************************************************************************
 Description: Gets the UIHierarchyItem for the projectitem, sName. If 
              sName is empty, returns the UIHierarchyItem for the project.
       oProj: Project object
       sName: Project item name
******************************************************************************/
function GetUIItem( oProj, sName )
{
    // this functionality will not work properly for projects nested under
    // solution folders until automation support can be added in M2.

    if( sName != "" )
    {
        sSaveName = sName;
        sName = oProj.Name + "\\" + sSaveName;
    }
    else
    {
        sName = oProj.Name;
    }

    var parent = getParent( oProj );

    while( parent != null )
    {
        sSaveName = sName;
        sName = parent.Name + "\\" + sSaveName;
        parent = getParent( parent );

    }

    //
    // we have arrived at the top of the soltuion explorer hierarchy - return the sName index into the solution's UIHierarchyItem collection
    //
    var strSolutionName = dte.Solution.Properties("Name");
    var vsHierObject = dte.Windows.Item(vsWindowKindSolutionExplorer).Object;   
    return vsHierObject.GetItem( strSolutionName + "\\" + sName );
}

/******************************************************************************
 description: returns true if this path is a root web project
        strProjectPath: path to the web proj
******************************************************************************/
function ProjectIsARootWeb(strProjectPath)
{
    // Returns true if strProjectPath is a root web. Is does this by counting
    // the forward slashes. Web roots are of the form: http://server. Assuming
    // no trailing slash, a web root will have 2 forward slashes, non webroots will
    // have 3 or more slashes. 
    var nCntr = 0;
    var cSlashes = 0;
    var nLen = strProjectPath.length - 1;   // Ignore last character
    for (nCntr = 0; nCntr < nLen; nCntr++)
    {
        // Count the forward slashes
        if(strProjectPath.charAt(nCntr) == "/")
            cSlashes++;
    }
    
    if(cSlashes == 2)
        return true;
    return false;
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function IsReferencesNodeExpanded(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    try
    {
        if (UIItem.Expanded == true)
            return true;
    }
    catch(e)
    {
    }
    
    return false;
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function CollapseReferencesNode(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    try
    {
        UIItem.Expanded = false;
    }
    catch(e)
    {
    }
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function GetCSharpReferenceManager(oProj)
{
    var VSProject = oProj.Object;
    var refmanager = VSProject.References;
    return refmanager;
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForClass(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForComponent(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForInstaller(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Management");
    refmanager.Add("System.Configuration.Install");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForControl(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.Drawing");
    refmanager.Add("System.Windows.Forms");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWinForm(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.Drawing");
    refmanager.Add("System.Windows.Forms");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWinService(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.ServiceProcess");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWebService(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.Web");
    refmanager.Add("System.Web.Services");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWebForm(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Drawing");
    refmanager.Add("System.Data");
    refmanager.Add("System.Web");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWebControl(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Drawing");
    refmanager.Add("System.Web");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
    itemName:
******************************************************************************/
function SetStartupPage(oProj, itemName)
{
    var configs = new Enumerator(oProj.ConfigurationManager);
    for(;!configs.atEnd();configs.moveNext())
    {
        configs.item().Properties("StartPage").Value = itemName;
    }
}

/******************************************************************************
    Description: Adds all the files to the project based on the Templates.inf file.
          oProj: Project object
 strProjectName: Project name
 strProjectPath: Project path
        InfFile: Templates.inf file object
    AddItemFile: Wether the wizard is invoked from the Add Item Dialog or not
******************************************************************************/
function AddFilesToCSharpProject(oProj, strProjectName, strProjectPath, InfFile, AddItemFile)
{
    try
    {
        dte.SuppressUI = false;
        var projItems;
        if(AddItemFile)
            projItems = oProj;
        else
            projItems = oProj.ProjectItems;

        var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");

        var strTpl = "";
        var strName = "";
        var strDependent = "";

        // if( Not a web project )
        if(strProjectPath.charAt(strProjectPath.length - 1) != "\\")
            strProjectPath += "\\"; 

        var strTextStream = InfFile.OpenAsTextStream(1, -2);
        
        while (!strTextStream.AtEndOfStream)
        {
            // Look to see if there is a dependency on another object.  The inf
            // file will show as:
            //
            // MasterObjectFileName;DependentObjectFileName
            strTpl = strTextStream.ReadLine();
            if (strTpl != "")
            {
                var sc = strTpl.indexOf(";");
                if (sc >= 0) 
                {
                    strName = strTpl.substr(0,sc);
                    if(sc < strTpl.length)
                    {
                        strDependent = strTpl.substr(sc+1);
                    }
                    else 
                    {
                        strDependent = "";
                    }
                }
                else
                {
                    strName = strTpl;
                    strDependent = "";
                }

                var strTarget = "";
                var strFile = "";
                strTarget = GetCSharpTargetName(strName, strProjectName);

                var fso;
                fso = new ActiveXObject("Scripting.FileSystemObject");
                var TemporaryFolder = 2;
                var tfolder = fso.GetSpecialFolder(TemporaryFolder);
                var strTempFolder = fso.GetAbsolutePathName(tfolder.Path);

                var strFile = strTempFolder + "\\" + fso.GetTempName();

                var strClassName = strTarget.split(".");
                wizard.AddSymbol("SAFE_CLASS_NAME", strClassName[0]);
                    wizard.AddSymbol("SAFE_ITEM_NAME", strClassName[0]);

                var strTemplate = strTemplatePath + "\\" + strName;
                var bCopyOnly = false;
                var strExt = strName.substr(strName.lastIndexOf("."));
                if(strExt==".bmp" || strExt==".ico" || strExt==".gif" || strExt==".rtf" || strExt==".css")
                    bCopyOnly = true;
                wizard.RenderTemplate(strTemplate, strFile, bCopyOnly, true);

                var projfile = projItems.AddFromTemplate(strFile, strTarget);
                SafeDeleteFile(fso, strFile);
                
                if(projfile)
                {
                    SetFileProperties(projfile, strName);
                    if (strDependent != "") 
                    {
                        // There is a dependent file.  Add this to the projfile we just added
                        var strDependentTarget = GetCSharpTargetName(strDependent, strProjectName);
                        
                        strTemplate = strTemplatePath + "\\" + strDependent;
                        strFile = strTempFolder + "\\" + fso.GetTempName();
                        strExt = strDependent.substr(strDependent.lastIndexOf("."));
                        if(strExt==".bmp" || strExt==".ico" || strExt==".gif" || strExt==".rtf" || strExt==".css")
                            bCopyOnly = true;
                        else
                            bCopyOnly = false;
                        wizard.RenderTemplate(strTemplate, strFile, bCopyOnly, true);
                        
                        var dependentItem = projfile.ProjectItems.AddFromTemplate(strFile, strDependentTarget);
                        SafeDeleteFile(fso, strFile);
                    }
                }

                var bOpen = false;
                if(AddItemFile)
                    bOpen = true;
                else if (DoOpenFile(strTarget))
                    bOpen = true;

                if(bOpen)
                {
                    var window = projfile.Open(vsViewKindPrimary);
                    window.visible = true;
                }
            }
        }
        strTextStream.Close();
    }
    catch(e)
    {
        strTextStream.Close();
        throw e;
    }
}

/******************************************************************************
    Description: Adds a designer file to the project.
          oProj: Project object
 strProjectName: Project name
 strProjectPath: Project path
strDesignerFile: Designer file name
    AddItemFile: Wether the wizard is invoked from the Add Item Dialog or not
******************************************************************************/
function AddDesignerFileToCSharpWebProject(oProj, strProjectName, strProjectPath, strDesignerFile, AddItemFile)
{
    dte.SuppressUI = false;
    var projItems;
    if(AddItemFile)
        projItems = oProj;
    else
        projItems = oProj.ProjectItems;

    var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");

    var strTpl = "";
    var strName = "";

    if (strDesignerFile != "")
    {
        strName = strDesignerFile;
        var strTarget;
        if(!AddItemFile)
        {
            strTarget = GetCSharpTargetName(strName, strProjectName);
        }
        else
        {
            strTarget = wizard.FindSymbol("ITEM_NAME");
        }
        var strClassName = strTarget.split(".");
        wizard.AddSymbol("SAFE_CLASS_NAME", strClassName[0]);
        wizard.AddSymbol("SAFE_ITEM_NAME", strClassName[0]);

        var strTemplate = strTemplatePath + "\\" + strDesignerFile;
        var projfile = projItems.AddFromTemplate(strTemplate, strTarget);
        if(projfile)
            SetFileProperties(projfile, strName);

        var bOpen = false;
        if(AddItemFile)
            bOpen = true;
        else if (DoOpenFile(strTarget))
            bOpen = true;

        if(bOpen)
        {
            var window = projfile.Open(vsViewKindPrimary);
            if(window)
                window.visible = true;
        }
    }
}

/******************************************************************************
 Description: Validate the value of the wizard combo control as a CSharp type.
     oObject: The wizard editable combo control
******************************************************************************/
function ValidateWizComboCSharpType(oObject, strName)
{
    var bValid;
    if(typeof(strName) == "undefined")
        strName = oObject.id;
    if (oObject.ListIndex > -1)
    {
        bValid = true;
    }
    else if(""==oObject.value)
    {
        L_ValidateCSharpTypeEEmpty_Text = " cannot be empty.";
        window.external.ReportError(strName + L_ValidateCSharpTypeEEmpty_Text);
        bValid = false;
    }
    else if ( !window.external.ValidateCLRIdentifier(oObject.value) )
    {
        L_ValidateCSharpType_E_INVALID_TEXT = "Invalid ";
        L_PERIOD_TEXT = ".";
        window.external.ReportError(L_ValidateCSharpType_E_INVALID_TEXT + strName + L_PERIOD_TEXT); 
        bValid = false;
    }
    else
        bValid = true;
    return bValid;
}

/******************************************************************************
 Description: Validate the value of the control as a valid CSharp name.
     oObject: The reference to control
     strName: Control name used by message
******************************************************************************/
function ValidateCSharpName(oObject, strName)
{
    var bValid;
    if(typeof(strName) == "undefined")
        strName = oObject.id;

    if(""==oObject.value)
    {
        L_ValidateCSharpNameEEmpty_Text = " cannot be empty.";
        window.external.ReportError(strName + L_ValidateCSharpNameEEmpty_Text);
        bValid = false;
    }
    else if ( !window.external.ValidateCLRIdentifier(oObject.value) )
    {
        L_ValidateCSharpName_E_INVALID_TEXT = "Invalid ";
        L_PERIOD_TEXT = ".";
        window.external.ReportError(L_ValidateCSharpName_E_INVALID_TEXT + strName + L_PERIOD_TEXT); 
        bValid = false;
    }
    else
        bValid = true;
    return bValid;
}

/******************************************************************************
 Description: Gets the current selected project items from the selection 
                 object if it was passed from Solution Explorer.
     oObject: The wizard context object
******************************************************************************/
function SetTargetFullPath(oObject)
{
    var parent = oObject.Parent;
    var kind = parent.Kind;
    var strFilePath = "";
    var strNameSpace = "";
    if(kind == GUID_ItemType_PhysicalFolder || kind == GUID_ItemType_VirtualFolder)
    {
        strFilePath = parent.FileNames(1);
        strNameSpace = parent.Properties("DefaultNamespace").Value;
    }
    else
    {
        strFilePath =   wizard.FindSymbol("PROJECT_PATH");
        strNameSpace = parent.Properties("RootNamespace").Value;
    }
    wizard.AddSymbol("SAFE_NAMESPACE_NAME",  strNameSpace);
    wizard.AddSymbol("TARGET_FULLPATH",  strFilePath);
}

/******************************************************************************
 Description: Strip spaces from a string
       strin: The string (is in/out param)
******************************************************************************/
function TrimStr(str)
{
    var nLength = str.length;
    var nStartIndex = 0;
    var nEndIndex = nLength-1;

    while (nStartIndex < nLength && (str.charAt(nStartIndex) == ' ' || str.charAt(nStartIndex) == '\t'))
        nStartIndex++;
        
    while (nEndIndex > nStartIndex && (str.charAt(nEndIndex) == ' ' || str.charAt(nEndIndex) == '\t'))
        nEndIndex--;
    
    return str.substring(nStartIndex, nEndIndex+1);
}

/******************************************************************************
 Description: Open the file that contains the TextPoint, then move the cursor to the 
              TextPoint.
         oTP: The reference to TextPoint
******************************************************************************/
function ShowTextPoint(oTP)
{
    try
    {
        oTP.Parent.Parent.ProjectItem.Open(vsViewKindCode).Visible = true;
        var oSel = oTP.Parent.Selection;
        oSel.MoveToPoint(oTP);
        oSel.ActivePoint.TryToShow(vsPaneShowHow.vsPaneShowAsIs);
    }
    catch(e)
    {
        throw(e);
    }
}

/******************************************************************************
 Description: Add the default target schema. 
         
******************************************************************************/
function AddDefaultTargetSchemaToWizard(selProj)
{
    var prjTargetSchema = selProj.Properties("DefaultTargetSchema").Value;
    // 0 = IE3/Nav4
    // 1 = IE5
    // 2 = Nav4
    if(prjTargetSchema == 0)
    {
        wizard.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/ie3-2nav3-0");
    }
    else if( prjTargetSchema == 2)
    {
        wizard.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/nav4-0");
    }
    else
    {
        wizard.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/ie5");
    }
}

/******************************************************************************
 Description: Delete file using file system object. 
******************************************************************************/
function SafeDeleteFile( fso, strFilespec )
{
    if (fso.FileExists(strFilespec))
    {
        var tmpFile = fso.GetFile(strFilespec);
        tmpFile.Delete();
    }
}

// SIG // Begin signature block
// SIG // MIInvQYJKoZIhvcNAQcCoIInrjCCJ6oCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 5GedxyAMQz9Di2ik+uGtEcZ0K8tTAxO0s9OPAPfS9iig
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghmfMIIZmwIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // TrU8esGEb+srAAAAAANOMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCAlmycjdzoUa5AG6+q188EJ2jUsbkbYydTI
// SIG // X0LHPzy9ADBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBADeGqvVA
// SIG // XkncJa54NgVXhjfUuGLLFDn1OvWJ5Reqzlg2IStbo5dO
// SIG // fwfDwmEiylE1gUUw/t5g5bZ6phN7zQo5tPg3byR5LxvM
// SIG // JZ/mb1m0JBRFsVFjmjviqbnVbDH63LJQnYGWIm3e+RcL
// SIG // SwqcMROHg7c0OxcBG5lZaNecxjEJKwTNtF3dEkTLzdM7
// SIG // EtDrn8nzZOlYYSZ6SyAQqFOXlcV8sEWPGt4c6vag8HkB
// SIG // fVyF1yscDKMtbRqY76OT567D2uGII9i836kFjARGQKsb
// SIG // rkNOIMltEcd/rdHg8Hx1OhjlA2L9RCHwXpLDHXaNsfh4
// SIG // zWuRpb8g0det2V3gpyEGUlwEv9ahghcpMIIXJQYKKwYB
// SIG // BAGCNwMDATGCFxUwghcRBgkqhkiG9w0BBwKgghcCMIIW
// SIG // /gIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBWQYLKoZIhvcN
// SIG // AQkQAQSgggFIBIIBRDCCAUACAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgjsNGbeDYt0x7iT/7q3UE
// SIG // bjV+z6Tr9upHNPTzuOaZJXoCBmULq3ofPRgTMjAyMzEw
// SIG // MDUxODAzMzUuNDMzWjAEgAIB9KCB2KSB1TCB0jELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEtMCsGA1UECxMkTWljcm9zb2Z0
// SIG // IElyZWxhbmQgT3BlcmF0aW9ucyBMaW1pdGVkMSYwJAYD
// SIG // VQQLEx1UaGFsZXMgVFNTIEVTTjpEMDgyLTRCRkQtRUVC
// SIG // QTElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaCCEXgwggcnMIIFD6ADAgECAhMzAAABuh8/
// SIG // GffBdb18AAEAAAG6MA0GCSqGSIb3DQEBCwUAMHwxCzAJ
// SIG // BgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
// SIG // DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
// SIG // ZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29m
// SIG // dCBUaW1lLVN0YW1wIFBDQSAyMDEwMB4XDTIyMDkyMDIw
// SIG // MjIxOVoXDTIzMTIxNDIwMjIxOVowgdIxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVs
// SIG // YW5kIE9wZXJhdGlvbnMgTGltaXRlZDEmMCQGA1UECxMd
// SIG // VGhhbGVzIFRTUyBFU046RDA4Mi00QkZELUVFQkExJTAj
// SIG // BgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZp
// SIG // Y2UwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoIC
// SIG // AQCIThWDM5I1gBPVFZ1xfYURr9MQUcXPiOR7t4cVRV8i
// SIG // t7t/MbrBG9KS5MI4BrQ7Giy265TMal97RW/9wYBDxAty
// SIG // 9MF++oA/Mx7fsIgVeZquQVqKdvaka4DCSigj3KUJ0o7P
// SIG // Qf+FzBRb66XT4nGQ7+NxS4M/Xx6jKtCyQ8OSQBxg0t9E
// SIG // wmPTheNz+HeOGfZROwmlUtqSTBdy+OdzFwecmCvyg24p
// SIG // YRET9Y8Z9spfrRgkYLiALDBtKHjoV2sPLkhjoUugAkh2
// SIG // /nm4tNN/DBR8qEzYSn/kmKODqUmN8T+PrMAQUyg6GD9c
// SIG // B/gn8RuofX8pgSUD0GWqn5dK4ogy45g7p0LR9Rg+uAIq
// SIG // +ZPSXcIaucC5kll48hVS/iA3zqXYsSen+aPjIROh+Ld9
// SIG // cPqa8oB5ndlB0Oue1BsehTbs8AvkqQB5le+jGWGnOLgI
// SIG // U4Gj+Oz9nnktaHJL8oZfcmvvScz3zJLoN8Xr8xQA1oi0
// SIG // TK9OuhDFe6tyUkQLJwkvRkNPAuBSj20ofDjzN9y54NH3
// SIG // 8QDZxwAF/wxO3B3Me5fY2ldwHJpI+6Koq+BIdruWMcIm
// SIG // kxN+12jLpl9hEtzyeTQWl6u2HSycMkg/lPaZP7ZeHUNb
// SIG // fxHqO7g05YjskJA/CO+MaVQdE99f+uyh35AZBVb8usMn
// SIG // ttVfvSAvLkg/vkYA90cLTdpBPwIDAQABo4IBSTCCAUUw
// SIG // HQYDVR0OBBYEFIpi5vEDHiWtuY/TFnmmyNh0r2TlMB8G
// SIG // A1UdIwQYMBaAFJ+nFV0AXmJdg/Tl0mWnG1M1GelyMF8G
// SIG // A1UdHwRYMFYwVKBSoFCGTmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2lvcHMvY3JsL01pY3Jvc29mdCUyMFRp
// SIG // bWUtU3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNybDBsBggr
// SIG // BgEFBQcBAQRgMF4wXAYIKwYBBQUHMAKGUGh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // cm9zb2Z0JTIwVGltZS1TdGFtcCUyMFBDQSUyMDIwMTAo
// SIG // MSkuY3J0MAwGA1UdEwEB/wQCMAAwFgYDVR0lAQH/BAww
// SIG // CgYIKwYBBQUHAwgwDgYDVR0PAQH/BAQDAgeAMA0GCSqG
// SIG // SIb3DQEBCwUAA4ICAQBfyPFOoW2Ybw3J/ep2erZG0hI1
// SIG // z7ymesK6Gl3ILLRIaYGnhMJXi7j1xy8xFrbibmM+HrIZ
// SIG // oV6ha+PZWwHF+Ujef3BLD9MXRWsm+1OT/eCWXdx4xb6V
// SIG // kTaDQYRd0gzNAN/LCNh/oY4Qf1X19V3GYnotUTjwMgh3
// SIG // AYBy8kKxLupp29x4WyHa/IdE2u1hcpRoS0hVusJsyrrD
// SIG // +mjpZpxkmnOTTH5WupUb02B3dvK22woH0ptUYU4KGY/l
// SIG // vA0yrYhDMLmxyd5iDypqPMbSSFlz516ulyoJXay+XMpy
// SIG // zF/9Fl+uTrlmx1eRkxC3X1rxldw2maxz1EP1D99Snqm9
// SIG // sY1Qm99C1cIG4yL2Eu+zdXQEZDfBf/aSdYDuCL2VjMMj
// SIG // JSihRqIztX9cG40lnAP+e7bHPrdm5azFoEjR4Mw69NY2
// SIG // z0rqUY8tx7fWWbOMTdNnol93htveza7QupeHP4M59tHq
// SIG // qKlsf7h1sZk4AdBeaLAbkxznu+w8hANLoQKxpYCj/dY4
// SIG // IYLfzlR6B+uYNEKgrYGft+ppwhIOiDoRaBawnNHyRRlZ
// SIG // m9fte4BHvh0TDO4wZODtOifiKKBayN3tzyYz60Gp6PzM
// SIG // hN4fswLgVhjA0XFJTSgg1O3Rp1rx911sC6wgiHM/txsE
// SIG // VDLC7A3T1tjlb+79XhCYjEiGdj/jOy9tEPGs51ODgDCC
// SIG // B3EwggVZoAMCAQICEzMAAAAVxedrngKbSZkAAAAAABUw
// SIG // DQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290IENlcnRp
// SIG // ZmljYXRlIEF1dGhvcml0eSAyMDEwMB4XDTIxMDkzMDE4
// SIG // MjIyNVoXDTMwMDkzMDE4MzIyNVowfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwggIiMA0GCSqGSIb3DQEBAQUA
// SIG // A4ICDwAwggIKAoICAQDk4aZM57RyIQt5osvXJHm9DtWC
// SIG // 0/3unAcH0qlsTnXIyjVX9gF/bErg4r25PhdgM/9cT8dm
// SIG // 95VTcVrifkpa/rg2Z4VGIwy1jRPPdzLAEBjoYH1qUoNE
// SIG // t6aORmsHFPPFdvWGUNzBRMhxXFExN6AKOG6N7dcP2CZT
// SIG // fDlhAnrEqv1yaa8dq6z2Nr41JmTamDu6GnszrYBbfowQ
// SIG // HJ1S/rboYiXcag/PXfT+jlPP1uyFVk3v3byNpOORj7I5
// SIG // LFGc6XBpDco2LXCOMcg1KL3jtIckw+DJj361VI/c+gVV
// SIG // mG1oO5pGve2krnopN6zL64NF50ZuyjLVwIYwXE8s4mKy
// SIG // zbnijYjklqwBSru+cakXW2dg3viSkR4dPf0gz3N9QZpG
// SIG // dc3EXzTdEonW/aUgfX782Z5F37ZyL9t9X4C626p+Nuw2
// SIG // TPYrbqgSUei/BQOj0XOmTTd0lBw0gg/wEPK3Rxjtp+iZ
// SIG // fD9M269ewvPV2HM9Q07BMzlMjgK8QmguEOqEUUbi0b1q
// SIG // GFphAXPKZ6Je1yh2AuIzGHLXpyDwwvoSCtdjbwzJNmSL
// SIG // W6CmgyFdXzB0kZSU2LlQ+QuJYfM2BjUYhEfb3BvR/bLU
// SIG // HMVr9lxSUV0S2yW6r1AFemzFER1y7435UsSFF5PAPBXb
// SIG // GjfHCBUYP3irRbb1Hode2o+eFnJpxq57t7c+auIurQID
// SIG // AQABo4IB3TCCAdkwEgYJKwYBBAGCNxUBBAUCAwEAATAj
// SIG // BgkrBgEEAYI3FQIEFgQUKqdS/mTEmr6CkTxGNSnPEP8v
// SIG // BO4wHQYDVR0OBBYEFJ+nFV0AXmJdg/Tl0mWnG1M1Gely
// SIG // MFwGA1UdIARVMFMwUQYMKwYBBAGCN0yDfQEBMEEwPwYI
// SIG // KwYBBQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNv
// SIG // bS9wa2lvcHMvRG9jcy9SZXBvc2l0b3J5Lmh0bTATBgNV
// SIG // HSUEDDAKBggrBgEFBQcDCDAZBgkrBgEEAYI3FAIEDB4K
// SIG // AFMAdQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/
// SIG // BAUwAwEB/zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo0T2U
// SIG // kFvXzpoYxDBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcmwwWgYI
// SIG // KwYBBQUHAQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8v
// SIG // d3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY1Jv
// SIG // b0NlckF1dF8yMDEwLTA2LTIzLmNydDANBgkqhkiG9w0B
// SIG // AQsFAAOCAgEAnVV9/Cqt4SwfZwExJFvhnnJL/Klv6lwU
// SIG // tj5OR2R4sQaTlz0xM7U518JxNj/aZGx80HU5bbsPMeTC
// SIG // j/ts0aGUGCLu6WZnOlNN3Zi6th542DYunKmCVgADsAW+
// SIG // iehp4LoJ7nvfam++Kctu2D9IdQHZGN5tggz1bSNU5HhT
// SIG // dSRXud2f8449xvNo32X2pFaq95W2KFUn0CS9QKC/GbYS
// SIG // EhFdPSfgQJY4rPf5KYnDvBewVIVCs/wMnosZiefwC2qB
// SIG // woEZQhlSdYo2wh3DYXMuLGt7bj8sCXgU6ZGyqVvfSaN0
// SIG // DLzskYDSPeZKPmY7T7uG+jIa2Zb0j/aRAfbOxnT99kxy
// SIG // bxCrdTDFNLB62FD+CljdQDzHVG2dY3RILLFORy3BFARx
// SIG // v2T5JL5zbcqOCb2zAVdJVGTZc9d/HltEAY5aGZFrDZ+k
// SIG // KNxnGSgkujhLmm77IVRrakURR6nxt67I6IleT53S0Ex2
// SIG // tVdUCbFpAUR+fKFhbHP+CrvsQWY9af3LwUFJfn6Tvsv4
// SIG // O+S3Fb+0zj6lMVGEvL8CwYKiexcdFYmNcP7ntdAoGokL
// SIG // jzbaukz5m/8K6TT4JDVnK+ANuOaMmdbhIurwJ0I9JZTm
// SIG // dHRbatGePu1+oDEzfbzL6Xu/OHBE0ZDxyKs6ijoIYn/Z
// SIG // cGNTTY3ugm2lBRDBcQZqELQdVTNYs6FwZvKhggLUMIIC
// SIG // PQIBATCCAQChgdikgdUwgdIxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVsYW5kIE9w
// SIG // ZXJhdGlvbnMgTGltaXRlZDEmMCQGA1UECxMdVGhhbGVz
// SIG // IFRTUyBFU046RDA4Mi00QkZELUVFQkExJTAjBgNVBAMT
// SIG // HE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2WiIwoB
// SIG // ATAHBgUrDgMCGgMVAHajR3tdd4AifO2mSBmuUAVKiMLy
// SIG // oIGDMIGApH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQG
// SIG // A1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
// SIG // MTAwDQYJKoZIhvcNAQEFBQACBQDoyUXrMCIYDzIwMjMx
// SIG // MDA1MjIyNTQ3WhgPMjAyMzEwMDYyMjI1NDdaMHQwOgYK
// SIG // KwYBBAGEWQoEATEsMCowCgIFAOjJResCAQAwBwIBAAIC
// SIG // ApIwBwIBAAICEdcwCgIFAOjKl2sCAQAwNgYKKwYBBAGE
// SIG // WQoEAjEoMCYwDAYKKwYBBAGEWQoDAqAKMAgCAQACAweh
// SIG // IKEKMAgCAQACAwGGoDANBgkqhkiG9w0BAQUFAAOBgQBB
// SIG // 07igdavzdMHotm12IKzi9UJUNPKyQkYTgZkNUH8vlwdU
// SIG // /n6nDka3HDWAjSed7MHvAJ88ccl6jWQak1HXozAuPpzb
// SIG // ioBpkqkFOx0Hxnv4O6xiaPaCZGdKyvNYg1z/D7OVzGOA
// SIG // RUIQ7x+pF4yDtIeD8N2fhMpcHzvhrCqssUN1CjGCBA0w
// SIG // ggQJAgEBMIGTMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAk
// SIG // BgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAy
// SIG // MDEwAhMzAAABuh8/GffBdb18AAEAAAG6MA0GCWCGSAFl
// SIG // AwQCAQUAoIIBSjAaBgkqhkiG9w0BCQMxDQYLKoZIhvcN
// SIG // AQkQAQQwLwYJKoZIhvcNAQkEMSIEIIM95gnb0BUtonuL
// SIG // F4rAt5zoWVDIZ+s1GQ5VZyK4IS39MIH6BgsqhkiG9w0B
// SIG // CRACLzGB6jCB5zCB5DCBvQQgKVW9PDNucPrWBlrJpRra
// SIG // dYMtZz3Kln6oDBd55VmFcwUwgZgwgYCkfjB8MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBQQ0EgMjAxMAITMwAAAbofPxn3wXW9
// SIG // fAABAAABujAiBCD6hrynecQbS4V/2C0qyxSfmL12hPU4
// SIG // ssgtni+RsmwlBzANBgkqhkiG9w0BAQsFAASCAgA3i1bE
// SIG // 5WcCDkfHJOZwOE1hJZ8VtNMkIgS163r7nWtVvJUPT2T4
// SIG // 0Gmpf7NYtPKvsYOZXonyjpDfQBlyD0Mt0zavYisMLx17
// SIG // bd3Gim7bHTsiv4F2SZxQcADaby1ZVvY7Nln+Yk6dURRs
// SIG // tcpsCPoTEX3LpnZcLSfRPBQWCS3uIhxO41qAt33bpa+u
// SIG // qL90dRqI/RGafU8GJS1gcFYDOQ+oMvCP4hKrHUTgiPXM
// SIG // Cbx6jqdq3zhhnopunjhjOe8kayOs4zvKdxJJx3HEqfW8
// SIG // tHcArfBGzfQKzZaEbtlGfCl8GTD9eWKPOooBNw1Bcun2
// SIG // VFRfslEVHLopbl73b5n2ucjTrcZZ+yVDFyRBifRP7uJm
// SIG // O6N9LjxkCvqa0Kf9MyaU4ox5k9qbx+oG+HksIC1zm/me
// SIG // Gxugu5+xqxmJTY22Ti3JDlnL1SE0+aPMLXSEVNSmfnRy
// SIG // n2YWKXAl4w3IV/3D2dvL+9RWWZ8aLLUkfQ6toE/9Bci6
// SIG // z8bCc0b9J50crsDGGvZAcUx9+q3920LKq61UfbG8prOh
// SIG // BNMb0vxo3gsWCdcC4MBkP3DeMGaHvL/oeSKi903Oyg+8
// SIG // tgXKmMwT3TGffHmbfF7X2dxGsFZw5ssA+JMecZ3UN/Zp
// SIG // OuCUMMJDN3+e6JB3OlO7LrtpRJyQedKDLmiSgIAgKQDP
// SIG // 0etBVNNDi/iH+eXejw==
// SIG // End signature block
