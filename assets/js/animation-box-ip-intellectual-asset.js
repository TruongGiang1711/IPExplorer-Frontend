// global variables
var firstAnimation = true;
var duration = 0;

// default box variables
var defaultWidth = 141;
var defaultHeight = 141;
var defaultGapLeft = 20;
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

function animation_box() {
    var $parent = $('.animation-box');
    var $form = $('.animation-box form');
    var $item = $('.animation-box--item');
    var $list = $('.ipIntellectualAssets-list');
    $parent.height($item.innerHeight() * 2 + 20)
    $('.animation-box--item').on('click', function (e) {
        var $this = $(this);
        if ($this.hasClass('active')) {
            $form.fadeOut(duration * 1000);
            $item.removeClass('active').removeClass('inactive');
            $this.children().removeClass('active')
            $('.nametag .tag').contents().filter(function () {
                return this.nodeType === 3;
            }).remove();
            $item.each(function (index, el) {
                $itemThis = $(this);
                gsap.to($parent, {
                    height: $item.innerHeight() * 2 + 30,
                });
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
            $($list).each(function (index, el) {
                if ($this.parent($parent).find($list).hasClass($this.find('.name').text()) && $this.index() === index + 1) {
                    $(el).addClass('active')
                } else {
                    $(el).removeClass('active')
                }
            })
            $form.fadeIn(duration * 1000);
            $this.addClass('active').removeClass('inactive');
            $item.not($this).addClass('inactive').removeClass('active');
            $this.children().addClass('active')
            $item.not($this).children().removeClass('active')
            $('.nametag .tag').replaceWith($('<span class="tag"> - ' + $this.find('.name').text() + '</span>'))
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
                gsap.to($parent, {
                    height:
                        $form.innerHeight() + 100,
                });
                gsap.to($itemThis, {
                    x: (inactiveWidth + inactiveGapLeft) * (index % inactiveItemsPerRow),
                    y: $form.innerHeight() + 10,
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
}