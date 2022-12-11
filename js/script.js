// filter gallery start 
filterSelection("all")

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("column");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}
// filter gallery end 

// image zoom start  
(function($) {
    $.fn.picZoomer = function(options) {
        var opts = $.extend({}, $.fn.picZoomer.defaults, options),
            $this = this,
            $picBD = $('<div class="picZoomer-pic-wp"></div>').css({
                'width': opts.picWidth + 'px',
                'height': opts.picHeight + 'px'
            }).appendTo($this),

            $pic = $this.children('img').addClass('picZoomer-pic').appendTo($picBD),
            $cursor = $('<div class="picZoomer-cursor"><i class="f-is picZoomCursor-ico"></i></div>').appendTo($picBD),

            cursorSizeHalf = {
                w: $cursor.width() / 2,
                h: $cursor.height() / 2
            },
            $zoomWP = $('<div class="picZoomer-zoom-wp"><img class="picZoomer-zoom-pic"></img></div>').appendTo($this),

            $zoomPic = $zoomWP.find('.picZoomer-zoom-pic'),
            picBDOffset = {
                x: $picBD.offset().left,
                y: $picBD.offset().top
            };

        opts.zoomWidth = opts.zoomWidth || opts.picWidth;
        opts.zoomHeight = opts.zoomHeight || opts.picHeight;
        var zoomWPSizeHalf = {
            w: opts.zoomWidth / 2,
            h: opts.zoomHeight / 2
        };


        $zoomWP.css({
            'width': opts.zoomWidth + 'px',
            'height': opts.zoomHeight + 'px'
        });

        $zoomWP.css(opts.zoomerPosition || {
            top: 0,
            left: opts.picWidth + 30 + 'px'
        });

        $zoomPic.css({
            'width': opts.picWidth * opts.scale + 'px',
            'height': opts.picHeight * opts.scale + 'px'
        });

        $picBD.on('mouseenter', function(event) {
            $cursor.show();
            $zoomWP.show();
            $zoomPic.attr('src', $pic.attr('src'))
        }).on('mouseleave', function(event) {
            $cursor.hide();
            $zoomWP.hide();
        }).on('mousemove', function(event) {
            var x = event.pageX - picBDOffset.x,
                y = event.pageY - picBDOffset.y;

            $cursor.css({
                'left': x - cursorSizeHalf.w + 'px',
                'top': y - cursorSizeHalf.h + 'px'
            });

            $zoomPic.css({
                'left': -(x * opts.scale - zoomWPSizeHalf.w) + 'px',
                'top': -(y * opts.scale - zoomWPSizeHalf.h) + 'px'
            });
        });

        return $this;
    };
    $.fn.picZoomer.defaults = {
        picWidth: 350,
        picHeight: 350,
        scale: 2.5,
        zoomerPosition: {
            top: '0px',
            left: '400px'
        }
        // zoomerPosition: {
        //     top: '500px',
        //     left: '400px'
        // }
    };
})(jQuery);

$(function() {
    $('.picZoomer').picZoomer();
    $('.piclist li').on('click', function(event) {
        var $pic = $(this).find('img');
        $('.picZoomer-pic').attr('src', $pic.attr('src'));
    });
});
// image zoom endd