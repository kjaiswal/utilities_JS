	
YUI().use('node', 'node-load', 'overlay', 'dd-constrain', 'tree', 'dump', 
          'stylesheet', function(Y) {

    var bodyNode = Y.one(document.body);
    bodyNode.addClass("yui-skin-sam");

    var yuiWidgetWindow = Y.one('#yui-widget-window');

    var initX = 650;
    var initY = 60;

    var mWidth = '300px';
    var mHeight = '500px';

    var fWidth = '1200px';
    var fHeight = '810px';

    // Create new Node(s)
    var overlayDiv      = Y.Node.create("<div id='overlay'></div>");
    var yuiWidgetHd     = Y.Node.create("<div class='yui-widget-hd' id='yui-widget-hd'></div>");

    var widgetHdIcon    = Y.Node.create("<table class='icons'><tr>"
                        +     "<td valign='top' align='right' id='icons-spacer' nowrap />"
                        +     "<td valign='top' align='right' nowrap>"
                        +     "<img src='images/minimize.gif'"
                        +      "id='min_icon' border='0' width='15' />"
                        +     "<img src='images/maximize_0.gif'"
                        +      "id='wmax_icon' border='0' width='15' />"
                        +     "<img src='images/minimize_0.gif' style='display: none;'"
                        +      "id='wmin_icon' border='0' width='15' />"
                        +     "<img src='images/close.gif'"
                        +      "id='close_icon' border='0' width='15' />"
                        + "</td></tr></table>");

	var yuiWidgetBd   = Y.Node.create("<div class='yui-widget-bd' id='yui-widget-bd'></div>");
    var yuiWidgetFt   = Y.Node.create("<div class='yui-widget-ft'>&nbsp;</div>");
    var widgetBody    = Y.Node.create("<table><tr>"
                      +               "<td></td>"
                      +               "</tr></table>");  

    yuiWidgetHd.appendChild(widgetHdIcon);
    yuiWidgetBd.appendChild(widgetBody);
    overlayDiv.appendChild(yuiWidgetHd);
    overlayDiv.appendChild(yuiWidgetBd);
    overlayDiv.appendChild(yuiWidgetFt);
    yuiWidgetWindow.appendChild(overlayDiv);

    //Render the widget.
    var overlay = new Y.Overlay({
        contentBox : '#overlay',
        width : '300px',
        height : '250px',
        visible : true,
        xy: [initX, initY]
    }).render();
    Y.one('#overlay').hide();

    // Create new Node(s)
    var hw             = Y.Node.create("<div id='hOverlay'></div>");
    var yuiHeaderHd    = Y.Node.create("<div class='yui-widget-minimized-hd' id='yui-widget-minimized-hd'></div>");
    var headerHdIcon   = Y.Node.create("<table class='minIcons'><tr>"
                        +     "<td valign='top' align='right' id='m-icons-spacer' nowrap />"
                        +     "<td valign='top' align='right' nowrap>"
                        +     "<img src='images/maximize.gif'"
                        +      "id='m_max_icon' border='0' width='15' />"
                        + "</td></tr></table>");	
	
	yuiHeaderHd.appendChild(headerHdIcon);
    hw.appendChild(yuiHeaderHd);
    bodyNode.appendChild(hw);

    //Render the widget.
    var hOverlay = new Y.Overlay({
        contentBox : '#hOverlay',
        visible : true,
        xy: [0,925]
    }).render();
    hOverlay.hide();

    // make overlay draggable
    new Y.DD.Drag({
        node : overlay.get('boundingBox'),
        handles : ['.yui-widget-hd']
    }).plug(Y.Plugin.DDConstrained, { constrain2view : true });

    //Portgroup overlay status
    Y.one('#show-overlay').on('click', function(e) {
        Y.one('#overlay').show();
    });

    //Portgroup overlay close icon
    Y.one('#close_icon').on('click', function(e) {
        Y.one('#overlay').hide();
    });

    //Manage window size
    var windowMaxStatus = Y.one('#wmax_icon').get('visible');

    Y.one('#wmax_icon').on('click', function(e) {
       if ( ! windowMaxStatus ) {
           Y.one('#wmin_icon').show();
           Y.one('#wmax_icon').hide();
           overlay.set("xy",[10,10]);
           Y.DOM.byId("icons-spacer").style.width='730px';
		   Y.one('.icons').replaceClass('icons', 'fIcons');
           Y.DOM.byId("overlay").style.width=fWidth;
           Y.DOM.byId("overlay").style.height=fHeight;
           Y.DOM.byId("yui-widget-bd").style.height=fHeight;
           windowMaxStatus = 1;
       } else {
           Y.one('#wmax_icon').hide();
           Y.one('#wmin_icon').show();
           overlay.set("xy",[10,10]);
           Y.DOM.byId("icons-spacer").style.width='730px';
		   Y.one('.icons').replaceClass('icons', 'fIcons');
           Y.DOM.byId("overlay").style.width=fWidth;
           Y.DOM.byId("overlay").style.height=fHeight;
		   Y.DOM.byId("yui-widget-bd").style.height=fHeight;
           windowMaxStatus = 0;
       }

    });          

    var windowMinStatus = Y.one('#wmin_icon').get('visible');

    Y.one('#wmin_icon').on('click', function(e) {
       if ( ! windowMinStatus ) {
           Y.one('#wmax_icon').show();
           Y.one('#wmin_icon').hide();
           overlay.set("xy",[initX, initY]);
           Y.DOM.byId("icons-spacer").style.width='0px';
		   Y.one('.fIcons').replaceClass('fIcons', 'icons');		   
           Y.DOM.byId("overlay").style.width=mWidth;
           Y.DOM.byId("overlay").style.height=mHeight;
		   Y.DOM.byId("yui-widget-bd").style.height=mHeight;
           windowMinStatus = 1;
       } else {
           Y.one('#wmin_icon').hide();
           Y.one('#wmax_icon').show();
           windowMinStatus = 0;
           overlay.set("xy",[initX, initY]);
           Y.DOM.byId("icons-spacer").style.width='0px';
		   Y.one('.fIcons').replaceClass('fIcons', 'icons');		   
           Y.DOM.byId("overlay").style.width=mWidth;
           Y.DOM.byId("overlay").style.height=mHeight;
		   Y.DOM.byId("yui-widget-bd").style.height=mHeight;
       }

    });          

    //Manage window display state
    Y.one('#min_icon').on('click', function(e) {
       hOverlay.show();
       overlay.hide();
    }); 

    hOverlay.on('click', function(e) {
       hOverlay.hide();
       overlay.show();
    });

});