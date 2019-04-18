/*
jQWidgets v7.1.0 (2019-Feb)
Copyright (c) 2011-2019 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function (a) {
    a.jqx.jqxWidget("jqxTabs", "", {});
    a.extend(a.jqx._jqxTabs.prototype, {
        defineInstance: function () {
            var b = {
                scrollAnimationDuration: 200,
                enabledHover: true,
                disabled: false,
                collapsible: false,
                animationType: "none",
                enableScrollAnimation: true,
                contentTransitionDuration: 450,
                toggleMode: "click",
                selectedItem: 0,
                height: "auto",
                width: "auto",
                position: "top",
                selectionTracker: false,
                scrollable: true,
                scrollPosition: "right",
                scrollStep: 70,
                autoHeight: true,
                headerHeight: null,
                showCloseButtons: false,
                canCloseAllTabs: true,
                closeButtonSize: 16,
                arrowButtonSize: 16,
                keyboardNavigation: true,
                reorder: false,
                selectionTrackerAnimationDuration: 300,
                _isTouchDevice: false,
                roundedCorners: true,
                _headerExpandingBalance: 0,
                _dragStarted: false,
                _tabCaptured: false,
                _lastUnorderedListPosition: 0,
                _selectedItem: 0,
                _titleList: [],
                _contentList: [],
                _contentWrapper: null,
                _unorderedList: null,
                _scrollTimeout: null,
                isCollapsed: false,
                touchMode: false,
                initTabContent: null,
                enableDropAnimation: false,
                _currentEvent: null,
                _needScroll: true,
                _isAnimated: {},
                _events: ["created", "selected", "add", "removed", "enabled", "disabled", "selecting", "unselecting", "unselected", "dragStart", "dragEnd", "locked", "unlocked", "collapsed", "expanded", "tabclick"],
                _initTabContentList: [],
                _invalidArgumentExceptions: {
                    invalidScrollAnimationDuration: "The scroll animation duration is not valid!",
                    invalidWidth: "Width you've entered is invalid!",
                    invalidHeight: "Height you've entered is invalid!",
                    invalidAnimationType: "You've entered invalid animation type!",
                    invalidcontentTransitionDuration: "You've entered invalid value for contentTransitionDuration!",
                    invalidToggleMode: "You've entered invalid value for toggleMode!",
                    invalidPosition: "You've entered invalid position!",
                    invalidScrollPosition: "You've entered invalid scroll position!",
                    invalidScrollStep: "You've entered invalid scroll step!",
                    invalidStructure: "Invalid structure!",
                    invalidArrowSize: "Invalid scroll button size!",
                    invalidCloseSize: "Invalid close button size!"
                },
                aria: {
                    "aria-disabled": {
                        name: "disabled",
                        type: "boolean"
                    }
                },
                rtl: false
            };
            if (this === a.jqx._jqxTabs.prototype) {
                return b
            }
            a.extend(true, this, b);
            return b
        },
        createInstance: function () {
            this._IE8 = a.jqx.browser.msie && a.jqx.browser.version < 9;
            a.jqx.aria(this);
            this.element.className += " " + this.toThemeProperty("jqx-tabs jqx-widget jqx-widget-content");
            this.element.setAttribute("role", "tablist");
            var e = this.host.children();
            for (var b = 0; b < e.length; b++) {
                var d = e[b];
                if (d.nodeName.toLowerCase() === "ul") {
                    this._unorderedList = d
                } else {
                    if (d.nodeName.toLowerCase() === "div") {
                        this._contentList.push(d)
                    }
                }
            }
            this._unorderedListHelper = a(this._unorderedList);
            if (this._unorderedListHelper.initAnimate) {
                this._unorderedListHelper.initAnimate()
            }
            this._closeButtonList = [];
            this._selectedItem = this.selectedItem;
            this._isTouchDevice = a.jqx.mobile.isTouchDevice();
            this._needScroll = this.scrollable;
            if (this.selectionTracker) {
                this.selectionTracker = this._seletionTrackerBrowserCheck()
            }
            if (this._isTouchDevice) {
                this.reorder = false;
                this.keyboardNavigation = false
            }
            this._titleList = this._unorderedListHelper.children();
            var c = this._titleList.length;
            while (c) {
                c--;
                this._titleList[c].setAttribute("role", "tab");
                if (!this._titleList[c].getAttribute("id")) {
                    this._titleList[c].setAttribute("id", this.element.id + "Tab" + c)
                }
                this._contentList[c].setAttribute("role", "tabpanel")
            }
            this._validateProperties();
            this._refresh();
            this._moveSelectionTrack(this._selectedItem, 0);
            if (this.disabled) {
                this.disable()
            }
            this.element.tabIndex = 0;
            this._raiseEvent(0);
            this._enableWindowResize()
        },
        _hiddenParent: function () {
            var c = this;
            if (c.host.css("display") === "none") {
                return true
            }
            var b = false;
            a.each(c.host.parents(), function () {
                if (a(this).css("display") === "none") {
                    b = true;
                    return false
                }
            });
            return b
        },
        _enableWindowResize: function () {
            var b = this;
            var c = a.jqx.isHidden(b.host);
            a.jqx.utilities.resize(this.host, function () {
                if (c) {
                    b._uiRefresh(true);
                    c = false
                } else {
                    b.refresh()
                }
                b._refreshBarPosition()
            })
        },
        resize: function (c, b) {
            this.width = c;
            this.height = b;
            var d = a.jqx.isHidden(this.host);
            if (d) {
                this._uiRefresh(true);
                d = false
            } else {
                this.refresh()
            }
        },
        refresh: function (b) {
            if (true !== b || b === undefined) {
                this._setSize()
            }
        },
        _seletionTrackerBrowserCheck: function () {
            var b = "Browser CodeName: " + navigator.appCodeName + "";
            b += "Browser Name: " + navigator.appName + "";
            b += "Browser Version: " + navigator.appVersion + "";
            b += "Platform: " + navigator.platform + "";
            b += "User-agent header: " + navigator.userAgent + "";
            if (b.indexOf("IEMobile") !== -1) {
                return false
            }
            if (b.indexOf("Windows Phone OS") !== -1) {
                return false
            }
            if (a.jqx.browser.msie && a.jqx.browser.version <= 7) {
                return false
            }
            return true
        },
        render: function () {
            this._refresh()
        },
        _uiRefresh: function (b) {
            this._unorderedListLeftBackup = this._unorderedListHelper.css("left");
            if (b) {
                this._render()
            }
            this._addStyles();
            this._performLayout();
            this._prepareTabs();
            this._removeEventHandlers();
            this._addEventHandlers();
            if (this._unorderedListLeftBackup === "auto") {
                this._unorderedListLeftBackup = this._getArrowsDisplacement()
            }
            this._unorderedList.style.left = this._toPx(this._unorderedListLeftBackup);
            if (this.rtl) {
                if (this.scrollable && this._rightArrow && a(this._rightArrow).css("visibility") !== "hidden") {
                    var e = 2 * this.arrowButtonSize;
                    var d = this._width(this.element) - parseInt(this._width(this._unorderedList) + e + parseInt(this._unorderedListHelper.css("margin-left"), 10), 10);
                    this._unorderedList.style.left = d + "px"
                }
            }
            var c = this;
            setTimeout(function () {
                c._performLayout()
            }, 100)
        },
        _refresh: function () {
            if (a.jqx.isHidden(this.host)) {
                return
            }
            this._uiRefresh(true);
            this.host.addClass("jqx-tabs-header-position-" + this.position)
        },
        _addStyles: function () {
            this._unorderedList.className += " " + this.toThemeProperty("jqx-tabs-title-container");
            this._unorderedList.style.outline = "none";
            this._unorderedList.style.whiteSpace = "nowrap";
            this._unorderedList.style.marginTop = "0px";
            this._unorderedList.style.marginBottom = "0px";
            this._unorderedList.style.padding = "0px";
            this._unorderedList.style.background = "transparent";
            this._unorderedList.style.border = "none";
            this._unorderedList.style.borderStyle = "none";
            this._unorderedList.style.textIndent = "0px";
            var c = this.length();
            while (c) {
                c--;
                var d = this._titleList[c],
                    b = "jqx-tabs-title jqx-item";
                d.style.padding = "";
                if (this.position === "bottom") {
                    b += " jqx-tabs-title-bottom"
                }
                if (d.disabled) {
                    b += " jqx-tabs-title-disable jqx-fill-state-disabled"
                }
                switch (this.position) {
                    case "top":
                        b += " jqx-rc-t";
                        this._removeClass(this._contentList[c], this.toThemeProperty("jqx-rc-t"));
                        this._contentList[c].className += " " + this.toThemeProperty("jqx-rc-b");
                        break;
                    case "bottom":
                        b += " jqx-rc-b";
                        this._removeClass(this._contentList[c], this.toThemeProperty("jqx-rc-b"));
                        this._contentList[c].className += " " + this.toThemeProperty("jqx-rc-t");
                        break
                }
                d.className = "jqx-reset jqx-disableselect " + this.toThemeProperty(b)
            }
            if (this.selectionTracker) {
                switch (this.position) {
                    case "top":
                        this._removeClass(this._selectionTracker, this.toThemeProperty("jqx-rc-b"));
                        this._selectionTracker.className += " " + this.toThemeProperty("jqx-rc-t");
                        break;
                    case "bottom":
                        this._removeClass(this._selectionTracker, this.toThemeProperty("jqx-rc-t"));
                        this._selectionTracker.className += " " + this.toThemeProperty("jqx-rc-b");
                        break
                }
            }
        },
        _raiseEvent: function (e, i) {
            var g = new a.Event(this._events[e]);
            g.owner = this;
            g.args = i;
            if (e === 6 || e === 7) {
                g.cancel = false;
                this._currentEvent = g
            }
            var b = "";
            try {
                b = this.host.trigger(g);
                if (e === 1) {
                    var f = this;
                    if (this.selectionTracker || this.animationType !== "none") {
                        setTimeout(function () {
                            if (!f._initTabContentList[f.selectedItem]) {
                                if (f.initTabContent) {
                                    f.initTabContent(f.selectedItem);
                                    f._initTabContentList[f.selectedItem] = true
                                }
                            }
                            var j = new a.Event("loadContent");
                            j.owner = this;
                            if (f._contentList.length > 0 && f._contentList[f.selectedItem]) {
                                a(f._contentList[f.selectedItem]).trigger(j)
                            }
                        }, 50 + f.selectionTrackerAnimationDuration)
                    } else {
                        var d = new a.Event("loadContent");
                        if (!f._initTabContentList[f.selectedItem]) {
                            if (f.initTabContent) {
                                f.initTabContent(f.selectedItem);
                                f._initTabContentList[f.selectedItem] = true
                            }
                        }
                        d.owner = this;
                        var h = new a.Event("resize");
                        this.host.trigger(h)
                    }
                }
            } catch (c) {
                if (c && console) {
                    console.log(c)
                }
            }
            return b
        },
        _getArrowsDisplacement: function () {
            if (!this._needScroll) {
                return 0
            }
            var d;
            var c = this.arrowButtonSize;
            var b = this.arrowButtonSize;
            if (this.scrollPosition === "left") {
                d = c + b
            } else {
                if (this.scrollPosition === "both") {
                    d = c
                } else {
                    d = 0
                }
            }
            return d
        },
        _scrollRight: function (e) {
            this._stop(this._unorderedListHelper);
            this._unlockAnimation("unorderedList");
            var f = parseInt(this._width(this._unorderedList) + parseInt(this._unorderedListHelper.css("margin-left"), 10), 10),
                h = this._width(this.element),
                g, i, b = parseInt(this._unorderedListHelper.css("left"), 10),
                c = this._getArrowsDisplacement(),
                d = 0,
                j;
            if (this.scrollable) {
                g = this._leftArrow.offsetWidth;
                i = this._rightArrow.offsetWidth
            } else {
                g = 0;
                i = 0
            }
            e = (this.enableScrollAnimation) ? e : 0;
            if (this._width(this._headerWrapper) > parseInt(this._unorderedListHelper.css("margin-left"), 10) + this._width(this._unorderedList)) {
                d = c
            } else {
                if (Math.abs(b) + this.scrollStep < Math.abs(h - f) + g + i + c) {
                    d = b - this.scrollStep;
                    j = b - this.scrollStep + parseInt(a(this._titleList[this._selectedItem]).position().left, 10)
                } else {
                    d = h - f - (2 * this.arrowButtonSize - c);
                    if (d < parseInt(this._unorderedListHelper.css("left"), 10) - 4 && d > parseInt(this._unorderedListHelper.css("left"), 10) + 4) {
                        j = h - f - g - i + parseInt(a(this._titleList[this._selectedItem]).position().left, 10)
                    }
                }
            }
            this._performScrollAnimation(d, j, e)
        },
        _scrollLeft: function (f) {
            this._stop(this._unorderedListHelper);
            this._unlockAnimation("unorderedList");
            var b = parseInt(this._unorderedListHelper.css("left"), 10),
                c = this._getArrowsDisplacement(),
                e = 0,
                d;
            f = (this.enableScrollAnimation) ? f : 0;
            if (this._width(this._headerWrapper) >= this._width(this._unorderedList)) {
                e = c
            } else {
                if (b + this.scrollStep < c) {
                    e = b + this.scrollStep;
                    d = b + this.scrollStep + parseInt(a(this._titleList[this._selectedItem]).position().left, 10)
                } else {
                    e = c;
                    if (e < parseInt(this._unorderedListHelper.css("left"), 10) - 4 && e > parseInt(this._unorderedListHelper.css("left"), 10) + 4) {
                        d = parseInt(a(this._titleList[this._selectedItem]).position().left, 10)
                    }
                }
            }
            this._performScrollAnimation(e, d, f)
        },
        _performScrollAnimation: function (e, d, c) {
            var b = this;
            if (d !== undefined) {
                this._moveSelectionTrack(this._selectedItem, 0, d)
            }
            this._lockAnimation("unorderedList");
            b._refreshBarPosition();
            this._unorderedListHelper.animate({
                left: e
            }, c, function () {
                b._moveSelectionTrack(b.selectedItem, 0);
                b._unlockAnimation("unorderedList");
                b._refreshBarPosition()
            })
        },
        _addKeyboardHandlers: function () {
            var b = this;
            if (this.keyboardNavigation) {
                this.addHandler(this.host, "keydown", function (e) {
                    if (!b._activeAnimation()) {
                        var f = b._selectedItem;
                        var d = b.selectionTracker;
                        var c = b.getContentAt(f);
                        if (a(e.target).ischildof(c)) {
                            return true
                        }
                        if (a(document.activeElement).ischildof(a(c))) {
                            return true
                        }
                        switch (e.keyCode) {
                            case 37:
                                if (b.rtl) {
                                    b.next()
                                } else {
                                    b.previous()
                                }
                                return false;
                            case 39:
                                if (b.rtl) {
                                    b.previous()
                                } else {
                                    b.next()
                                }
                                return false;
                            case 36:
                                b.first();
                                return false;
                            case 35:
                                b.last();
                                return false;
                            case 27:
                                if (b._tabCaptured) {
                                    b._cancelClick = true;
                                    b._uncapture(null, b.selectedItem);
                                    b._tabCaptured = false
                                }
                                break
                        }
                        b.selectionTracker = d
                    }
                    return true
                })
            }
        },
        _addScrollHandlers: function () {
            var b = this;
            this.addHandler(this._leftArrow, "mousedown", function () {
                b._startScrollRepeat(true, b.scrollAnimationDuration)
            });
            this.addHandler(this._rightArrow, "mousedown", function () {
                b._startScrollRepeat(false, b.scrollAnimationDuration)
            });
            this.addHandler(this._rightArrow, "mouseleave", function () {
                clearTimeout(b._scrollTimeout)
            });
            this.addHandler(this._leftArrow, "mouseleave", function () {
                clearTimeout(b._scrollTimeout)
            });
            this.addHandler(a(document), "mouseup.tab" + this.element.id, this._mouseUpScrollDocumentHandler, this);
            this.addHandler(a(document), "mouseleave.tab" + this.element.id, this._mouseLeaveScrollDocumentHandler, this)
        },
        _mouseLeaveScrollDocumentHandler: function (c) {
            var b = c.data;
            if (!b._scrollTimeout) {
                return
            }
            clearTimeout(b._scrollTimeout)
        },
        _mouseUpScrollDocumentHandler: function (c) {
            var b = c.data;
            clearTimeout(b._scrollTimeout)
        },
        _mouseUpDragDocumentHandler: function (c) {
            var b = c.data;
            if (b._tabCaptured && b._dragStarted) {
                b._uncapture(c)
            }
            b._tabCaptured = false
        },
        _addReorderHandlers: function () {
            var b = this;
            b.addHandler(a(document), "mousemove.tab" + b.element.id, b._moveElement, b);
            b.addHandler(a(document), "mouseup.tab" + b.element.id, b._mouseUpDragDocumentHandler, b)
        },
        _addEventHandlers: function () {
            var e = this.length();
            while (e) {
                e--;
                this._addEventListenerAt(e)
            }
            if (this.keyboardNavigation) {
                this._addKeyboardHandlers()
            }
            if (this.scrollable) {
                this._addScrollHandlers()
            }
            if (this.reorder && !this._isTouchDevice) {
                this._addReorderHandlers()
            }
            var d = this;
            try {
                if (document.referrer !== "" || window.frameElement) {
                    if (window.top !== null && window.top !== window.self) {
                        var c = function () {
                            if (d._tabCaptured) {
                                d._cancelClick = true;
                                d._uncapture(null, d.selectedItem);
                                d._tabCaptured = false
                            }
                        };
                        var f = null;
                        if (window.parent && document.referrer) {
                            f = document.referrer
                        }
                        if (f && f.indexOf(document.location.host) !== -1) {
                            if (window.top.document) {
                                this.addHandler(a(window.top.document), "mouseup.tabs" + this.element.id, c)
                            }
                        }
                    }
                }
            } catch (b) {}
        },
        focus: function () {
            try {
                this.host.focus();
                var c = this;
                setTimeout(function () {
                    c.host.focus()
                }, 25)
            } catch (b) {}
        },
        _getFocusedItem: function (c) {
            var d = this.length();
            while (d) {
                d--;
                var b = this._titleList[d],
                    g = this._outerWidth(b, true),
                    f = parseInt(a(b).offset().left, 10),
                    e = f;
                if ((e <= c && e + g >= c) && (b !== this._capturedElement) && (!this._titleList[d].locked) && (this._titleList[d].disabled !== true)) {
                    return d
                }
            }
            return -1
        },
        _uncapture: function (f) {
            var e = this.selectionTracker;
            this._unorderedListLeftBackup = this._unorderedListHelper.css("left");
            this._dragStarted = false;
            this._tabCaptured = false;
            var b = this._indexOf(this._capturedElement);
            if (!this._capturedElement) {
                return
            }
            switch (this.position) {
                case "top":
                    this._capturedElement.style.bottom = "0px";
                    break;
                case "bottom":
                    this._capturedElement.style.top = "0px";
                    break
            }
            var d;
            if (f) {
                d = this._getFocusedItem(f.clientX)
            }
            if (d === -1 || !f) {
                this._capturedElement.style.left = "0px"
            } else {
                this._raiseEvent(10, {
                    item: b,
                    dropIndex: d
                });
                this._reorderItems(d, b)
            }
            for (var c = 0; c < this._titleList.length; c++) {
                this._titleList[c].style.position = "static"
            }
            this._reorderHeaderElements();
            this._unorderedList.style.position = "relative";
            this._unorderedList.style.top = "0px";
            this._prepareTabs();
            if (d === -1 || !f) {
                this._selectedItem = b;
                this._moveSelectionTrack(b, 0);
                this._addSelectStyle(this._selectedItem, true)
            } else {
                this._moveSelectionTrack(this._selectedItem, 0);
                this._addSelectStyle(this._selectedItem, true)
            }
            if (document.selection) {
                document.selection.clear()
            }
            this._unorderedList.style.left = this._toPx(this._unorderedListLeftBackup);
            this.selectionTracker = e
        },
        _reorderItems: function (c, b) {
            var e = this._titleList[this.selectedItem],
                d = this._titleList[b];
            if (typeof this._capturedElement === "undefined") {
                this._capturedElement = d
            }
            a(d).remove();
            if (b < c) {
                if (this._titleList[c + 1]) {
                    this._unorderedList.insertBefore(d, this._titleList[c + 1])
                } else {
                    this._unorderedList.appendChild(d)
                }
            } else {
                this._unorderedList.insertBefore(d, this._titleList[c])
            }
            this._reorderElementArrays(c, b);
            this._getSelectedItem(e);
            this._removeEventHandlers();
            this._addEventHandlers()
        },
        _reorderElementArrays: function (e, b) {
            var f = this._contentList[b];
            if (b < e) {
                for (var d = b; d <= e; d++) {
                    this._titleList[d] = this._titleList[d + 1];
                    this._contentList[d] = this._contentList[d + 1]
                }
                this._contentList[e] = f;
                this._titleList[e] = this._capturedElement
            } else {
                for (var c = b; c >= e; c--) {
                    this._titleList[c] = this._titleList[c - 1];
                    this._contentList[c] = this._contentList[c - 1]
                }
                this._contentList[e] = f;
                this._titleList[e] = this._capturedElement
            }
        },
        getSelectedItem: function () {
            return this.selectedItem
        },
        _getSelectedItem: function (c) {
            var b = this.length();
            while (b) {
                b--;
                if (this._titleList[b] === c) {
                    this._selectedItem = this.selectedItem = b;
                    break
                }
            }
        },
        _moveElement: function (d) {
            var c = d.data;
            if (c._tabCaptured) {
                if (document.selection) {
                    document.selection.clear()
                }
                if (!c._dragStarted) {
                    var b = -parseInt(c._unorderedListHelper.css("left"), 10);
                    if (d.clientX + b > c._startX + 3 || d.clientX + b < c._startX - 3) {
                        c._prepareTabForDragging();
                        c._dragStarted = true
                    }
                } else {
                    c._performDrag(d);
                    clearTimeout(c._scrollTimeout)
                }
            }
        },
        _performDrag: function (d) {
            var c = this.getZoomFactor(),
                b = -parseInt(this._unorderedListHelper.css("left"), 10);
            this._capturedElement.style.left = this._toPx(b + d.clientX / c - this._startX / c);
            this._lastX = d.clientX / c;
            this._moveSelectionTrack(this.selectedItem, 0)
        },
        getZoomFactor: function () {
            var c = 1;
            if (document.body.getBoundingClientRect) {
                var d = document.body.getBoundingClientRect();
                var e = d.right - d.left;
                var b = document.body.offsetWidth;
                c = Math.round((e / b) * 100) / 100
            }
            return c
        },
        _prepareTabForDragging: function () {
            this._capturedElement.style.position = "relative";
            this._capturedElement.style.left = "0px";
            this._capturedElement.style.top = "0px";
            this._capturedElement.style.zIndex = 300;
            this.selectedItem = this._indexOf(this._capturedElement);
            switch (this.position) {
                case "top":
                    this._capturedElement.style.bottom = this._toPx(a(this._capturedElement).css("top"));
                    break;
                case "bottom":
                    this._capturedElement.style.top = this._toPx(a(this._capturedElement).css("top"));
                    break
            }
            this._raiseEvent(9, {
                item: this._indexOf(this._capturedElement)
            })
        },
        _dragScroll: function (d) {
            var b = parseInt(this._unorderedListHelper.css("left"), 10);
            var c = this,
                e = a(c._headerWrapper);
            if (d.clientX <= e.offset().left) {
                this._scrollLeft(this.scrollAnimationDuration);
                this._capturedElement.style.left = parseInt(a(this._capturedElement).css("left"), 10) + this._lastUnorderedListPosition - b
            } else {
                if (d.clientX > e.offset().left + c._width(this._headerWrapper)) {
                    this._scrollRight(this.scrollAnimationDuration);
                    this._capturedElement.style.left = parseInt(a(this._capturedElement).css("left"), 10) + this._lastUnorderedListPosition - b
                } else {
                    c._stop(c._unorderedListHelper);
                    this._unlockAnimation("unorderedList");
                    clearTimeout(this._scrollTimeout)
                }
            }
            this._scrollTimeout = setTimeout(function () {
                c._dragScroll(d)
            }, this.scrollAnimationDuration);
            this._lastUnorderedListPosition = b
        },
        _captureElement: function (d, c) {
            if (!this._tabCaptured && !this._titleList[c].locked && this._titleList[c].disabled !== true && !this._activeAnimation()) {
                var b = -parseInt(this._unorderedListHelper.css("left"), 10);
                this._startX = b + d.clientX;
                this._startY = d.clientY;
                this._lastX = d.clientX;
                this._lastY = d.clientY;
                this._tabCaptured = true;
                this._capturedElement = this._titleList[c]
            }
        },
        _titleInteractionTrigger: function (b) {
            if (this._headerExpandingBalance > 0) {
                this._removeOppositeBorder()
            }
            if (this._selectedItem !== b) {
                this.select(this._titleList[b], "toggle");
                this._titleList[b].collapsed = false;
                if (!this.collapsible) {
                    if (this.height !== "auto") {
                        this._contentWrapper.style.visibility = "visible"
                    } else {
                        this._contentWrapper.style.display = "block"
                    }
                }
            } else {
                if (this.collapsible) {
                    if (this.isCollapsed) {
                        this.expand()
                    } else {
                        this.collapse()
                    }
                }
            }
        },
        collapse: function () {
            var b = this._selectedItem,
                c = this;
            this.isCollapsed = true;
            if (c.height !== "auto") {
                c._contentWrapper.style.visibility = "hidden"
            } else {
                c._contentWrapper.style.display = "none"
            }
            c._raiseEvent(13, {
                item: b
            });
            if (this.position === "top") {
                c._headerWrapper.className += " " + this.toThemeProperty("jqx-tabs-header-collapsed");
                c.element.className += " " + this.toThemeProperty("jqx-tabs-collapsed")
            } else {
                c._headerWrapper.className += " " + this.toThemeProperty("jqx-tabs-header-collapsed-bottom");
                c.element.className += " " + this.toThemeProperty("jqx-tabs-collapsed-bottom")
            }
        },
        expand: function () {
            var b = this._selectedItem,
                c = this;
            this.isCollapsed = false;
            this._select(b, c.contentTransitionDuration, null, false, true);
            if (c.height !== "auto") {
                c._contentWrapper.style.visibility = "visible"
            } else {
                c._contentWrapper.style.display = "block"
            }
            c._raiseEvent(14, {
                item: b
            });
            if (this.position === "top") {
                c._removeClass(c._headerWrapper, c.toThemeProperty("jqx-tabs-header-collapsed"));
                c._removeClass(c.element, c.toThemeProperty("jqx-tabs-collapsed"))
            } else {
                c._removeClass(c._headerWrapper, c.toThemeProperty("jqx-tabs-header-collapsed-bottom"));
                c._removeClass(c.element, c.toThemeProperty("jqx-tabs-collapsed-bottom"))
            }
        },
        _addSelectHandler: function (b) {
            var c = this;
            this.addHandler(this._titleList[b], "selectstart", function () {
                return false
            });
            this.addHandler(this._titleList[b], this.toggleMode, (function (d) {
                return function () {
                    c._raiseEvent("15", {
                        item: d
                    });
                    if (!c._tabCaptured && !c._cancelClick) {
                        c._titleInteractionTrigger(d)
                    }
                    return true
                }
            }(b)))
        },
        _addDragDropHandlers: function (b) {
            var c = this;
            this.addHandler(this._titleList[b], "mousedown", function (d) {
                c._captureElement(d, b)
            });
            this.addHandler(this._titleList[b], "mouseup", function (d) {
                if (c._tabCaptured && c._dragStarted) {
                    c._cancelClick = true;
                    c._uncapture(d, b)
                } else {
                    c._cancelClick = false
                }
                c._tabCaptured = false;
                return false
            })
        },
        _removeHoverStates: function () {
            var b = this;
            a.each(this._titleList, function () {
                b._removeClass(this, b.toThemeProperty("jqx-tabs-title-hover-top jqx-tabs-title-hover-bottom"))
            })
        },
        _addHoverHandlers: function (b) {
            var d = this;
            var c = this._titleList[b];
            this.addHandler(c, "mouseenter mouseleave", function (g) {
                if (b !== d._selectedItem) {
                    var f = "jqx-fill-state-hover";
                    if (d.position === "top") {
                        f += " jqx-tabs-title-hover-top"
                    } else {
                        f += " jqx-tabs-title-hover-bottom"
                    }
                    if (g.type === "mouseenter") {
                        c.className += " " + d.toThemeProperty(f)
                    } else {
                        d._removeClass(c, d.toThemeProperty(f))
                    }
                    if (d.showCloseButtons) {
                        var e = d._closeButtonList[b];
                        if (g.type === "mouseenter") {
                            e.className += " " + d.toThemeProperty("jqx-tabs-close-button-hover", true)
                        } else {
                            d._removeClass(e, d.toThemeProperty("jqx-tabs-close-button-hover", true))
                        }
                    }
                }
            })
        },
        _addEventListenerAt: function (c) {
            var d = this;
            if (this._titleList[c].disabled) {
                return
            }
            if (this.reorder && !this._isTouchDevice) {
                this._addDragDropHandlers(c)
            }
            this._addSelectHandler(c);
            if (this.enabledHover) {
                this._addHoverHandlers(c)
            }
            var b = d._closeButtonList[c];
            this.removeHandler(b, "click");
            this.addHandler(b, "click", function () {
                d.removeAt(c);
                return false
            })
        },
        _removeEventHandlers: function () {
            var c = this;
            var b = c.length();
            while (b) {
                b--;
                c._removeEventListenerAt(b)
            }
            if (c.scrollable) {
                c.removeHandler(c._leftArrow, "mousedown");
                c.removeHandler(c._rightArrow, "mousedown")
            }
            c.removeHandler(a(document), "mousemove.tab" + c.element.id, c._moveElement);
            c.removeHandler(a(document), "mouseup.tab" + c.element.id, c._mouseUpScrollDocumentHandler);
            c.removeHandler(a(document), "mouseup.tab" + c.element.id, c._mouseUpDragDocumentHandler);
            c.removeHandler(c.host, "keydown")
        },
        _removeEventListenerAt: function (b) {
            var c = this;
            c.removeHandler(c._titleList[b], c.toggleMode);
            c.removeHandler(c._titleList[b], "mouseenter");
            c.removeHandler(c._titleList[b], "mouseleave");
            c.removeHandler(c._titleList[b], "mousedown");
            c.removeHandler(c._titleList[b], "mouseup");
            c.removeHandler(c._closeButtonList[b], "click")
        },
        _moveSelectionTrack: function (n, c, b) {
            var h = this;
            if (n === -1) {
                return
            }
            if (this._titleList.length === 0) {
                return
            }
            if (n >= this._titleList.length) {
                return
            }
            var m = this._titleList[n],
                o = a(m);
            h._refreshBarPosition();
            if (this.selectionTracker && this._selectionTracker) {
                var i;
                h._stop(h._selectionTrackerHelper);
                this._unlockAnimation("selectionTracker");
                if (b === undefined) {
                    i = parseInt(o.position().left, 10);
                    if (!isNaN(parseInt(this._unorderedListHelper.css("left"), 10))) {
                        i += parseInt(this._unorderedListHelper.css("left"), 10)
                    }
                    if (!isNaN(parseInt(this._unorderedListHelper.css("margin-left"), 10))) {
                        i += parseInt(this._unorderedListHelper.css("margin-left"), 10)
                    }
                    if (!isNaN(parseInt(o.css("margin-left"), 10))) {
                        i += parseInt(o.css("margin-left"), 10)
                    }
                    if (!isNaN(parseInt(o.css("margin-right"), 10))) {}
                } else {
                    i = b
                }
                var g = 0;
                var e = 0;
                if (this.position === "top") {
                    g = this._height(h._headerWrapper) - m.offsetHeight;
                    if (!this.autoHeight) {
                        e += parseInt(o.css("margin-top"), 10)
                    }
                }
                this._lockAnimation("selectionTracker");
                var l = parseInt(o.css("padding-left"), 10) + parseInt(o.css("padding-right"), 10);
                var f = this.position === "top" ? 0 : 1;
                var k = parseInt(a(this._headerWrapper).css("padding-top"), 10);
                var j = parseInt(o.css("padding-top"), 10) + parseInt(o.css("padding-bottom"), 10);
                this._selectionTracker.style.visibility = "visible";
                this._moveSelectionTrackerContainer.style.visibility = "visible";
                var d = parseInt(o.css("margin-top"), 10);
                if (isNaN(d)) {
                    d = 0
                }
                h._refreshBarPosition();
                h._selectionTrackerHelper.animate({
                    top: k + d - f,
                    left: i + "px",
                    height: parseInt(this._height(m) + j, 10),
                    width: h._width(m) + l
                }, c, function () {
                    h._unlockAnimation("selectionTracker");
                    h._selectionTracker.style.visibility = "hidden";
                    h._addSelectStyle(n, true);
                    h._moveSelectionTrackerContainer.style.visibility = "hidden"
                })
            }
        },
        destroy: function () {
            a.jqx.utilities.resize(this.host, null, true);
            if (document.referrer != "" || window.frameElement) {
                if (window.top != null && window.top != window.self) {
                    this.removeHandler(a(window.top.document), "mouseup.tabs" + this.element.id)
                }
            }
            this.host.remove()
        },
        _switchTabs: function (b, d) {
            if (b !== d && !this._activeAnimation() && !this._tabCaptured) {
                var c = this;
                this._raiseEvent(7, {
                    item: d
                });
                this._raiseEvent(6, {
                    item: b
                });
                if (this._currentEvent) {
                    if (this._currentEvent.cancel) {
                        this._currentEvent = null;
                        return
                    }
                }
                this._unselect(d, null, true);
                this._select(b, c.contentTransitionDuration, null, true);
                return true
            }
            return false
        },
        _activeAnimation: function () {
            for (var b in this._isAnimated) {
                if (this._isAnimated.hasOwnProperty(b)) {
                    if (this._isAnimated[b]) {
                        return true
                    }
                }
            }
            return false
        },
        _indexOf: function (c) {
            var b = this.length();
            while (b) {
                b--;
                if (this._titleList[b] === c || this._contentList[b] === c) {
                    return b
                }
            }
            return -1
        },
        _validateProperties: function () {
            try {
                if (this.scrollAnimationDuration < 0 || isNaN(this.scrollAnimationDuration)) {
                    throw new Error(this._invalidArgumentExceptions.invalidScrollAnimationDuration)
                }
                if (parseInt(this.width, 10) < 0 && this.width !== "auto") {
                    throw new Error(this._invalidArgumentExceptions.invalidWidth)
                }
                if (parseInt(this.height, 10) < 0 && this.height !== "auto") {
                    throw new Error(this._invalidArgumentExceptions.invalidHeight)
                }
                if (this.animationType !== "none" && this.animationType !== "fade") {
                    throw new Error(this._invalidArgumentExceptions.invalidAnimationType)
                }
                if (this.contentTransitionDuration < 0 || isNaN(this.contentTransitionDuration)) {
                    throw new Error(this._invalidArgumentExceptions.invalidcontentTransitionDuration)
                }
                if (this.toggleMode !== "click" && this.toggleMode !== "dblclick" && this.toggleMode !== "mouseenter" && this.toggleMode !== "none") {
                    throw new Error(this._invalidArgumentExceptions.invalidToggleMode)
                }
                if (this.position !== "top" && this.position !== "bottom") {
                    throw new Error(this._invalidArgumentExceptions.invalidPosition)
                }
                if (this.scrollPosition !== "left" && this.scrollPosition !== "right" && this.scrollPosition !== "both") {
                    throw new Error(this._invalidArgumentExceptions.invalidScrollPosition)
                }
                if (this.scrollStep < 0 || isNaN(this.scrollStep)) {
                    throw new Error(this._invalidArgumentExceptions.invalidScrollStep)
                }
                if (this._titleList.length !== this._contentList.length || this._titleList.length === 0) {
                    throw new Error(this._invalidArgumentExceptions.invalidStructure)
                }
                if (this.arrowButtonSize < 0 || isNaN(this.arrowButtonSize)) {
                    throw new Error(this._invalidArgumentExceptions.invalidArrowSize)
                }
                if (this.closeButtonSize < 0 || isNaN(this.closeButtonSize)) {
                    throw new Error(this._invalidArgumentExceptions.invalidCloseSize)
                }
            } catch (b) {
                try {
                    console.log(b)
                } catch (c) {}
            }
        },
        _startScrollRepeat: function (d, c) {
            var b = this;
            if (d) {
                this._scrollLeft(c)
            } else {
                this._scrollRight(c)
            }
            if (this._scrollTimeout) {
                clearTimeout(this._scrollTimeout)
            }
            this._scrollTimeout = setTimeout(function () {
                b._startScrollRepeat(d, b.scrollAnimationDuration)
            }, c)
        },
        _performLayout: function () {
            var b = this.length();
            while (b) {
                b--;
                if (this.position === "top" || this.position === "bottom") {
                    if (this.rtl) {
                        this._titleList[b].style["float"] = "right"
                    } else {
                        this._titleList[b].style["float"] = "left"
                    }
                }
            }
            this._fitToSize();
            this._performHeaderLayout();
            this._fitToSize()
        },
        updatetabsheader: function () {
            this._performHeaderLayout()
        },
        _setSize: function () {
            var b = this;
            b._fitToSize();
            b._positionArrows(b._totalItemsWidth);
            if (b._totalItemsWidth > b.element.offsetWidth) {
                b._unorderedList.style.width = b._toPx(b._totalItemsWidth)
            } else {
                b._unorderedList.style.width = b.element.offsetWidth - 2 + "px"
            }
            b._fitToSize()
        },
        _addArrows: function () {
            if (this._leftArrow && this._rightArrow) {
                a(this._leftArrow).remove();
                a(this._rightArrow).remove()
            }
            this._leftArrow = document.createElement("div");
            this._leftArrow.innerHTML = '<span style="display: block; width: 16px; height: 16px;" class="' + this.toThemeProperty("jqx-tabs-arrow-left") + '"></span>';
            this._leftArrow.className = this.toThemeProperty("jqx-tabs-arrow-background jqx-widget-header");
            this._leftArrow.style.zIndex = 30;
            this._leftArrow.style.display = "none";
            this._leftArrow.style.width = this._toPx(this.arrowButtonSize);
            this._leftArrow.style.height = "100%";
            this._rightArrow = document.createElement("div");
            this._rightArrow.innerHTML = '<span style="display: block; width: 16px; height: 16px;" class="' + this.toThemeProperty("jqx-tabs-arrow-right") + '"></span>';
            this._rightArrow.className = this.toThemeProperty("jqx-tabs-arrow-background jqx-widget-header");
            this._rightArrow.style.zIndex = 30;
            this._rightArrow.style.display = "none";
            this._rightArrow.style.width = this._toPx(this.arrowButtonSize);
            this._rightArrow.style.height = "100%";
            this._headerWrapper.appendChild(this._leftArrow);
            this._headerWrapper.appendChild(this._rightArrow)
        },
        _tabsWithVisibleCloseButtons: function () {
            if (!this.showCloseButtons) {
                return 0
            }
            var b = this.length();
            a.each(this._titleList, function () {
                var c = this.attr("hasclosebutton");
                if (c !== undefined && c !== null) {
                    if (c === "false" || c === false) {
                        b--
                    }
                }
            });
            return b
        },
        _calculateTitlesSize: function () {
            var g = this;

            function f(n, m) {
                if (n) {
                    if (m) {
                        n.style.display = "block"
                    } else {
                        n.style.display = "none"
                    }
                }
            }
            var l = 0;
            var k = 0;
            var h = this.length();
            if (this.rtl && a.jqx.browser.msie && a.jqx.browser.version < 8) {
                this._measureItem = document.createElement("span");
                this._measureItem.style.position = "relative";
                this._measureItem.style.visibility = "hidden";
                document.body.appendChild(this._measureItem)
            }
            while (h) {
                h--;
                var j = this._titleList[h],
                    b = g._closeButtonList[h];
                if (this._measureItem) {
                    this._measureItem.innerHTML = j.innerHTML;
                    this._measureItem.html(this._titleList[h].html());
                    j.style.width = g._toPx(g._width(this._measureItem))
                }
                j.style.position = "static";
                f(b, false);
                k += g._outerWidth(j, true);
                var e = g._outerHeight(j, true);
                if (l < e) {
                    l = e
                }
                if (g._height(j) === 0) {
                    var i = j.cloneNode(true);
                    document.body.appendChild(i);
                    l = g._outerHeight(i, true);
                    document.body.removeChild(i)
                }
                var c = j.getAttribute("hasCloseButton");
                var d;
                if (c !== undefined && c !== null) {
                    d = false;
                    if (this.hiddenCloseButtons) {
                        if (this.hiddenCloseButtons[h] === 1) {
                            f(b, false);
                            d = true
                        }
                    }
                    if (!d) {
                        if (c === "true" || c === true) {
                            k += this.closeButtonSize;
                            f(b, true)
                        } else {
                            if (c === "false" || c === false) {
                                f(b, false)
                            }
                        }
                    }
                } else {
                    if (this.showCloseButtons && (this.canCloseAllTabs || this._tabsWithVisibleCloseButtons() > 1)) {
                        d = false;
                        if (this.hiddenCloseButtons) {
                            if (this.hiddenCloseButtons[h] === 1) {
                                f(b, false);
                                d = true
                            }
                        }
                        if (!d) {
                            k += this.closeButtonSize;
                            f(b, true)
                        }
                    }
                }
                j.style.height = this._toPx(g._height(j))
            }
            if (this._measureItem) {
                a(this._measureItem).remove()
            }
            return {
                height: l,
                width: 10 + k
            }
        },
        _reorderHeaderElements: function () {
            if (this.selectionTracker) {
                this._moveSelectionTrackerContainer.style.position = "absolute";
                this._moveSelectionTrackerContainer.style.height = "100%";
                this._moveSelectionTrackerContainer.style.top = "0px";
                this._moveSelectionTrackerContainer.style.left = "0px";
                this._moveSelectionTrackerContainer.style.width = "100%"
            }
            this._headerWrapper.style.position = "relative";
            this._headerWrapper.style.left = "0px";
            this._headerWrapper.style.top = "0px";
            if (this.scrollable) {
                this._rightArrow.style.width = this._toPx(this.arrowButtonSize);
                this._rightArrow.style.position = "absolute";
                this._rightArrow.style.top = "0px";
                this._leftArrow.style.width = this._toPx(this.arrowButtonSize);
                this._leftArrow.style.position = "absolute";
                this._leftArrow.style.top = "0px";
                var c = this.theme && this.theme.indexOf("ui-") !== -1 ? 3 : 0;
                if (c > 0) {
                    this._rightArrow.className += " " + this.toThemeProperty("jqx-rc-r");
                    this._leftArrow.className += " " + this.toThemeProperty("jqx-rc-l")
                }
                var b = this.scrollPosition;
                if (this.rtl) {
                    if (b === "left") {
                        b = "right"
                    }
                    if (b === "right") {
                        b = "left"
                    }
                }
                switch (b) {
                    case "both":
                        this._rightArrow.style.right = "0px";
                        this._leftArrow.style.left = "0px";
                        break;
                    case "left":
                        this._rightArrow.style.left = this._toPx(this.arrowButtonSize);
                        this._leftArrow.style.left = "0px";
                        break;
                    case "right":
                        this._rightArrow.style.right = this._toPx(-c);
                        this._leftArrow.style.right = this._toPx(parseInt(this.arrowButtonSize, 10) - c);
                        break
                }
            }
        },
        _positionArrows: function (b) {
            if (b >= this._headerWrapper.offsetWidth && this.scrollable) {
                this._needScroll = true;
                if (this._unorderedListHelper.position().left === 0) {
                    this._unorderedListLeftBackup = this._getArrowsDisplacement() + "px"
                }
                this._leftArrow.style.display = "block";
                this._rightArrow.style.display = "block"
            } else {
                this._needScroll = false;
                this._leftArrow.style.display = "none";
                this._rightArrow.style.display = "none";
                this._unorderedList.style.left = "0px"
            }
        },
        _performHeaderLayout: function () {
            this._removeSelectStyle();
            var b = this._calculateTitlesSize();
            var e = b.height;
            var c = b.width;
            this._headerWrapper.style.height = this._toPx(e);
            this._unorderedList.style.height = this._toPx(e);
            if (this.headerHeight !== null && this.headerHeight !== "auto") {
                this._headerWrapper.style.height = this._toPx(this.headerHeight);
                this._unorderedList.style.height = this._toPx(this.headerHeight)
            }
            var d = this._width(this.element);
            if (c > d) {
                this._unorderedList.style.width = this._toPx(c)
            } else {
                this._unorderedList.style.width = this._toPx(d)
            }
            if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
                this._unorderedList.style.position = "relative";
                this._unorderedList.style.overflow = "hidden"
            }
            this._reorderHeaderElements();
            c = c + parseInt(this._unorderedListHelper.css("margin-left"), 10);
            this._totalItemsWidth = c;
            this._positionArrows(c);
            this._unorderedList.style.position = "relative";
            this._unorderedList.style.top = "0px";
            this._verticalAlignElements();
            this._moveSelectionTrack(this._selectedItem, 0);
            this._addSelectStyle(this.selectedItem)
        },
        _verticalAlignElements: function () {
            var j = this.length();
            while (j) {
                j--;
                var n = this._titleList[j],
                    p = a(n),
                    b = p.children()[0],
                    m = this._closeButtonList[j],
                    k = parseInt(p.css("padding-top"), 10);
                if (!k) {
                    k = 0
                }
                if (this.autoHeight) {
                    var c = parseInt(p.css("padding-top"), 10),
                        o = parseInt(p.css("padding-bottom"), 10),
                        i = p.css("border-top-width"),
                        f = p.css("border-bottom-width");
                    if (i.indexOf("px") === -1) {
                        i = 1
                    } else {
                        i = parseInt(i, 10)
                    }
                    if (f.indexOf("px") === -1) {
                        f = 1
                    } else {
                        f = parseInt(f, 10)
                    }
                    n.style.height = this._toPx(this._outerHeight(this._unorderedList, true) - (c + o + i + f))
                } else {
                    if (this.position === "top") {
                        var h = this._height(this._unorderedList) - parseInt(this._outerHeight(n, true), 10);
                        if (parseInt(p.css("margin-top"), 10) !== h && h !== 0) {
                            n.style.marginTop = this._toPx(h)
                        }
                    } else {
                        n.style.height = this._toPx(this._height(n))
                    }
                }
                b.style.height = "100%";
                var e = this._height(n);
                if (m) {
                    var g = e / 2 - this._height(m) / 2;
                    m.style.marginTop = this._toPx(1 + g)
                }
                var l = e / 2 - this._height(b) / 2;
                b.style.marginTop = this._toPx(l)
            }
            if (this.scrollable) {
                var d = (parseInt(this._headerWrapper.offsetHeight, 10) - this.arrowButtonSize) / 2;
                a(this._rightArrow).children()[0].style.marginTop = this._toPx(d);
                this._rightArrow.style.height = "100%";
                a(this._leftArrow).children()[0].style.marginTop = this._toPx(d);
                this._leftArrow.style.height = "100%"
            }
        },
        _getImageUrl: function (c) {
            var b = c.css("background-image");
            b = b.replace('url("', "");
            b = b.replace('")', "");
            b = b.replace("url(", "");
            b = b.replace(")", "");
            return b
        },
        _fitToSize: function () {
            var c = false;
            var e = false;
            var d = this;
            if (d.width !== null && d.width.toString().indexOf("%") !== -1) {
                c = true
            }
            if (d.height !== null && d.height.toString().indexOf("%") !== -1) {
                e = true
            }
            if (c) {
                this.element.style.width = this.width;
                this._contentWrapper.style.width = "100%"
            } else {
                d.element.style.width = d._toPx(d.width);
                if (this.width !== "auto") {
                    this._contentWrapper.style.width = "100%"
                }
            }
            var b;
            if (e) {
                this.element.style.height = this.height;
                this._contentWrapper.style.width = "100%";
                this._contentWrapper.style.height = "auto";
                b = this.element.offsetHeight - this._headerWrapper.offsetHeight - 2;
                this._contentWrapper.style.height = b + "px"
            } else {
                if (this.height !== "auto") {
                    d.element.style.height = d._toPx(d.height);
                    b = this._height(d.element) - this._headerWrapper.offsetHeight;
                    this._contentWrapper.style.height = d._toPx(b)
                } else {
                    this._contentWrapper.style.height = "auto"
                }
            }
        },
        _maxHeightTab: function () {
            var c = this.length();
            var d = -1;
            var b = -1;
            while (c) {
                c--;
                if (d < this._outerHeight(this._titleList[c], true)) {
                    b = c
                }
            }
            return b
        },
        _addSelectionTracker: function () {
            if (this._moveSelectionTrackerContainer) {
                a(this._moveSelectionTrackerContainer).remove()
            }
            this._moveSelectionTrackerContainer = document.createElement("div");
            this._moveSelectionTrackerContainer.className = this.toThemeProperty("jqx-tabs-selection-tracker-container");
            this._selectionTracker = document.createElement("div");
            this._selectionTracker.className = this.toThemeProperty("jqx-tabs-selection-tracker-" + this.position);
            this._selectionTracker.style.color = "inherit";
            this._selectionTracker.style.position = "absolute";
            this._selectionTracker.style.zIndex = 10;
            this._selectionTracker.style.left = "0px";
            this._selectionTracker.style.top = "0px";
            this._selectionTracker.style.display = "inline-block";
            this._moveSelectionTrackerContainer.appendChild(this._selectionTracker);
            this._headerWrapper.appendChild(this._moveSelectionTrackerContainer);
            this._selectionTrackerHelper = a(this._selectionTracker);
            if (this._selectionTrackerHelper.initAnimate) {
                this._selectionTrackerHelper.initAnimate()
            }
        },
        _addContentWrapper: function () {
            var e = "none";
            var b = this._contentWrapper === null;
            if (b) {
                this._contentWrapper = document.createElement("div");
                this._contentWrapper.className = this.toThemeProperty("jqx-tabs-content jqx-widget-content");
                this._contentWrapper.style["float"] = e
            }
            var d = this.length();
            while (d) {
                d--;
                this._contentList[d].className += " " + this.toThemeProperty("jqx-tabs-content-element")
            }
            if (b) {
                if (this.position === "top") {
                    this.element.appendChild(this._contentWrapper)
                } else {
                    this.element.insertBefore(this._contentWrapper, this.element.firstChild)
                }
                for (var c = 0; c < this._contentList.length; c++) {
                    this._contentWrapper.appendChild(this._contentList[c])
                }
            }
            if (this.roundedCorners) {
                if (this.position === "top") {
                    this._contentWrapper.className += " " + this.toThemeProperty("jqx-rc-b")
                } else {
                    this._contentWrapper.className += " " + this.toThemeProperty("jqx-rc-t")
                }
                this.element.className += " " + this.toThemeProperty("jqx-rc-all")
            }
        },
        _addHeaderWrappers: function () {
            var d = this.length();
            if (this._headerWrapper !== undefined) {
                a(this._headerWrapper).remove();
                if (this.bar) {
                    this.bar = null
                }
            }
            this._headerWrapper = document.createElement("div");
            this._headerWrapper.style.outline = "none";
            if (this.position === "top") {
                this.element.insertBefore(this._headerWrapper, this.element.firstChild)
            } else {
                this.element.appendChild(this._headerWrapper)
            }
            this._headerWrapper.appendChild(this._unorderedList);
            var b = "jqx-tabs-headerWrapper jqx-tabs-header jqx-widget-header";
            if (this.position === "bottom") {
                b += " jqx-tabs-header-bottom"
            }
            if (this.roundedCorners) {
                if (this.position === "top") {
                    b += " jqx-rc-t"
                } else {
                    b += " jqx-rc-b"
                }
            }
            this._headerWrapper.className = this.toThemeProperty(b);
            while (d) {
                d--;
                var e = this._titleList[d];
                if (e.querySelector(".jqx-tabs-titleWrapper") === null) {
                    var f = document.createElement("div");
                    f.className = "jqx-tabs-titleWrapper";
                    f.style.outline = "none";
                    f.style.position = "relative";
                    f.style.zIndex = 15;
                    var c = a(e).children();
                    f.appendChild(c[0]);
                    f.appendChild(c[1]);
                    e.appendChild(f)
                }
            }
        },
        _render: function () {
            this._addCloseButtons();
            this._addHeaderWrappers();
            this._addContentWrapper();
            if (this.selectionTracker) {
                this._addSelectionTracker()
            }
            this._addArrows()
        },
        _addCloseButton: function (c, e) {
            var d = document.createElement("div"),
                g = this._titleList[c];
            d.className = "jqx-tabs-titleContentWrapper jqx-disableselect";
            var f = "left";
            if (this.rtl) {
                f = "right"
            }
            if (a(g).find(".jqx-tabs-close-button").length > 0) {
                a(g).find(".jqx-tabs-close-button").remove()
            }
            d.style["float"] = f;
            d.innerHTML = g.innerHTML;
            g.innerHTML = "";
            var b = document.createElement("div");
            b.className = this.toThemeProperty("jqx-tabs-close-button");
            b.style.height = this._toPx(this.closeButtonSize);
            b.style.width = this._toPx(this.closeButtonSize);
            b.style["float"] = f;
            b.style.fontSize = "1px";
            g.appendChild(d);
            g.appendChild(b);
            if (e === true) {
                this._closeButtonList[c] = b
            } else {
                this._closeButtonList.splice(c, 0, b)
            }
            if (!this.showCloseButtons) {
                b.style.display = "none"
            } else {
                if (this.hiddenCloseButtons) {
                    if (this.hiddenCloseButtons[c] === 1) {
                        b.style.display = "none"
                    }
                }
            }
        },
        _addCloseButtons: function () {
            var b = this.length();
            while (b) {
                b--;
                this._addCloseButton(b, true)
            }
        },
        _prepareTabs: function () {
            var c = this.length();
            var b = this.selectionTracker;
            this.selectionTracker = false;
            while (c) {
                c--;
                if (this._selectedItem !== c) {
                    this._unselect(c, null, false)
                }
            }
            this._select(this._selectedItem, 0, null, false);
            this.selectionTracker = b;
            if (this.initTabContent) {
                if (!this._initTabContentList[this.selectedItem]) {
                    if (!this._hiddenParent()) {
                        this.initTabContent(this.selectedItem);
                        this._initTabContentList[this.selectedItem] = true
                    }
                }
            }
        },
        _isValidIndex: function (b) {
            return (b >= 0 && b < this.length())
        },
        _removeSelectStyle: function () {
            var d = this.length();
            while (d) {
                d--;
                var e = this._titleList[d];
                if (this.showCloseButtons) {
                    var c = this._closeButtonList[d];
                    this._removeClass(c, this.toThemeProperty("jqx-tabs-close-button-selected"))
                }
                var b = "jqx-fill-state-pressed";
                if (this.position === "top") {
                    b += " jqx-tabs-title-selected-top"
                } else {
                    b += " jqx-tabs-title-selected-bottom"
                }
                this._removeClass(e, this.toThemeProperty(b))
            }
        },
        _addSelectStyle: function (d, g) {
            this._removeSelectStyle();
            if (!this.selectionTracker || (g !== undefined && g)) {
                var f = this._titleList[d];
                if (d >= 0 && f !== undefined) {
                    var c = null;
                    if (this.showCloseButtons) {
                        c = this._closeButtonList[d];
                        if (this.hiddenCloseButtons) {
                            if (this.hiddenCloseButtons[d] === 1) {
                                c = null
                            }
                        }
                    }
                    var b = "jqx-fill-state-hover",
                        e = " jqx-fill-state-pressed";
                    if (this.position === "top") {
                        b += " jqx-tabs-title-hover-top";
                        e += " jqx-tabs-title-selected-top"
                    } else {
                        b += " jqx-tabs-title-hover-bottom";
                        e += " jqx-tabs-title-selected-bottom"
                    }
                    this._removeClass(f, this.toThemeProperty(b));
                    f.className += this.toThemeProperty(e);
                    if (c !== null) {
                        c.className += " " + this.toThemeProperty("jqx-tabs-close-button-selected")
                    }
                }
            }
        },
        _addItemTo: function (g, c, e) {
            if (c < g.length) {
                var b, f;
                for (var d = c; d + 1 < g.length; d++) {
                    if (b === undefined) {
                        b = g[d + 1];
                        g[d + 1] = g[d]
                    } else {
                        f = g[d + 1];
                        g[d + 1] = b;
                        b = f
                    }
                }
                if (b === undefined) {
                    b = g[c]
                }
                g[c] = e;
                g.push(b)
            } else {
                g.push(e)
            }
        },
        _refreshBarPosition: function () {
            var c = this;
            if (!this.bar) {
                var b = a("<span></span>");
                a(this._headerWrapper).append(b);
                b.addClass(this.toThemeProperty("jqx-tabs-bar"));
                this.bar = b
            }
            setTimeout(function () {
                var d = parseInt(c._unorderedListHelper.css("left"), 10);
                var e = parseInt(c._unorderedListHelper.css("margin-left"));
                c.bar.css("left", e + c._titleList[c._selectedItem].offsetLeft + d);
                c.bar.width(a(c._titleList[c._selectedItem]).outerWidth() - 2)
            })
        },
        _select: function (h, e, l, b, c) {
            if (!this._tabCaptured) {
                this.host.attr("hideFocus", "true");
                var g = this;
                if (c === undefined) {
                    this._addSelectStyle(h)
                } else {
                    this._addSelectStyle(h, c)
                }
                var k = a(g._titleList[h]),
                    d = g._titleList[h].getAttribute("id"),
                    j = a(g._contentList[h]);
                if (this.isCollapsed && this.collapsible) {
                    j[0].style.display = "none";
                    this._selectCallback(h, l, b);
                    return
                }
                g._refreshBarPosition();
                switch (this.animationType) {
                    case "none":
                        if (!g.selectionTracker) {
                            for (var f = 0; f < this._contentList.length; f++) {
                                if (h !== f && a(g._contentList[f]).css("display") === "block") {
                                    g._contentList[f].style.display = "none";
                                    a.jqx.aria(a(g._titleList[f]), "aria-selected", false);
                                    a.jqx.aria(a(g._contentList[f]), "aria-hidden", true)
                                }
                            }
                            j[0].style.display = "block";
                            a.jqx.aria(k, "aria-selected", true);
                            a.jqx.aria(j, "aria-hidden", false);
                            a.jqx.aria(this, "aria-activedescendant", d)
                        } else {
                            setTimeout(function () {
                                j[0].style.display = "block";
                                a.jqx.aria(k, "aria-selected", true);
                                a.jqx.aria(j, "aria-hidden", false);
                                a.jqx.aria(g, "aria-activedescendant", d)
                            }, this.selectionTrackerAnimationDuration)
                        }
                        this._selectCallback(h, l, b);
                        break;
                    case "fade":
                        this._lockAnimation("contentListSelect");
                        g._selectCallback(h, l, b);
                        if (j.initAnimate && j.fadeIn === undefined) {
                            j.initAnimate()
                        }
                        j.fadeIn({
                            duration: 1000,
                            complete: function () {
                                g._unlockAnimation("contentListSelect");
                                a.jqx.aria(k, "aria-selected", true);
                                a.jqx.aria(j, "aria-hidden", false);
                                a.jqx.aria(g, "aria-activedescendant", d)
                            }
                        });
                        break
                }
            }
        },
        _selectCallback: function (c, d, b) {
            this._selectedItem = c;
            this.selectedItem = this._selectedItem;
            if (d) {
                d()
            }
            if (b) {
                this._raiseEvent(1, {
                    item: c
                })
            }
        },
        _unselect: function (d, i, b) {
            if (d >= 0) {
                if (!this._tabCaptured) {
                    var g = this,
                        e = g._contentList[d],
                        c = a(e),
                        h = g._titleList[d],
                        f = a(h);
                    if (c.initAnimate && c.animate === undefined) {
                        c.initAnimate()
                    }
                    g._stop(c);
                    if (this.animationType === "fade") {
                        e.style.display = "none";
                        a.jqx.aria(f, "aria-selected", false);
                        a.jqx.aria(c, "aria-hidden", true)
                    } else {
                        if (this.selectionTracker) {
                            setTimeout(function () {
                                e.style.display = "none";
                                a.jqx.aria(f, "aria-selected", false);
                                a.jqx.aria(c, "aria-hidden", true)
                            }, this.selectionTrackerAnimationDuration)
                        } else {
                            e.style.display = "none";
                            a.jqx.aria(f, "aria-selected", false);
                            a.jqx.aria(c, "aria-hidden", true)
                        }
                    }
                    this._unselectCallback(d, i, b);
                    if (!this.selectionTracker) {
                        g._removeClass(h, g.toThemeProperty("jqx-tabs-title-selected jqx-fill-state-pressed"))
                    }
                }
            }
        },
        _unselectCallback: function (c, d, b) {
            if (b) {
                this._raiseEvent(8, {
                    item: c
                })
            }
            if (d) {
                d()
            }
        },
        disable: function () {
            var b = this.length();
            while (b) {
                b--;
                this.disableAt(b)
            }
        },
        enable: function () {
            var b = this.length();
            while (b) {
                b--;
                this.enableAt(b)
            }
        },
        getEnabledTabsCount: function () {
            var b = 0;
            a.each(this._titleList, function () {
                if (!this.disabled) {
                    b++
                }
            });
            return b
        },
        getDisabledTabsCount: function () {
            var b = 0;
            a.each(this._titleList, function () {
                if (this.disabled) {
                    b++
                }
            });
            return b
        },
        removeAt: function (b) {
            if (this._isValidIndex(b) && (this.canCloseAllTabs || this.length() > 1)) {
                this._removeHoverStates();
                var d = this,
                    c = d._outerWidth(this._titleList[b], true),
                    g = this.getTitleAt(b);
                this._unorderedList.style.width = d._toPx(d._width(this._unorderedList) - c);
                a(this._titleList[b]).remove();
                a(this._contentList[b]).remove();
                this._titleList.splice(b, 1);
                this._contentList.splice(b, 1);
                d._closeButtonList.splice(b, 1);
                this._addStyles();
                this._performHeaderLayout();
                this._removeEventHandlers();
                this._addEventHandlers();
                this._raiseEvent(3, {
                    item: b,
                    title: g
                });
                this._isAnimated = {};
                var f;
                if (this.selectedItem > 0) {
                    this._selectedItem = -1;
                    if (this.selectedItem >= b) {
                        f = this._getPreviousIndex(this.selectedItem);
                        this.select(f)
                    } else {
                        this.select(d.selectedItem)
                    }
                } else {
                    this._selectedItem = -1;
                    f = this._getNextIndex(this.selectedItem);
                    this.select(f)
                }
                if (parseInt(this._unorderedListHelper.css("left"), 10) > this._getArrowsDisplacement()) {
                    this._unorderedList.style.left = d._toPx(this._getArrowsDisplacement())
                }
                if (d._width(this._unorderedList) <= d._width(this._headerWrapper)) {
                    var e = (this.enableScrollAnimation) ? this.scrollAnimationDuration : 0;
                    this._lockAnimation("unorderedList");
                    this._unorderedListHelper.animate({
                        left: 0
                    }, e, function () {
                        d._unlockAnimation("unorderedList")
                    })
                }
            }
        },
        removeFirst: function () {
            this.removeAt(0)
        },
        removeLast: function () {
            this.removeAt(this.length() - 1)
        },
        disableAt: function (b) {
            var d = this._titleList[b];
            if (!d.disabled || d.disabled === undefined) {
                if (this.selectedItem === b) {
                    var c = this.next();
                    if (!c) {
                        c = this.previous()
                    }
                }
                d.disabled = true;
                this.removeHandler(d, this.toggleMode);
                if (this.enabledHover) {
                    a(d).off("mouseenter").off("mouseleave")
                }
                this._removeEventListenerAt(b);
                d.className += " " + this.toThemeProperty("jqx-tabs-title-disable jqx-fill-state-disabled");
                this._raiseEvent(5, {
                    item: b
                })
            }
        },
        enableAt: function (b) {
            var c = this._titleList[b];
            if (c.disabled) {
                c.disabled = false;
                this._addEventListenerAt(b);
                this._removeClass(c, this.toThemeProperty("jqx-tabs-title-disable jqx-fill-state-disabled"));
                this._raiseEvent(4, {
                    item: b
                })
            }
        },
        addAt: function (d, g, e) {
            if (d >= 0 && d <= this.length()) {
                this._removeHoverStates();
                var b = document.createElement("li");
                b.innerHTML = g;
                b.className = this.toThemeProperty("jqx-tabs-title jqx-item");
                var f = document.createElement("div");
                f.innerHTML = e;
                f.className = this.toThemeProperty("jqx-tabs-content-element");
                if (this.position === "bottom") {
                    b.className += " " + this.toThemeProperty("jqx-tabs-title-bottom")
                }
                var c = false;
                if (this._titleList.length === 0) {
                    this._unorderedList.appendChild(b)
                } else {
                    if (d < this.length() && d >= 0) {
                        this._unorderedList.insertBefore(b, this._titleList[d])
                    } else {
                        this._unorderedList.appendChild(b)
                    }
                }
                this._contentWrapper.appendChild(f);
                this._addItemTo(this._titleList, d, b);
                this._addItemTo(this._contentList, d, f);
                this._addCloseButton(d);
                if (this._selectedItem > d) {
                    this._selectedItem++
                }
                this._switchTabs(d, this._selectedItem);
                this._selectedItem = d;
                this._uiRefresh(c);
                this._raiseEvent(2, {
                    item: d
                });
                this._moveSelectionTrack(this._selectedItem, 0)
            }
        },
        addFirst: function (c, b) {
            this.addAt(0, c, b)
        },
        addLast: function (c, b) {
            this.addAt(this.length(), c, b)
        },
        val: function (b) {
            if (arguments.length === 0 || typeof (b) === "object") {
                return this._selectedItem
            }
            this.select(b);
            return this._selectedItem
        },
        select: function (b) {
            if (typeof (b) === "object") {
                b = this._indexOf(b)
            }
            var d = b >= 0 && b < this._titleList.length ? this._titleList[b].getAttribute("canselect") : true;
            if (d === undefined || d === null || d === "true" || d === true) {
                if (b !== this._selectedItem && this._isValidIndex(b)) {
                    if (!this._activeAnimation() && !this._titleList[b].disabled) {
                        var c = this._switchTabs(b, this._selectedItem);
                        if (c) {
                            this.ensureVisible(b)
                        }
                    }
                }
            }
        },
        previous: function (c) {
            var b = this._selectedItem;
            if (c !== undefined && !isNaN(c)) {
                b = c
            }
            while (b > 0 && b < this._titleList.length) {
                b--;
                if (!this._titleList[b].disabled) {
                    this.select(b);
                    return true
                }
            }
            return false
        },
        _getPreviousIndex: function (c) {
            if (c !== undefined && !isNaN(c)) {
                var b = c;
                while (c > 0 && c <= this._titleList.length) {
                    c--;
                    if (!this._titleList[c].disabled) {
                        return c
                    }
                }
                return b
            } else {
                return 0
            }
        },
        _getNextIndex: function (c) {
            if (c !== undefined && !isNaN(c)) {
                var b = c;
                while (c >= 0 && c < this._titleList.length) {
                    if (!this._titleList[c].disabled) {
                        return c
                    }
                    c++
                }
                return b
            } else {
                return 0
            }
        },
        next: function (c) {
            var b = this._selectedItem;
            if (c !== undefined && !isNaN(c)) {
                b = c
            }
            while (b >= 0 && b < this._titleList.length - 1) {
                b++;
                if (!this._titleList[b].disabled) {
                    this.select(b);
                    return true
                }
            }
            return false
        },
        first: function () {
            var b = 0;
            if (this._titleList[b].disabled) {
                this.next(b)
            } else {
                this.select(b)
            }
        },
        last: function () {
            var b = this._titleList.length - 1;
            if (this._titleList[b].disabled) {
                this.previous(b)
            } else {
                this.select(b)
            }
        },
        length: function () {
            return this._titleList.length
        },
        lockAt: function (b) {
            if (this._isValidIndex(b) && (!this._titleList[b].locked || this._titleList[b].locked === undefined)) {
                this._titleList[b].locked = true;
                this._raiseEvent(11, {
                    item: b
                })
            }
        },
        unlockAt: function (b) {
            if (this._isValidIndex(b) && this._titleList[b].locked) {
                this._titleList[b].locked = false;
                this._raiseEvent(12, {
                    item: b
                })
            }
        },
        lockAll: function () {
            var b = this.length();
            while (b) {
                b--;
                this.lockAt(b)
            }
        },
        unlockAll: function () {
            var b = this.length();
            while (b) {
                b--;
                this.unlockAt(b)
            }
        },
        showCloseButtonAt: function (b) {
            if (this._isValidIndex(b)) {
                if (!this.showCloseButtons) {
                    this.showCloseButtons = true;
                    this.updatetabsheader()
                }
                this._closeButtonList[b].style.display = "block";
                if (!this.hiddenCloseButtons) {
                    this.hiddenCloseButtons = []
                }
                this.hiddenCloseButtons[b] = 0
            }
        },
        hideCloseButtonAt: function (b) {
            if (this._isValidIndex(b)) {
                this._closeButtonList[b].style.display = "none";
                if (!this.hiddenCloseButtons) {
                    this.hiddenCloseButtons = []
                }
                this.hiddenCloseButtons[b] = 1
            }
        },
        hideAllCloseButtons: function () {
            var b = this.length();
            while (b) {
                b--;
                this.hideCloseButtonAt(b)
            }
        },
        showAllCloseButtons: function () {
            var b = this.length();
            while (b) {
                b--;
                this.showCloseButtonAt(b)
            }
        },
        getTitleAt: function (b) {
            if (this._titleList[b]) {
                return a(this._titleList[b]).text()
            }
            return null
        },
        getContentAt: function (b) {
            if (this._contentList[b]) {
                return this._contentList[b]
            }
            return null
        },
        setTitleAt: function (b, c) {
            if (this._titleList[b]) {
                a(this._titleList[b]).text(c);
                if (this.showCloseButtons) {
                    this._addCloseButton(b);
                    this._removeEventHandlers();
                    this._addEventHandlers()
                }
                this.render();
                this.refresh()
            }
        },
        setContentAt: function (b, c) {
            if (this._contentList[b]) {
                a(this._contentList[b]).html(c)
            }
        },
        ensureVisible: function (e) {
            var d = this;
            if (e === undefined || e === -1 || e === null) {
                e = this.selectedItem
            }
            if (!this._isValidIndex(e)) {
                return false
            }
            var j = this._titleList[e];
            var l = parseInt(a(j).position().left, 10) + parseInt(this._unorderedListHelper.css("margin-left"), 10);
            var g = parseInt(this._unorderedListHelper.css("left"), 10);
            var k = this._outerWidth(this._headerWrapper, true);
            var f = this._outerWidth(j, true);
            var i = g - this._getArrowsDisplacement();
            var b = k - this._getArrowsDisplacement() - i;
            var h, c;
            if (l < -i) {
                h = -l + this._getArrowsDisplacement();
                c = this._getArrowsDisplacement()
            } else {
                if (l + f > b - this._getArrowsDisplacement()) {
                    h = -l + k - f - ((this.scrollable) ? (2 * this.arrowButtonSize - this._getArrowsDisplacement()) : 0);
                    c = k - f - this._getArrowsDisplacement()
                } else {
                    this._moveSelectionTrack(e, this.selectionTrackerAnimationDuration);
                    return true
                }
            }
            this._lockAnimation("unorderedList");
            this._unorderedListHelper.animate({
                left: h
            }, this.scrollAnimationDuration, function () {
                d._unlockAnimation("unorderedList");
                d._moveSelectionTrack(d._selectedItem, 0);
                return true
            });
            this._moveSelectionTrack(e, this.selectionTrackerAnimationDuration, c);
            return true
        },
        isVisibleAt: function (d) {
            var c = this;
            if (d === undefined || d === -1 || d === null) {
                d = c.selectedItem
            }
            if (!c._isValidIndex(d)) {
                return false
            }
            var h = c._titleList[d];
            var j = parseInt(a(h).position().left, 10) + parseInt(c._unorderedListHelper.css("margin-left"), 10);
            var f = parseInt(c._unorderedListHelper.css("left"), 10);
            var i = c._outerWidth(c._headerWrapper, true);
            var e = c._outerWidth(h, true);
            var g = f - c._getArrowsDisplacement();
            var b = i - c._getArrowsDisplacement() - g;
            if (j < -g) {
                return false
            } else {
                if (j + e > b) {
                    return false
                } else {
                    return true
                }
            }
            return true
        },
        isDisabled: function (b) {
            return this._titleList[b].disabled
        },
        _lockAnimation: function (b) {
            if (this._isAnimated) {
                this._isAnimated[b] = true
            }
        },
        _unlockAnimation: function (b) {
            if (this._isAnimated) {
                this._isAnimated[b] = false
            }
        },
        propertiesChangedHandler: function (d, b, c) {
            if (c && c.width && c.height && Object.keys(c).length === 2) {
                d._setSize()
            }
        },
        propertyChangedHandler: function (b, c, e, d) {
            if (b.batchUpdate && b.batchUpdate.width && b.batchUpdate.height && Object.keys(b.batchUpdate).length === 2) {
                return
            }
            this._validateProperties();
            switch (c) {
                case "touchMode":
                    if (d) {
                        b.enabledHover = false;
                        b.keyboardNavigation = false
                    }
                    break;
                case "width":
                case "height":
                    b._setSize();
                    return;
                case "disabled":
                    if (d) {
                        this.disable()
                    } else {
                        this.enable()
                    }
                    return;
                case "showCloseButtons":
                    if (d) {
                        this.showAllCloseButtons()
                    } else {
                        this.hideAllCloseButtons()
                    }
                    this._performHeaderLayout();
                    return;
                case "selectedItem":
                    if (this._isValidIndex(d)) {
                        this.select(d)
                    }
                    return;
                case "scrollStep":
                case "contentTransitionDuration":
                case "scrollAnimationDuration":
                case "enableScrollAnimation":
                    return;
                case "selectionTracker":
                    if (d) {
                        this._refresh();
                        this.select(this._selectedItem)
                    } else {
                        if (this._selectionTracker) {
                            this._selectionTrackerHelper.remove()
                        }
                    }
                    return;
                case "scrollable":
                    if (d) {
                        this._refresh();
                        this.select(this._selectedItem)
                    } else {
                        a(this._leftArrow).remove();
                        a(this._rightArrow).remove();
                        this._performHeaderLayout()
                    }
                    return;
                case "autoHeight":
                    this._performHeaderLayout();
                    return;
                case "theme":
                    a.jqx.utilities.setTheme(e, d, this.host);
                    return
            }
            this._unorderedList.style.left = "0px";
            this._refresh();
            this.select(this._selectedItem);
            this._addSelectStyle(this._selectedItem, true)
        },
        _toPx: function (b) {
            if (typeof b === "number") {
                return b + "px"
            } else {
                return b
            }
        },
        _removeClass: function (c, b) {
            a(c).removeClass(b)
        },
        _width: function (e) {
            var b = a(e),
                g = b.css("border-left-width"),
                c = b.css("border-right-width"),
                d = parseInt(b.css("padding-left"), 10),
                h = parseInt(b.css("padding-right"), 10);
            if (g.indexOf("px") === -1) {
                g = 1
            } else {
                g = parseInt(g, 10)
            }
            if (c.indexOf("px") === -1) {
                c = 1
            } else {
                c = parseInt(c, 10)
            }
            var f = e.offsetWidth - (g + c + d + h);
            return f
        },
        _outerWidth: function (c, g) {
            var f = c.offsetWidth;
            if (g) {
                var b = a(c),
                    d = parseInt(b.css("margin-left"), 10),
                    e = parseInt(b.css("margin-right"), 10);
                f += d + e
            }
            return f
        },
        _height: function (e) {
            var c = a(e),
                h = c.css("border-top-width"),
                d = c.css("border-bottom-width"),
                f = parseInt(c.css("padding-top"), 10),
                g = parseInt(c.css("padding-bottom"), 10);
            if (h.indexOf("px") === -1) {
                h = 1
            } else {
                h = parseInt(h, 10)
            }
            if (d.indexOf("px") === -1) {
                d = 1
            } else {
                d = parseInt(d, 10)
            }
            var b = e.offsetHeight - (h + d + f + g);
            return b
        },
        _outerHeight: function (e, g) {
            var f = e.offsetHeight;
            if (g) {
                var b = a(e),
                    c = parseInt(b.css("margin-top"), 10),
                    d = parseInt(b.css("margin-bottom"), 10);
                f += c + d
            }
            return f
        },
        _stop: function (b) {
            if (b.stop) {
                b.stop()
            } else {
                b.animate("stop", true)
            }
        }
    })
}(jqxBaseFramework));