define("collectionViewModel",["diagnosticsHub","diagnosticsHub-swimlanes","diagnosticsHub-ui","knockout","plugin-vs-v2"],((e,t,i,o,r)=>{return s={3149:e=>{const t=document.createElement("script");t.id="GcRowView",t.innerHTML=atob("PHRyIGNsYXNzPSJ0cmVlR3JpZFJvdyIgcm9sZT0icm93IiB0YWJpbmRleD0iLTEiIGRhdGEtYmluZD0iDQogICAgdHJlZUdyaWRSb3dGb2N1czogJHBhcmVudC5mb2N1c2VkUm93KCkgPT09ICRkYXRhLCANCiAgICBjc3M6IHsgc2VsZWN0ZWQ6IHNlbGVjdGVkKCkgfSwNCiAgICBhdHRyOiB7ICdhcmlhLWxldmVsJzogZGVwdGggKyAxIH0iPg0KICAgIDx0ZCByb2xlPSJncmlkY2VsbCIgZGF0YS1iaW5kPSJ0ZXh0OiBpZCIgZGF0YS1jb2x1bW5pZD0iaWQiPjwvdGQ+DQogICAgPHRkIHJvbGU9ImdyaWRjZWxsIiBkYXRhLWJpbmQ9InRleHQ6IGdlbmVyYXRpb24iIGRhdGEtY29sdW1uaWQ9ImdlbmVyYXRpb24iPjwvdGQ+DQogICAgPHRkIHJvbGU9ImdyaWRjZWxsIiBkYXRhLWJpbmQ9InRleHQ6IHR5cGUiIGRhdGEtY29sdW1uaWQ9InR5cGUiPjwvdGQ+DQogICAgPHRkIHJvbGU9ImdyaWRjZWxsIiBkYXRhLWJpbmQ9InRleHQ6IHJlYXNvbiIgZGF0YS1jb2x1bW5pZD0icmVhc29uIj48L3RkPg0KICAgIDx0ZCByb2xlPSJncmlkY2VsbCIgZGF0YS1iaW5kPSJsb2NhbGl6ZWROdW1iZXJVbml0U3Bhbjoge3ZhbHVlOiBkdXJhdGlvbiwgY29udmVydGVyOiBtc2VjfSIgZGF0YS1jb2x1bW5pZD0iZHVyYXRpb24iPjwvdGQ+DQogICAgPHRkIHJvbGU9ImdyaWRjZWxsIiBkYXRhLWJpbmQ9ImxvY2FsaXplZE51bWJlclVuaXRTcGFuOiB7dmFsdWU6IHN0YXJ0LCBjb252ZXJ0ZXI6IG5zZWN9IiBkYXRhLWNvbHVtbmlkPSJzdGFydCI+PC90ZD4NCiAgICA8dGQgcm9sZT0iZ3JpZGNlbGwiIGRhdGEtYmluZD0ibG9jYWxpemVkTnVtYmVyVW5pdFNwYW46IHt2YWx1ZTpzdG9wLCBjb252ZXJ0ZXI6IG5zZWN9IiBkYXRhLWNvbHVtbmlkPSJzdG9wIj48L3RkPg0KICAgIDx0ZCByb2xlPSJncmlkY2VsbCIgZGF0YS1iaW5kPSJ0ZXh0OiBwZXJjZW50SW5HYyIgZGF0YS1jb2x1bW5pZD0icGVyY2VudEluR2MiPjwvdGQ+DQogICAgPHRkIHJvbGU9ImdyaWRjZWxsIiBkYXRhLWJpbmQ9ImxvY2FsaXplZE51bWJlclVuaXRTcGFuOiB7dmFsdWU6IGdlbjAsIGNvbnZlcnRlcjogbWJDb252ZXJ0ZXJ9IiBkYXRhLWNvbHVtbmlkPSJnZW4wIj48L3RkPg0KICAgIDx0ZCByb2xlPSJncmlkY2VsbCIgZGF0YS1iaW5kPSJsb2NhbGl6ZWROdW1iZXJVbml0U3Bhbjoge3ZhbHVlOiBnZW4xLCBjb252ZXJ0ZXI6IG1iQ29udmVydGVyfSIgZGF0YS1jb2x1bW5pZD0iZ2VuMSI+PC90ZD4NCiAgICA8dGQgcm9sZT0iZ3JpZGNlbGwiIGRhdGEtYmluZD0ibG9jYWxpemVkTnVtYmVyVW5pdFNwYW46IHt2YWx1ZTogZ2VuMiwgY29udmVydGVyOiBtYkNvbnZlcnRlcn0iIGRhdGEtY29sdW1uaWQ9ImdlbjIiPjwvdGQ+DQogICAgPHRkIHJvbGU9ImdyaWRjZWxsIiBkYXRhLWJpbmQ9ImxvY2FsaXplZE51bWJlclVuaXRTcGFuOiB7dmFsdWU6IGdlbjMsIGNvbnZlcnRlcjogbWJDb252ZXJ0ZXJ9IiBkYXRhLWNvbHVtbmlkPSJnZW4zIj48L3RkPg0KICAgIDx0ZCByb2xlPSJncmlkY2VsbCIgZGF0YS1iaW5kPSJsb2NhbGl6ZWROdW1iZXJVbml0U3Bhbjoge3ZhbHVlOiBnZW41LCBjb252ZXJ0ZXI6IG1iQ29udmVydGVyfSIgZGF0YS1jb2x1bW5pZD0iZ2VuNSI+PC90ZD4NCiAgICA8dGQgcm9sZT0iZ3JpZGNlbGwiIGRhdGEtYmluZD0idGV4dDogZmluYWxpemFibGVTdXJ2TWIiIGRhdGEtY29sdW1uaWQ9ImZpbmFsaXphYmxlU3Vydk1iIj48L3RkPg0KICAgIDx0ZCByb2xlPSJncmlkY2VsbCIgZGF0YS1iaW5kPSJ0ZXh0OiBwaW5uZWRPYmpzIiBkYXRhLWNvbHVtbmlkPSJwaW5uZWRPYmpzIj48L3RkPg0KICAgIDx0ZCByb2xlPSJncmlkY2VsbCIgZGF0YS1iaW5kPSJ0ZXh0OiBjb2xsZWN0ZWQiIGRhdGEtY29sdW1uaWQ9ImNvbGxlY3RlZCI+PC90ZD4NCiAgICA8dGQgcm9sZT0iZ3JpZGNlbGwiIGRhdGEtYmluZD0idGV4dDogc3Vydml2ZWQiIGRhdGEtY29sdW1uaWQ9InN1cnZpdmVkIj48L3RkPg0KPC90cj4="),t.type="text/html",document.head.appendChild(t),e.exports={}},6680:e=>{const t=document.createElement("script");t.id="LoadingView",t.innerHTML=atob("PGRpdiBpZD0icHJvZ3Jlc3MtY29udHJvbCI+DQogICAgPHNwYW4gY2xhc3M9Im1lc3NhZ2UiIGRhdGEtYmluZD0ibG9jYWxpemVkVGV4dDogJ0xvYWRpbmdEYXRhTWVzc2FnZSciPjwvc3Bhbj4NCiAgICA8IS0tIGtvIHRlbXBsYXRlOiB7IG5hbWU6ICdJbmRldGVybWluYXRlUHJvZ3Jlc3MnIH0gLS0+PCEtLSAva28gLS0+DQo8L2Rpdj4="),t.type="text/html",document.head.appendChild(t),e.exports={}},833:e=>{const t=document.createElement("script");t.id="MessageView",t.innerHTML=atob("PHNwYW4gdGFiSW5kZXg9IjAiIGRhdGEtYmluZD0idGV4dDogJGRhdGEiPjwvc3Bhbj4="),t.type="text/html",document.head.appendChild(t),e.exports={}},4103:e=>{const t=document.createElement("script");t.id="IndeterminateProgress",t.innerHTML=atob("PGRpdiBjbGFzcz0ic3Bpbm5lciIgcm9sZT0icHJvZ3Jlc3NiYXIiIGFyaWEtdmFsdWVub3c9IjAiIGFyaWEtdmFsdWVtaW49IjAiIGFyaWEtdmFsdWVtYXg9IjEwMCIgYXJpYS1saXZlPSJhc3NlcnRpdmUiDQogICAgIGRhdGEtYmluZD0ibG9jYWxpemVkQXJpYUxhYmVsOidPdmVybGF5X1Byb2dyZXNzSW5kZXRlcm1pbmF0ZUFyaWFMYWJlbCciPg0KICAgIDxkaXYgY2xhc3M9ImJhcjEiPjwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImJhcjIiPjwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImJhcjMiPjwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImJhcjQiPjwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImJhcjUiPjwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImJhcjYiPjwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImJhcjciPjwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImJhcjgiPjwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImJhcjkiPjwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImJhcjEwIj48L2Rpdj4NCjwvZGl2Pg=="),t.type="text/html",document.head.appendChild(t),e.exports={}},7316:function(e,t,i){var o,r,s=this&&this.__createBinding||(Object.create?function(e,t,i,o){void 0===o&&(o=i),Object.defineProperty(e,o,{enumerable:!0,get:function(){return t[i]}})}:function(e,t,i,o){void 0===o&&(o=i),e[o]=t[i]}),n=this&&this.__exportStar||function(e,t){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(t,i)||s(t,e,i)};o=[i,t,i(3432),i(3028),i(9371),i(4881),i(4881),i(4881),i(4881),i(4881),i(2560),i(8117),i(8117),i(4881),i(952),i(3766),i(118),i(3536),i(7244),i(4881),i(6680),i(833),i(4103)],r=function(e,t,i,o,r,s,l,a,c,d,u,g,h,p,m,b,G,v,I,D){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getCollectionViewModel=t.CollectionViewModel=void 0,n(r,t);class C{constructor(){let e;this._currentOverlay=o.pureComputed((()=>this.computeOverlay())),this._viewEventManager=h.getViewEventManager(),g.loadDataWarehouse().then((t=>(e=t,e.getContextService().getGlobalContext()))).then((e=>e.getTimeDomain())).then((t=>{this._showOtherTypes=new D.ToggleButtonViewModel(void 0,void 0,"ShowOtherTypes","ShowOtherTypes"),this._gcDAO=new v.GcListDAO(e,t);const r=i.Resources.getString,n=[{id:"id",text:r("GcListHeaderGcNumber"),hideable:!1,sortable:s.SortDirection.Asc,tooltip:r("GcListHeaderGcNumberToolTip")},{id:"generation",text:r("GcListHeaderGeneration"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderGenerationToolTip")},{id:"type",text:r("GcListHeaderType"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderTypeToolTip")},{id:"reason",text:r("GcListHeaderReason"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderReasonToolTip")},{id:"duration",text:r("GcListHeaderDuration"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderDurationToolTip")},{id:"start",text:r("GcListHeaderStart"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderStartToolTip")},{id:"stop",text:r("GcListHeaderStop"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderStopToolTip")},{id:"percentInGc",text:r("GcListHeaderPercentInGc"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderPercentInGcToolTip")},{id:"gen0",text:r("GcListHeaderGen0"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderGen0ToolTip")},{id:"gen1",text:r("GcListHeaderGen1"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderGen1ToolTip")},{id:"gen2",text:r("GcListHeaderGen2"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderGen2ToolTip")},{id:"gen3",text:r("GcListHeaderGen3"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderGen3ToolTip")},{id:"gen5",text:r("GcListHeaderGen5"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderGen5ToolTip")},{id:"finalizableSurvMb",text:r("GcListHeaderFinalizableSurvMb"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderFinalizableSurvMbToolTip")},{id:"pinnedObjs",text:r("GcListHeaderPinnedObjs"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderPinnedObjsToolTip")},{id:"collected",text:r("GcListHeaderCollected"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderCollectedToolTip")},{id:"survived",text:r("GcListHeaderSurvived"),hideable:!0,sortable:s.SortDirection.Desc,tooltip:r("GcListHeaderSurvivedToolTip")}],c=new a.TreeGridHeaderViewModel(n,new G.DotNetObjectAllocColumnSettingsProvider("CollectionView"),this._gcDAO.defaultSortColumnId);this._gcList=new l.TreeGridViewModel(this._gcDAO,c,"GcListAriaLabel"),this._typesDAO=new I.TypesDAO(e),this._collectedTypesData=d.AsyncComputed((()=>{const e=this._gcList.focusedRow();return e?this._typesDAO.getTopCollectedTypes(e.id,5).then((e=>e.map((e=>({value:e.sb,label:e.n,invoke:()=>{this._viewEventManager.selectDetailsView(m.AllocationDetailsViewId()).then((()=>_.goToAllocation(e.id)))}}))))).then((t=>{const o=t.reduce(((e,t)=>e+t.value),0);return t.push({value:e.collected-o,label:i.Resources.getString("OtherTypes")}),t})):[]}),void 0,[]),this._collectedTypes=o.computed((()=>this._collectedTypesData()&&!this._showOtherTypes.isChecked()?this._collectedTypesData().slice(0,-1):this._collectedTypesData())),this._survivedTypesData=d.AsyncComputed((()=>{const e=this._gcList.focusedRow();return e?this._typesDAO.getTopSurvivedTypes(e.id,5).then((e=>e.map((e=>({value:e.sb,label:e.n,invoke:()=>{this._viewEventManager.selectDetailsView(m.AllocationDetailsViewId()).then((()=>_.goToAllocation(e.id)))}}))))).then((t=>{const o=t.reduce(((e,t)=>e+t.value),0);return t.push({value:e.survived-o,label:i.Resources.getString("OtherTypes")}),t})):[]}),void 0,[]),this._survivedTypes=o.computed((()=>this._survivedTypesData()&&!this._showOtherTypes.isChecked()?this._survivedTypesData().slice(0,-1):this._survivedTypesData())),this._gcList.onResultChanged(0),this._gcDAO.roots.subscribe((()=>this._gcList.onResultChanged(0))),this._viewEventManager.selectionChanged.addEventListener((e=>{e.isIntermittent||this._gcDAO.timeFilter(e.position)})),o.applyBindings(this),this._viewEventManager.detailsViewReady.raiseEvent({Id:m.CollectionDetailsViewId()})}))}get gcList(){return this._gcList}get collectedTypes(){return this._collectedTypes}get survivedTypes(){return this._survivedTypes}get showOtherTypes(){return this._showOtherTypes}get currentOverlay(){return this._currentOverlay}onKeyDown(e,t){if(!t.ctrlKey||t.keyCode!==u.KeyCodes.C)return!0;const i=c.TreeGridUtils.formatTreeGridSelectedToText(this._gcList);return navigator.clipboard.writeText(i),!1}computeOverlay(){return this._gcDAO.rootDataLoadStatus()===s.DataLoadEvent.DataLoadStart?{name:"LoadingView"}:this._gcDAO.rootDataLoadStatus()===s.DataLoadEvent.DataLoadCompleted&&0===this._gcList.treeAsArray().length?{name:"MessageView",data:i.Resources.getString("NoGcDataMessage")}:null}}let S;t.CollectionViewModel=C;const _=new b.DotNetObjectAllocMarshaler;_.getDoubleClickTimeMs().then((e=>{p.Init(e),S=new C})),t.getCollectionViewModel=function(){return S}}.apply(t,o),void 0===r||(e.exports=r)},118:(e,t,i)=>{var o,r;o=[i,t,i(3766)],r=function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DotNetObjectAllocColumnSettingsProvider=void 0,t.DotNetObjectAllocColumnSettingsProvider=class{constructor(e){this._marshaler=new i.DotNetObjectAllocMarshaler,this._templateName=e}getColumnSettings(){return this._marshaler.getColumnSettings(this._templateName)}onColumnChanged(e){this._marshaler.onColumnChanged(this._templateName,e)}}}.apply(t,o),void 0===r||(e.exports=r)},952:(e,t,i)=>{var o;o=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.InsightsViewId=t.ActiveCollectionViewId=t.FunctionListDetailsViewId=t.CallTreeDetailsViewId=t.DotNetAllocAnalyzerId=t.AllocationDetailsViewId=t.CollectionDetailsViewId=void 0,t.CollectionDetailsViewId=function(){return"2AB6F58C-F91F-4436-8D49-0C6E0F5E9657"},t.AllocationDetailsViewId=function(){return"A4C18565-9849-44E4-A6B0-9E9487D2024E"},t.DotNetAllocAnalyzerId=function(){return"DEF9F958-0E21-4364-8DD3-1CFB0C57FC7D"},t.CallTreeDetailsViewId=function(){return"A0A01775-6F3D-4B01-BFBE-FDD0F1F33EA4"},t.FunctionListDetailsViewId=function(){return"3ECF896D-96DC-4348-8A5C-6A853AA5C8CC"},t.ActiveCollectionViewId=function(){return"5979F2F4-B01D-4A63-AAE4-CE5C611EE4F8"},t.InsightsViewId=function(){return"5B496FFD-A4E8-48C1-BF62-F8435DFAD24C"}}.apply(t,[i,t]),void 0===o||(e.exports=o)},3536:(e,t,i)=>{var o,r;o=[i,t,i(3028),i(4881),i(4881),i(952),i(575),i(8558)],r=function(e,t,i,o,r,s,n,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GcListDAO=void 0;class a{constructor(e,t){this._rootDataLoadStatus=i.observable(o.DataLoadEvent.DataLoadCompleted),this._roots=i.observableArray([]),this._dataWarehouse=e,this._timeFilter=i.observable(t),this._timeFilter.equalityComparer=l.areTimespansEqual,this._timeFilter.subscribe((e=>{const t={timeDomain:this.timeFilter(),customDomain:{view:"GcSummary"}};this._rootDataLoadStatus(o.DataLoadEvent.DataLoadStart),this._dataWarehouse.getFilteredData(t,s.DotNetAllocAnalyzerId()).then((e=>(this._currentResult&&this._currentResult.dispose(),this._currentResult=e,this._currentResult?this._currentResult.getResult({type:"GetData"}):[]))).then((e=>{this._roots(e.map((e=>new n.GcRowViewModel(e)))),this._rootDataLoadStatus(o.DataLoadEvent.DataLoadCompleted)}))})),this._timeFilter.notifySubscribers(t)}get timeFilter(){return this._timeFilter}get roots(){return this._roots}get defaultSortColumnId(){return"id"}get rootDataLoadStatus(){return this._rootDataLoadStatus}getRoots(e,t,i){return this.sort(this._roots(),t,i)}expand(e,t,i){throw new Error("Method not implemented.")}search(e,t,i,o,r,s,n){throw new Error("Method not implemented.")}sort(e,t,i){const o=a.SortFunc[t.columnId](t.direction);return Promise.resolve(e.sort(o))}}t.GcListDAO=a,a.SortFunc={id:e=>r.SortFunctions.numericSort("id",e),start:e=>r.SortFunctions.numericSort("start",e),stop:e=>r.SortFunctions.numericSort("stop",e),duration:e=>r.SortFunctions.numericSort("duration",e),percentInGc:e=>r.SortFunctions.numericSort("percentInGc",e),generation:e=>r.SortFunctions.numericSort("generation",e),reason:e=>r.SortFunctions.numericSort("reason",e),type:e=>r.SortFunctions.numericSort("type",e),gen0:e=>r.SortFunctions.numericSort("gen0",e),gen1:e=>r.SortFunctions.numericSort("gen1",e),gen2:e=>r.SortFunctions.numericSort("gen2",e),gen3:e=>r.SortFunctions.numericSort("gen3",e),gen5:e=>r.SortFunctions.numericSort("gen5",e),finalizableSurvMb:e=>r.SortFunctions.numericSort("finalizableSurvMb",e),pinnedObjs:e=>r.SortFunctions.numericSort("pinnedObjs",e),collected:e=>r.SortFunctions.numericSort("collected",e),survived:e=>r.SortFunctions.numericSort("survived",e)}}.apply(t,o),void 0===r||(e.exports=r)},575:(e,t,i)=>{var o,r;o=[i,t,i(3028),i(3432),i(2560),i(3149)],r=function(e,t,i,o,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GcRowViewModel=void 0;class s extends r.LocalizedUnitConverter{constructor(e){super([{Unit:"nanos",Divider:1,Decimals:e,LowerBound:1},{Unit:"micros",Divider:1e3,Decimals:e,LowerBound:1e3}],{nanos:o.Resources.getString("/DiagnosticsHubSwimlaneResources/Time_nanos"),micros:o.Resources.getString("/DiagnosticsHubSwimlaneResources/Time_micros")})}}class n extends r.BitBinaryMultipleUnitConverter{scaleValue(e){return super.scaleValue(1024*e*1024*8)}}t.GcRowViewModel=class{constructor(e){this._selected=i.observable(!1),this._expanded=i.observable(!1),this._children=i.observableArray([]),this.decimals=2,this._mbUnitConverter=new n(this.decimals),this._msecUnitConverter=new r.MillisecondTimeUnitConverter(this.decimals),this._nsecUnitConverter=new s(this.decimals),this._dto=e}get templateName(){return"GcRowView"}get id(){return this._dto.id}get collected(){return this._dto.c}get survived(){return this._dto.s}get start(){return this._dto.ts}get stop(){return this._dto.te}get duration(){return this._dto.d}get msec(){return this._msecUnitConverter}get nsec(){return this._nsecUnitConverter}get mbConverter(){return this._mbUnitConverter}get percentInGc(){return`${this._dto.p.toFixed(2)} %`}get generation(){return this._dto.g}get reason(){switch(this._dto.r){case 0:return o.Resources.getString("GcReason_AllocSmall");case 1:return o.Resources.getString("GcReason_Induced");case 2:return o.Resources.getString("GcReason_LowMemory");case 3:return o.Resources.getString("GcReason_Empty");case 4:return o.Resources.getString("GcReason_AllocLarge");case 5:return o.Resources.getString("GcReason_OutOfSpaceSOH");case 6:return o.Resources.getString("GcReason_OutOfSpaceLOH");case 7:return o.Resources.getString("GcReason_InducedNotForced");case 8:return o.Resources.getString("GcReason_Internal");case 9:return o.Resources.getString("GcReason_InducedLowMemory");case 10:return o.Resources.getString("GcReason_InducedCompacting");case 11:return o.Resources.getString("GcReason_LowMemoryHost");case 12:return o.Resources.getString("GcReason_PMFullGC");case 13:return o.Resources.getString("GcReason_LowMemoryHostBlocking");default:return""}}get type(){switch(this._dto.t){case 0:return o.Resources.getString("GcType_NonConcurrentGC");case 1:return o.Resources.getString("GcType_BackgroundGC");case 2:return o.Resources.getString("GcType_ForegroundGC");default:return""}}get gen0(){return this._dto.g0}get gen1(){return this._dto.g1}get gen2(){return this._dto.g2}get gen3(){return this._dto.g3}get gen5(){return this._dto.g5}get finalizableSurvMb(){return this._dto.fs}get pinnedObjs(){return this._dto.po}get depth(){return 0}get selected(){return this._selected}get expanded(){return this._expanded}get children(){return this._children}invoke(){}}}.apply(t,o),void 0===r||(e.exports=r)},9371:(e,t,i)=>{var o,r;o=[i,t,i(8558)],r=function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),window.DotNetObjectAllocUI_OnAfterDomInsert=i.onAfterDomInsert}.apply(t,o),void 0===r||(e.exports=r)},3766:(e,t,i)=>{var o,r;o=[i,t,i(3432),i(8117)],r=function(e,t,i,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DotNetObjectAllocMarshaler=void 0;let r=null;t.DotNetObjectAllocMarshaler=class{constructor(){null===r&&(r=i.JSONMarshaler.attachToMarshaledObject("Microsoft.DiagnosticsHub.Tools.DotNetObjectAllocation.DotNetObjectAllocationMarshaler",{},!0)),this._onGoToAllocation=new o.ObservableEvent(r,"onGoToAllocation"),this._onCrossReferenceEvent=new o.ObservableEvent(r,"onCrossReferenceEvent"),this._graphHighlightEvent=new o.ObservableEvent(r,"GraphHighlightChangedEvent"),this._updateNativeCodeEvent=new o.ObservableEvent(r,"updateNativeCodeEvent"),this._updateCollectionEvent=new o.ObservableEvent(r,"updateCollectionEvent")}get onGoToAllocation(){return this._onGoToAllocation}goToAllocation(e){return r._call("goToAllocation",e)}get onCrossReferenceEvent(){return this._onCrossReferenceEvent}crossReference(e){return r._call("crossReference",e)}updateGraphHighlight(e){return r._call("raiseGraphHighlightChangedEvent",e)}clearGraphHighlight(){return r._call("clearGraphHighlight")}get graphHighlightEvent(){return this._graphHighlightEvent}graphHighlightingFeatureEnabled(){return r._call("graphHighlightingFeatureEnabled")}getDoubleClickTimeMs(){return r._call("getDoubleClickTimeMs")}isNativeCodeFoldingEnabled(){return r._call("isNativeCodeFoldingEnabled")}setNativeCodeFoldingEnabled(e){return r._call("setNativeCodeFolding",{isEnabled:e})}get onUpdateNativeCodeFolding(){return this._updateNativeCodeEvent}getColumnSettings(e){return r._call("getColumnSettings",e)}onColumnChanged(e,t){return r._call("onColumnChanged",e,t)}get onUpdateCollection(){return this._updateCollectionEvent}isCollectionEnabled(){return r._call("isCollectionEnabled")}isGlobalCollectionEnabled(){return r._call("isStartPausedSupported")}isPauseResumeSupported(){return r._call("isPauseResumeSupported")}setCollectionEnabled(e){return r._call("setCollectionEnabled",e)}openLink(e){return r._call("openLink",e)}isTopInsightsSupported(){return r._call("isTopInsightsSupported")}}}.apply(t,o),void 0===r||(e.exports=r)},7244:(e,t,i)=>{var o,r;o=[i,t,i(952)],r=function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TypesDAO=void 0,t.TypesDAO=class{constructor(e){this._dataWarehouse=e}getTopCollectedTypes(e,t,i){return this.queryTypes(e,t,"collected",i)}getTopSurvivedTypes(e,t,i){return this.queryTypes(e,t,"survived",i)}queryTypes(e,t,o,r){let s;return this._dataWarehouse.getFilteredData({customDomain:{view:"CollectedTypes"}},i.DotNetAllocAnalyzerId(),r).then((i=>(null==r||r.throwIfCancellationRequested(),s=i,i.getResult({gcId:e,limit:t,task:o},r)))).then((e=>(s.dispose(),e)))}}}.apply(t,o),void 0===r||(e.exports=r)},8558:(e,t,i)=>{var o,r;o=[i,t,i(3028),i(2560)],r=function(e,t,i,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.areTimespansEqual=t.onAfterDomInsert=void 0,t.onAfterDomInsert=function(){const e=document.getElementById("mainToolbar"),t=i.utils.domData.get(e,"mediaQuery");if(t){const o=i.utils.domData.get(e,"mediaQueryListener");t.removeListener(o)}let r=45;const s=e.children;for(let e=0;e<s.length;e++)r+=s.item(e).offsetWidth;const n=t=>{t.matches?e.classList.add("limitedSpace"):e.classList.remove("limitedSpace")},l=window.matchMedia(o.Utilities.formatString("(max-width: {0}px)",r.toString()));n(l),l.addListener(n),i.utils.domData.set(e,"mediaQuery",l),i.utils.domData.set(e,"mediaQueryListener",n)},t.areTimespansEqual=function(e,t){return!e&&!t||e&&t&&e.equals(t)}}.apply(t,o),void 0===r||(e.exports=r)},8117:t=>{"use strict";t.exports=e},2560:e=>{"use strict";e.exports=t},4881:e=>{"use strict";e.exports=i},3028:e=>{"use strict";e.exports=o},3432:e=>{"use strict";e.exports=require("plugin-vs-v2")}},n={},function e(t){var i=n[t];if(void 0!==i)return i.exports;var o=n[t]={exports:{}};return s[t].call(o.exports,o,o.exports,e),o.exports}(7316);var s,n}));
// SIG // Begin signature block
// SIG // MIIoKAYJKoZIhvcNAQcCoIIoGTCCKBUCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // zMr+xHdEn7OfMlzhgbeQVVx3qNHXjRSMA21XH39Fxoug
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
// SIG // DQEJBDEiBCB2Op0dKEgF7CVPkIXcBejT2XaWjscLENIO
// SIG // 03R2OUMknTBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAMUqMEtY
// SIG // x1gz07OzG8vFrSBwmAtW6skUwpJNCJOZFJiD1wmJmiTI
// SIG // MpdUuWZbGxCoqBsv/1qswo0Nvnc8mDp1KXAYxd221Pnl
// SIG // b3e0g14zbfwGCYWXQZp6GQIe7iwCzcrcR0+xkKOOwAhi
// SIG // xiouqTiCjSh7d5h3th+0SWyLHm3l0g9kdxYxteoBpONa
// SIG // HT33KZJDudJ9TOt6C/hOuP1GaHreZYT4DxOGNB3cYpsl
// SIG // KEe/KbQPQkk5OuIIfqshMjMFe+bX2PH1jZU/IFGQo06t
// SIG // rpXvmZZ96xpGiyn5++kvDq/NQlYco4H4JJeQSOLYlsXP
// SIG // ypTN6/XDiBmYIXL4Ha8YuOtTTQuhgheUMIIXkAYKKwYB
// SIG // BAGCNwMDATGCF4Awghd8BgkqhkiG9w0BBwKgghdtMIIX
// SIG // aQIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQg68Rv/040n6QLcrWY8UfE
// SIG // JudlAZ753TOSzPtWqhENSO8CBmUos+BcvhgTMjAyMzEw
// SIG // MjAxNzA0MzQuMjI0WjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOjMzMDMtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR6jCCByAwggUIoAMCAQICEzMAAAHMhqXcN+vZYS0A
// SIG // AQAAAcwwDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjAxWhcN
// SIG // MjQwMjAxMTkxMjAxWjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OjMzMDMtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAzLEiBfHvTZhHPvNz
// SIG // VWRoFlmYv8AWLfM4cQH0hjO8cOyuwmwP9QOBoaLz75CG
// SIG // PO97Z8s3cmXvumB18fkXetfJUA5ppuV+HromBudy3e1i
// SIG // Cvg3focotB/ew+hzOGcxqqL5sAdH2d5YfqYSS6D0/vcq
// SIG // 0yxc5JCsNlXG+8FzAc4g9DFVWG5sEZUWsqU57Zd/SBDQ
// SIG // hIo1vY+jBJU8lz9s63NDrYUDeUazE2OYmY2tzMhwhZmD
// SIG // Bop5h37bGht2HYvBmvAUI3baE5uXVYZ6rNqijRDqmUqJ
// SIG // 9vEeF339LZSS+VB8iN28sB//s0HibvKp7EgovFRTzrGR
// SIG // G+nGc4Vx2gIkhrXSgG0EWgCIRMWyFKXicqQu5fsKigtw
// SIG // TvQAxrqQfWYFBW0r+RAhYzA8235vDOc89gOMWDT0F6mb
// SIG // 9MBli/o072+5BWIgzz3vs0cgW85q0qTmwe16o6s1BTSp
// SIG // cKfjMdeZNRexTLORDNrhuvCELHQBgZGW0g5rhpoz22e3
// SIG // bYpvlx7odzUuiZl2D0u64pKQm1LDGTJ+XlsYlhSJOn9N
// SIG // LJEeES1podDejqvimCNXwOfS8xogGzq3MYL0JEaNzg+K
// SIG // NSVvc9UzTMBG5Mz61zKPK6xrLhqMmFnLJvcYXdBlyERx
// SIG // wuuJ82yN3tBuY6hLFkHOLmkHkkcq+9CkYo81clo42H7B
// SIG // Lb1TJScCAwEAAaOCAUkwggFFMB0GA1UdDgQWBBSCphxk
// SIG // XTyHS0V7bEeV0UsjN/tpDDAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // eRlDKPV74lJd4O9rvKEE6KyCg6AHYFmeC0PfnQBEApmn
// SIG // rbE4ZMWzZtebHruxpsKWXYTEDfEzXXRpIubOSHvmgNlR
// SIG // KPb2c99ZZbrBwVwFa0Labn0KrSAPtp57rH2mL4ora+qe
// SIG // ZFU+tPSyEzmIHSkVhKX8f+Mk+UfcjHisaMZJPLchohj2
// SIG // SuNEk+WdeDj3SX1W5GHgr5S0HJbF9flgWTcf12b2syZl
// SIG // 472I07htEG2accOGTt2aH30GMWWEc59M+NVOzAxZV6No
// SIG // oX2rHWx7rmupKR8SfQCKFHr4d5s71MWKdLtM98GAz6S7
// SIG // qPjNlWIfFzglAdLu+cRt0ufvfEyphW6mWIKYK+j/mCnm
// SIG // qNmKQdYs7POdGEs7sGl+5EcQFEZZjf4+R7+MGm5zn2W9
// SIG // +pg6iaeCHhpsD7cCPLRD7LkQJsq3no8oZGVe3X4CeDfN
// SIG // 0AYaR1WZQeBZpSUfMhd2gdeUFurcOAmh/jzCA7nehnji
// SIG // TuHEBPpU3OqyCZjeHH4tk0xu3uPU74Ql3wUtqczsm/WH
// SIG // pkptJK5PIyYes4Hhqs7ZO83sHxPt7IUEXO+LFy2OfKb1
// SIG // aM534Hxr8tZZW6uDnsveiqLsIroQ7cbipU51u6cO8WjT
// SIG // 4SDLDsVvHaUqfdeRbSnzqikf3XyTrGxw0iWP4oic+Jli
// SIG // gBqMnXizOsy5qIUQj1pP0OYwggdxMIIFWaADAgECAhMz
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
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjozMzAzLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUATk7md7mH4ooU
// SIG // uM0U6MYrA7fZiaSggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOjd
// SIG // FVQwIhgPMjAyMzEwMjAxNTAzNDhaGA8yMDIzMTAyMTE1
// SIG // MDM0OFowdDA6BgorBgEEAYRZCgQBMSwwKjAKAgUA6N0V
// SIG // VAIBADAHAgEAAgI7IzAHAgEAAgISRTAKAgUA6N5m1AIB
// SIG // ADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZCgMC
// SIG // oAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqGSIb3
// SIG // DQEBCwUAA4IBAQAXlUQvj5CckFNZHRx8oMSJw42Ek35K
// SIG // NBK89aXMfnDQXoNHsA6zkWh0OwMWgOQ3ldUNImKKL70/
// SIG // 8D1Z39LljNLfbKb+VgDDZr0/KBkYrMfMFPbg5a/vObiy
// SIG // 20cEqSiGcEElApkXcipsBOCq/cswrzpwWkzpE3gu2+xc
// SIG // GrrK+slkAgYmQZn8U+oFpTC2LFIi1LNAwRdwHo4TmICp
// SIG // hZQvkUcL2BTn/ErFMppOPlc/aVpRMRL1gMfuwsIRLIDm
// SIG // MHqjXomc78ZOi9ZoH2/Rkes1QJLmM+tVGWyu0Cfj3g4g
// SIG // zlkE0z1inLcoIA8GZkClOlcxs/5VZncBanFdZmTfpN29
// SIG // P8xyMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTACEzMAAAHMhqXcN+vZYS0AAQAAAcww
// SIG // DQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJAzEN
// SIG // BgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQgW9W6
// SIG // 7PzmgM47Bx5v8/HXmhouzyA5ikrSFtUvLxxO9ocwgfoG
// SIG // CyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCDW7mUBwv7D
// SIG // AhPnIClUpMCqQyAn53nxWWIA2xeB63BY5jCBmDCBgKR+
// SIG // MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAB
// SIG // zIal3Dfr2WEtAAEAAAHMMCIEIHx/8LsFSTJz8ulx1RsG
// SIG // FEM/G72MaGZWkWZKpx9rckPvMA0GCSqGSIb3DQEBCwUA
// SIG // BIICAMvRx4H64tfYAoMa6clw9KW/DiMBGnQkGAKQMj6y
// SIG // 3/jmKH5AjAGNu40Tz7HG5nUObcX9MQipDSeuyCixME4z
// SIG // AbdcJaN5PgS6TFmwxgfHOK6n50SZg7qKuNH30qWzyt/g
// SIG // mNFB4FEFWu5dlDFllZkpxo5CBbz+0qoCxUrg51w3Yu0G
// SIG // XTnH1EuVsC6Vi6YEI0FXpxKtm3MB4gjdqPO8TT+lu5Ls
// SIG // TyQoRq+Uo6qn7rXtiYohcXKzQOiC+XqlcefRnZ2oRNQT
// SIG // ulVbTxgTUAkHUjbljf5Z5kSMZkKunK4vV9TXpVUYFKza
// SIG // oZLwTw+ZxOLleX3TBzp3jjthDx3dM9GSyO4PmLiO66Ic
// SIG // MxiY3EpJxga96PXmtUkfIbvjqnAZpSfp9PUgV1fyofvq
// SIG // QFwl5pCDY2LVJ4u59DT3h04Uo9vW2udg1eNIF7lva07l
// SIG // g6/c5mI30z2MH+ZMpaSJObXHSwE0YXF2pIZBLPRao3vh
// SIG // EWsXFYorfN0VB5Dm2O7iIlMLcHYjv5wgLMREx0y/iaSQ
// SIG // deSQggNp84QrSPVQSWhiifOgP2nqwwSj2OSDFm8Zi57D
// SIG // Yv+zBpQ1M5lckif0PVV4a26jr0eMlgSLuzIVNG4jt3hu
// SIG // Hn6RxPmnB5ordhrv72Xqw9EkSRckxy4vmgFue6ulTqaA
// SIG // UnUq/j+IdzbRhk6YErDIcg097Qux
// SIG // End signature block
