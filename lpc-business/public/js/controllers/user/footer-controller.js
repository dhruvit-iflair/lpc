angular.module('inspinia')
    .controller('footerCtrl', function($loader, $scope) {
        
        $loader.stop()
        function StickyFooter() {
            var st = jQuery('footer').outerHeight()
            jQuery('#wrapper').css({
                'margin-bottom': -st,
                'padding-bottom': st
            })
        }
    })