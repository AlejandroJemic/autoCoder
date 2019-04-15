var CURRENT_TAB = 0;
var MAIN_CONTAINER;
var EDIT_BUTTON;
var SELECTED_PLATAFORM_CONTROLS

function getContext() {
    CURRENT_TAB = $('#jqxTabs').jqxTabs('selectedItem');
    MAIN_CONTAINER = $($(".MainElement")[CURRENT_TAB]);
}
function $tab(selector) {
    getContext();
    return $($(selector, MAIN_CONTAINER));
}

function getCurrentViewPlataform() {
    return $tab("#plataform").val();
}

function setCurrentViewControls() {
    switch (getCurrentViewPlataform()) {
         case "1": // html
            SELECTED_PLATAFORM_CONTROLS = generalOptions.htmlControlTypes;
             break;
        case "2": //.net
            if ($tab("#output").val() === "1" && $tab("#options").val() === "1") { // aspx web page
                SELECTED_PLATAFORM_CONTROLS = generalOptions.webFormsControlTypes;
            }
            if ($tab("#output").val() === "1" && $tab("#options").val() === "2") { // mvc web page
                SELECTED_PLATAFORM_CONTROLS = generalOptions.htmlControlTypes;
            }
            break;
        case "3": // nodejs
            if ($tab("#output").val() === "1" ) {
                SELECTED_PLATAFORM_CONTROLS = generalOptions.htmlControlTypes;
            }
            break;
        case "4": // android
            SELECTED_PLATAFORM_CONTROLS = generalOptions.androidControlTypes;
            break;
        case "5": // ios
            SELECTED_PLATAFORM_CONTROLS = generalOptions.iosControlTypes;
            break;
         default:
            SELECTED_PLATAFORM_CONTROLS = generalOptions.htmlControlTypes;
             break;
    }
    
    var select =  $("#sideMenu").children("#controlType");
    jsonSuport.PopulateSelectFromList(select,SELECTED_PLATAFORM_CONTROLS,"controlType");
}

function set() {
    SELECTED_PLATAFORM_CONTROLS = undefined;
    getContext();
    var sid = setid(MAIN_CONTAINER);
    var inputAlto = $(MAIN_CONTAINER).find("#alto");
    var inputAncho = $(MAIN_CONTAINER).find("#ancho");

    $(MAIN_CONTAINER).height(inputAlto.val());
    $(MAIN_CONTAINER).width(inputAncho.val());
    // // $(".viewHeader").width(ancho.value - 17);
    $(MAIN_CONTAINER).resizable({ containment: ".maindiv" });
    $(MAIN_CONTAINER).resize = resize($(MAIN_CONTAINER));

    var div = document.createElement("div");
    $(div).addClass("row controldiv");
    jsonSuport.CreateSelectForList(div, generalOptions.outputPlataforms, "plataform", setSalidas);
    $(MAIN_CONTAINER).children(".viewHeader").append(div);
    setCurrentViewControls();
    // //loop padres
    // contaier.parents().each(function( index ) {
    //     logElement(this,index);
    // });

    //loop hijos
    // $(this).children().each(function( childindex ) {
    //logElement(index);
    // });
    //logElement($(mainContainer), CurrentTab);
}


/**
 *get calls when de main elmement of a view changes the selected output paltaform
 *
 * @param {input select} select
 * @param {generalOptions.outputPlataforms} obj
 */
function setSalidas(select, obj) {
    console.log("plataform changed");
    var div = $tab(select).closest(".controldiv");
    $tab("#output").remove();
    $tab("#options").remove();
    $tab("#sizes").remove();
    $tab("#orientation").remove();
    if (select.value > 0 && jsonSuport.HasProprty(obj[select.value - 1], "outputTypes")) {
        jsonSuport.CreateSelectForList(div, obj[select.value - 1].outputTypes, "output", setOpciones);
    }
    setCurrentViewControls();
}

