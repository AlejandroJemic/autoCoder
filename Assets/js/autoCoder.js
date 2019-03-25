var CurrentTab = 0;

function set() {
    CurrentTab = $('#jqxTabs').jqxTabs('selectedItem');
    var mainContainer    = $($(".MainElement")[CurrentTab]);
    var sid = setid(mainContainer);
    var inputAlto = $(mainContainer).find("#alto");
    var inputAncho = $(mainContainer).find("#ancho");

    $(mainContainer).height(inputAlto.val());
    $(mainContainer).width(inputAncho.val());
    // // $(".viewHeader").width(ancho.value - 17);
    $(mainContainer).resizable({ containment: ".maindiv" });
    $(mainContainer).resize = resize($(mainContainer));
    
    var div = document.createElement("div");
    $(div).addClass("row controldiv");
    jsonSuport.CreateSelectForList(div, generalOptions.plataformas_de_salida, "plataforma", setSalidas);
    $(mainContainer).children(".viewHeader").append(div);
    

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

$(function () {
    $(this).on('click', function () {
        //$(this).children(".viewContent").hide();
    });
});

function setSalidas(select,obj){
    console.log("plataforma changed");
    var div = $(select).closest(".controldiv");
    $("#salida").remove();
    $("#opciones").remove();
    $("#tamaños").remove();
    if(select.value > 0 && jsonSuport.HasProprty(obj[select.value -1],"tipos_de_salida")){
        jsonSuport.CreateSelectForList(div,obj[select.value -1].tipos_de_salida, "salida", setOpciones);
    }
    if(select.value > 0 && jsonSuport.HasProprty(obj[select.value -1],"tamaños_pantalla")){
        jsonSuport.CreateSelectForList(div,obj[select.value -1].tamaños_pantalla, "tamaños", setTamaño);
    }
}

function setOpciones(select,obj){
    console.log("salida changed");
    var div = $(select).closest(".controldiv");
    $("#opciones").remove();
    if(select.value > 0 && jsonSuport.HasProprty(obj[select.value -1],"opciones")){
        jsonSuport.CreateSelectForList(div,obj[select.value -1].opciones, "opciones", null);
    }
}

function setTamaño(select,obj){
    console.log("tamaño changed");
    // var header = $(select).closest(".viewHeader");
    // if(select.value > 0 && jsonSuport.HasProprty(obj[select.value -1],"opciones")){
    //     jsonSuport.CreateSelectForList(div,obj[select.value -1].opciones, "opciones", null);
    // }
}

function logElement(elm, index) {
    console.log("[" + index + "] type:  " + $(elm).prop('nodeName'));
    console.log("    id:    " + $(elm).prop("id"));
    console.log("    class: " + $(elm).attr("class"));
    console.log();
}

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
    return $(obj).closest(".Element")
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

    setid($newElement);

    $(content).append($newElement);

    CurrentTab = $('#jqxTabs').jqxTabs('selectedItem');
    var mainContainer = $($(".MainElement")[CurrentTab]);
    var mainContntent = $(mainContainer).children(".viewContent:first")
    $newElement.resizable({ containment: mainContntent }).draggable({containment: mainContntent});
    $newElement.resizable("option", "handles", "nw");
    $newElement.resize = resize($newElement);
    $newElement.children(".viewHeader").find("#Nombre").val("");
    $newElement.children(".viewHeader").find("#alto").val("150");
    $newElement.children(".viewHeader").find("#ancho").val("300");
}

function delElemnt(btn) {
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

$(document).ready(function () {

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
            //Manual initialization
            //Commented because initialization is set in initTabContent event
            loadPage('viewEditor.html', count);
        }
    });
});

var loadPage = function (url, tabIndex) {
    console.log('Loading page via Ajax.')
    $.get(url, function (data) {
        $('#jqxTabs').jqxTabs('setContentAt', tabIndex - 1, data);
        set();
    });

}
