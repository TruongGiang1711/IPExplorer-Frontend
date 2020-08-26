// global variables
var firstAnimation = true;
var duration = 0.5;

// default box variables
var defaultWidth = 141;
var defaultHeight = 141;
var defaultGapLeft = 19;
var defaultGapTop = 20;
var defaultRadius = 25;
var defaultItemsPerRow = 2;

// active box variables
var activeWidth = 300;
var activeHeight = 50;
var activeRadius = 10;

// inactive box variables
var inactiveWidth = 88;
var inactiveHeight = 88;
var inactiveGapLeft = 19;
var inactiveGapTop = 20;
var inactiveRadius = 15;
var inactiveItemsPerRow = 3;

$('.animation-box--item').on('click', function (e) {
    var $this = $(this);
    $item = $('.animation-box--item');
    var $form = $('.animation-box form');
    if ($this.hasClass('active')) {
        $form.fadeOut(duration * 1000, function () {
            $(this).css('height', 0);
        });
        $item.removeClass('active').removeClass('inactive');
        $item.each(function (index, el) {
            $itemThis = $(this);
            gsap.to($itemThis, {
                x: (defaultWidth + defaultGapLeft) * (index % defaultItemsPerRow),
                y: Math.floor(index / defaultItemsPerRow) * (
                    defaultGapTop + defaultHeight),
                width: defaultWidth,
                height: defaultHeight,
                top: 0,
                left: 0,
                borderRadius: defaultRadius,
                duration: duration
            });
        });
    } else {
        // height 200px test, actually height auto
        $form.css('height', 200).fadeIn(duration * 1000);
        var $parent = $('.animation-box');
        $this.addClass('active').removeClass('inactive');
        $item.not($this).addClass('inactive').removeClass('active');

        if (firstAnimation) {
            $parentX = $parent.offset().top;
            $parentY = $parent.offset().left;
            $x = $this.offset().top;
            $y = $this.offset().left;
            $transaleX = $parentX - $x;
            $transaleY = $parentY - $y;
        } else {
            $transaleX = 0;
            $transaleY = 0;
        }

        gsap.to($this, {
            x: $transaleY,
            y: $transaleX,
            width: activeWidth,
            height: activeHeight,
            borderRadius: activeRadius,
            duration: duration
        });

        // loop inactive box
        $('.animation-box--item.inactive').each(function (index, el) {
            var $itemThis = $(this);

            gsap.to($itemThis, {
                x: (inactiveWidth + inactiveGapLeft) * (index % inactiveItemsPerRow),
                y: 200 + activeHeight + Math.floor(index / inactiveItemsPerRow) * (
                    inactiveGapTop + inactiveHeight),
                width: inactiveWidth,
                height: inactiveHeight,
                top: 0,
                left: 0,
                borderRadius: inactiveRadius,
                duration: duration
            });
        });
        firstAnimation = false;
    }
});