function setOpciones(select, obj) {
    console.log("output changed");
    var div = $tab(select).closest(".controldiv");
    $tab("#options").remove();
    $tab("#sizes").remove();
    $tab("#orientation").remove();
    if (select.value > 0 && jsonSuport.HasProprty(obj[select.value - 1], "options")) {
        jsonSuport.CreateSelectForList(div, obj[select.value - 1].options, "options", null);
    }
    if (select.value > 0 && jsonSuport.HasProprty(obj[select.value - 1], "screenSizes")) {
        jsonSuport.CreateSelectForList(div, obj[select.value - 1].screenSizes, "sizes", setSize);
    }
    if (select.value > 0 && jsonSuport.HasProprty(obj[select.value - 1], "orientation")) {
        jsonSuport.CreateSelectForList(div, obj[select.value - 1].orientation, "orientation");
    }
    setCurrentViewControls();
}

function setSize(select, obj) {
    if (select.value > 0) {
        console.log("size changed");
        getContext();
        var ancho = select.options[select.selectedIndex].text.split("-")[0].split("*")[0];
        var alto = select.options[select.selectedIndex].text.split("-")[0].split("*")[1];
        var inputAlto = $tab("#alto").val(alto);
        var inputAncho = $tab("#ancho").val(ancho);
        inputAlto.value = alto;
        inputAncho.value = ancho;

        setAncho(inputAncho);
        setAlto(inputAlto);
    }
}

function logElement(elm, index) {
    console.log("[" + index + "] type:  " + $(elm).prop('nodeName'));
    console.log("    id:    " + $(elm).prop("id"));
    console.log("    class: " + $(elm).attr("class"));
    console.log();
}


/**
 *overloads de jquery default resizable behavior
 *
 * @param {div} container
 */
function resize(container) {
    container.resize(function () {
        if (container.width() < 65) container.width(65);
        if (container.height() < 65) container.height(65);
        if (container.width() > 2000) container.width(2000);
        if (container.height() > 2000) container.height(2000);

        $(container).children(".viewContent").width(container.width() - 2);
        $(container).children(".viewContent").height(container.height() - 2);
        $(container).children(".viewHeader").find("#alto").val(container.height());
        $(container).children(".viewHeader").find("#ancho").val(container.width());
        //container.children(".viewHeader").width(container.width() -15);
    });
}

function setid(element) {
    var sid = uuid();
    element.prop("id", sid + "Container");
    element.children(".viewContent").prop("id", sid + "Content");
    element.children(".viewHeader").prop("id", sid + "Header");
    return sid;
}

function setNombre(txt) {
    var element = getCurrentElement(txt);
    element.attr("name", txt.value + "Container");
    element.children(".viewContent").attr("name", txt.value + "Content");
    element.children(".viewHeader").attr("name", txt.value + "Header");
}

function setAlto(txt) {
    var element = getCurrentElement(txt);
    if (txt.value < 65) txt.value = 65;
    if (txt.value > 2000) txt.value = 2000;
    element.height(txt.value);
    element.children(".viewContent").height(element.height() - 3);
}

function setAncho(txt) {
    var element = getCurrentElement(txt);
    if (txt.value < 65) txt.value = 65;
    if (txt.value > 2000) txt.value = 2000;
    element.width(txt.value);
    element.children(".viewContainer").width(txt.value);
    element.children(".viewContent").width(txt.value);
    //element.children(".viewHeader").width(txt.value -15 );
}

