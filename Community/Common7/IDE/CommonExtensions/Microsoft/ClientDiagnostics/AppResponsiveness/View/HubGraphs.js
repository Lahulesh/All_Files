// 
// Copyright (C) Microsoft. All rights reserved.
//
define("DataUtilities", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataUtilities = void 0;
    /* A helper class to get graph data from the analyzer.
     */
    class DataUtilities {
        static getFilteredResult(dataWarehouse, analyzerId, counterId, timespan, customData) {
            var contextData = {
                timeDomain: timespan,
                customDomain: {
                    CounterId: counterId
                }
            };
            if (customData) {
                for (var key in customData) {
                    if (customData.hasOwnProperty(key)) {
                        contextData.customDomain[key] = customData[key];
                    }
                }
            }
            return dataWarehouse.getFilteredData(contextData, analyzerId);
        }
    }
    exports.DataUtilities = DataUtilities;
});
// 
// Copyright (C) Microsoft. All rights reserved.
//
define("GraphResources", ["require", "exports", "plugin-vs-v2"], function (require, exports, Plugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GraphResources = void 0;
    /* A helper class to get the resource string either from the hub resource dictionary or from Plugin.
     */
    class GraphResources {
        constructor(resources) {
            this._graphResources = resources;
        }
        getString(resourceId, ...args) {
            // First try to get the resource from the dictionary
            if (this._graphResources) {
                var resourceString = this._graphResources[resourceId];
                if (resourceString !== undefined) {
                    resourceString = GraphResources.format(resourceId, resourceString, args);
                    return resourceString;
                }
            }
            // Fallback to the Microsoft.Plugin resources
            try {
                return Plugin.Resources.getString.apply(Plugin.Resources, arguments);
            }
            catch (e) { }
            return resourceId;
        }
        static format(resourceId, format, args) {
            return format.replace(GraphResources.FORMAT_REG_EXP, (match, index) => {
                var replacer;
                switch (match) {
                    case "{{":
                        replacer = "{";
                        break;
                    case "}}":
                        replacer = "}";
                        break;
                    case "{":
                    case "}":
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.3002"));
                    default:
                        var argsIndex = parseInt(index);
                        if (args && argsIndex < args.length) {
                            replacer = args[argsIndex].toString();
                        }
                        else {
                            throw new Error(Plugin.Resources.getErrorString("JSPlugin.3003") + " (resourceId = " + resourceId + ")");
                        }
                        break;
                }
                if (replacer === undefined || replacer === null) {
                    replacer = "";
                }
                return replacer;
            });
        }
    }
    exports.GraphResources = GraphResources;
    GraphResources.FORMAT_REG_EXP = /\{{2}|\{(\d+)\}|\}{2}|\{|\}/g;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
// Expose our AMD swimlane module to the global object
window.define("hubGraphs", ["StackedBarGraph"], (factoryModule) => {
    window.VisualProfiler = {
        Graphs: {
            StackedBarGraph: factoryModule.StackedBarGraph
        }
    };
});
// 
// Copyright (C) Microsoft. All rights reserved.
//
define("StackedBarChart", ["require", "exports", "plugin-vs-v2", "diagnosticsHub-swimlanes", "diagnosticsHub"], function (require, exports, Plugin, DiagnosticsHubSwimlanes, diagnosticsHub_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StackedBarChartView = exports.StackedBarChartPresenter = exports.DataSeriesInfo = void 0;
    class DataSeriesInfo {
        constructor(name, cssClass, sortOrder) {
            if (!name || sortOrder === undefined || sortOrder === null) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1044"));
            }
            this._name = name;
            this._cssClass = cssClass;
            this._sortOrder = sortOrder;
        }
        get cssClass() {
            return this._cssClass;
        }
        get name() {
            return this._name;
        }
        get sortOrder() {
            return this._sortOrder;
        }
    }
    exports.DataSeriesInfo = DataSeriesInfo;
    class StackedBarChartPresenter {
        constructor(options) {
            this._data = [];
            this._dataSeriesInfo = {};
            this._maximumYValue = Number.NEGATIVE_INFINITY;
            this.viewModel = [];
            this._options = options;
            this.validateOptions();
            this._pixelHorizontalValue = this.xWidth / this._options.width;
        }
        get maximumYValue() {
            return this._maximumYValue;
        }
        get xWidth() {
            return this._options.maxX - this._options.minX;
        }
        addData(chartData) {
            chartData.forEach((dataItem) => {
                if (this._dataSeriesInfo.hasOwnProperty(dataItem.series)) {
                    this._data.push(dataItem);
                }
                else {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1043"));
                }
            });
            this.generateViewModel();
        }
        addSeries(seriesInfo) {
            for (var i = 0; i < seriesInfo.length; i++) {
                var info = seriesInfo[i];
                if (this._dataSeriesInfo.hasOwnProperty(info.name)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1045"));
                }
                this._dataSeriesInfo[info.name] = info;
            }
        }
        getViewOptions() {
            var viewOptions = {
                ariaDescription: this._options.ariaDescription,
                ariaLabelCallback: this._options.ariaLabelCallback,
                height: this._options.height,
                width: this._options.width,
                tooltipCallback: this._options.tooltipCallback,
                legendData: this._dataSeriesInfo
            };
            return viewOptions;
        }
        determineYAxisScale(allBars) {
            this.log("_maximumYValue (164) = " + this._maximumYValue);
            for (var i = 0; i < allBars.length; i++) {
                var totalStackHeight = 0;
                var currentBar = allBars[i];
                for (var j = 0; j < currentBar.length; j++) {
                    var stackComponent = currentBar[j];
                    if (stackComponent.height > 0) {
                        totalStackHeight += stackComponent.height;
                    }
                }
                this.log("\t" + i + " = " + totalStackHeight);
                this._maximumYValue = Math.max(this._maximumYValue, totalStackHeight);
            }
            this.log("_maximumYValue (179) = " + this._maximumYValue);
            this._maximumYValue = Math.max(this._options.minYHeight, this._maximumYValue);
            this.log("_maximumYValue (184) = " + this._maximumYValue);
            // Round the max value to the next 100, taking into account real precision (to avoid scaling up by 100 to cater
            // for the 100.0000000001 case)
            this._maximumYValue = Math.ceil(Math.floor(this._maximumYValue) / 100) * 100;
            this.log("_maximumYValue (190) = " + this._maximumYValue);
            var availableAxisHight = this._options.height - StackedBarChartPresenter.YAXIS_PIXEL_PADDING;
            this.log("availableAxisHight   = " + availableAxisHight);
            if (availableAxisHight <= 0) {
                availableAxisHight = this._options.height;
            }
            this._pixelVerticalValue = this._maximumYValue / availableAxisHight;
            this.log("_maximumYValue (199) = " + this._maximumYValue);
            this.log("availableAxisHight   = " + availableAxisHight);
            this.log("_pixelVerticalValue  = " + this._pixelVerticalValue);
            this._maximumYValue = this._options.height * this._pixelVerticalValue;
            this.log("_maximumYValue (205) = " + this._maximumYValue);
        }
        generateViewModel() {
            var allBars = [[]];
            var singleBar = [];
            var barWidthAndMargin = this._options.barWidth + this._options.barGap;
            var currentXValue = this._options.minX;
            var prevValue = Number.NEGATIVE_INFINITY;
            var x = 0;
            var i = 0;
            while (i < this._data.length) {
                var dataItem = this._data[i];
                if (dataItem.x < prevValue) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1046"));
                }
                if (dataItem.x > this._options.maxX) {
                    break;
                }
                prevValue = dataItem.x;
                var currentXValue = Math.floor(x * this._pixelHorizontalValue + this._options.minX);
                var currentBarMinValue = currentXValue;
                var currentBarMaxValue = currentXValue + Math.floor((this._options.barWidth + this._options.barGap) * this._pixelHorizontalValue);
                if (dataItem.x < currentBarMinValue) {
                    i++;
                    continue;
                }
                if (dataItem.x < currentBarMaxValue) {
                    dataItem.x = x;
                    singleBar.push(dataItem);
                    i++;
                }
                else {
                    allBars.push(singleBar);
                    singleBar = [];
                    x += barWidthAndMargin;
                }
            }
            allBars.push(singleBar);
            this.determineYAxisScale(allBars);
            this.log("Generating view models for single stacks.");
            this.log("");
            for (var i = 0; i < allBars.length; i++) {
                this.log("Bar # " + i);
                this.generateViewModelForSingleStack(allBars[i]);
                this.log("");
            }
        }
        generateViewModelForSingleStack(dataItems) {
            if (!dataItems || dataItems.length === 0) {
                return;
            }
            dataItems.sort(this.sortBySeries.bind(this));
            var accumulatedHeight = 2 * StackedBarChartPresenter.EDGE_LINE_THICKNESS;
            var maxHeightExceeded = false;
            for (var i = dataItems.length - 1; i >= 0; i--) {
                var dataItem = dataItems[i];
                this.log("\t" + i + ": " + dataItem.series + " = " + dataItem.height + "(" + dataItem.x + ")");
                if (dataItem.height <= 0) {
                    continue;
                }
                var barHeight = Math.round(dataItem.height / this._pixelVerticalValue);
                this.log("\t\tbarHeight = " + barHeight);
                if (barHeight < StackedBarChartPresenter.MIN_BAR_HEIGHT) {
                    this.log("\t\t\t- barHeigh too small. Resetting to " + StackedBarChartPresenter.MIN_BAR_HEIGHT);
                    barHeight = StackedBarChartPresenter.MIN_BAR_HEIGHT;
                }
                var startY = this._options.height - (barHeight + accumulatedHeight);
                this.log("\t\t\t- startY = " + startY);
                if (startY < StackedBarChartPresenter.YAXIS_PIXEL_PADDING) {
                    barHeight = Math.max(100 * this._pixelVerticalValue - accumulatedHeight, StackedBarChartPresenter.MIN_BAR_HEIGHT);
                    startY = StackedBarChartPresenter.YAXIS_PIXEL_PADDING;
                    this.log("\t\t\t- startY is too small. Resetting to " + startY + " and barHeight to " + barHeight);
                    maxHeightExceeded = true;
                }
                accumulatedHeight += barHeight;
                if (this._options.showStackGap) {
                    accumulatedHeight += this._options.barGap;
                }
                var rectangle = {
                    x: dataItem.x,
                    y: startY,
                    height: barHeight,
                    width: this._options.barWidth,
                    className: this._dataSeriesInfo[dataItem.series].cssClass,
                    chartItem: dataItem
                };
                this.viewModel.push(rectangle);
                if (maxHeightExceeded) {
                    break;
                }
            }
        }
        sortBySeries(chartItem1, chartItem2) {
            return this._dataSeriesInfo[chartItem2.series].sortOrder - this._dataSeriesInfo[chartItem1.series].sortOrder;
        }
        validateOptions() {
            if (!this._options) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1047"));
            }
            if ((this._options.minX === undefined || this._options.minX === null) ||
                (this._options.maxX === undefined || this._options.maxX === null) ||
                (this._options.minY === undefined || this._options.minY === null) ||
                (this._options.minX > this._options.maxX) ||
                (!this._options.height || !this._options.width || this._options.height < 0 || this._options.width < 0) ||
                (!this._options.barWidth || this._options.barWidth < 0)) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1048"));
            }
            this._options.barGap = this._options.barGap || 1;
            this._options.showStackGap = this._options.showStackGap || true;
            this._options.minYHeight = this._options.minYHeight || this._options.minY;
        }
        static get logger() {
            if (!StackedBarChartPresenter._logger) {
                StackedBarChartPresenter._logger = diagnosticsHub_1.getLogger();
            }
            return StackedBarChartPresenter._logger;
        }
        log(message) {
            StackedBarChartPresenter.logger.debug(StackedBarChartPresenter.LoggerPrefixText + message);
        }
    }
    exports.StackedBarChartPresenter = StackedBarChartPresenter;
    StackedBarChartPresenter.LoggerPrefixText = "StackedBarChartPresenter: ";
    StackedBarChartPresenter.EDGE_LINE_THICKNESS = 1;
    StackedBarChartPresenter.YAXIS_PIXEL_PADDING = 10 + 2 * StackedBarChartPresenter.EDGE_LINE_THICKNESS;
    StackedBarChartPresenter.MIN_BAR_HEIGHT = 2;
    class StackedBarChartView {
        constructor() {
            this._idCount = 0;
            this._selectedId = -1;
            this.rootElement = document.createElement("div");
            this.rootElement.style.width = this.rootElement.style.height = "100%";
        }
        set presenter(value) {
            this._presenter = value;
            this._viewData = this._presenter.viewModel;
            this._options = value.getViewOptions();
            this._barGraphWidth = this._options.width;
            this.drawChart();
        }
        createContainer() {
            if (!this._chartAreaContainer) {
                this._chartAreaContainer = document.createElement("div");
                this.rootElement.appendChild(this._chartAreaContainer);
            }
            else {
                this._chartAreaContainer.innerHTML = "";
            }
            this._chartAreaContainer.style.width = this._options.width + "px";
            this._chartAreaContainer.style.height = this._options.height + "px";
            this._chartAreaContainer.classList.add("stackedBarChart");
            this._chartAreaContainer.style.display = "-ms-grid";
        }
        createRect(x, y, height, width, className) {
            var rect = document.createElement("div");
            rect.id = StackedBarChartView._barIdPrefix + this._idCount;
            rect.tabIndex = -1;
            this._idCount++;
            rect.classList.add("bar");
            rect.classList.add(className);
            rect.style.left = x + "px";
            rect.style.bottom = (this._options.height - y - height) + "px";
            rect.style.height = height + "px";
            rect.style.width = width + "px";
            return rect;
        }
        drawChart() {
            if (!this._viewData) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1049"));
            }
            this.createContainer();
            this.initializeBarGraph();
            this.renderViewData(this._barGraph, this._viewData);
            this._chartAreaContainer.appendChild(this._barGraph);
        }
        initializeBarGraph() {
            this._selectedId = -1;
            this._idCount = 0;
            this._barGraph = document.createElement("div");
            this._barGraph.classList.add("barGraph");
            this._barGraph.tabIndex = 0;
            this._barGraph.style.height = this._options.height + "px";
            this._barGraph.style.width = this._barGraphWidth + "px";
            this._barGraph.addEventListener("keydown", this.onBarGraphKeydown.bind(this));
            this._barGraph.addEventListener("focus", () => { this._selectedId = -1; });
            if (this._options.ariaDescription) {
                this._barGraph.setAttribute("aria-label", this._options.ariaDescription);
            }
        }
        onBarBlur(event) {
            var bar = event.currentTarget;
            bar.classList.remove("focused");
            Plugin.Tooltip.dismiss();
        }
        onBarFocus(chartItem, event) {
            var bar = event.currentTarget;
            bar.classList.add("focused");
            if (this._options.ariaLabelCallback) {
                var ariaLabel = this._options.ariaLabelCallback(chartItem);
                bar.setAttribute("aria-label", ariaLabel);
            }
            var element = event.currentTarget;
            var offsetX = window.screenLeft + element.offsetLeft + element.clientWidth;
            var offsetY = window.screenTop + element.offsetTop + element.clientHeight;
            this.showTooltip(chartItem, offsetX, offsetY);
        }
        onBarGraphKeydown(event) {
            if (event.keyCode === DiagnosticsHubSwimlanes.KeyCodes.ArrowLeft || event.keyCode === DiagnosticsHubSwimlanes.KeyCodes.ArrowRight) {
                if (event.keyCode === DiagnosticsHubSwimlanes.KeyCodes.ArrowLeft) {
                    if ((this._selectedId === 0) || (this._selectedId === -1)) {
                        this._selectedId = this._idCount;
                    }
                    this._selectedId--;
                }
                else if (event.keyCode === DiagnosticsHubSwimlanes.KeyCodes.ArrowRight) {
                    this._selectedId++;
                    if (this._selectedId === this._idCount) {
                        this._selectedId = 0;
                    }
                }
                var bar = document.getElementById(StackedBarChartView._barIdPrefix + this._selectedId);
                bar.focus();
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            return true;
        }
        renderViewData(container, viewData) {
            for (var i = 0; i < viewData.length; i++) {
                var barInfo = viewData[i];
                var rectangle = this.createRect(barInfo.x, barInfo.y, barInfo.height, barInfo.width, barInfo.className);
                rectangle.addEventListener("mouseover", this.showTooltip.bind(this, barInfo.chartItem));
                rectangle.addEventListener("mouseout", () => Plugin.Tooltip.dismiss());
                rectangle.addEventListener("focus", this.onBarFocus.bind(this, barInfo.chartItem));
                rectangle.addEventListener("blur", this.onBarBlur.bind(this));
                container.appendChild(rectangle);
            }
        }
        showTooltip(chartItem, x, y) {
            if (this._options.tooltipCallback) {
                var toolTipContent = this._options.tooltipCallback(chartItem);
                var config = { content: toolTipContent, delay: 0, x: x, y: y, contentContainsHTML: true };
                Plugin.Tooltip.show(config);
            }
        }
    }
    exports.StackedBarChartView = StackedBarChartView;
    StackedBarChartView._barIdPrefix = "bar";
});
// 
// Copyright (C) Microsoft. All rights reserved.
//
define("StackedBarGraph", ["require", "exports", "plugin-vs-v2", "diagnosticsHub", "diagnosticsHub-swimlanes", "StackedBarChart", "GraphResources", "DataUtilities"], function (require, exports, Plugin, DiagnosticsHub, DiagnosticsHubSwimlanes, StackedBarChart_1, GraphResources_1, DataUtilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StackedBarGraph = exports.Category = void 0;
    class Category {
    }
    exports.Category = Category;
    Category.parsingCategory = "Parsing_Category";
    Category.layoutCategory = "Layout_Category";
    Category.appCodeCategory = "AppCode_Category";
    Category.xamlOtherCategory = "XamlOther_Category";
    Category.renderCategory = "Render_Category";
    Category.ioCategory = "IO_Category";
    class StackedBarGraph {
        constructor(config) {
            this._scaleChangedEvent = new DiagnosticsHub.AggregatedEvent();
            this._config = config;
            this._graphResources = new GraphResources_1.GraphResources(this._config.resources);
            this._timeRange = this._config.timeRange || new DiagnosticsHub.JsonTimespan(new DiagnosticsHub.BigNumber(0, 0), new DiagnosticsHub.BigNumber(0, 0));
            this._container = document.createElement("div");
            StackedBarGraph.validateConfiguration(this._config);
            this._dataSource = this._config.jsonConfig.Series[0].DataSource;
            if (config.pathToScriptFolder && config.loadCss) {
                config.loadCss(config.pathToScriptFolder + "/CSS/hubGraphs/StackedBarChart.css");
                config.loadCss(config.pathToScriptFolder + "/DataCategoryStyles.css");
            }
            // Setup scale
            this._config.scale = this._config.scale || {};
            this._config.scale.minimum = 0;
            this._config.scale.maximum = 120;
            this._config.scale.axes = [];
            this._config.scale.axes.push({
                value: 100
            });
            // add series and legend to config
            this._config.legend = this._config.legend || [];
            var seriesCollection = this._config.jsonConfig.Series;
            for (var i = 0; i < seriesCollection.length; i++) {
                var series = seriesCollection[i];
                this._config.legend.push({
                    color: series.Color,
                    legendText: this._graphResources.getString(series.Legend),
                    legendTooltip: (series.LegendTooltip ? this._graphResources.getString(series.LegendTooltip) : null)
                });
            }
        }
        get container() {
            return this._container;
        }
        get scaleChangedEvent() {
            return this._scaleChangedEvent;
        }
        get containerOffsetWidth() {
            if (this._containerOffsetWidth === undefined) {
                this._containerOffsetWidth = this._container.offsetWidth;
            }
            return this._containerOffsetWidth;
        }
        onDataUpdate(timestampNs) {
            // Not implemented
        }
        addSeriesData(counterId, points, fullRender, dropOldData) {
            // Not implemented
        }
        getDataPresenter() {
            var presenterOptions = {
                ariaDescription: this._graphResources.getString("UiThreadActivityAriaLabel"),
                height: this._config.height,
                width: this.containerOffsetWidth,
                minX: parseInt(this._timeRange.begin.value),
                maxX: parseInt(this._timeRange.end.value),
                minY: 0,
                minYHeight: 100,
                barWidth: this._config.jsonConfig.BarWidth,
                barGap: this._config.jsonConfig.BarGap,
                showStackGap: this._config.jsonConfig.ShowStackGap,
                tooltipCallback: this.createTooltip.bind(this),
                ariaLabelCallback: this.createAriaLabel.bind(this)
            };
            var presenter = new StackedBarChart_1.StackedBarChartPresenter(presenterOptions);
            //
            // Add series information to the presenter
            //
            var dataSeriesInfo = [];
            var stackedDataSeries = this._config.jsonConfig.Series;
            for (var i = 0; i < stackedDataSeries.length; i++) {
                var seriesItem = stackedDataSeries[i];
                dataSeriesInfo.push({
                    cssClass: seriesItem.CssClass,
                    name: seriesItem.Category,
                    sortOrder: i + 1
                });
            }
            presenter.addSeries(dataSeriesInfo);
            return presenter;
        }
        getGranularity() {
            var bucketWidth = this._config.jsonConfig.BarGap + this._config.jsonConfig.BarWidth;
            var graphDuration = parseInt(this._timeRange.elapsed.value);
            if (graphDuration <= 0 || this.containerOffsetWidth <= 0) {
                return 0;
            }
            return Math.floor(bucketWidth / this.containerOffsetWidth * graphDuration);
        }
        removeInvalidPoints(base) {
            // Not implemented
        }
        render(fullRender) {
            if (this._config.jsonConfig.GraphBehaviour == DiagnosticsHubSwimlanes.GraphBehaviourType.PostMortem) {
                this.setData(this._timeRange);
            }
        }
        resize(evt) {
            this._containerOffsetWidth = undefined;
            this.render();
        }
        onViewportChanged(viewportArgs) {
            if (this._timeRange.equals(viewportArgs.currentTimespan)) {
                // Only selection changed, ignore this event
                return;
            }
            this._timeRange = viewportArgs.currentTimespan;
            this.render();
        }
        static validateConfiguration(config) {
            if (!config) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1070"));
            }
            var jsonObject = config.jsonConfig;
            if (!jsonObject) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1071"));
            }
            if (!jsonObject.Series || jsonObject.Series.length === 0) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1072"));
            }
            jsonObject.BarWidth = jsonObject.BarWidth || 16;
            jsonObject.BarGap = jsonObject.BarGap || 1;
            jsonObject.ShowStackGap = jsonObject.ShowStackGap || true;
            if ((!config.height || config.height < 0) ||
                jsonObject.BarWidth < 0) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1048"));
            }
        }
        createTooltip(cpuUsage) {
            var tooltip = this._graphResources.getString(cpuUsage.series) + ": " + (Math.round(cpuUsage.height * 100) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 }) + "%";
            return tooltip;
        }
        createAriaLabel(cpuUsage) {
            var percentageUtilization = (Math.round(cpuUsage.height * 100) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 });
            var formattedTime = DiagnosticsHubSwimlanes.RulerUtilities.formatTime(DiagnosticsHub.BigNumber.convertFromNumber(cpuUsage.x), DiagnosticsHubSwimlanes.UnitFormat.fullName);
            return this._graphResources.getString("UiThreadActivityBarAriaLabel", this._graphResources.getString(cpuUsage.series), percentageUtilization, formattedTime);
        }
        static jsonTimeToNanoseconds(bigNumber) {
            var l = bigNumber.l;
            var h = bigNumber.h;
            if (l < 0) {
                l = l >>> 0;
            }
            if (h < 0) {
                h = h >>> 0;
            }
            var nsec = h * 0x100000000 + l;
            return nsec;
        }
        setData(timeRange) {
            if (this._settingDataPromise) {
                // TODO: Implement promise cancellation.
                // this._settingDataPromise.cancel();
                // this._settingDataPromise = null;
            }
            if (!this._dataSource || !this._dataSource.CounterId || !this._dataSource.AnalyzerId) {
                // No data to set if there is no data source
                return;
            }
            this._settingDataPromise = this.getDataWarehouse().then((dataWarehouse) => {
                var granuality = this.getGranularity();
                if (granuality > 0) {
                    return DataUtilities_1.DataUtilities.getFilteredResult(dataWarehouse, this._dataSource.AnalyzerId, this._dataSource.CounterId, timeRange, {
                        granularity: granuality.toString(),
                        task: "1" // AnalysisTaskType::GetUIThreadActivityData in XamlProfiler\DataModel\XamlAnalyzer.h
                    });
                }
                else {
                    return Promise.resolve([]);
                }
            }).then((cpuUsageResult) => {
                if (this._chart) {
                    this._container.removeChild(this._chart.rootElement);
                    this._chart = null;
                }
                if (cpuUsageResult) {
                    var chartItems = [];
                    for (var i = 0; i < cpuUsageResult.length; i++) {
                        var cpuUsagePoint = cpuUsageResult[i];
                        var parsingTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.ParsingTime);
                        var layoutTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.LayoutTime);
                        var appCodeTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.AppCodeTime);
                        var xamlOtherTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.XamlOther);
                        var renderTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.RenderTime);
                        var ioTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.IOTime);
                        var startTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.StartTime);
                        var endTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.EndTime);
                        var totalTime = endTime - startTime;
                        if (parsingTime > 0) {
                            chartItems.push({
                                series: Category.parsingCategory,
                                x: startTime,
                                height: parsingTime * 100.0 / totalTime
                            });
                        }
                        if (layoutTime > 0) {
                            chartItems.push({
                                series: Category.layoutCategory,
                                x: startTime,
                                height: layoutTime * 100.0 / totalTime
                            });
                        }
                        if (appCodeTime > 0) {
                            chartItems.push({
                                series: Category.appCodeCategory,
                                x: startTime,
                                height: appCodeTime * 100.0 / totalTime
                            });
                        }
                        if (xamlOtherTime > 0) {
                            chartItems.push({
                                series: Category.xamlOtherCategory,
                                x: startTime,
                                height: xamlOtherTime * 100.0 / totalTime
                            });
                        }
                        if (renderTime > 0) {
                            chartItems.push({
                                series: Category.renderCategory,
                                x: startTime,
                                height: renderTime * 100.0 / totalTime
                            });
                        }
                        if (ioTime > 0) {
                            chartItems.push({
                                series: Category.ioCategory,
                                x: startTime,
                                height: ioTime * 100.0 / totalTime
                            });
                        }
                    }
                    var dataPresenter = this.getDataPresenter();
                    dataPresenter.addData(chartItems);
                    this._chart = new StackedBarChart_1.StackedBarChartView();
                    this._chart.presenter = dataPresenter;
                    // Update the y-axis scale maximum
                    this._scaleChangedEvent.invokeEvent({
                        minimum: 0,
                        maximum: dataPresenter.maximumYValue
                    });
                    this._container.appendChild(this._chart.rootElement);
                }
            }).then(() => {
                this._settingDataPromise = null;
            });
        }
        getDataWarehouse() {
            if (this._dataWarehouse) {
                return Promise.resolve(this._dataWarehouse);
            }
            else {
                return DiagnosticsHub.loadDataWarehouse().then((dataWarehouse) => {
                    this._dataWarehouse = dataWarehouse;
                    return this._dataWarehouse;
                });
            }
        }
    }
    exports.StackedBarGraph = StackedBarGraph;
});
//# sourceMappingURL=HubGraphs.js.map
// SIG // Begin signature block
// SIG // MIIoKAYJKoZIhvcNAQcCoIIoGTCCKBUCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 641vVHlb4/vY2h5xds9l7atdZrb1y+UXsvsNihCuLsKg
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
// SIG // DQEJBDEiBCCJ4E6mqTvJEBjFVsquATlYKqf0io/gbYlK
// SIG // rC8f3JuTYDBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAG+U3pBZ
// SIG // 7m7A9IP5GnN8QZBMGSPpRXrQqLDD56BlAGC8ypvsQaxJ
// SIG // 7V36+W31whvACYI1v+P2baVibZn6wMDUrRvVoLql9NWa
// SIG // 2Voats5m4wMieoB08fxgLtnSTkD6J2E+kiAxmyubcDDP
// SIG // tphew6GPW25KiBgqyRhg8JzL4TMydelE6QB7E7x+hUAS
// SIG // pk8r3LG/Mch6KkJALMtVrLrWw+KtlSGvjwNtm2FyG1nS
// SIG // hmFtEsZfog8jd9uGeyuWY4iEwvRdL5UC5EiT6KebyEV1
// SIG // F7+2u+bKMdyXz4g3A5/VcBlPqD+InGd4xcSScCABj2p1
// SIG // qwrsQrlwcyLU0Gcczn1r65hgKGChgheUMIIXkAYKKwYB
// SIG // BAGCNwMDATGCF4Awghd8BgkqhkiG9w0BBwKgghdtMIIX
// SIG // aQIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQghuhjFj20ovyA2Bg/94af
// SIG // aCjyY1XJvelGHcNah4ZTB+wCBmUD/tsJmRgTMjAyMzEw
// SIG // MDUxODAxNDIuNzA4WjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOjg2MDMtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR6jCCByAwggUIoAMCAQICEzMAAAHXmw0eVy6MUY4A
// SIG // AQAAAdcwDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjM3WhcN
// SIG // MjQwMjAxMTkxMjM3WjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // Ojg2MDMtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAxKxgpDdl/1L7jQnH
// SIG // 5dMlQTaPiyCMsxuwNdF+ZFYBp6fbPJn+GmbLpGbua7y7
// SIG // OzamjRMXMJz7hyFnaepLMI2tWMPUsU1/hNJXqvlgbnCE
// SIG // SlnXDLpiAwYCxNBG/9/wWPeWbU9V7J52rQRWYa9Li5A4
// SIG // k/R4K0W9dtrJu/2JMjIoBZE9CbqIkj16Cy+8GlBPbXiP
// SIG // UDpKI6o0ZXCAuGFTWPtlCATOUKKyjWjnc/7KPkyBeps8
// SIG // V+Z8tlP6P4jBVU378JuE/IP2KscMnvpTpmvSivfL+r8H
// SIG // v4ou9kzE1VsClxXVzsrD/RoqHF7d/HLj/XPGhNXh96uB
// SIG // XRk4CjndKxvsYQoLERfBqi0+5OfFaUJyfLvso0Vui6Jr
// SIG // eUXK6KYH/RB/HuH6A1KFMlOUO4j4MDicWIaCsUYxmZbY
// SIG // Q5qeXsfulOs7/ea3fe9+uvKRqQpLtCAeNy/wU8zHAwFe
// SIG // P8bukX3FRcGqzf8iauan2cjLKR+YHGkwlQKLl5EE3PC8
// SIG // LX8bYCM+d6jElUfXPYJEp8TOXNbR4IjF9w9hgZ0Gp/eb
// SIG // cvgnU2AAIY4AU3Mo/T+zhhDIa95cmmcY694KbOmZqOO1
// SIG // TkyPLbEmB4R7Q/AaQaIN/S+XuP5QyYPzquKxrBSksTF7
// SIG // iEWdRNPHZl+u1zO6pr5tuzvNOAoRJm/gjkfFm+OjBRBM
// SIG // +to7vsUCAwEAAaOCAUkwggFFMB0GA1UdDgQWBBSup8C7
// SIG // /VkC9zSMRCcj7iTGejCNjTAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // UgXd1CfiLL3TAl/iu8ah2uVAbVQtQml2bx0XfrLVtJVw
// SIG // P3UzZ3gltExawaCWOfW/X5206Lj0XmpLtpd1+W5obGqO
// SIG // gwkVbqnJoVTwGcklxnqFX4+dnCxosmSxMOk0M7ug/vr4
// SIG // zThpkomztChPRnb/IUBEceURtCoK05pPHJHgtVVKrnlE
// SIG // BylQhEqkw1Aw/HV0y1gppuh6pkF+v/oCg0l4IMKXO+YY
// SIG // tgGykqOLbpTME31yXRncK7Ih45M/J8yFv2dz5zIBhVO+
// SIG // irs2BVdF8h/Q00vwzzvOkS7UIwOWZVRspkz3058O5MaI
// SIG // iyTf8pbjByJB0s6Wibwoql/g59UBkRBJzSGXkXpLy6Lq
// SIG // 6j0RCDk5tWyUSdOuXPWF+2ydJ2j4sc5ucvGNgfmCCBAI
// SIG // uI1K2jod6BO2uCbyFtxIN6Daj+6oaXe8TC8atlpzPlPW
// SIG // 6lk3k+FQqKQIV7trhkHsXS6u21nXGMMhBQ4UuGfTdLsN
// SIG // 4em4we0uDF/eqX2EhFdDChRjim5nwlEu1nppLhamctKD
// SIG // Rzz8fnH3TWHkhem4Tjx3bK6NRFXd81iJHQ9RuZBAz5xE
// SIG // LRWq7TPB/m7+c1IQFCbPKi87hQHQWUC7ng/V2Xsp40Cs
// SIG // BHgM+t8QEyAofLTlDNszIEhIVS/B5uOUgen6HrOAUwtG
// SIG // PEmVqL9yGobb8MhxW1KrNWIwggdxMIIFWaADAgECAhMz
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
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjo4NjAzLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUAMVvbosxt4RGP
// SIG // Pbi9rrvl/phv63WggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOjI
// SIG // 2MgwIhgPMjAyMzEwMDUwNjQwMDhaGA8yMDIzMTAwNjA2
// SIG // NDAwOFowdDA6BgorBgEEAYRZCgQBMSwwKjAKAgUA6MjY
// SIG // yAIBADAHAgEAAgIqqjAHAgEAAgITdzAKAgUA6MoqSAIB
// SIG // ADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZCgMC
// SIG // oAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqGSIb3
// SIG // DQEBCwUAA4IBAQCVtJIuV39YMuPdonkakJrRLicIAec2
// SIG // 8henNujNFRVnnU9wXvQTcwOLpbrFhPc0I4Y558LUnoQB
// SIG // nQ+23xCuqzawfE5UeTnOOy9lOKOVOna9RCVS0Knxjdp9
// SIG // Bwzj70GKSTxDe4OTA3WfdQ5DTeTKks1+nxDKDFS6mrwd
// SIG // TAsxg1KdcS9CqA5O5NmrH/8vgK4uenvhBhxdxdLeDhR6
// SIG // L5eWy+X7F8ijQzejXXUVtJQj06ouVeF4PN9DyjoIv0/t
// SIG // xLv1pfp0T+3K2r22tvJ8M/rYvf19KYSGgNNx4qgltcwf
// SIG // BX9GjqsVmklF5vT/jrgksfys3PtIrrnm6VVkQxbCXxka
// SIG // HXwvMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTACEzMAAAHXmw0eVy6MUY4AAQAAAdcw
// SIG // DQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJAzEN
// SIG // BgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQgRDTo
// SIG // 80jYf3cdqQUWONTxeNVHWDZjP5j3grveX3vbR+8wgfoG
// SIG // CyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCCc3j5eS159
// SIG // T4qjY8fGDe0zdWSNHdWV/9s0XZyPe6yaOzCBmDCBgKR+
// SIG // MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAB
// SIG // 15sNHlcujFGOAAEAAAHXMCIEIJrNWYp2z9hpkoZL2hjj
// SIG // I5NQkPueDNiyUs/5voL4fnd6MA0GCSqGSIb3DQEBCwUA
// SIG // BIICAF7X9+NkPOx7pSSq4RgbHAn1Rc2g4bCSnoloEvYu
// SIG // inz9H7i9fIGb3KMF9OnCfxwcd/ByL6bhulDtEAYpGakj
// SIG // DUJlFiPSDcKvyR4pj2a1jQsWBhLCw/jUjyRJvfr1xPC8
// SIG // sSzUFYzq/18kWwNseggy2iPRn5XT4JP4Pbvklm7Eux2l
// SIG // XkSeg2+W+ja4t8aWQyKIlnsq2eJW7SvligXAQ74rHmw7
// SIG // Gp0TKmQVnXIeNd+6dJikJfl5PberlrjZyZrhHh8foxeF
// SIG // uYvIm8emjDchztUlMMTUjmkpFJhypsdhoM7Nk17fMTsw
// SIG // S95eHHbIGRxqRLt+cHh92nDI934/85EhU7d7c4QE8moJ
// SIG // zt9IJGXX8BYAPpVo2ETcjhADljxjRyGTiJeGH46JjsPM
// SIG // 8dnHaVm8ntBmc0mdLiYHdWU6Di+6ehl2GXLbpBhfxdTh
// SIG // cXlNA1zG4l7TMMo0+QrFUJ11A+uXlFq3uR10nW9tOiVn
// SIG // HmbnO/LG0EeVrhHyiimVmRPBPBdcYJV0sZ/+m8vXxPAD
// SIG // CliIDUrspEeWA8GNBx82A1pDVywfNSD5YOfnb1/q+1oj
// SIG // x7Yzw+ia3lL+shIbzDYfJYNrx9AsXpblnh2T/6cXVJ0m
// SIG // fIg9pCe0BfaAkt0xT1YzYMnECPMO/uALg93koQEpzK/G
// SIG // lXr7ZwcHGt+1eux/B6GDPZKtZJ4s
// SIG // End signature block
