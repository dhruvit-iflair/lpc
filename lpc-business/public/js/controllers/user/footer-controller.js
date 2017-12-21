angular.module('inspinia')
    .controller('footerCtrl', function($scope) {
        
        function StickyFooter() {
            var st = jQuery('footer').outerHeight()
            jQuery('#wrapper').css({
                'margin-bottom': -st,
                'padding-bottom': st
            })
        }
    })