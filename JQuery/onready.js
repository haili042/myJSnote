/**
 * 3 种方法实现 ready 事件
 *      - DOMContentLoaded
 *      - onreadystatechange
 *          - complete
 *          - interactive
 *      - document.documentElement.doScroll("left")
 * */

jQuery.fn = jQuery.prototype = {
    // ...
    ready: function( fn ) {
        // Attach the listeners
        jQuery.bindReady();

        // Add the callback
        readyList.done( fn );

        return this;
    },

    // ...

};

jQuery.extend({

    // ...
    bindReady: function () {
        if (readyList) {
            return;
        }

        readyList = jQuery._Deferred();

        // Catch cases where $(document).ready() is called after the
        // browser event has already occurred.
        if (document.readyState === "complete") {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            return setTimeout(jQuery.ready, 1);
        }

        // Mozilla, Opera and webkit nightlies currently support this event
        if (document.addEventListener) {
            // Use the handy event callback
            document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

            // A fallback to window.onload, that will always work
            window.addEventListener("load", jQuery.ready, false);

            // If IE event model is used
        } else if (document.attachEvent) {
            // ensure firing before onload,
            // maybe late but safe also for iframes
            document.attachEvent("onreadystatechange", DOMContentLoaded);

            // A fallback to window.onload, that will always work
            window.attachEvent("onload", jQuery.ready);

            // If IE and not a frame
            // continually check to see if the document is ready
            var toplevel = false;

            try {
                toplevel = window.frameElement == null;
            } catch (e) {
            }

            if (document.documentElement.doScroll && toplevel) {
                doScrollCheck();
            }
        }
    },
    // ...
});

/**
 * IE 老版本只有在文档加载完成之后才能滚动
 * 所以可以利用这个特性定时检查是否能滚动
 *
 * */
// The DOM ready check for Internet Explorer
function doScrollCheck() {
    if ( jQuery.isReady ) {
        return;
    }

    try {
        // If IE is used, use the trick by Diego Perini
        // http://javascript.nwbox.com/IEContentLoaded/
        document.documentElement.doScroll("left");
    } catch(e) {
        setTimeout( doScrollCheck, 1 );
        return;
    }

    // and execute any waiting functions
    jQuery.ready();
}