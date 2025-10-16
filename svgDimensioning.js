// GLOBAL VARIABLES ARE - draw divEl svgEl grpEl children 

const FORCHANNEL = "channelContext";
const FORCONTEXT = "animatedContext";
var dimForWhom = "";

function iniDimensioner(forWhom){
    dimForWhom = forWhom;
    getSvgTrueSize();    
    embedded = inIframe();
    if(embedded){
        adjustSvgSizeToContainer("initialize");
    }else{
        var parFitWidth = getUrlPar('fitWidth');
        var parFitHeight = getUrlPar('fitHeight');
        if(!Number.isNaN(parFitWidth) && !Number.isNaN(parFitHeight) && parseInt(parFitWidth) > 0 && parseInt(parFitHeight) > 0){
            fitWidth = getUrlPar('fitWidth');
            fitHeight = getUrlPar('fitHeight');
        }
        if(window.matchMedia("(pointer: coarse)").matches && forWhom === FORCONTEXT){
            fitWidth = window.innerWidth - 4;
            fitHeight = window.innerHeight - 4;
            divEl.style.width = fitWidth + "px";
            divEl.style.height = fitHeight + "px";
            divEl.style.setProperty('width', fitWidth + "px", 'important');
            divEl.style.setProperty('height', fitHeight + "px", 'important');
        }        
        if(!Number.isNaN(fitWidth) && !Number.isNaN(fitHeight) && parseInt(fitWidth) > 0 && parseInt(fitHeight) > 0){
            adjustSvgSizeToFitting(fitWidth, fitHeight);
        }
    }
}

function getSvgTrueSize(){
    for(var i in children){
        if(children[i].nodeType === 1 && (children[i].tagName === "a")){
            let child = children[i].children[0];
            let bbox = child.getBBox();
            let hor = bbox.x + bbox.width;
            let ver = bbox.y + bbox.height;
            if(hor > realWidth){
                realWidth = hor;
            }
            if(ver > realHeight){
                realHeight = ver;
            }
        }else if(children[i].nodeType === 1){
            let bbox = children[i].getBBox();
            let hor = bbox.x + bbox.width;
            let ver = bbox.y + bbox.height;
            if(hor > realWidth){
                realWidth = hor;
            }
            if(ver > realHeight){
                realHeight = ver;
            }
        }
    }    
    realWidth = Math.ceil(realWidth) + 15;
    realHeight = Math.ceil(realHeight) + 15;
}

function returnSvgTrueSize(){
    let width = 0;
    let height = 0;
    for(var i in children){
        if(children[i].nodeType === 1 && (children[i].tagName === "a")){
            let child = children[i].children[0];
            let bbox = child.getBBox();
            let hor = bbox.x + bbox.width;
            let ver = bbox.y + bbox.height;
            if(hor > width){
                width = hor;
            }
            if(ver > height){
                height = ver;
            }
        }else if(children[i].nodeType === 1){
            let bbox = children[i].getBBox();
            let hor = bbox.x + bbox.width;
            let ver = bbox.y + bbox.height;
            if(hor > width){
                width = hor;
            }
            if(ver > height){
                height = ver;
            }
        }
    }    
    width = Math.ceil(width);
    height = Math.ceil(height);
    return {width:width,height:height};
}

function sizePositionSvg(){
    let dim = returnSvgTrueSize();
    let w = Math.ceil(dim.width * scale);
    let h = Math.ceil(dim.height * scale);
    divEl.style.width = w;
    divEl.style.height = h;
    svgEl.style.width = w;
    svgEl.style.height = h;
    divEl.classList.add('center');
}