function uuid() {
    return 'xxx-xxx-xxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//devuelve el elemento en el que estoy
function getCurrentElement(obj) {
    return $tab(obj).closest(".Element")
}

//devuelve contenido del elemento en el que estoy
function getElementContent(element) {
    return $(element).children(".viewContent");
}

//devuelve el header del elemento en el que estoy
function getElementHeader(element) {
    return $("#" + $(element.children(".viewContent")).prop("id"));
}

function AddElemnt(btn) {

    if (isEditOpen()) {
        CloseEdit(EDIT_BUTTON);
    }

    var element = getCurrentElement(btn);
    var content = getElementContent(element);
    var $newElement = $($.parseHTML(newElement()));
    $newElement.css('top', 65);
    $newElement.css('left', 0);
    $newElement.css('position', 'relative');
    $newElement.css('display', 'inline-block');

    $newElement.width(260);
    $newElement.height(90);

    $newElement.children(".viewContent").width(250);
    $newElement.children(".viewContent").height(80);
    //$newElement.children(".viewHeader").width(250);
    $newElement.children(".viewHeader").hide();
    $newElement.attr("idParent", $(element).prop("id"));

    setid($newElement);

    $(content).append($newElement);

    CURRENT_TAB = $('#jqxTabs').jqxTabs('selectedItem');
    var mainContainer = $($(".MainElement")[CURRENT_TAB]);
    var mainContntent = $(mainContainer).children(".viewContent:first")
    $newElement.resizable({ containment: mainContntent }).draggable({ containment: mainContntent });
    $newElement.resizable("option", "handles", "nw");
    $newElement.resize = resize($newElement);
    $newElement.children(".viewHeader").find("#Nombre").val("");
    $newElement.children(".viewHeader").find("#alto").val("150");
    $newElement.children(".viewHeader").find("#ancho").val("300");
}

function delElemnt(btn) {
    deleteElementFromJSON(btn);
    closeAndCleanEdit();
    getCurrentElement(btn).remove();
}
 

function openHeader(btn) {
    var element = getCurrentElement(btn);
    var child = $(element).children(".viewHeader")
    $(child).show();
    $(child).css("z-index", "10000");
    $(btn).attr("onclick", "closeHeader(this)")
    //$(btn).css("color", "white")
    $(btn).css("z-index", "10001");
}

function closeHeader(btn) {
    var element = getCurrentElement(btn);
    var child = $(element).children(".viewHeader")
    $(child).hide();

    $(btn).attr("onclick", "openHeader(this)")
    // $(btn).css("color", "black")
}

function newElement() {
    var sElment = ""
    sElment += "<div class='Element viewContainer'>"
    sElment += "<div class='openHeaderBtn' onclick='openHeader(this)'>"
    sElment += "<a>&#9776;</a>"
    sElment += "</div>"
    sElment += "<div class='viewHeader' style='float:left;'>"
    sElment += "<div class='d-inline-flex card-header'>"
    sElment += "<input id='Nombre' type='text' value='' class='form-control' name='Nombre' placeholder='Nombre'"
    sElment += "	onchange='setNombre(this)'>"
    sElment += "<input id='alto' type='text' value='' class='form-control alto' name='alto' placeholder='Alto'"
    sElment += "	onchange='setAlto(this)'>"
    sElment += "<input id='ancho' type='text' value='' class='form-control' name='ancho' placeholder='Ancho'"
    sElment += "	onchange='setAncho(this)'>"
    sElment += "<button type='button' id='btnAdd' onclick='AddElemnt(this);' class='btn btn-success float-right'><img"
    sElment += "		src='../assets/imgs/circle_plus.png' alt='del' style='width: 23px;' /></button>"
    sElment += "<button type='button' id='btnDel' onclick='delElemnt(this);' class='btn btn-danger float-right'><img src='../assets/imgs/circle_delete.png'"
    sElment += "	alt='add' style='width: 23px;' /></button>"
    sElment += "<button type='button' id='btnEdit' onclick='EditElement(this);' class='btn btn-primary float-right'><img"
    sElment += "         src='../assets/imgs/pencil.png' alt='del' style='width: 23px;' /></button>"
    sElment += "</div>"
    sElment += "</div>"
    sElment += "<div class='panel-body viewContent'></div>"
    return sElment;
}

function openNav() {
    document.getElementById("myNav").style.height = "300px";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

/**
 * check if edit menu is open
 * 
 * @returns true if open
 */
function isEditOpen() {
    return (document.getElementById("sideMenu").style.width === "300px");
}

/**
 * open edit menu an load element options(is seted)
 * 
 * @param {button} btn 
 */
function EditElement(btn) {
    document.getElementById("sideMenu").style.width = "300px";
    $(btn).attr("onclick", "CloseEdit(this)")
    EDIT_BUTTON = btn;
    $("#sideMenuContent").html("");
    jsonSuport.ForEachInJson(generalOptions.viewElementOptions, jsonSuport.CreateElementsForList, "#sideMenuContent", "col-12")
    loadElementFromJSON(btn);
}

/**
 *  close edit menu and clean sets (do not seve then)
 *
 * @param {button} btn
 */
function CloseEdit(btn) {
    closeAndCleanEdit();
    resetEditBtn(btn);
}

/**
 *  save element options and cloase edit menu (and clean it)
 *
 * @param {button} btn
 */
function saveEdit(btn) {
    saveElementInJSON(btn)
    CloseEdit(btn);
}

/**
 * hide edit menu cleaning its content and setings
 *
 */
function closeAndCleanEdit() {
    document.getElementById("sideMenu").style.width = "0";
    $("#sideMenuContent").html("");
}

/**
 * reset the presed edit button afer cloasing the edit menu
 *
 * @param {button} btn
 */
function resetEditBtn(btn) {
    $(btn).attr("onclick", "EditElement(this)");
    $(EDIT_BUTTON).attr("onclick", "EditElement(this)");
}

function saveElementInJSON(btn) {
    // TODO seve selected element options to project JSON
}

function loadElementFromJSON(btn) {
    // TODO load selected element options from project JSON
}

function deleteElementFromJSON(btn) {
    // TODO delete selected element options from project JSON
}

function openProject(btn) {
    // TODO open project from select file and generate views and elements with its setings
}

function saveProject(btn) {
    // TODO delete selected element options from project JSON
}

function generateProject(btn) {
    // TODO save the project and send it to the WEB API to generate the output code
}

/**
 * validate integer inputs
 *
 * @param {event} e
 * @returns true if its is integer number input
 */
function numerico(e) {
    var regex = new RegExp("^[0-9]+$");
    var evt = e || window.event;
    var charCode = evt.charCode || evt.keyCode;

    var key = String.fromCharCode(charCode);
    if (!regex.test(key)) {
        //event.preventDefault();
        return false;
    }
}

/**
 * validate decimals inputs
 *
 * @param {event} e
 * @returns true if its is decimal number input
 */
function decimales(e) {
    var regex = new RegExp("^[0-9,-]+$");
    var evt = e || window.event;
    var charCode = evt.charCode || evt.keyCode;

    var key = String.fromCharCode(charCode);
    if (!regex.test(key)) {
        // event.preventDefault();
        return false;
    }
}

/**
 * validate positve integer inputs
 *
 * @param {event} e
 * @returns true if its is a positive number input
 */
function EnterosPositivos(e) {
    var regex = new RegExp("^[0-9]+$");
    var evt = e || window.event;
    var charCode = evt.charCode || evt.keyCode;

    var key = String.fromCharCode(charCode);
    if (!regex.test(key)) {
        // event.preventDefault();
        return false;
    }
}

$(function () {

    var addButton,
        addButtonWidth = 29,
        index = 0;

    // create jqxTabs.
    $('#jqxTabs').jqxTabs({
        reorder: true,
        theme: 'material',
        showCloseButtons: true,
        scrollPosition: 'both',
        initTabContent: function (tab) {
            // The 'tab' parameter represents the selected tab's index.
            if (tab == 0) {
                var pageIndex = tab + 1;
                loadPage('viewEditor.html', pageIndex);
            }
        }
    });

    $('#jqxTabs').on('tabclick', function (event) {
        var count = $('#unorderedList').find('li').length;
        if (event.args.item == count - 1) {
            $('#jqxTabs').jqxTabs('addAt', event.args.item, 'vista ' + count,
                'Sample content number: ' + count);
            // Manual initialization
            // Commented because initialization is set in initTabContent event
            loadPage('viewEditor.html', count);
        }
    });

    // createing ddbb emgine options
    jsonSuport.ForEachInJson(generalOptions.projectSetings, jsonSuport.CreateElementsForList, ".overlay-content", "col-2")
});


 /**
  *loads html files to tab
  *
  * @param {string} url
  * @param {number} tabIndex
  */
 function loadPage(url, tabIndex) {
    console.log('Loading page via Ajax.')
    $.get(url, function (data) {
        $('#jqxTabs').jqxTabs('setContentAt', tabIndex - 1, data);
        set();
    });
}

/**
 *set DB connections Parameters when selected engine changed
 *
 * @param {input select} select
 * @param {generalOptions.engines} obj
 */
function setEngine(select, obj) {
    console.log("engine changed");
    $(".overlay-content").html("");
    if (select.value > 0 && jsonSuport.HasProprty(obj[select.value - 1], "conectionParameters")) {
        jsonSuport.ForEachInJson(obj[select.value - 1].conectionParameters, jsonSuport.CreateElementsForList, ".overlay-content", "col-2");
    }
}