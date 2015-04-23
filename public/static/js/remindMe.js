$(function(){
      var day, days, hour, hours, minute, month, serverDate, startDate, timespan, year;

      serverDate = $('#serverDate').val();

      if (serverDate) {
            serverDate = serverDate.split('-');
      }
      else{
            return;
      }


      year = serverDate[0] || 0;

      month = serverDate[1] - 1 || 0;

      day = serverDate[2] || 0;

      hour = serverDate[3] || 0;

      minute = serverDate[4] || 0;

      serverDate = new Date(year, month, day, hour, minute);

      startDate = $("#currentDate").val().split('-');

      year = startDate[0] || 0;

      month = startDate[1] - 1 || 0;

      day = startDate[2] || 0;

      hour = startDate[3] || 0;

      minute = startDate[4] || 0;

      startDate = new Date(year, month, day, hour, minute);

      timespan = countdown(startDate, serverDate, countdown.DAYS | countdown.HOURS);

      days = timespan.days;

      hours = timespan.hours;

      $('.countdown-day .countdown-key').html("Days");

      $('.countdown-hour .countdown-key').html("Hours");

      $('.countdown-day .countdown-value').html(days);

      $('.countdown-hour .countdown-value').html(hours);

      $('.getCoverage').focus(function() {
         $(".remind-me-menu").attr('aria-hidden','true')
      });

      jQuery.expr[':'].focus = function( elem ) {
        return elem === document.activeElement && ( elem.type || elem.href );
      };

      var remindMe = {
            start: undefined,
            end: undefined,
            zonecode: undefined,
            summary: undefined,
            description: undefined,
            location: undefined,
            organizer: undefined,
            organizerEmail: undefined,
            allDayEvent: undefined,
            dateFormat: undefined
      }

      $('.remind-me').attr('aria-haspopup','true').hover(function(){
            var $this = $(this);
            remindMe.start = $this.data('start');
            remindMe.end = $this.data('end');
            remindMe.zonecode = $this.data('zonecode');
            remindMe.summary = $this.data('summary');
            remindMe.description = $this.data('description');
            remindMe.location = $this.data('location');
            remindMe.organizer = $this.data('organizer');
            remindMe.organizerEmail = $this.data('organizer-email');
            remindMe.allDayEvent = $this.data('all-day-event');
            remindMe.dateformat = $this.data('date-Format');
            $this.off('click').next('.remind-me-menu').attr('aria-hidden','false').find('li:first-child a').focus();
             
            return false;

      }).on('click',function(e){ 
            var $this = $(this);
            remindMe.start = $this.data('start');
            remindMe.end = $this.data('end');
            remindMe.zonecode = $this.data('zonecode');
            remindMe.summary = $this.data('summary');
            remindMe.description = $this.data('description');
            remindMe.location = $this.data('location');
            remindMe.organizer = $this.data('organizer');
            remindMe.organizerEmail = $this.data('organizer-email');
            remindMe.allDayEvent = $this.data('all-day-event');
            remindMe.dateformat = $this.data('date-Format');
            $(this).next('.remind-me-menu').attr('aria-hidden','false').find('li:first-child a').focus(); 
      })
      ;
      $('.remind-me-menu').attr('aria-hidden','true').parent().mouseleave(function(){
            $(this).find('.remind-me-menu').attr('aria-hidden','true')

      });
      $('.remind-me-menu a').click(function(e){
            e.preventDefault();
            addThis(e.target, $(this).data("calendar"), remindMe.start, remindMe.end, remindMe.zonecode, remindMe.summary, remindMe.description, remindMe.location, remindMe.organizer, remindMe.organizerEmail, remindMe.allDayEvent, remindMe.dateFormat);

      })
 
      function addThis(target, calendar, start, end, zonecode, summary, description, location, organizer, organizerEmail, allDayEvent, dateFormat) {
            addthisevent.cli(target, calendar, "&dstart=" + start + "&dend=" + end + "&dzone=" + zonecode + "&dsum=" + summary + "&desc=" + description + "&dloca=" + location + "&dorga=" + organizer + "&dorgaem=" + organizerEmail + "&dallday=" + allDayEvent + "&dateformat=" + dateFormat);
      }


})