function sizePositionWithFitSvg(){
//    alert("sizePositionWithFitSvg()");
    let dim = returnSvgTrueSize();
    let w = divEl.style.width.replace("px", "");
    let h = divEl.style.height.replace("px", ""); 
    scale = scaleToBounds(dim.width, dim.height, parseInt(w), parseInt(h));
    let toW = Math.ceil(dim.width * scale) - 30;
    let toH = Math.ceil(dim.height * scale) - 10;
    let sW = toW;
    let sH = toH;
    //divEl.style.border = '4px solid red';
    //divEl.style.padding = '14px';
//    divEl.style.width = toW + "px";
//    divEl.style.height = toH + "px";
    //svg.style.border = '4px solid blue';    
    svgEl.style.width = sW + "px";
    svgEl.style.height = sH + "px";
    divEl.className = 'center';
    if(typeof zoomScavecgraph !== "undefined" && zoomScavecgraph !== null){
        zoomScavecgraph.destroy();
    }
    //console.log("svgDim NON TOUCH DEVICE SET ZOOMING");
    zoomScavecgraph = svgPanZoom('#symbologySVG',{zoomEnabled: true,controlIconsEnabled:true,fit: true,center: true});
    zoomScavecgraph.resize();
    zoomScavecgraph.updateBBox();
    zoomScavecgraph.zoomBy(0.95);
    zoomScavecgraph.destroy();
}

function sizePositionWithFitSvgWorking(){
//    alert("sizePositionWithFitSvg()");
    let dim = returnSvgTrueSize();
    let w = divEl.style.width.replace("px", "");
    let h = divEl.style.height.replace("px", ""); 
    scale = scaleToBounds(dim.width, dim.height, parseInt(w), parseInt(h));
    let toW = Math.ceil(dim.width * scale) - 30;
    let toH = Math.ceil(dim.height * scale) - 10;
    let sW = toW;
    let sH = toH;
    //divEl.style.border = '4px solid red';
    //divEl.style.padding = '14px';
    divEl.style.width = toW + "px";
    divEl.style.height = toH + "px";
    //svg.style.border = '4px solid blue';    
    svgEl.style.width = sW + "px";
    svgEl.style.height = sH + "px";
    divEl.className = 'center';
    if(typeof zoomScavecgraph !== "undefined" && zoomScavecgraph !== null){
        zoomScavecgraph.destroy();
    }
    //console.log("svgDim NON TOUCH DEVICE SET ZOOMING");
    zoomScavecgraph = svgPanZoom('#symbologySVG',{zoomEnabled: true,controlIconsEnabled:true,fit: true,center: true});
    zoomScavecgraph.resize();
    zoomScavecgraph.updateBBox();
    zoomScavecgraph.zoomBy(0.95);
}

function getSvgTrueSize(){
    for(var i in children){
        if(children[i].nodeType === 1 && (children[i].tagName === "a")){
            let child = children[i].children[0];
            let bbox = child.getBBox();
            let hor = bbox.x + bbox.width;
            let ver = bbox.y + bbox.height;
            if(hor > realWidth){
                realWidth = hor;
            }
            if(ver > realHeight){
                realHeight = ver;
            }
        }else if(children[i].nodeType === 1){
            let bbox = children[i].getBBox();
            let hor = bbox.x + bbox.width;
            let ver = bbox.y + bbox.height;
            if(hor > realWidth){
                realWidth = hor;
            }
            if(ver > realHeight){
                realHeight = ver;
            }
        }
    }    
    realWidth = Math.ceil(realWidth) + 15;
    realHeight = Math.ceil(realHeight) + 15;
}

function scaleToBounds(width, height, fitWidth, fitHeight){
    let widthScale = 0, heightScale = 0;
    if (width !== 0){
        widthScale = fitWidth / width;
    }    
    if (height !== 0){
        heightScale = fitHeight / height;       
    }
    return Math.min(widthScale, heightScale);
} 

