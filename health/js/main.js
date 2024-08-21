
$(document).ready(function(){
    var time2 = 4; //자동 롤링 타임
    var $bar, $slick, isPause, tick, percentTime;
    var $alert = $("#section1 #popupzone"),
      $alert_slide = $alert.find(".slide"),
      $alert_slide_stop = $alert.find(".control .stop"),
      $alert_slide_play = $alert.find(".control .play"),
      $alert_slide_next = $alert.find(".control .next"),
      $alert_slide_prev = $alert.find(".control .prev");
  
    $alert_slide.on('init', function (e, slick) {
      if (slick.$slides.length <= slick.options.slidesToShow) {
        $alert_slide.siblings(".control").hide();
      }
      $alert.find('.total').html('<span class="current">' + parseInt(slick.currentSlide + 1) + '</span> <span class="line"><em>/ </em></span><span class="count">' + slick.slideCount + '</span>');
    });
  
    $alert_slide.on("afterChange", function (event, _$$slick, currentSlide) {
      $alert.find('.total').html('<span class="current">' + parseInt(_$$slick.currentSlide + 1) + '</span> <span  class="line"><em>/ </em></span><span class="count">' + _$$slick.slideCount + '</span>');
    });
  
    $alert_slide.slick({
      slidesToShow: 1,
      dots: false, // 슬라이드 dot 네비게이션
      autoplay: false,
      fade: true, // 슬라이드 모션 fade
      nextArrow: $alert_slide_next,
      prevArrow: $alert_slide_prev,
  
    });
  
    $bar = $("#section1 #popupzone .progress span");
    function startProgressbar() {
      $alert_slide_play.hide()
      $alert_slide_stop.show()
      resetProgressbar2();
      percentTime = 0;
      isPause = false;
      tick = setInterval(interval, 10);
    }
    function interval() {
      if (isPause === false) {
  
        percentTime += 1 / (time2 + 0.1);
        if (percentTime > 100) {
          $bar.css({
            width: "100%"
          });
          $alert_slide.slick("slickNext");
          startProgressbar();
        } else {
          $bar.css({
            width: percentTime + "%"
          });
        }
       
      }
    }
    startProgressbar();
    function resetProgressbar2() {
      $bar.css({
        width: 0 + "%"
      });
      clearTimeout(tick);
    }
  
    $("#section1 #popupzone  .control .next, #section1 #popupzone .control .prev").click(function () {
      if (!isPause){
        startProgressbar();
      }
     
    });
  
    $alert_slide_stop.click(function () {
      $(this).hide()
      $alert_slide_play.show();
      resetProgressbar2()
      isPause = true;
    });
    $alert_slide_play.click(function () {
      $(this).hide()
      $alert_slide_stop.show();
      startProgressbar()
    });
  
  });