function adjustSvgSizeToContainer(collapse){
    //alert("adjustSvgSizeToContainer - collapse : " + collapse + " - dimForWhom : " + dimForWhom);
    let scale = scaleToBounds(realWidth, realHeight, window.innerWidth, window.innerHeight);
    if(window.matchMedia("(pointer: coarse)").matches) {
        scale -= 0.1;
    }
    grpEl.setAttribute("transform","scale(" + scale + ")");
    //let div = grpEl.ownerSVGElement.parentElement;
    let inWidth = window.innerWidth - 10;
    let inHeight = window.innerHeight - 10;
    
    divEl.style.width = inWidth + "px";
    divEl.style.height = inHeight + "px";
    divEl.style.setProperty('width', inWidth + 'px', 'important');
    divEl.style.setProperty('height', inHeight + 'px', 'important');
    //divEl.style.border = '4px solid red';
    
    if(!window.matchMedia("(pointer: coarse)").matches) {
        if(typeof zoomScavecgraph !== "undefined" && zoomScavecgraph !== null){
            zoomScavecgraph.destroy();
        }
        //console.log("svgDim NON TOUCH DEVICE SET ZOOMING");
        zoomScavecgraph = svgPanZoom('#symbologySVG',{zoomEnabled: true,controlIconsEnabled:true,fit: true,center: true});
        zoomScavecgraph.resize();
        zoomScavecgraph.updateBBox();
        zoomScavecgraph.zoomBy(0.95);
    }else if(("" + collapse) === "true"){
        //alert("COLLAPSE - collapse : " + collapse + " - dimForWhom : " + dimForWhom);
        if (divEl.hasAttribute("data-fromcache")) {
            sizePositionWithFitSvg();            
            if(typeof zoomScavecgraph !== "undefined" && zoomScavecgraph !== null){
                zoomScavecgraph.destroy();
            }
            zoomScavecgraph = svgPanZoom('#symbologySVG',{zoomEnabled: true,controlIconsEnabled:true,center: true,width:inWidth,height:inHeight});
            zoomScavecgraph.resize();
            zoomScavecgraph.updateBBox();
            zoomScavecgraph.zoomBy(0.95);
        }
    }else if(("" + collapse) === "false"){
        //alert("EXPAND - collapse : " + collapse + " - dimForWhom : " + dimForWhom);
        divEl.style.padding = '5px';
        if(typeof zoomScavecgraph !== "undefined" && zoomScavecgraph !== null){
            zoomScavecgraph.destroy();
            delete zoomScavecgraph;
        }
        sizePositionSvg();
    }else{
        //alert("OTHER - collapse : " + collapse + " - dimForWhom : " + dimForWhom);
        sizePositionWithFitSvg();
        zoomScavecgraph = svgPanZoom('#symbologySVG',{zoomEnabled: true,controlIconsEnabled:true,fit: true,center: true});
        zoomScavecgraph.resize();
        zoomScavecgraph.updateBBox();
        zoomScavecgraph.zoomBy(0.95);
        //THE SVG IS NOW CENTERED SO NOW DESTROY SO THAT THE LINKS CAN WORK
        if(typeof zoomScavecgraph !== "undefined" && zoomScavecgraph !== null){
            zoomScavecgraph.destroy();
        }
    }
}

function configZoom(){
    //console.log("configZoom()");
    zoomScavecgraph = svgPanZoom('#symbologySVG',{zoomEnabled: true,controlIconsEnabled:true,fit: true,center: true});
    zoomScavecgraph.resize();
    zoomScavecgraph.updateBBox();
}

function adjustSvgSizeToFitting(fitWidth, fitHeight){
    //console.log("adjustSvgSizeToFitting() ADJUST SVG SIZE TO FITTING");
    scale = scaleToBounds(realWidth, realHeight, fitWidth, fitHeight);
    if(!expandToFitBounds && scale > 1.0){
        // DO NOTHING
    }else{
        let width = Math.ceil(realWidth * scale);
        let height = Math.ceil(realHeight * scale);
        grpEl.setAttribute("transform","scale(" + scale + ")");
    }    
    draw.attr("width", 2000 + "px");
    draw.attr("height", 2000 + "px");
}

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function getUrlParameter(url, name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var getUrlPar = function getUrlPar(sParam) {
    var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), sParameterName, i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};